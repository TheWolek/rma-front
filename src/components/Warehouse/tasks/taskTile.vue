<script>
import { mapGetters } from "vuex";
import router from "@/router";
import store from "@store";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      shelves: "items/getShelves",
    }),
  },
  methods: {
    onClick() {
      const shelve_out = this.shelves.find(
        (o) => o.shelve_id === this.item.shelve_out
      )?.code;
      const shelve_in = this.shelves.find(
        (o) => o.shelve_id === this.item.shelve_in
      )?.code;
      if (shelve_out != undefined && shelve_in != undefined) {
        store.dispatch("changeShelve/setDataFromMoveTask", {
          from: shelve_out,
          to: shelve_in,
          taskName: this.item.name,
        });
        router.push({ name: "itemsChangeShelve" });
      }
    },
  },
};
</script>
<template>
  <div class="taskTile" @click="onClick">
    <h3>{{ item.displayName }}</h3>
    <div class="activeWrap">
      <div class="shelveCodes">
        <h4 class="shelveCode">
          Z:
          {{
            this.shelves.find((o) => o.shelve_id === this.item.shelve_out).code
          }}
        </h4>
        <h4 class="shelveCode">
          Do:
          {{
            this.shelves.find((o) => o.shelve_id === this.item.shelve_in).code
          }}
        </h4>
      </div>
      <div class="active">
        <div class="bar"></div>
        <h4>Aktywne zadania</h4>
        <h4 :class="{ bold: item.active > 0 }">{{ item.active }}</h4>
      </div>
    </div>
  </div>
</template>
<style scoped>
.taskTile {
  padding: 0.5em 1em 1em 0.5em;
  border: 1px solid #000;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color ease-out 0.3s;
}

.taskTile:hover {
  background-color: #f5f5f5;
}

.activeWrap {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.shelveCodes {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 8px;
}

.shelveCode {
  font-weight: 600;
}

.active {
  background: #cecece;
  padding: 6px 16px 2px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  margin-top: 8px;
}

.bar {
  width: 90%;
  border: 2px solid rgb(18, 125, 197);
  border-radius: 16px;
}

h3 {
  text-transform: none;
}

h4 {
  color: var(--vt-c-black-mute);
  font-size: 13px;
}

h4.bold {
  font-weight: bold;
}
</style>
