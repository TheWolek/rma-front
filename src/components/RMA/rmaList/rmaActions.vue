<script>
import store from "../../../store";

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    toggleFiltersModal() {
      store.commit("rma/toggleModal_filters", true);
    },
    toggleStatusModal() {},
    onRefresh() {},
  },
};
</script>
<template>
  <div class="actions">
    <div class="actionBtn" id="btn1" @click="toggleFiltersModal">
      <img src="@/assets/filters.svg" /> Filtry
    </div>
    <div class="actionBtn" id="btn2" @click="toggleStatusModal">
      <img src="@/assets/change.svg" /> Status
    </div>
    <div class="actionBtn refreshBtn" id="btn3" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
