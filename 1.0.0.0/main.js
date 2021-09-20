(function () {

    var names = [
        'Yandex',
        'Google',
        'Bing',
        'DuckDuckGo',
    ];

    var urls = [
        'https://yandex.ru/search/?text=',
        'https://www.google.com/search?q=',
        'https://www.bing.com/search?q=',
        'https://duckduckgo.com/?q=',
    ];

    chrome.runtime.onInstalled.addListener(function () {
        chrome.storage.sync.get(["key"], function (result) {
            let idx = result.key;
            let text = "Search into ";

            if (idx == -1) {
                text += 'All';
            }
            else {
                text += names[idx];

                if (text.includes('undefined')) {
                    text = "Search into Yandex";
                    chrome.storage.sync.set({ key: 0 });
                }
            }

            chrome.contextMenus.create({ id: "searchinto", title: text, contexts: ["selection"] });
        });
    });

    chrome.contextMenus.onClicked.addListener(function (a) {
        chrome.storage.sync.get(["key"], function (result) {
            let idx = result.key;
            let address = '';

            if (idx == -1) {
                for (let i = 0; i < urls.length; i++) {
                    address = urls[i] + encodeURIComponent(a.selectionText);
                    chrome.tabs.create({ url: address });
                }
            }
            else {
                address = urls[idx] + encodeURIComponent(a.selectionText);
                chrome.tabs.create({ url: address });
            }

        });
    });

})();
