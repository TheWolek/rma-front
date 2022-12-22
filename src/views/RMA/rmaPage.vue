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
<style>
.rmaPage_wrap {
  padding: 0.5em;
}

.inlineEdit {
  display: flex;
  width: 40%;
}

.inlineEdit h3 {
  display: inline-block;
  margin-right: 0.5em;
}

.inlineEdit input {
  margin-right: 0.5em;
}

.inlineEdit input:disabled {
  background: none;
  border: none;
  cursor: default;
}

.btn {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.btn img {
  width: 100%;
}

textarea {
  resize: none;
}

textarea:disabled {
  background: none;
  cursor: default !important;
}

h1 {
  font-size: 1.3em !important;
}
h2 {
  font-size: 1.1em;
  padding: 0 0 0.5em 0.5em;
  border-bottom: 1px solid #000;
  margin-bottom: 0.5em;
}
h3 {
  font-size: 1em;
  padding: 0 0 0.1em 0.5em;
}

h2,
h3,
p {
  color: var(--vt-c-black-mute);
  text-transform: capitalize;
}
</style>
