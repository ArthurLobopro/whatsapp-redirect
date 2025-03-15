/**
 * @param q {string}
 * @returns {HTMLElement}
 */
const $ = (q) => document.querySelector(q)

const openTwiceInput = $("#open-twice")

openTwiceInput.addEventListener("change", () => {
    chrome.storage.local.set({ openTwice: openTwiceInput.checked })
})

function loadData() {
    chrome.storage.local.get().then(data => {
        openTwiceInput.checked = data.openTwice
    })
}

loadData()