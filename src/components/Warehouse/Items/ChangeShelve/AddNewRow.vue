<script>
import { mapState } from 'vuex'
import store from '../../../../store'
export default {
    data() {
        return {
            codeToAdd: '',
            reg: /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/,
            allowedProducts: []
        }
    },
    mounted() {
        this.emitter.on("addingFail", () => {
            this.onFail()
        })
        this.emitter.on("addingSuccess", () => {
            this.codeToAdd = ''
        })
        // this.emitter.on("active_shelve", (evData) => {})
        // this.emitter.on("clear_shelves", () => {})
        this.emitter.on("changeShelve_success", () => {
            document.getElementById("addInput").disabled = true
            document.getElementById("addInput").classList.remove("fail")
            this.codeToAdd = ''
            this.allowedProducts = []
        })
        if (this.form_active.status) {
            this.fetchAllowedProducts(this.form_active.active)
        }
    },
    computed: {
        ...mapState({
            form_active: state => state.changeShelve.form_active,
            items: state => state.changeShelve.items
        }),
    },
    watch: {
        form_active(status) {
            if (status.status) {
                this.fetchAllowedProducts(status.active)
            } else {
                this.clear()
            }
        }
    },
    methods: {
        onAdd() {
            if (this.codeToAdd != '') {
                if (!this.reg.test(this.codeToAdd)) return this.onFail()
                if (!this.allowedProducts.includes(this.codeToAdd)) {
                    console.log("item", this.codeToAdd, "is not in shelve"); return this.onFail()
                }
                if (this.codeAlreadyEntered(this.codeToAdd)) return this.onFail()
                // this.emitter.emit("itemAdded", this.codeToAdd)
                store.commit("addItem", {
                    barcode: this.codeToAdd,
                    ticket_id: this.codeToAdd.split("-")[0],
                    model: this.codeToAdd.split("-")[1],
                    category: this.codeToAdd.split("-")[2],
                })
                this.codeToAdd = ''
                
            }
        },
        codeAlreadyEntered(code) {
            let fail = false

            if (this.items.length > 0) {
                this.items.forEach(el => {
                    if (el.barcode == code) {
                        fail = true
                        return
                    }
                })
                return fail
            }
            return fail
        },
        onChange() {
            if (!this.reg.test(this.codeToAdd)) return this.onFail();
            else this.clearFail()
        },
        onFail() {
            document.getElementById("addInput").classList.add("fail")
        },
        clearFail() {
            document.getElementById("addInput").classList.remove("fail")
        },
        failNotify(err) {
            document.getElementById("addInput").disabled = true
            this.emitter.emit("changeShelve_fail", err)
        },
        clear() {
            document.getElementById("addInput").disabled = true
            document.getElementById("addInput").classList.remove("fail")
            this.codeToAdd = ''
            this.allowedProducts = []
        },
        fetchAllowedProducts(currShelve) {
            let active_shelve = this.shelves.find(o => o.code == currShelve).shelve_id
                fetch(`http://localhost:3000/warehouse/items/shelve?shelve=${active_shelve}`)
                .then(async res => {
                    const resData = await res.json()

                    if (!res.ok) {
                        const error = {status: res.status, resData}
                        return Promise.reject(error)
                    }

                    resData.forEach(el => {
                        let barcode = el.ticket_id + "-" + el.name + "-" + el.category
                        this.allowedProducts.push(barcode)
                    })
                })
                .then(() => {
                    document.getElementById("addInput").disabled = false
                    document.getElementById("addInput").focus()
                })
                .catch(error => {
                    if (error.status == 404) {
                        return this.failNotify("Bierząca lokalizacja jest pusta")
                    }

                    return console.log(error)
                })
        }
    }
}
</script>
<template>
    <tr>
        <td></td>
        <td class="addInput">
            <input id="addInput" type="text" v-model="codeToAdd" v-on:keyup.enter="onAdd" @change="onChange" disabled/>
        </td>
        <td></td>
        <td></td>
        <td></td>
    </tr>    
</template>
<style>
    input#addInput {
        width: 100% !important;
    }

    td.addInput {
        padding: .2em 0;
    }

    input#addInput.fail:focus, input#addInput.fail {
        color: red;
        outline: none !important;
        border: 2px solid red;
        box-shadow: 0 0 10px #719ECE;
    }
</style>