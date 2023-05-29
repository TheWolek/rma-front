<script>
import { mapGetters, mapState } from "vuex";
import store from "../../../../store";
import bigModal from "../../../../parts/bigModal.vue";

import process_partsList from "./process_partsList.vue";
import process_partForm from "./process_partForm.vue";
import process_commentForm from "./process_commentForm.vue";
import process_commentList from "./process_commentList.vue";

export default {
  computed: {
    ...mapState({
      processModalActive: (state) => state.rmaPage.processModalActive,
    }),
    ...mapGetters({
      rmaPage: "rmaPage/getRmaPage",
      comments: "rmaPage/getComments",
      parts: "rmaPage/getParts",
    }),
  },
  components: {
    bigModal,
    process_partsList,
    process_partForm,
    process_commentForm,
    process_commentList,
  },
  methods: {
    toggleModal_process() {
      store.commit("rmaPage/toggleModal_process", false);
    },
  },
};
</script>
<template>
  <bigModal
    :modalActive="processModalActive"
    :toggleAction="toggleModal_process"
    modalTitle="Procesowanie naprawy zlecenia"
  >
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
  </bigModal>
</template>
<style scoped>
.innerWrap {
  padding: 0.5em;
}

.comments {
  margin-top: 1.5em;
}
</style>
