import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import rma from "../views/RMA/rma.vue";
import rmaList from "../views/RMA/rmaList.vue";
import rmaAdd from "../views/RMA/rmaAdd.vue";
import rmaPage from "../views/RMA/rmaPage.vue";
import dictionaries from "../views/RMA/dictionaries.vue";
import warehouse from "../views/Warehouse/warehouse.vue";
import warehouseItems from "../views/Warehouse/Items/Items.vue";
import warehouseShelves from "../views/Warehouse/Shelves/shelves.vue";
import warehouseSpareparts from "../views/Warehouse/Spareparts/spareparts.vue";
import warehouseItemsChangeShelve from "../views/Warehouse/Items/ChangeShelve.vue";
import warehouseSparepartsOrders from "../views/Warehouse/Spareparts/orders.vue";
import warehouseSparepartsStock from "../views/Warehouse/Spareparts/stock.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/rma",
      name: "rma",
      component: rma,
      children: [
        {
          path: "items",
          components: {
            default: rma,
            innerView: rmaList,
          },
        },
        {
          path: "add",
          components: {
            default: rma,
            innerView: rmaAdd,
          },
        },
        {
          name: "ticket",
          path: "ticket/:id",
          components: {
            default: rma,
            innerView: rmaPage,
          },
        },
        {
          name: "dictionary",
          path: "dictionary/:name",
          components: {
            default: rma,
            innerView: dictionaries,
          },
        },
      ],
    },
    {
      path: "/warehouse",
      name: "warehouse",
      component: warehouse,
      children: [
        {
          path: "items",
          components: {
            default: warehouse,
            innerView: warehouseItems,
          },
        },
        {
          path: "items/changeshelve",
          name: "itemsChangeShelve",
          components: {
            default: warehouse,
            innerView: warehouseItemsChangeShelve,
          },
          props: true,
        },
        {
          path: "shelves",
          components: {
            default: warehouse,
            innerView: warehouseShelves,
          },
        },
        {
          path: "spareparts",
          name: "spareparts",
          components: {
            default: warehouse,
            innerView: warehouseSpareparts,
          },
        },
        {
          path: "spareparts/orders",
          components: {
            default: warehouse,
            innerView: warehouseSparepartsOrders,
          },
        },
        {
          path: "spareparts/stock",
          name: "sparepartsDetails",
          components: {
            default: warehouse,
            innerView: warehouseSpareparts,
          },
        },
        {
          path: "spareparts/part",
          name: "sparepartsPartSn",
          components: {
            default: warehouse,
            innerView: warehouseSpareparts,
          },
        },
      ],
    },
  ],
});

export default router;
