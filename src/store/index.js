import { createStore } from "vuex";
import changeShelve from "./modules/Warehouse/changeShelve";
import items from "./modules/Warehouse/items";
import spareparts from "./modules/Warehouse/spareparts";
import sparepartsOrders from "./modules/Warehouse/sparepartsOrders";
import rmaMain from "./modules/RMA/rma";
import rmaList from "./modules/RMA/rmaList";
import rmaPage from "./modules/RMA/rmaPage";
import rmaWaybills from "./modules/RMA/rmaWaybills";
import rmaAccessories from "./modules/RMA/rmaAccessories";
import rmaDictionaries from "./modules/RMA/rmaDictionaries";

export default createStore({
  modules: {
    changeShelve,
    items,
    sparepartsOrders,
    spareparts,
    rmaMain,
    rmaList,
    rmaPage,
    rmaWaybills,
    rmaAccessories,
    rmaDictionaries,
  },
});
