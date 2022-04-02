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
                if (!this.reg.test(this.codeToAdd)) return this.onFail("niepoprawny format")
                if (!this.allowedProducts.includes(this.codeToAdd)) return this.onFail("brak produktu")
                if (this.codeAlreadyEntered(this.codeToAdd)) return this.onFail("kod już wprowadzony")
                store.dispatch("changeShelve/addItem", {
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
            if (!this.reg.test(this.codeToAdd)) return this.onFail("niepoprawny format");
            else this.clearFail()
        },
        onFail(error) {
            document.getElementById("addInput").classList.add("fail")
            document.querySelector(".addInput").setAttribute("data-after", error)
            document.documentElement.style.setProperty("--changeShelve-input-error-opacity", 1)
        },
        clearFail() {
            document.getElementById("addInput").classList.remove("fail")
            document.querySelector(".addInput").setAttribute("data-after", "")
            document.documentElement.style.setProperty("--changeShelve-input-error-opacity", 0)
        },
        failNotify(err) {
            document.getElementById("addInput").disabled = true
            store.dispatch("changeShelve/displayNotifi", {status: false, msg: err, mode: 1})
        },
        clear() {
            document.getElementById("addInput").disabled = true
            document.getElementById("addInput").classList.remove("fail")
            document.querySelector(".addInput").setAttribute("data-after", "")
            document.documentElement.style.setProperty("--changeShelve-input-error-opacity", 0)
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
        <td class="addInput" data-after="">
            <input id="addInput" type="text" 
            v-model="codeToAdd" 
            v-on:keyup.enter="onAdd" 
            @change="onChange" 
            disabled/>
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
        position: relative;
    }

    input#addInput.fail:focus, input#addInput.fail {
        color: red;
        outline: none !important;
        border: 2px solid red;
        box-shadow: 0 0 10px #719ECE;
    }

    td.addInput::after {
        content: attr(data-after);
        display: block;
        height: 25px;
        background: rgb(235, 97, 88);
        position: absolute;
        top: 2.5em;
        left: .3em;
        border-radius: 5px;
        border: 1px solid red;
        padding: 0 .4em;
        opacity: var(--changeShelve-input-error-opacity);
    }
</style>