<script>
import item from "./item.vue";
import { mapState } from "vuex";

export default {
  components: { item },
  computed: {
    ...mapState({
      taskList: (state) => state.changeShelve.taskList,
    }),
  },
};
</script>
<template>
  <div class="moveTaskList">
    <h3>Lista przeniesienia</h3>
    <ul>
      <item v-for="item in taskList" :item="item" />
    </ul>
  </div>
</template>
<style scoped>
h3 {
  font-weight: bold;
}
.moveTaskList {
  width: 200px;
}
ul {
  list-style: decimal;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
