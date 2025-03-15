const DEFAULT_SETTINGS = {
    openTwice: false
}

const settings = { ...DEFAULT_SETTINGS }

function reloadSettings() {
    chrome.storage.local.get().then(data => {
        if ("openTwice" in data) {
            settings.openTwice = data.openTwice
        } else {
            settings.openTwice = DEFAULT_SETTINGS.openTwice
        }

        if (Object.keys(data).length !== Object.keys(settings).length) {
            chrome.storage.local.set(settings)
        }
    })
}

chrome.storage.local.onChanged.addListener(reloadSettings)


chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    const url = new URL(details.url)

    if (url.href.includes("send?")) {
        const urlParams = new URLSearchParams(new URL(url).search)
        const phoneNumber = urlParams.get('phone')
        const textMessage = urlParams.get('text')!

        let newUrl = `whatsapp://send?text=${encodeURIComponent(textMessage)}&phone=${phoneNumber}`

        chrome.tabs.update(details.tabId, { url: newUrl })

        if (settings.openTwice) {
            openNew(newUrl)
        }
    }

}, { url: [{ hostContains: "web.whatsapp.com" }] })


function openNew(url: string) {
    setTimeout(() => chrome.tabs.create({ url }), 2000)
}