<script>
export default {};
</script>
<template>
  <div class="buttonsWrap">
    <div class="actionBtn small"><img src="@/assets/add.svg" /> Dodaj</div>
    <div class="actionBtn small"><img src="@/assets/delete.svg" /> Usuń</div>
    <div class="actionBtn small">
      <img src="@/assets/change.svg" /> Zmień status
    </div>
  </div>
</template>
<style scoped>
.buttonsWrap {
  /* height: 1.7em; */
  margin-top: 0.5em;
  margin-bottom: 0.3em;
  display: flex;
  gap: 0.1em;
}

.actionBtn.small {
  font-size: 0.82rem;
  font-weight: 700;
}

.actionBtn.small img {
  width: 14px;
}
</style>
