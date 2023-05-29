<script>
import store from "../../../store";
import formatDate from "../../../utils/formatDate";

export default {
  props: {
    data: { type: Object, required: true },
    withEdit: { required: false, default: false },
  },
  computed: {
    getCreatedDate() {
      return formatDate(this.data.created);
    },
    getLastUpdateDate() {
      if (this.data.lastUpdate === null) return "--";
      return formatDate(this.data.lastUpdate);
    },
  },
  methods: {
    openEditModal(id) {
      store.commit("rmaWaybills/setEditWaybillModalData", this.data);
      store.commit("rmaWaybills/toggleModal_editWaybill", true);
    },
  },
};
</script>
<template>
  <tr>
    <td>{{ data.waybill_number }}</td>
    <td>{{ data.status }}</td>
    <td>{{ data.type }}</td>
    <td>{{ getCreatedDate }}</td>
    <td>{{ getLastUpdateDate }}</td>
    <td v-if="withEdit">
      <img src="@/assets/edit.svg" @click="() => this.openEditModal(data.id)" />
    </td>
  </tr>
</template>
<style scoped>
img {
  width: 20px;
  cursor: pointer;
}
</style>
