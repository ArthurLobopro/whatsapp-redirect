const DEFAULT_SETTINGS = {
    active: true,
    openTwice: false
} as const

const settings: Partial<typeof DEFAULT_SETTINGS> = {}

function reloadSettings() {
    chrome.storage.local.get().then(data => {
        for (const key in DEFAULT_SETTINGS) {
            //@ts-ignore
            settings[key] = data[key] ?? (DEFAULT_SETTINGS[key])
        }

        if (Object.keys(data).length !== Object.keys(settings).length) {
            chrome.storage.local.set(settings)
        }
    })
}

reloadSettings()

chrome.storage.local.onChanged.addListener(reloadSettings)

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (settings.active) {
        const url = new URL(details.url)

        if (url.href.includes("send?") || url.href.includes("send/?")) {
            const urlParams = new URLSearchParams(new URL(url).search)
            const phone = urlParams.get('phone')
            const message = urlParams.get('text')

            if (phone && message) {
                let newUrl = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${phone}`

                chrome.tabs.update(details.tabId, { url: newUrl })

                if (settings.openTwice) {
                    openNew(newUrl)
                }
            }
        }
    }

}, { url: [{ hostContains: "web.whatsapp.com" }, { hostContains: "api.whatsapp.com/" }] })


function openNew(url: string) {
    setTimeout(() => chrome.tabs.create({ url }), 2000)
}