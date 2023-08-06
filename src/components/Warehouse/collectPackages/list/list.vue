<script>
import { mapGetters } from "vuex";
import row from "./row.vue";
import loadingDots from "../../../icons/loadingDots.vue";

export default {
  components: { loadingDots, row },
  computed: {
    ...mapGetters({
      getList: "collectPackages/getListOfCollects",
      loading: "collectPackages/getLoading",
    }),
  },
};
</script>
<template>
  <div>
    <table>
      <div class="loadingWrap" :class="{ active: this.loading }">
        <loadingDots :active="this.loading" />
      </div>
      <tr>
        <th>ID</th>
        <th>Numer zbiorczy</th>
        <th>Data utworzenia</th>
        <th>Status</th>
      </tr>
      <row v-for="item in getList" :item="item" />
    </table>
  </div>
</template>
<style scoped></style>
