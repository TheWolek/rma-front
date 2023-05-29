<script>
import warehouseNav from "@/components/Warehouse/warehouseNav.vue";
import { RouterView } from "vue-router";
import TilesLinks from "../../components/tilesLinks.vue";
import dateClock from "../../components/dateClock.vue";

export default {
  data() {
    return {
      linkList: [
        {
          link: "/warehouse/items",
          label: "Zarejestrowane produkty",
        },
        {
          link: "/warehouse/items/changeshelve",
          label: "Zmiana lokalizacji",
        },
        {
          link: "/warehouse/spareparts/orders",
          label: "Dostawy części",
        },
        {
          link: "/warehouse/spareparts",
          label: "Zarejestrowane części",
        },
      ],
    };
  },
  components: { TilesLinks, dateClock, warehouseNav },
  computed: {
    isDefaultView() {
      return this.$route.name === "warehouse";
    },
  },
};
</script>
<template>
  <div id="warehouse">
    <warehouseNav />
    <div class="dashboard" v-if="isDefaultView">
      <h1>System obsługi zgłoszeń serwisowych - Moduł Magazynu</h1>
      <dateClock />
      <TilesLinks :links="linkList" />
    </div>
    <RouterView name="innerView" v-if="!isDefaultView" />
  </div>
</template>

<style>
#warehouse {
  display: grid;
  grid-template-columns: 10% 1fr;
  overflow: hidden;
  height: calc(100vh - 5vh);
}
#warehouse h1 {
  font-size: 1.15em;
  color: var(--vt-c-black-mute);
  margin-bottom: 0.3em;
  font-weight: 500;
}
</style>
