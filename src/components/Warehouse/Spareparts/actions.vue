<script>
import { mapState } from "vuex";
import store from "../../../store";
export default {
  computed: {
    ...mapState({
      parts: (state) => state.spareparts.parts,
      loading: (state) => state.spareparts.refreshingTable,
    }),
  },
  methods: {
    toggleFindModal() {
      store.commit("spareparts/toggleFindModal");
    },
    onRefresh() {
      store.dispatch("spareparts/fetchPartsByFilters");
    },
  },
};
</script>
<template>
  <div class="actions">
    <div
      class="actionBtn"
      @click="toggleFindModal"
      :class="{ disabled: false }"
    >
      <img src="@/assets/search.svg" class="searchImg" /> Szukaj
    </div>
    <div class="actionBtn refreshBtn" id="btn5" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
