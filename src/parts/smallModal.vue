<script>
export default {
  props: ["modalActive", "toggleAction", "modalTitle"],
};
</script>
<template>
  <div class="smallModal" :class="{ active: this.modalActive }">
    <div class="formWrap">
      <div class="header">
        <div id="close" @click="toggleAction"></div>
        <h4>{{ modalTitle }}</h4>
      </div>
      <slot />
    </div>
  </div>
</template>
<style>
.bigModal .form-group {
  width: 100%;
}
</style>
