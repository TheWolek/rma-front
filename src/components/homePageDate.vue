<script>
import formatDate from "../utils/formatDate";
import formatTime from "../utils/formatTime";

export default {
  data() {
    return {
      date: formatDate(new Date()),
      clock: formatTime(new Date()),
    };
  },
  mounted() {
    this.startClock();
  },
  methods: {
    startClock() {
      setInterval(() => {
        this.clock = formatTime(new Date());
      }, 1000);
    },
  },
};
</script>
<template>
  <div class="dateWrap">
    <div>
      <span>{{ date }}</span>
      <span>{{ clock }}</span>
    </div>
  </div>
</template>
<style scoped>
.dateWrap {
  width: 100%;
  padding: 1em 3em;
}

.dateWrap div span {
  color: var(--vt-c-black-mute);
  font-size: 1.6rem;
  font-weight: 400;
}

.dateWrap div span + span {
  margin-left: 0.4em;
}
</style>
