<script>
import { mapGetters, mapState } from "vuex";
import store from "../../../../store";

import process_partsList from "./process_partsList.vue";
import process_partForm from "./process_partForm.vue";
import process_commentForm from "./process_commentForm.vue";
import process_commentList from "./process_commentList.vue";

export default {
  computed: {
    ...mapState({
      processModalActive: (state) => state.rma.processModalActive,
    }),
    ...mapGetters({
      rmaPage: "rma/getRmaPage",
      comments: "rma/getComments",
      parts: "rma/getParts",
    }),
  },
  components: {
    process_partsList,
    process_partForm,
    process_commentForm,
    process_commentList,
  },
  methods: {
    toggleModal_process() {
      store.commit("rma/toggleModal_process", false);
    },
  },
};
</script>
<template>
  <div
    id="processModal"
    class="bigModal"
    :class="{ active: processModalActive }"
  >
    <div class="formWrap">
      <div class="header">
        <div id="close" @click="toggleModal_process"></div>
        <h4>Procesowanie naprawy zlecenia</h4>
      </div>
      <div class="innerWrap">
        <div class="spareparts">
          <h2>Części zamienne</h2>
          <process_partForm />
          <process_partsList :parts="parts" />
        </div>
        <div class="comments">
          <h2>Ustalenia do zlecenia</h2>
          <process_commentForm />
          <process_commentList :comments="comments" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.innerWrap {
  padding: 0.5em;
}

.comments {
  margin-top: 1.5em;
}
</style>
