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
            this.clearNotification("succ")
        })
        this.emitter.on("changeShelve_fail", (evData) => {
            document.getElementById("btn2").classList.remove("disabled")
            document.getElementById("btn3").classList.add("disabled")
            this.response_msg = evData
            document.getElementById("changeShelveResponse-msg").classList.add("active")
            document.getElementById("changeShelveResponse-msg").classList.add("fail")
            this.clearNotification("fail")
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
        clearNotification(className) {
            setTimeout(() => {
                document.getElementById("changeShelveResponse-msg").classList.remove("active")
            }, 4000)

            setTimeout(() => {
                this.response_msg = ''
                document.getElementById("changeShelveResponse-msg").classList.remove(className)
            }, 4500)
        },
        disMissNotification() {
            document.getElementById("changeShelveResponse-msg").classList.remove("active")

            setTimeout(() => {
                this.response_msg = ''
                document.getElementById("changeShelveResponse-msg").classList.remove("succ")
                document.getElementById("changeShelveResponse-msg").classList.remove("fail")
            }, 500)
        }
    }
}
</script>
<template>
    <div class="actions">
        <div class="actionBtn" id="btn1" @click="toggleChangeModal"> + Nowy</div>
        <div class="actionBtn disabled" id="btn2" @click="clearForm">Anuluj</div>
        <div class="actionBtn disabled" id="btn3" @click="submit">Przetwarzaj</div>
        <div id="changeShelveResponse-msg">{{response_msg}}<span id="close_notifi" @click="disMissNotification"></span></div>
    </div> 
</template>
<style>
    .actions {
        padding: .5em;
        display: flex;
        gap: 1em;
        border-bottom: 2px solid rgb(25, 103, 175);
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
        font-size: 1em;
        padding: 0 .5em 0 1em;
        border-radius: 5px;
        opacity: 0;
        transition: .2s ease-out;
        cursor:pointer;
        display: flex;
        align-items: center;
        gap: .5em;
    }

    #changeShelveResponse-msg.succ {
        border: 1px solid rgba(36, 241, 6, 0.46);
        background-color: rgba(7, 149, 66, 0.2);
        box-shadow: 0px 0px 2px #259c08;
        color: #0a8108;
    }

    #changeShelveResponse-msg.succ:hover {
        background: rgba(7, 149, 66, 0.35);
        color: #0b7007;
    }

    #changeShelveResponse-msg.fail {
        border: 1px solid rgba(241, 6, 6, 0.81);
        background: rgba(220, 17, 1, 0.16);
        box-shadow: 0px 0px 2px #ff0303;
        color: #ff0303;
    }

    #changeShelveResponse-msg.fail:hover {
        background: rgba(220, 17, 1, 0.33);
        color: #ee0202;
    }

    #changeShelveResponse-msg.active {
        opacity: 1;
    }

    #changeShelveResponse-msg.active #close_notifi::after {
        opacity: 1;
    }

    #changeShelveResponse-msg #close_notifi {
        height: 25px;
    }

    #changeShelveResponse-msg #close_notifi::after {
        display: inline-block;
        content: "\00d7";
        font-size: 25px;
        transform: translateY(-25%);
        opacity: 0;
    }
</style>