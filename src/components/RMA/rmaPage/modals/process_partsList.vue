<script>
export default {
  props: ["parts"],
};
</script>
<template>
  <div class="partsWrap">
    <h3 v-if="parts.length > 0">Użyte części zamienne:</h3>
    <div v-for="p in parts" :id="p.id" class="partBox">
      <h3>{{ p.category }}</h3>
      <h3>{{ p.producer }} {{ p.name }}</h3>
      <h3>SN: {{ p.sparepart_sn }}</h3>
    </div>
  </div>
</template>
<style scoped>
.partsWrap {
  padding: 0 0.5em;
}
.partBox {
  padding: 0.5em;
  border: 1px solid #000;
}
</style>
