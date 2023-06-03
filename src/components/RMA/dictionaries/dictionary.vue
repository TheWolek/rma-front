<script>
import { useRoute } from "vue-router";
import store from "../../../store";
import router from "../../../router";
import { mapGetters, mapState } from "vuex";

import dictTable from "./table.vue";

export default {
  data() {
    return {
      type: "",
      name: "",
    };
  },
  components: { dictTable },
  computed: {
    ...mapGetters({
      findDictionary: "rmaDictionaries/findDictionaryByName",
    }),
    ...mapState({
      damageTypes: (state) => state.rmaDictionaries.damageTypes,
      accessoriesTypes: (state) => state.rmaDictionaries.accessoriesTypes,
      statusesTypes: (state) => state.rmaDictionaries.statuses,
    }),
    getData() {
      if (this.type !== "") {
        return this[this.findDictionary(this.type).name];
      }
    },
  },
  methods: {
    setType(type) {
      const dictionary = this.findDictionary(type);

      if (!dictionary) {
        router.push({
          name: "rma",
        });
      }

      store.dispatch("rmaDictionaries/fetchDictionary", dictionary.name);
      this.type = dictionary.name;
      this.name = dictionary.displayName;
    },
  },
  mounted() {
    const route = useRoute();
    this.setType(route.params.name);
  },
  watch: {
    $route(to, from) {
      if (to.name !== "dictionary") return false;
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
