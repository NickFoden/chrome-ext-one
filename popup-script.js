console.log("im the popup page");

chrome.runtime.sendMessage(
  {
    from: "popup",
    message: "Hello",
  },
  (res) => {
    console.log(res);
    return true;
  }
);
