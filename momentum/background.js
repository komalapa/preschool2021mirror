chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});

// function openTab(){
//     alert('click')
//     chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
// }

// openTab()