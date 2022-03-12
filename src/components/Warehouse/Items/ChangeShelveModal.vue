<script>
export default {
    data() {
        return {
            active_code: '',
            error_active_code: '',
            code_reg: /^([A-Z]){1,}_([A-Z]){1,}_([0-9]){1,}$/
        }
    },
    methods: {
        toggleModal() {
            document.getElementById("changeShelveModalWrap").classList.toggle("active")
        },
        displayError(errMsg) {
            this.error_active_code = errMsg
            document.getElementById("error_active_code").style.opacity = 1
        },
        hideError() {
            document.getElementById("error_active_code").style.opacity = 0
            this.error_active_code = ''
        },
        onChange() {
            if (this.active_code == '') return this.displayError("podaj kod lokalizacji")
            if (!this.code_reg.test(this.active_code)) {
                return this.displayError("zły format kodu")
            } else {
                return this.hideError()
            }
        },
        handleSubmit() {
            if (this.active_code == "") return this.displayError("podaj kod lokalizacji")
            if (!this.code_reg.test(this.active_code)) return this.displayError("zły format kodu")
            this.emitter.emit("active_shelve", this.active_code)
            this.toggleModal()
            this.active_code = ''
            this.error_active_code = ''
        }
    }
}
</script>
<template>
    <div id="changeShelveModalWrap" class="bigModal">
        <div class="formWrap">
            <div class="header">
                <div id="close" v-on:click="toggleModal"></div>
                <h4>Zmiana lokalizacji produktu</h4>
            </div>
            <form v-on:submit.prevent="handleSubmit">
                <label for="active_code">Kod bierzącej lokalizacji</label>
                <div>
                    <input type="text" id="active_code" v-model.lazy="active_code" @change="onChange"/>
                    <p id="error_active_code" class="error_modal_form">{{this.error_active_code}}</p>
                </div>
                <input type="submit" value="Dodaj">
            </form>
        </div>
    </div>
</template>
<style></style>