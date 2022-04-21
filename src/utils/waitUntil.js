import store from "../store"

const waitUntil = function(variable, callback) {
    let interval = setInterval(() => {
        if (variable === "items.shelves") {
            clearInterval(interval)
            callback(store.state.items.shelves)
        }
    }, 300)
}

export default waitUntil
