<script>
import { mapState } from "vuex";
import actions from "../../components/RMA/rmaPage/actions.vue";
import rmaHeader from "../../components/RMA/rmaPage/header.vue";
import store from "../../store";

export default {
  mounted() {
    store.dispatch("rma/getTicketData", this.$route.params.id);
  },
  computed: {
    ...mapState({
      apiState: (state) => state.rma.apiState,
    }),
    apiState_loaded() {
      return this.apiState === 2;
    },
    apiState_loading() {
      return this.apiState === 0 || this.apiState === 1;
    },
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
    <div class="rmaPage_wrap" v-if="apiState_loaded">
      <rmaHeader />
    </div>
  </div>
</template>
<style scoped>
.rmaPage_wrap {
  padding: 0.5em;
}
</style>
