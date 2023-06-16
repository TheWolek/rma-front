<script>
import { mapGetters } from "vuex";
import tasksList from "@/components/Warehouse/tasks/tasksList.vue";
import store from "@/store";
import TasksList from "@/components/Warehouse/tasks/tasksList.vue";

export default {
  components: { tasksList, TasksList },
  mounted() {
    store.dispatch("tasks/fetchTasksList", 1);
  },
  computed: {
    ...mapGetters({
      getTasksList: "tasks/getTasksList",
    }),
  },
};
</script>
<template>
  <div id="warehouseTasksMove">
    <div class="warehouseTasksMove_wrap">
      <h1>Zadania przeniesienia</h1>
      <TasksList :list="getTasksList" />
    </div>
  </div>
</template>
<style>
#warehouseTasksMove {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.warehouseTasksMove_wrap {
  padding: 0.5em;
}
</style>
