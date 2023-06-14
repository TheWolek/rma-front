<script>
import TextInput from "../../parts/inputs/textInput.vue";
import textInput from "../../parts/inputs/textInput.vue";
import store from "../../store";
import { mapState } from "vuex";

export default {
  data() {
    return {
      code: "",
    };
  },
  computed: {
    ...mapState({
      findError: (state) => state.rmaPage.findError,
    }),
  },
  methods: {
    onSubmit() {
      if (this.code === "") return;
      store.dispatch("rmaPage/findTicket", this.code.split("-")[0]);
    },
  },
  components: { TextInput },
};
</script>
<template>
  <div class="wrap">
    <TextInput
      id="id"
      label="Numer zgłoszenia lub kod kreskowy"
      v-model="code"
      :onEnter="onSubmit"
      :error="this.findError"
    />
  </div>
</template>
<style scoped>
.wrap {
  padding: 1.5em 1em 2.8em 1em;
  width: 22%;
}
</style>
