import { mapState } from "vuex";
import store from "../../../store";

import waitUntil from "../../../utils/waitUntil";
import { getUrl, items, itemsShelve } from "../../../helpers/endpoints";

export default {
  computed: {
    ...mapState({
      shelves: (state) => state.items.shelves,
    }),
  },
  methods: {
    handleSubmit_shelveFind(mode, code) {
      let shelve;
      this.emitter.emit("refreshing", true);
      if (mode === "url") {
        waitUntil("items.shelves", (storeShelves) => {
          shelve = storeShelves.find((o) => o.code == code);
          if (shelve === undefined) {
            this.emitter.emit("refreshing", false);
            return;
          }
          fetchItems(shelve.shelve_id);
        });
      } else {
        if (this.shelve_code == "")
          return this.displayError("podaj kod lokalizacji");
        if (!this.code_reg.test(this.shelve_code))
          return this.displayError("zły format kodu");

        shelve = this.shelves.find((o) => o.code == this.shelve_code);
        this.toggleModal_shelveFind();
        this.error_shelveCode = "";
        this.shelve_code = "";
        this.$router.push(
          { query: { shelve: shelve.code } },
          this.handleSubmit_shelveFind("url", shelve.code)
        );
        return;
      }

      const fetchItems = (id) => {
        fetch(`${getUrl(itemsShelve)}?shelve=${id}`)
          .then(async (res) => {
            const resData = await res.json();

            if (!res.ok) {
              this.emitter.emit("refreshing", false);
              const error = (resData && resData.message) || res.status;
              return Promise.reject(error);
            }

            setTimeout(() => {
              store.dispatch("items/submitModal_FindShelve", {
                shelve_code: shelve.code,
                data: resData,
              });
              this.emitter.emit("refreshing", false);
            }, 800);
          })
          .catch((error) => {
            return console.log(error);
          });
      };
    },
    handleSubmit_find(mode, code) {
      let barcode;
      if (mode === "url") {
        barcode = code;
      } else {
        if (this.barcode_find == "")
          return this.displayError("podaj kod kreskowy");
        if (!this.barcode_reg.test(this.barcode_find))
          return this.displayError("zły format kodu");
        this.toggleModal_find();
        this.error_barcode_find = "";
        this.$router.push({ query: { code: this.barcode_find } });
        this.handleSubmit_find("url", this.barcode_find);
        this.barcode_find = "";
        return;
      }
      fetch(`${getUrl(items)}?barcode=${barcode}`)
        .then(async (res) => {
          this.emitter.emit("refreshing", true);
          const resData = await res.json();
          if (!res.ok) {
            this.emitter.emit("refreshing", false);
            const error = (resData && resData.message) || res.status;
            return Promise.reject(error);
          }

          setTimeout(() => {
            store.dispatch("items/submitModal_Find", {
              ...resData[0],
              shelve_code: this.shelves[resData[0].shelve].code,
              barcode: barcode,
            });
            this.emitter.emit("refreshing", false);
          }, 500);
        })
        .catch((error) => {
          if (mode === "url") {
            console.log(error);
          } else {
            return this.displayError(error);
          }
        });
    },
  },
};
