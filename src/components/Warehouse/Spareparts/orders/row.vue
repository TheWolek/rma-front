<script>
import { mapState } from "vuex";
import store from "../../../../store";
export default {
  props: ["data"],
  data() {
    return {
      activeMenu: false,
      expDate: new Date(this.data.expected_date).toLocaleDateString(),
      supplierData: {},
    };
  },
  computed: {
    ...mapState({
      suppliers: (state) => state.sparepartsOrders.suppliers,
      statuses: (state) => state.sparepartsOrders.statuses,
      activeContextMenu: (state) => state.sparepartsOrders.activeContextMenu,
    }),
    check() {
      if (this.activeContextMenu == this.data.part_order_id) {
        return (this.activeMenu = true);
      } else {
        return (this.activeMenu = false);
      }
    },
  },
  mounted() {
    this.supplierData = this.suppliers.find(
      (o) => o.id == this.data.supplier_id
    );
  },
  methods: {
    toggleMenu() {
      if (!this.activeMenu) {
        store.dispatch(
          "sparepartsOrders/setContextMenu",
          this.data.part_order_id
        );
      } else {
        store.dispatch("sparepartsOrders/closeContextMenu");
      }
    },
    changeStatus() {
      store.dispatch("sparepartsOrders/closeContextMenu");
      store.dispatch("sparepartsOrders/toggleEditModal", {
        ...this.data,
        mode: "status",
      });
    },
    edit() {
      store.dispatch("sparepartsOrders/closeContextMenu");
      store.dispatch("sparepartsOrders/toggleEditOrder", {
        ...this.data,
        open: true,
      });
    },
  },
};
</script>
<template>
  <tr :id="this.data.part_order_id">
    <td><input type="checkbox" :id="this.data.part_order_id" /></td>
    <td>{{ this.data.part_order_id }}</td>
    <td>{{ this.supplierData.name }}</td>
    <td>{{ this.expDate }}</td>
    <td>{{ this.statuses[this.data.status].name }}</td>
    <td class="actionCell">
      <div class="burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="menu" :class="{ active: this.check }">
        <ul>
          <li @click="changeStatus">Zmień status</li>
          <li @click="edit">Edytuj</li>
        </ul>
      </div>
    </td>
  </tr>
</template>
<style scoped>
.actionCell {
  padding-left: 0;
}
</style>
