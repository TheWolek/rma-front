<script>
import addForm from "@/components/RMA/rmaAdd/form.vue";
import store from "../../store";

export default {
  components: { addForm },
  mounted() {
    store.dispatch("rmaDictionaries/fetchDictionary", "accessoriesTypes");
    store.dispatch("rmaDictionaries/fetchDictionary", "damageTypes");
  },
};
</script>
<template>
  <div class="wrap">
    <h1>Dodawanie nowego zgłoszenia serwisowego</h1>
    <addForm />
  </div>
</template>
<style scoped>
.wrap {
  padding: 0.5em;
}
</style>
