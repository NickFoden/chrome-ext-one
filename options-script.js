console.log("im the options page");
chrome.runtime.sendMessage(
  {
    from: "options",
    message: "hello",
  },
  (response) => {
    console.log(response);
  }
);
