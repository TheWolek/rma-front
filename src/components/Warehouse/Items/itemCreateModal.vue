<script>
import { mapState } from 'vuex'
import store from '../../../store'

export default {
    data() {
        return {
            barcode: '',
            error_barcode: '',
            barcode_reg: /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/
        }
    },
    methods: {
        toggleModal() {
            store.commit("items/toggleCreateModal")
            this.error_barcode = ''
        },
        handleSubmit() {
            if (this.barcode == "") return this.displayError("podaj kod kreskowy")
            if (!this.barcode_reg.test(this.barcode)) return this.displayError("zły format kodu")

            const data = {
                "barcode": this.barcode
            }

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };

            fetch("http://localhost:3000/warehouse/items", requestOptions)
            .then(async res => {
                const resData = await res.json()
                
                if (!res.ok) {
                    const error = (resData && resData.message) || res.status
                    return Promise.reject(error)
                }

                let item = {
                    id: resData.id,
                    ticket_id: resData.ticket_id,
                    name: data.barcode.split("-")[1],
                    category: data.barcode.split("-")[2],
                    shelve_code: this.shelves[resData.shelve].code,
                    shelve: resData.shelve,
                    barcode: data.barcode
                }

                store.dispatch("items/submitModal_Create", item)
                this.error_barcode = ""
                this.barcode = ""
                this.toggleModal()
            })
            .catch(error => {
                return this.displayError(error)
            })
            
        },
        displayError(errMsg) {
            this.error_barcode = errMsg
            document.getElementById("error_barcode").style.opacity = 1
        },
        hideError() {
            document.getElementById("error_barcode").style.opacity = 0
            this.error_barcode = ""
        },
        onChange() {
            if (this.barcode == "") return this.displayError("podaj kod kreskowy")
            if (!this.barcode_reg.test(this.barcode)) {
                return this.displayError("zły format kodu")
            } else {
                return this.hideError()
            }
        }
    },
    computed: {
        ...mapState({
            createModal_Active: state => state.items.createModal_Active
        })
    }
}
</script>
<template>
    <div id="itemCreateModalWrap" class="bigModal" :class="{active: this.createModal_Active}">
        <div class="formWrap">
            <div class="header">
                <div id="close" v-on:click="toggleModal"></div>
                <h4>Rejestracja nowego produktu</h4>
            </div>
            <form v-on:submit.prevent="handleSubmit">
                <label for="barcode">Kod kreskowy</label>
                <div>
                    <input type="text" id="barcode" v-model.lazy="barcode" @change="onChange"/>
                    <p id="error_barcode" class="error_modal_form">{{this.error_barcode}}</p>
                </div>
                <input type="submit" value="Dodaj">
            </form>
        </div>
    </div>
</template>
<style>
</style>