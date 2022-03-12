<script>
export default {
    data() {
        return {
            active_shelve: false,
            response_msg: ''
        }
    },
    mounted() {
        this.emitter.on("active_shelve", () => {
            document.getElementById("btn1").classList.add("disabled")
            document.getElementById("btn2").classList.remove("disabled")
            document.getElementById("btn3").classList.remove("disabled")
            this.active_shelve = true
        })
        this.emitter.on("changeShelve_success", () => {
            document.getElementById("btn1").classList.remove("disabled")
            document.getElementById("btn2").classList.add("disabled")
            document.getElementById("btn3").classList.add("disabled")
            this.active_shelve = false
            this.response_msg = "produkty zostały pomyślnie przeniesione"
            document.getElementById("changeShelveResponse-msg").classList.add("active")
            document.getElementById("changeShelveResponse-msg").classList.add("succ")
            this.ClearNotification("succ")
        })
        this.emitter.on("changeShelve_fail", (evData) => {
            document.getElementById("btn2").classList.remove("disabled")
            document.getElementById("btn3").classList.remove("disabled")
            this.response_msg = evData
            document.getElementById("changeShelveResponse-msg").classList.add("active")
            document.getElementById("changeShelveResponse-msg").classList.add("fail")
            this.ClearNotification("fail")
        })
    },
    methods: {
        toggleChangeModal() {
            if(!this.active_shelve) document.getElementById("changeShelveModalWrap").classList.toggle("active")
        },
        clearForm() {
            this.emitter.emit("clear_shelves")
            document.getElementById("btn1").classList.remove("disabled")
            document.getElementById("btn2").classList.add("disabled")
            document.getElementById("btn3").classList.add("disabled")
            this.active_shelve = false
        },
        submit() {
            this.emitter.emit("changeShelve_process")
            document.getElementById("btn2").classList.add("disabled")
            document.getElementById("btn3").classList.add("disabled")
        },
        ClearNotification(className) {
            setTimeout(() => {
                document.getElementById("changeShelveResponse-msg").classList.remove("active")
            }, 2000)

            setTimeout(() => {
                this.response_msg = ''
                document.getElementById("changeShelveResponse-msg").classList.remove(className)
            }, 2500)
        }
    }
}
</script>
<template>
    <div class="actions">
        <div class="actionBtn" id="btn1" @click="toggleChangeModal"> + Nowy</div>
        <div class="actionBtn disabled" id="btn2" @click="clearForm">Anuluj</div>
        <div class="actionBtn disabled" id="btn3" @click="submit">Przetwarzaj</div>
        <div id="changeShelveResponse-msg">{{response_msg}}</div>
    </div> 
</template>
<style>
    .actions {
        padding: .3em 0 .8em 0;
        display: flex;
        gap: 1em;
    }

    .actionBtn {
        background: rgb(205, 206, 207);
        color: var(--vt-c-black-mute);
        font-weight: bold;
        transition: background-color .2s ease-out;
        padding: .2em .5em;
        position: relative;
        display: flex;
    }

    .actionBtn:hover {
        cursor: pointer;
        background: rgb(195, 196, 197);
    }

    .actionBtn.disabled {
        color: #939393;
    }

    .actionBtn.disabled:hover {
        cursor: not-allowed;
    }

    #changeShelveResponse-msg {
        background: rgba(81, 192, 114, 0.9);
        color: #000;
        font-size: 1em;
        padding: 0 1em;
        border: 1px solid #000;
        border-radius: 7px;
        opacity: 0;
        transition: opacity .3s ease-out;
    }

    #changeShelveResponse-msg.succ {
        background: rgba(81, 192, 114, 0.9);
    }

    #changeShelveResponse-msg.fail {
        background: rgba(190, 75, 75, 0.9);
    }

    #changeShelveResponse-msg.active {
        opacity: 1;
    }
</style>