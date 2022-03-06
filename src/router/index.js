import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import rma from '../views/rma.vue'
import warehouse from '../views/warehouse.vue'
import warehouseItems from '../views/warehouseItems.vue'
import warehouseShelves from '../views/warehouseShelves.vue'
import warehouseSpareparts from '../views/warehouseSpareparts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/rma',
      name: 'rma',
      component: rma
    },
    {
      path: '/warehouse',
      name: 'warehouse',
      component: warehouse,
      children: [{
        path: 'items',
        components: {
          default: warehouse,
          innerView: warehouseItems
        },
      },
      {
        path: 'shelves',
        components: {
          default: warehouse,
          innerView: warehouseShelves
        },
      },
      {
        path: 'spareparts',
        components: {
          default: warehouse,
          innerView: warehouseSpareparts
        },
      }
      ]
    },
  ]
})

export default router
