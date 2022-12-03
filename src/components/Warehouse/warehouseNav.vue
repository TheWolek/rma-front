<script setup>
import moduleNavLinkVue from "../moduleNavLink.vue";
</script>
<template>
  <div class="moduleNav">
    <ul>
      <moduleNavLinkVue
        text="produkty"
        v-bind:children="[
          { path: '/warehouse/items', text: 'zarejestrowane produkty' },
          { path: '/warehouse/items/changeshelve', text: 'zmiana lokalizacji' },
        ]"
      />
      <moduleNavLinkVue
        text="części zamienne"
        v-bind:children="[
          { path: '/warehouse/spareparts/orders', text: 'dostawy części' },
          { path: '/warehouse/spareparts', text: 'zarejestrowane części' },
          { path: '/warehouse/spareparts/stock', text: 'stan magazynowy' },
        ]"
      />
      <moduleNavLinkVue
        text="miejsca magazynowe"
        v-bind:children="[
          { path: '/warehouse/shelves', text: 'wszystkie miejsca magazynowe' },
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
  height: 94vh;
}

ul {
  list-style: none;
  width: 100%;
  padding: 0;
}
</style>
