<script>
import store from "../../../store";

export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    toggleFindModal() {},
    toggleStatusModal() {},
    onRefresh() {},
  },
};
</script>
<template>
  <div class="actions">
    <div class="actionBtn" id="btn1" @click="toggleFindModal">
      <img src="@/assets/filters.svg" /> Filtry
    </div>
    <div class="actionBtn" id="btn2" @click="toggleStatusModal">
      <img src="@/assets/change.svg" /> Status
    </div>
    <div class="actionBtn refreshBtn" id="btn3" @click="onRefresh">
      <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
    </div>
  </div>
</template>
