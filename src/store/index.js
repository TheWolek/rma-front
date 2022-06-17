import { createStore } from "vuex";
import changeShelve from "./modules/changeShelve";
import items from "./modules/items";
import spareparts from "./modules/spareparts";
import sparepartsOrders from "./modules/sparepartsOrders";

export default createStore({
  modules: {
    changeShelve,
    items,
    sparepartsOrders,
    spareparts,
  },
});
