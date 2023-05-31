<script>
import { useRoute } from "vue-router";
import store from "../../store";
import router from "../../router";
import { mapState } from "vuex";

import dictionary from "../../components/RMA/dictionaries/dictionary.vue";

export default {
  components: { dictionary },
  data() {
    return {
      type: null,
    };
  },
};
</script>
<template>
  <dictionary />
</template>
<style></style>
