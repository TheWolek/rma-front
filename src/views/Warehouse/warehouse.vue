<script setup>
import warehouseNav from "@/components/Warehouse/warehouseNav.vue";
import { RouterView } from "vue-router";
</script>
<template>
  <div id="warehouse">
    <warehouseNav />
    <RouterView name="innerView" />
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
