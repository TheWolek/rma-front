<script>
import { mapState } from "vuex";
import store from "../../../store";
export default {
  computed: {
    ...mapState({
      parts: (state) => state.spareparts.parts,
      loading: (state) => state.spareparts.refreshingTable,
      detailsPageActive: (state) => state.spareparts.partDetailsPageActive,
    }),
    isGoBackActive() {
      return !this.detailsPageActive;
    },
    isSearchActive() {
      return this.detailsPageActive;
    },
    isRefreshActive() {
      return this.detailsPageActive;
    },
  },
  methods: {
    toggleFindModal() {
      if (!this.isSearchActive) {
        store.commit("spareparts/toggleFindModal");
      }
    },
    onRefresh() {
      if (!this.isRefreshActive) {
        store.dispatch("spareparts/fetchPartsByFilters");
      }
    },
    goBack() {
      if (!this.isGoBackActive) {
        store.commit("spareparts/togglePartDetailsPageActive", false);
      }
    },
  },
};
</script>
<template>
  <div class="actions">
    <div
      class="actionBtn"
      @click="goBack"
      :class="{ disabled: this.isGoBackActive }"
    >
      <img src="@/assets/back-arrow.png" class="searchImg" /> Cofnij
    </div>
    <div
      class="actionBtn"
      @click="toggleFindModal"
      :class="{ disabled: this.isSearchActive }"
    >
      <img src="@/assets/search.svg" class="searchImg" /> Szukaj
    </div>
    <div class="actionBtn refreshBtn" id="btn5" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
