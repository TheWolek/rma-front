<script>
import { RouterView } from "vue-router";
import store from "../../store";

import rmaNav from "@/components/RMA/rmaNav.vue";
import dateClock from "../../components/dateClock.vue";
import tilesLinks from "../../components/tilesLinks.vue";
import rmaFindInput from "../../components/RMA/rmaFindInput.vue";

export default {
  data() {
    return {
      linkList: [
        {
          link: "/rma/add",
          label: "Dodaj nowe zgłoszenie",
        },
        {
          link: "/rma/items",
          label: "Otwarte zgłoszenia",
        },
      ],
    };
  },
  components: { rmaNav, dateClock, tilesLinks, rmaFindInput },
  mounted() {
    store.dispatch("rmaDictionaries/fetchDictionary", "statusesTypes");
  },
  computed: {
    isDefaultView() {
      return this.$route.name === "rma";
    },
  },
};
</script>
<template>
  <div id="rma">
    <rmaNav />
    <div class="dashboard" v-if="isDefaultView">
      <h1>System obsługi zgłoszeń serwisowych - Moduł RMA</h1>
      <dateClock />
      <rmaFindInput />
      <tilesLinks :links="linkList" />
    </div>
    <RouterView name="innerView" v-if="!isDefaultView" />
  </div>
</template>

<style>
#rma {
  display: grid;
  grid-template-columns: 10% 1fr;
  overflow: hidden;
  height: calc(100vh - 5vh);
  overflow-y: scroll;
}
.dashboard {
  margin: 1em;
}

#rma h1 {
  font-size: 1.15em;
  color: var(--vt-c-black-mute);
  margin-bottom: 0.3em;
  font-weight: 500;
}
.dashboard h1 {
  font-size: 1.3em;
  margin: 0;
  font-weight: normal !important;
}
</style>
