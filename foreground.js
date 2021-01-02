const DIV_chrome_ext = document.createElement("div");
DIV_chrome_ext.id = "chrome_ext";
DIV_chrome_ext.textContent =
  "The Ultimate Beginner's Guide to Chrome Extensions";

document.querySelector("body").appendChild(DIV_chrome_ext);

console.log("I'm the foreground page.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  sendResponse({
    message: "im the foreground i got your message",
  });
});

setTimeout(() => {
  chrome.runtime.sendMessage({
    from: "foreground",
    message: "im a new message from the foreground",
  });
}, 7000);
