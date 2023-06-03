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
      <moduleNavLinkVue
        text="słowniki"
        v-bind:children="[
          {
            path: '/rma/dictionary/damagetypes',
            text: 'typy stanu urządzenia',
          },
          { path: '/rma/dictionary/accessoriestypes', text: 'typy akcesoriów' },
          { path: '/rma/dictionary/statusestypes', text: 'Statusy zgłoszeń' },
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
}

ul {
  list-style: none;
  width: 100%;
  padding: 0;
}
</style>
