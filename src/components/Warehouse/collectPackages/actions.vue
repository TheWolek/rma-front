<script>
import { mapGetters } from "vuex";
import store from "../../../store";
import router from "../../../router";
import actionButton from "../../../parts/buttons/actionButton.vue";
import actionButtonRefresh from "../../../parts/buttons/actionButtonRefresh.vue";

export default {
  components: { actionButton, actionButtonRefresh },
  computed: {
    ...mapGetters({
      details: "collectPackages/getCollectDetails",
    }),
    isClosed() {
      return this.details.status === "Odebrany" ? true : false;
    },
    ableToFinish() {
      return this.details.items.length > 0 && !this.isClosed ? true : false;
    },
  },
  methods: {
    onBack() {
      router.go(-1);
    },
    onFinish() {
      store.dispatch("collectPackages/finishCollect", this.details.id);
    },
    onRefresh() {
      router.go();
    },
  },
};
</script>
<template>
  <div class="actions">
    <actionButton :event="onBack" display="Cofnij" :icon="`back-arrow.png`" />
    <actionButton
      :event="onFinish"
      display="Zakończ odbiór"
      :icon="`gear.svg`"
      :disabled="!ableToFinish"
    />
    <actionButtonRefresh :event="onRefresh" :loading="this.loading" />
  </div>
</template>
