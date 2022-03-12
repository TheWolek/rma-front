<script>
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
            document.getElementById("itemCreateModalWrap").classList.toggle("active")
        },
        async handleSubmit() {
            if (this.barcode == "") return this.displayError("podaj kod kreskowy")
            if (!this.barcode_reg.test(this.barcode)) return this.displayError("zły format kodu")

            const data = {
                "barcode": this.barcode
            }

            // console.log(JSON.stringify(data))

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

                console.log(resData)
                this.emitter.emit("addItem", {data, resData})
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
    }
}
</script>
<template>
    <div id="itemCreateModalWrap">
        <div class="formWrap">
            <div class="header">
                <div id="close" v-on:click="toggleModal"></div>
                <h4>Rejestracja nowego produktu</h4>
            </div>
            <form v-on:submit.prevent="handleSubmit">
                <label for="barcode">Kod kreskowy</label>
                <div>
                    <input type="text" id="barcode" v-model.lazy="barcode" @change="onChange"/>
                    <p id="error_barcode">{{this.error_barcode}}</p>
                </div>
                <input type="submit" value="Dodaj">
            </form>
        </div>
    </div>
</template>
<style>
    #error_barcode {
        opacity: 0;
        padding: 0;
        margin: 0;
        color: red;
        font-size: .9em;
    }

    #itemCreateModalWrap {
        position: absolute;
        width: 99%;
        height: 99%;
        z-index: 10;
        background: rgba(184, 184, 184, 0.8);
        display: none;
        justify-content: flex-end;
    }
    
    #itemCreateModalWrap.active {
        display: flex;
    }

    .header {
        width: 100%;
        display: flex;
        align-items: center;
        padding: .5em 0 0 .5em;
        gap: 1em;
    }

    h4 {
        font-size: 18px;
        color: var(--vt-c-black-mute)
    }

    .formWrap {
        background: #fff;
        width: 40%;
    }

    .formWrap #close {
        margin: 0;
        color: #000;
        font-size: 18px;
        width: 30px;
        height: 30px;
    }

    .formWrap #close:hover {
        cursor: pointer;
    }

    .formWrap #close::after {
        display: inline-block;
        content: "\00d7";
        font-size: 35px;
        transform: translateY(-28%) translateX(10%);
    }

    form {
        padding: 1em 2em;
        display: flex;
        flex-direction: column;
        width: 50%;
        gap: .5em;
    }

    form input {
        width: 70%;
        padding: .35em 0;
    }
    
    form label {
        color: var(--vt-c-black-mute)
    }

    form input[type="submit"] {
        margin-top: .3em;
        width: 40%;
    }
</style>