let current_active_tabId = null;
console.log("im the background script");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  current_active_tabId = tabId;
  if (changeInfo.status === "complete" && tab.url.includes("http")) {
    chrome.tabs.insertCSS(
      current_active_tabId,
      { file: "./foreground.css" },
      () => {
        chrome.tabs.executeScript(
          current_active_tabId,
          {
            file: "./foreground.js",
          },
          () => {
            console.log("injected and executed");
            setTimeout(() => {
              chrome.tabs.sendMessage(
                current_active_tabId,
                {
                  message: "hello im the background script",
                },
                (response) => {
                  console.log(response);
                }
              );
            }, 6000);
          }
        );
      }
    );
  }
});

chrome.tabs.onActivated.addListener((activeInfo, windowId) => {
  current_active_tabId = activeInfo.tabId;
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req);
  sendResponse({
    message: "i got your message",
  });
  return true;
});
