chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    const url = new URL(details.url)

    if (url.href.includes("send?")) {
        const urlParams = new URLSearchParams(new URL(url).search)
        const phoneNumber = urlParams.get('phone')
        const textMessage = urlParams.get('text')!

        let newUrl = `whatsapp://send?text=${encodeURIComponent(textMessage)}&phone=${phoneNumber}`

        openNew(newUrl)

        chrome.tabs.update(details.tabId, { url: newUrl })
    }

}, { url: [{ hostContains: "web.whatsapp.com" }] })


function openNew(url: string) {
    setTimeout(() => chrome.tabs.create({ url }), 2000)
}