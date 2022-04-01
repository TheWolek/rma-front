<script>
import { mapState } from 'vuex'
import store from '../../../store'

export default {
    data() {
        return {
            shelve_code: '',
            error_shelveCode: '',
            code_reg: /^([A-Z]){1,}_([A-Z]){1,}_([0-9]){1,}$/
        }
    },
    methods: {
        toggleModal_shelveFind() {
            //document.getElementById("itemShelveFindModalWrap").classList.toggle("active")
            store.commit("items/toggleShelveFindModal")
            this.error_shelveCode = ''
        },
        displayError(errMsg) {
            this.error_shelveCode = errMsg
            document.getElementById("error_shelveCode").style.opacity = 1
        },
        hideError() {
            document.getElementById("error_shelveCode").style.opacity = 0
            this.error_shelveCode = ''
        },
        onChange_shelveCode() {
            if (this.shelve_code == "") return this.displayError("podaj kod lokalizacji")
            if (!this.code_reg.test(this.shelve_code)) {
                return this.displayError("zły format kodu")
            } else {
                return this.hideError()
            }
        },
        handleSubmit_shelveFind() {
            if (this.shelve_code == "") return this.displayError("podaj kod lokalizacji")
            if (!this.code_reg.test(this.shelve_code)) return this.displayError("zły format kodu")

            let shelve = this.shelves.find(o => o.code == this.shelve_code)
            fetch(`http://localhost:3000/warehouse/items/shelve?shelve=${shelve.shelve_id}`)
            .then(async res => {
                this.emitter.emit("refreshing", true)
                const resData = await res.json()

                if (!res.ok) {
                    this.emitter.emit("refreshing", false)
                    const error = (resData && resData.message) || res.status
                    return Promise.reject(error)
                }
                this.toggleModal_shelveFind()
                this.error_shelveCode = ''

                setTimeout(() => {
                    store.dispatch("items/submitModal_FindShelve", {shelve_code: this.shelve_code, data: resData})
                    this.error_shelveCode = ''
                    this.emitter.emit("refreshing", false)
                }, 800)
            })
            .catch(error => {
                return this.displayError(error)
            })
        }
    },
    computed: {
        ...mapState({
            itemShelveFindModal_Active: state => state.items.itemShelveFindModal_Active
        })
    }
}
</script>
<template>
    <div id="itemShelveFindModalWrap" class="bigModal" :class="{active: this.itemShelveFindModal_Active}">
        <div class="formWrap">
            <div class="header">
                <div id="close" v-on:click="toggleModal_shelveFind"></div>
                <h4>Wyszukiwanie produktów w lokalizacji</h4>
            </div>
            <form v-on:submit.prevent="handleSubmit_shelveFind">
                <label for="shelveCode">Kod lokalizacji</label>
                <div>
                    <input type="text" id="shelveCode" v-model.lazy="shelve_code" @change="onChange_shelveCode"/>
                    <p id="error_shelveCode" class="error_modal_form">{{this.error_shelveCode}}</p>
                </div>
                <input type="submit" value="Szukaj">
            </form>
        </div>
    </div>    
</template>
<style>
    
</style>