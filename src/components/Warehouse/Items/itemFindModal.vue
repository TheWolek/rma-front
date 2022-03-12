<script>
    export default {
        data() {
            return {
                error_barcode_find: '',
                barcode_find: '',
                barcode_reg: /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/
            }
        },
        methods: {
            handleSubmit_find() {
                if (this.barcode_find == "") return this.displayError("podaj kod kreskowy")
                if (!this.barcode_reg.test(this.barcode_find)) return this.displayError("zły format kodu")

                fetch(`http://localhost:3000/warehouse/items?barcode=${this.barcode_find}`)
                .then(async res => {
                    this.emitter.emit("refreshing")
                    const resData = await res.json()

                    if (!res.ok) {
                        const error = (resData && resData.message) || res.status
                        return Promise.reject(error)
                    }

                    this.toggleModal_find()
                    this.error_barcode_find = ''

                    setTimeout(() => {
                        this.emitter.emit("findItem", {barcode: this.barcode_find, data: resData[0]})
                        this.barcode_find = ''
                        this.emitter.emit("refreshing")
                    }, 500)
                })
                .catch(error => {
                    return this.displayError(error)
                })


            },
            toggleModal_find() {
                document.getElementById("itemFindModalWrap").classList.toggle("active")
                this.error_barcode_find = ''
            },
            displayError(errMsg) {
                this.error_barcode_find = errMsg
                document.getElementById("error_barcode_find").style.opacity = 1
            },
            hideError() {
                document.getElementById("error_barcode_find").style.opacity = 0
                this.error_barcode_find = ''
            },
            onChange_find() {
                if (this.barcode_find == "") return this.displayError("podaj kod kreskowy")
                if (!this.barcode_reg.test(this.barcode_find)) {
                    return this.displayError("zły format kodu")
                } else {
                    return this.hideError()
                }
            }
        }
    }
</script>
<template>
    <div id="itemFindModalWrap" class="bigModal">
        <div class="formWrap">
            <div class="header">
                <div id="close" v-on:click="toggleModal_find"></div>
                <h4>Wyszukiwanie produktu po kodzie kreskowym</h4>
            </div>
            <form v-on:submit.prevent="handleSubmit_find">
                <label for="barcode_find">Kod kreskowy</label>
                <div>
                    <input type="text" id="barcode_find" v-model.lazy="barcode_find" @change="onChange_find"/>
                    <p id="error_barcode_find" class="error_modal_form">{{this.error_barcode_find}}</p>
                </div>
                <input type="submit" value="Szukaj">
            </form>
        </div>
    </div>
</template>
<style>
</style>