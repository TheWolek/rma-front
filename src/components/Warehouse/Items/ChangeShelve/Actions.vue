<script>
import { mapState } from "vuex";
import store from "../../../../store";

export default {
  methods: {
    toggleChangeModal() {
      if (!this.form_active.status) store.commit("changeShelve/toggleModal");
    },
    clearForm() {
      store.dispatch("changeShelve/clearData");
    },
    submit() {
      if (!this.fail) {
        let itemsArr = this.items.map((el) => {
          return el.barcode;
        });
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            barcodes: itemsArr,
            new_shelve: this.shelves.find((o) => o.code == this.form_active.new)
              .shelve_id,
            shelve: this.shelves.find((o) => o.code == this.form_active.active)
              .shelve_id,
          }),
        };

        fetch(
          "http://localhost:3000/warehouse/items/changeshelve",
          requestOptions
        )
          .then(async (res) => {
            const resData = await res.json();

            if (!res.ok) {
              const error = (resData && resData.message) || res.status;
              return Promise.reject(error);
            }

            store.dispatch("changeShelve/displayNotifi", {
              mode: 0,
              status: true,
              message: "Produkty zostały pomyślnie przeniesione",
            });
          })
          .catch((error) => {
            return this.displayError(error);
          });
      }
    },
    displayError(error) {
      store.dispatch("changeShelve/displayNotifi", {
        status: true,
        msg: error,
        mode: 1,
      });
      store.commit("changeShelve/toggleAbleToSubmit", false); //disable submit btn
    },
    clearNotification() {
      setTimeout(() => {
        store.commit("changeShelve/clearMsg"); //clear response
      }, 4500);
    },
    disMissNotification() {
      setTimeout(() => {
        store.commit("changeShelve/clearMsg"); //clear response
      }, 500);
    },
  },
  computed: {
    ...mapState({
      form_active: (state) => state.changeShelve.form_active,
      ableToSubmit: (state) => state.changeShelve.ableToSubmit,
      items: (state) => state.changeShelve.items,
      fail: (state) => state.changeShelve.fail,
      notification: (state) => state.changeShelve.notification,
      shelves: (state) => state.items.shelves,
    }),
    newBtnVisible() {
      return {
        disabled: this.form_active.status, //new btn visible only when shelves were set
      };
    },
    CancelBtnVisible() {
      // this.form_active.status = true = enable
      // this.form_active.status = false = disable
      // this.form_active.status = true && this.fail = true = enable
      return {
        disabled: !this.form_active.status,
      };
    },
    SubmitBtnVisible() {
      return {
        disabled: !this.ableToSubmit || this.fail, //submit btn visible only when is ready to submit and no error
      };
    },
    notificationVisible() {
      return {
        active: this.notification.active, //show/hide
        succ: this.notification.mode == 0, //success=green color
        fail: this.notification.mode == 1, //fail=red color
      };
    },
  },
};
</script>
<template>
  <div class="actions">
    <div
      class="actionBtn"
      id="btn1"
      @click="toggleChangeModal"
      :class="newBtnVisible"
    >
      <img src="@/assets/add.svg" class="addImg" /> Nowy
    </div>
    <div
      class="actionBtn"
      id="btn2"
      @click="clearForm"
      :class="CancelBtnVisible"
    >
      <img src="@/assets/cancel.svg" /> Anuluj
    </div>
    <div class="actionBtn" id="btn3" @click="submit" :class="SubmitBtnVisible">
      <img src="@/assets/gear.svg" />Przetwarzaj
    </div>
    <div id="changeShelveResponse-msg" :class="notificationVisible">
      {{ notification.message
      }}<span id="close_notifi" @click="disMissNotification"></span>
    </div>
  </div>
</template>
<style scoped>
#changeShelveResponse-msg {
  font-size: 1em;
  padding: 0 0.5em 0 1em;
  border-radius: 5px;
  opacity: 0;
  transition: 0.2s ease-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5em;
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
