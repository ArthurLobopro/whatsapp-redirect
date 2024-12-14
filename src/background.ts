chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const url = details.url

        if (url.includes("https://web.whatsapp.com/send?")) {
            const urlParams = new URLSearchParams(new URL(url).search)
            const phoneNumber = urlParams.get('phone')
            const textMessage = urlParams.get('text')!

            let newUrl = `whatsapp://send?text=${encodeURIComponent(textMessage)}&phone=${phoneNumber}`

            openNew(newUrl)

            return { redirectUrl: newUrl }
        }

        // Caso a URL não seja a que queremos, não faz nada
        return {}
    },
    { urls: ["https://web.whatsapp.com/*"] },
    ["blocking"]
)

function openNew(url: string) {
    setTimeout(() => chrome.tabs.create({ url }), 2000)
}