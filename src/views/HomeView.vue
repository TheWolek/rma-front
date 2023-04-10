<script setup>
import homePageDate from "@/components/homePageDate.vue";
</script>

<template>
  <main>
    <h1>System obsługi zgłoszeń RMA</h1>
    <homePageDate />
    <div class="homePageLinks">
      <h1 class="underline">Wybierz, co chcesz robić</h1>
      <div class="tilesRow">
        <div class="tile">
          <RouterLink to="/rma" class="tileLink">RMA</RouterLink>
        </div>
        <div class="tile">
          <RouterLink to="/warehouse" class="tileLink">Magazyn</RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  margin: 1em 5em;
}
h1 {
  color: var(--vt-c-black-mute);
}
h1.underline {
  padding-bottom: 0.3em;
  padding-left: 2em;
  border-bottom: 1px solid #000;
}
.homePageLinks {
  margin-top: 0.5em;
  width: 100%;
  padding: 1em;
  background-color: #f3f3f3;
}

.tilesRow {
  padding: 1.5em 3em;
  width: 100%;
  display: flex;
  gap: 3em;
}

.tile {
  border: 1px solid #000;
  width: 200px;
  height: 150px;
}

.tileLink {
  display: grid;
  place-items: center;
  color: #000;
  width: 100%;
  height: 100%;
}

.tileLink:hover {
  background-color: #e2e2e2;
}
</style>
