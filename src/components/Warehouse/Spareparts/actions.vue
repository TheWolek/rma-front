<script>
import { mapState } from "vuex";
import store from "../../../store";
import actionButton from "../../../parts/actionButton.vue";
import actionButtonRefresh from "../../../parts/actionButtonRefresh.vue";

export default {
  components: {
    actionButton,
    actionButtonRefresh,
  },
  computed: {
    ...mapState({
      loading: (state) => state.spareparts.refreshingTable,
      detailsPageActive: (state) => state.spareparts.partDetailsPageActive,
      detailsPageSnTableActive: (state) =>
        state.spareparts.partDetailsSnTableActive,
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
    isUsePartActive() {
      return !this.detailsPageSnTableActive;
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
        this.$router.go(-1);
        store.commit("spareparts/togglePartDetailsPageActive", false);
        store.commit("spareparts/togglePartDetailsSnTableActive", false);
      }
    },
    toggleSnModal() {
      store.commit("spareparts/toggleSnModal", true);
    },
    usePart() {
      if (!this.isUsePartActive) console.log("using");
    },
    changePartShelve() {
      if (this.detailsPageSnTableActive) {
        console.log("toggle change shelve modal with active item selected");
      } else {
        console.log("toggle change shelve modal");
      }
    },
  },
};
</script>
<template>
  <div class="actions">
    <actionButton
      :event="goBack"
      display="Cofnij"
      :icon="`back-arrow.png`"
      :disabled="this.isGoBackActive"
    />
    <actionButton
      :event="toggleFindModal"
      display="Szukaj"
      :icon="`search.svg`"
      :disabled="this.isSearchActive"
    />
    <actionButton
      :event="toggleSnModal"
      display="Kod kreskowy"
      :icon="`barcode.svg`"
      :disabled="false"
    />
    <actionButton
      :event="usePart"
      display="Użyj części"
      :icon="`gear.svg`"
      :disabled="this.isUsePartActive"
    />
    <actionButton
      :event="changePartShelve"
      display="Zmień lokalizacje"
      :icon="`shelve.svg`"
    />
    <actionButtonRefresh :event="onRefresh" :loading="this.loading" />
  </div>
</template>
