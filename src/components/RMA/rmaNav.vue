<script setup>
import moduleNavLinkVue from "../moduleNavLink.vue";
</script>
<template>
  <div class="moduleNav">
    <ul>
      <moduleNavLinkVue
        text="zgłoszenia serwisowe"
        v-bind:children="[
          { path: '/rma/items', text: 'otwarte zgłoszenia serwisowe' },
          { path: '/rma/add', text: 'dodaj zgłoszenie serwisowe' },
        ]"
      />
    </ul>
  </div>
</template>
<style>
.moduleNav {
  width: 100%;
  padding: 1em 0;
  background: rgb(40, 86, 129);
  height: calc(100vh - 5vh);
}

ul {
  list-style: none;
  width: 100%;
  padding: 0;
}
</style>
