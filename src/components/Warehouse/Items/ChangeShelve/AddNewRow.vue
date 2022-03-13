<script>
export default {
    data() {
        return {
            codeToAdd: '',
            reg: /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/,
            waitingForRes: false,
            allowedProducts: []
        }
    },
    mounted() {
        this.emitter.on("addingFail", () => {
            this.onFail()
        })
        this.emitter.on("addingSuccess", () => {
            this.codeToAdd = ''
            this.waitingForRes = false
        })
        this.emitter.on("active_shelve", (evData) => {
            let active_shelve = this.shelves.find(o => o.code == evData.active).shelve_id
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
        })
        this.emitter.on("clear_shelves", () => {
            document.getElementById("addInput").disabled = true
            document.getElementById("addInput").classList.remove("fail")
            this.codeToAdd = ''
            this.allowedProducts = []
        })
        this.emitter.on("changeShelve_success", () => {
            document.getElementById("addInput").disabled = true
            document.getElementById("addInput").classList.remove("fail")
            this.codeToAdd = ''
            this.allowedProducts = []
        })
    },
    methods: {
        onAdd() {
            if (!this.waitingForRes && this.codeToAdd != '') {
                this.waitingForRes = true
                if (!this.reg.test(this.codeToAdd)) return this.onFail()
                if (!this.allowedProducts.includes(this.codeToAdd)) return this.onFail()
                this.emitter.emit("itemAdded", this.codeToAdd)
            }
        },
        onChange() {
            if (!this.reg.test(this.codeToAdd)) return this.onFail();
            else this.clearFail()
        },
        onFail() {
            document.getElementById("addInput").classList.add("fail")
            this.waitingForRes = false
        },
        clearFail() {
            document.getElementById("addInput").classList.remove("fail")
        },
        failNotify(err) {
            document.getElementById("addInput").disabled = true
            this.emitter.emit("changeShelve_fail", err)
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