<script>
export default {
    data() {
        return {
            codeToAdd: '',
            reg: /^(\d{1,})-([A-ż(),. 0-9]{1,})-([A-z(),. 0-9]{1,})$/,
            waitingForRes: false
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
    },
    methods: {
        onAdd() {
            if (!this.waitingForRes) {
                this.waitingForRes = true
                if (!this.reg.test(this.codeToAdd)) return this.onFail()
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
        }
    }
}
</script>
<template>
    <tr>
        <td>
            <input id="addInput" type="text" v-model="codeToAdd" v-on:keyup.enter="onAdd" @change="onChange"/>
        </td>
        <td></td>
        <td></td>
        <td></td>
    </tr>    
</template>
<style>
    input#addInput {
        width: 99% !important;
    }

    input#addInput.fail:focus, input#addInput.fail {
        color: red;
        outline: none !important;
        border: 2px solid red;
        box-shadow: 0 0 10px #719ECE;
    }
</style>