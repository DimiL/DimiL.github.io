/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */
/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

/**
 * Provides infrastructure for automated download components tests.
 */

////////////////////////////////////////////////////////////////////////////////
//// Globals

XPCOMUtils.defineLazyModuleGetter(this, "Downloads",
                                  "resource://gre/modules/Downloads.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "DownloadsCommon",
                                  "resource:///modules/DownloadsCommon.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "FileUtils",
                                  "resource://gre/modules/FileUtils.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "Promise",
                                  "resource://gre/modules/Promise.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "Task",
                                  "resource://gre/modules/Task.jsm");
const nsIDM = Ci.nsIDownloadManager;

var gTestTargetFile = FileUtils.getFile("TmpD", ["dm-ui-test.file"]);
gTestTargetFile.createUnique(Ci.nsIFile.NORMAL_FILE_TYPE, FileUtils.PERMS_FILE);
registerCleanupFunction(function () {
  gTestTargetFile.remove(false);
});

////////////////////////////////////////////////////////////////////////////////
//// Asynchronous support subroutines

function promiseOpenAndLoadWindow(aOptions)
{
  return new Promise((resolve, reject) => {
    let win = OpenBrowserWindow(aOptions);
    win.addEventListener("load", function onLoad() {
      win.removeEventListener("load", onLoad);
      resolve(win);
    });
  });
}

/**
 * Waits for a load (or custom) event to finish in a given tab. If provided
 * load an uri into the tab.
 *
 * @param tab
 *        The tab to load into.
 * @param [optional] url
 *        The url to load, or the current url.
 * @param [optional] event
 *        The load event type to wait for.  Defaults to "load".
 * @return {Promise} resolved when the event is handled.
 * @resolves to the received event
 * @rejects if a valid load event is not received within a meaningful interval
 */
function promiseTabLoadEvent(tab, url, eventType="load")
{
  let deferred = Promise.defer();
  info("Wait tab event: " + eventType);

  function handle(event) {
    if (event.originalTarget != tab.linkedBrowser.contentDocument ||
        event.target.location.href == "about:blank" ||
        (url && event.target.location.href != url)) {
      info("Skipping spurious '" + eventType + "'' event" +
           " for " + event.target.location.href);
      return;
    }
    // Remove reference to tab from the cleanup function:
    realCleanup = () => {};
    tab.linkedBrowser.removeEventListener(eventType, handle, true);
    info("Tab event received: " + eventType);
    deferred.resolve(event);
  }

  // Juggle a bit to avoid leaks:
  let realCleanup = () => tab.linkedBrowser.removeEventListener(eventType, handle, true);
  registerCleanupFunction(() => realCleanup());

  tab.linkedBrowser.addEventListener(eventType, handle, true, true);
  if (url)
    tab.linkedBrowser.loadURI(url);
  return deferred.promise;
}

function promiseWindowClosed(win)
{
  let promise = new Promise((resolve, reject) => {
    Services.obs.addObserver(function obs(subject, topic) {
      if (subject == win) {
        Services.obs.removeObserver(obs, topic);
        resolve();
      }
    }, "domwindowclosed", false);
  });
  win.close();
  return promise;
}


function promiseFocus()
{
  let deferred = Promise.defer();
  waitForFocus(deferred.resolve);
  return deferred.promise;
}

function promisePanelOpened()
{
  let deferred = Promise.defer();

  if (DownloadsPanel.panel && DownloadsPanel.panel.state == "open") {
    return deferred.resolve();
  }

  // Hook to wait until the panel is shown.
  let originalOnPopupShown = DownloadsPanel.onPopupShown;
  DownloadsPanel.onPopupShown = function () {
    DownloadsPanel.onPopupShown = originalOnPopupShown;
    originalOnPopupShown.apply(this, arguments);

    // Defer to the next tick of the event loop so that we don't continue
    // processing during the DOM event handler itself.
    setTimeout(deferred.resolve, 0);
  };

  return deferred.promise;
}

function task_resetState()
{
  // Remove all downloads.
  let publicList = yield Downloads.getList(Downloads.PUBLIC);
  let downloads = yield publicList.getAll();
  for (let download of downloads) {
    publicList.remove(download);
    yield download.finalize(true);
  }

  DownloadsPanel.hidePanel();

  yield promiseFocus();
}

function* task_addDownloads(aItems)
{
  let startTimeMs = Date.now();

  let publicList = yield Downloads.getList(Downloads.PUBLIC);
  for (let item of aItems) {
    let download = {
      source: {
        url: "http://www.example.com/test-download.txt",
      },
      target: {
        path: gTestTargetFile.path,
      },
      succeeded: item.state == nsIDM.DOWNLOAD_FINISHED,
      canceled: item.state == nsIDM.DOWNLOAD_CANCELED ||
                item.state == nsIDM.DOWNLOAD_PAUSED,
      error: item.state == nsIDM.DOWNLOAD_FAILED ? new Error("Failed.") : null,
      hasPartialData: item.state == nsIDM.DOWNLOAD_PAUSED,
      hasBlockedData: item.hasBlockedData || false,
      startTime: new Date(startTimeMs++),
    };
    // `"errorObj" in download` must be false when there's no error.
    if (item.errorObj) {
      download.errorObj = item.errorObj;
    }
    yield publicList.add(yield Downloads.createDownload(download));
  }
}

function task_openPanel()
{
  yield promiseFocus();

  let promise = promisePanelOpened();
  DownloadsPanel.showPanel();
  yield promise;
}

function promiseAlertDialogOpen(buttonAction) {
  return new Promise(resolve => {
    Services.ww.registerNotification(function onOpen(subj, topic, data) {
      if (topic == "domwindowopened" && subj instanceof Ci.nsIDOMWindow) {
        // The test listens for the "load" event which guarantees that the alert
        // class has already been added (it is added when "DOMContentLoaded" is
        // fired).
        subj.addEventListener("load", function onLoad() {
          subj.removeEventListener("load", onLoad);
          if (subj.document.documentURI ==
              "chrome://global/content/commonDialog.xul") {
            Services.ww.unregisterNotification(onOpen);

            let dialog = subj.document.getElementById("commonDialog");
            ok(dialog.classList.contains("alert-dialog"),
               "The dialog element should contain an alert class.");

            let doc = subj.document.documentElement;
            doc.getButton(buttonAction).click();
            resolve();
          }
        });
      }
    });
  });
}
