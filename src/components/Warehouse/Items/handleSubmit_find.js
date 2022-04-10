import store from "../../../store"

export default {
    data() {
        return {
            barcode_reg: /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/
        }
    },
    methods: {
        handleSubmit_find(mode, code) {
            let barcode
            if (mode === "url") {
                barcode = code
            } else {
                if (this.barcode_find == "") return this.displayError("podaj kod kreskowy")
                if (!this.barcode_reg.test(this.barcode_find)) return this.displayError("zły format kodu")
                this.toggleModal_find()
                this.error_barcode_find = ''
                this.$router.push({query: {code: this.barcode_find}})
                this.handleSubmit_find("url", this.barcode_find)
                this.barcode_find = ''
                return
            }
            fetch(`http://localhost:3000/warehouse/items?barcode=${barcode}`)
            .then(async res => {
                this.emitter.emit("refreshing", true)
                const resData = await res.json()
                if (!res.ok) {
                    this.emitter.emit("refreshing", false)
                    const error = (resData && resData.message) || res.status
                    return Promise.reject(error)
                }
                
                setTimeout(() => {
                    store.dispatch("items/submitModal_Find", {
                        ...resData[0], 
                        shelve_code: this.shelves[resData[0].shelve].code,
                        barcode: barcode
                    })
                    this.emitter.emit("refreshing", false)
                }, 500)
            })
            .catch(error => {
                if (mode === "url") {
                    console.log(error)
                } else {
                    return this.displayError(error)
                }
            })
        }
    },
}