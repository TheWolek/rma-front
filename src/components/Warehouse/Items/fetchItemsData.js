import store from '../../../store'

const fetchItemsData = (url) => {
    fetch(url)
        .then(async res => {
            const resData = await res.json()

            if (!res.ok) {
                const error = (resData && resData.message) || res.status
                return Promise.reject(error)
            }

            setTimeout(() => {
                // resData.forEach(el => {
                //     el.shelve_code = this.shelves[el.shelve].code
                // });

                store.commit("items/setItems", resData)
                // this.loading = false
            }, 500)
        })
        .catch(error => {
            return console.log(error)
        })
}

export default fetchItemsData