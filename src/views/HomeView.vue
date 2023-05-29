<script>
import dateClock from "@/components/dateClock.vue";
import tilesLinks from "../components/tilesLinks.vue";
export default {
  data() {
    return {
      linkList: [
        {
          link: "/rma",
          label: "RMA",
        },
        {
          link: "/warehouse",
          label: "Magazyn",
        },
      ],
    };
  },
  components: { tilesLinks, dateClock },
};
</script>

<template>
  <main>
    <h1>System obsługi zgłoszeń serwisowych</h1>
    <dateClock />
    <tilesLinks :links="linkList" />
  </main>
</template>
<style scoped>
main {
  margin: 1em 5em;
}
h1 {
  color: var(--vt-c-black-mute);
}
</style>
