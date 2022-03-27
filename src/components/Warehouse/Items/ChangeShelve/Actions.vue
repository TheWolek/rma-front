<script>
import { mapState } from 'vuex'
import store from "../../../../store"

export default {
    data() {
        return {
            active_shelve: false, //flag: shelves were added, ready to take input
            //response_msg: '', //message to display in notification
            //fail: false, //flag: something went wrong on form submit, block submitting, allow canceling
            // submitted: false, //flag: form has been submited, waiting for results
            // ableToSubmit: false, //flag: allow the submit button, more than 1 item has been added
            notify_active: false //flag: notifiaction box is visible
        }
    },
    mounted() {
        // this.emitter.on("active_shelve", () => {})
        this.emitter.on("changeShelve_success", () => {
            this.active_shelve = false //enable new btn and disable cancel btn
            // this.submitted = false 
            // this.ableToSubmit = false //disable submit btn
            //this.response_msg = "produkty zostały pomyślnie przeniesione" //set response
            this.notify_active = true //active notify
            this.clearNotification("succ") //queue the notification clear
        })
        // this.emitter.on("changeShelve_fail", (evData) => {
        //     this.fail = true //disable submit btn
        //     // this.submitted = false
        //     // this.ableToSubmit = false //disable submit btn
        //     this.response_msg = evData //set response
        //     this.notify_active = true //active notify
        //     this.clearNotification("fail") //queue the notification clear
        // })
        this.emitter.on("changeShelve_ableToSubmit", (state) => {
            // this.ableToSubmit = state //enable/disable submit btn
        })

        if (this.form_active.status) {
            this.active_shelve = true
        }
    },
    methods: {
        toggleChangeModal() {
            // if(!this.active_shelve) this.emitter.emit("changeShelve_modal_toggle")
            if(!this.active_shelve) store.commit("toggleModal")
        },
        clearForm() {
            store.dispatch("clearData")
            // this.emitter.emit("clear_shelves")
            // this.active_shelve = false //enable new btn, disable cancel btn
            // this.fail = false //disable cancel btn
            // this.submitted = false
        },
        submit() {
            if (!this.fail) {
                // this.submitted = true
                // this.emitter.emit("changeShelve_process")

                let itemsArr = this.items.map(el => {
                    return el.barcode
                })
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        barcodes: itemsArr,
                        new_shelve: this.shelves.find(o => o.code == this.form_active.new).shelve_id,
                        shelve: this.shelves.find(o => o.code == this.form_active.active).shelve_id
                    })
                }

                fetch("http://localhost:3000/warehouse/items/changeshelve", requestOptions)
                .then(async res => {
                    const resData = await res.json()
                    
                    if (!res.ok) {
                        const error = (resData && resData.message) || res.status
                        return Promise.reject(error)
                    }

                    store.dispatch("displayNotifi", {
                        mode: 0,
                        status: true,
                        message: "Produkty zostały pomyślnie przeniesione"
                    })
                    // this.activeShelve = ''
                    // this.newShelve = ''
                    // this.items = []
                    // this.emitter.emit("changeShelve_success")
                })
                .catch(error => {
                    return this.displayError(error)
                })
            }
        },
        displayError(error) {
            store.dispatch("displayNotifi", {status: true, msg: error, mode: 1})
            // this.submitted = false
            store.commit("toggleAbleToSubmit", false) //disable submit btn
            //this.response_msg = error //set response
            //this.notify_active = true //active notify
            this.clearNotification() //queue the notification clear
        },
        clearNotification() {
            // setTimeout(() => {
            //     this.notify_active = false //hide notify
            // }, 4000)

            setTimeout(() => {
                store.commit("clearMsg") //clear response
            }, 4500)
        },
        disMissNotification() {
            //this.notify_active = false //hide notify
            setTimeout(() => {
                store.commit("clearMsg") //clear response
            }, 500)
        }
    },
    computed: {
        ...mapState({
            form_active: state => state.changeShelve.form_active,
            ableToSubmit: state => state.changeShelve.ableToSubmit,
            items: state => state.changeShelve.items,
            fail: state => state.changeShelve.fail,
            notification: state => state.changeShelve.notification
        }),
        newBtnVisible() {
            return {
                disabled: this.active_shelve //new btn visible only when shelves were set
            }
        },
        CancelBtnVisible() {
            // this.active_shelve = true = enable
            // this.active_shelve = false = disable
            // this.active_shelve = true && this.fail = true = enable
            return {
                disabled: !this.active_shelve
            }
        },
        SubmitBtnVisible() {
            return {
                disabled: !this.ableToSubmit || this.fail //submit btn visible only when is ready to submit and no error 
            }
        },
        notificationVisible() {
            return {
                active: this.notification.active, //show/hide
                succ: this.notification.mode == 0, //success=green color
                fail: this.notification.mode == 1 //fail=red color
            }
        }
    },
    watch: {
        form_active(status) {
            if (status.status) {
                this.active_shelve = true
            } else {
                this.active_shelve = false
            }
        }
    }
}
</script>
<template>
    <div class="actions">
        <div class="actionBtn" id="btn1" @click="toggleChangeModal" :class="newBtnVisible"> + Nowy</div>
        <div class="actionBtn" id="btn2" @click="clearForm" :class="CancelBtnVisible">Anuluj</div>
        <div class="actionBtn" id="btn3" @click="submit" :class="SubmitBtnVisible">Przetwarzaj</div>
        <div id="changeShelveResponse-msg" :class="notificationVisible">{{notification.message}}<span id="close_notifi" @click="disMissNotification"></span></div>
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