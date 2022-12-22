<script>
import actions from "../../components/RMA/rmaPage/actions.vue";
import rmaHeader from "../../components/RMA/rmaPage/header.vue";
import store from "../../store";

export default {
  mounted() {
    store.dispatch("rma/getTicketData", this.$route.params.id);
  },
  components: {
    actions,
    rmaHeader,
  },
};
</script>
<template>
  <div id="rmaPage">
    <actions />
    <div class="rmaPage_wrap">
      <rmaHeader />
    </div>
  </div>
</template>
<style scoped>
.rmaPage_wrap {
  padding: 0.5em;
}
</style>
