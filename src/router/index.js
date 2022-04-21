import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import rma from "../views/rma.vue";
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
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/rma",
      name: "rma",
      component: rma,
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
          components: {
            default: warehouse,
            innerView: warehouseSparepartsStock,
          },
        },
      ],
    },
  ],
});

export default router;
