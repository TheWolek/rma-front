<script>
import addForm from "@/components/Warehouse/collectPackages/add/form.vue";

export default {
  components: { addForm },
};
</script>
<template>
  <div id="warehouseAddCollectPackages">
    <div class="warehouseAddCollectPackages_wrap">
      <h1>Dodawanie nowego odbioru</h1>
      <addForm />
    </div>
  </div>
</template>
<style>
#warehouseAddCollectPackages {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.warehouseAddCollectPackages_wrap {
  padding: 0.5em;
}
</style>
