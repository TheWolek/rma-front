<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<template>
  <div class="actions">
    <div class="actionBtn" @click="goBack" :class="{ disabled: false }">
      <img src="@/assets/back-arrow.png" class="searchImg" /> Cofnij
    </div>
  </div>
</template>
