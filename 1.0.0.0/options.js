window.onload = function () {

    var names = [
        'Yandex',
        'Google',
        'Bing',
        'DuckDuckGo',
    ];

    const selectElement = document.getElementById('select');

    chrome.storage.sync.get(["key"], function (result) {
        let idx = result.key;
        let text = "Search into ";
        text += names[idx];

        if (!text.includes('undefined')) {
            switch (idx) {
                case 0:
                    selectElement.selectedIndex = 0;
                    break;
                case 1:
                    selectElement.selectedIndex = 1;
                    break;
                case 2:
                    selectElement.selectedIndex = 2;
                    break;
                case 3:
                    selectElement.selectedIndex = 3;
                    break;
                default:
                    break;
            }
        }
        else {
            if (idx == -1) {
                selectElement.selectedIndex = 4;
            }
            else {
                selectElement.selectedIndex = 0;
            }
        }
    });

    selectElement.addEventListener('change', (event) => {
        const result = event.target.value;

        switch (result) {
            case 'Yandex':
                chrome.storage.sync.set({ key: 0 });
                break;
            case 'Google':
                chrome.storage.sync.set({ key: 1 });
                break;
            case 'Bing':
                chrome.storage.sync.set({ key: 2 });
                break;
            case 'DuckDuckGo':
                chrome.storage.sync.set({ key: 3 });
                break;
            default:
                chrome.storage.sync.set({ key: -1 });
                break;
        }

        chrome.storage.sync.get(["key"], function (result) {
            let idx = result.key;
            let text = "Search into ";

            if (idx == -1) {
                text += 'All';
            }
            else {
                text += names[idx];
            }

            chrome.contextMenus.removeAll();
            chrome.contextMenus.create({ id: "searchinto", title: text, contexts: ["selection"] });
        });

    });

}