<script>
export default {
    data() {
        return {
            active_code: '',
            error_active_code: '',
            new_code: '',
            error_new_code: '',
            code_reg: /^([A-Z]){1,}_([A-Z]){1,}_([0-9]){1,}$/
        }
    },
    methods: {
        toggleModal() {
            document.getElementById("changeShelveModalWrap").classList.toggle("active")
        },
        displayError(errMsg, context) {
            if (context == "active_code") this.error_active_code = errMsg
            if (context == "new_code") this.error_new_code = errMsg
            document.getElementById("error_" + context).style.opacity = 1
        },
        hideError(context) {
            document.getElementById("error_active_code").style.opacity = 0
            this.error_active_code = ''
        },
        active_onChange() {
            if (this.active_code == '') return this.displayError("podaj kod lokalizacji", "active_code")
            if (!this.code_reg.test(this.active_code)) {
                return this.displayError("zły format kodu", "active_code")
            } else {
                return this.hideError("active_code")
            }
        },
        new_onChange() {
            if (this.new_code == '') return this.displayError("podaj kod lokalizacji", "new_code")
            if (!this.code_reg.test(this.new_code)) {
                return this.displayError("zły format kodu", "new_code")
            } else {
                return this.hideError("new_code")
            }
        },
        handleSubmit() {
            if (this.active_code == "") return this.displayError("podaj kod lokalizacji", "active_code")
            if (!this.code_reg.test(this.active_code)) return this.displayError("zły format kodu", "active_code")

            if (this.new_code == "") return this.displayError("podaj kod lokalizacji", "new_code")
            if (!this.code_reg.test(this.new_code)) return this.displayError("zły format kodu", "new_code")

            let acive_find = this.shelves.find(o => o.code == this.active_code)
            let new_find = this.shelves.find(o => o.code == this.new_code)
            if(acive_find == undefined) return this.displayError("podana lokalizacja nie istnieje", "active_code")
            if(new_find == undefined) return this.displayError("podana lokalizacja nie istnieje", "new_code")
            if(this.active_code == this.new_code) return this.displayError("nowa lokalizacja nie może być identyczna jak obecna", "new_code")
            
            this.emitter.emit("active_shelve", {active: this.active_code, new: this.new_code})
            this.toggleModal()
            this.active_code = ''
            this.error_active_code = ''
            this.new_code = ''
            this.error_new_code = ''
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
                    <input type="text" id="active_code" v-model.lazy="active_code" @change="active_onChange"/>
                    <p id="error_active_code" class="error_modal_form">{{this.error_active_code}}</p>
                </div>
                <label for="new_code">Kod nowej lokalizacji</label>
                <div>
                    <input type="text" id="new_code" v-model.lazy="new_code" @change="new_onChange"/>
                    <p id="error_new_code" class="error_modal_form">{{this.error_new_code}}</p>
                </div>
                <input type="submit" value="Dodaj">
            </form>
        </div>
    </div>
</template>
<style></style>