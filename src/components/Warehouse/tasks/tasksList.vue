<script>
import TaskTile from "./taskTile.vue";
import taskTile from "./taskTile.vue";

export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: { taskTile, TaskTile },
};
</script>
<template>
  <div class="tasksList">
    <TaskTile v-for="item in list" :item="item" />
  </div>
</template>
<style scoped>
.tasksList {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
