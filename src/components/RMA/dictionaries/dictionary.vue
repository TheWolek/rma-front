<script>
import { useRoute } from "vue-router";
import store from "../../../store";
import router from "../../../router";
import { mapState } from "vuex";

import dictTable from "./table.vue";

export default {
  data() {
    return {
      type: 0,
      name: "",
    };
  },
  components: { dictTable },
  computed: {
    ...mapState({
      damageTypes: (state) => state.rmaDictionaries.damageTypes,
      accessoriesTypes: (state) => state.rmaDictionaries.accessoriesTypes,
    }),
    getData() {
      if (this.type === 1) return this.damageTypes;
      if (this.type === 2) return this.accessoriesTypes;
    },
  },
  methods: {
    setType(type) {
      if (type === "damagetypes") {
        store.dispatch("rmaDictionaries/fetchDictionary_DamageTypes");
        this.type = 1;
        this.name = "Typy stanu urządzenia";
        return;
      }

      if (type === "accessoriestypes") {
        store.dispatch("rmaDictionaries/fetchDictionary_AccessoriesTypes");
        this.type = 2;
        this.name = "Typy akcesoriów";
        return;
      }

      router.push({
        name: "rma",
      });
    },
  },
  mounted() {
    const route = useRoute();
    this.setType(route.params.name);
  },
  watch: {
    $route(to, from) {
      this.setType(to.params.name);
    },
  },
};
</script>
<template>
  <div class="tableWrap">
    <h1>{{ name }}</h1>
    <dictTable :data="getData" :headers="['id', 'nazwa']" :type="type" />
  </div>
</template>
<style scoped>
.tableWrap {
  width: 100%;
  padding: 1em;
}
</style>
