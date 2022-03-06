<script>
export default {
    data() {
        return {
            barcode: ''
        }
    },
    methods: {
        toggleModal() {
            document.getElementById("itemCreateModalWrap").classList.toggle("active")
        },
        async handleSubmit() {
            console.log(this.barcode)
            const reg = /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/
            if (!reg.test(this.barcode)) return console.log("zły format")

            const data = {
                "barcode": this.barcode
            }

            await fetch("http://localhost:3000/warehouse/items", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((res) => {console.log(res)})
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
                <input type="text" id="barcode" v-model.lazy="barcode"/>
                <input type="submit" value="Dodaj">
            </form>
        </div>
    </div>
</template>
<style>
    #itemCreateModalWrap {
        position: absolute;
        width: 99%;
        height: 99%;
        z-index: 10;
        background: rgba(184, 184, 184, 0.8);
        display: flex;
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
        width: 40%;
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
        margin-top: 1em;
    }
</style>