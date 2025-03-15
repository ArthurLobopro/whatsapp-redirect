/**
 * @param q {string}
 * @returns {HTMLElement}
 */
const $ = (q) => document.querySelector(q)

const openTwiceInput = $("#open-twice")
openTwiceInput.addEventListener("change", () => {
    chrome.storage.local.set({ openTwice: openTwiceInput.checked })
})

const activeInput = $("#active")
activeInput.addEventListener("change", () => {
    chrome.storage.local.set({ active: activeInput.checked })
})

function loadData() {
    chrome.storage.local.get().then(data => {
        openTwiceInput.checked = data.openTwice
        activeInput.checked = data.active
    })
}

loadData()