<script>
import addForm from "@/components/RMA/rmaAdd/form.vue";

export default {
  components: { addForm },
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
  padding: 1em;
}
</style>
