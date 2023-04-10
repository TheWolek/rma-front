<script setup>
import rmaNav from "@/components/RMA/rmaNav.vue";
import { RouterView } from "vue-router";
import store from "../../store";
store.dispatch("rma/fetchAllStatuses");
</script>
<template>
  <div id="rma">
    <rmaNav />
    <RouterView name="innerView" />
  </div>
</template>

<style>
#rma {
  display: grid;
  grid-template-columns: 10% 1fr;
  overflow: hidden;
  height: calc(100vh - 5vh);
}
#rma h1 {
  font-size: 1.15em;
  color: var(--vt-c-black-mute);
  margin-bottom: 0.3em;
  font-weight: 500;
}
</style>
