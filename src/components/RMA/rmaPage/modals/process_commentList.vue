<script>
import formatDateAndHours from "../../../../utils/formatDateAndHours";

export default {
  props: ["comments"],
  computed: {},
  methods: {
    getFormattedDate(d) {
      return formatDateAndHours(d);
    },
  },
};
</script>
<template>
  <div class="commentsWrap">
    <div v-for="c in comments" class="comment">
      <h3>{{ c.comment }}</h3>
      <h3>{{ getFormattedDate(c.created) }}</h3>
    </div>
  </div>
</template>
<style scoped>
.commentsWrap {
  margin-top: 1.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.comment {
  padding: 0.5em 0;
  border-bottom: 1px solid #000;
}
</style>
