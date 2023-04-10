<script>
import store from "../../../store";
import actionButton from "../../../parts/actionButton.vue";
import actionButtonRefresh from "../../../parts/actionButtonRefresh.vue";

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    actionButton,
    actionButtonRefresh,
  },
  methods: {
    toggleFiltersModal() {
      store.commit("rma/toggleModal_filters", true);
    },
    toggleStatusModal() {},
    onRefresh() {
      store.dispatch("rma/fetchTicketsByFilters");
    },
  },
};
</script>
<template>
  <div class="actions">
    <actionButton
      :event="toggleFiltersModal"
      display="Filtry"
      :icon="`filters.svg`"
    />
    <actionButton
      :event="toggleStatusModal"
      display="Status"
      :icon="`change.svg`"
    />
    <actionButtonRefresh :event="onRefresh" :loading="this.loading" />
  </div>
</template>
