<template>
  <div>
    <div class="info-title-box">
      <div class="info-box info-title">{{ id }} 상대법은?</div>
    </div>
    <div class="info-content-box">
      <div class="info-box info-content">{{ relativity }}</div>
    </div>
  </div>
</template>

<script>
import { MBTI } from "../mbti/mbtiData";

export default {
  data() {
    return {
      id: this.$store.state.selectMBTI,
    };
  },
  computed: {
    relativity() {
      return MBTI[this.id].상대법;
    },
  },
};
</script>

<style scoped>
.info-title-box {
  display: flex;
  justify-content: flex-end;
}

.info-content-box {
  display: flex;
  justify-content: flex-start;
}

.info-box {
  margin: 20px;
  padding: 15px 20px;
  width: fit-content;
  position: relative;
  border-radius: 20px;
  z-index: 2;
}

.info-title {
  text-align: start;
  background-color: #ffd338;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.info-title::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 1px;
  right: 20px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 20px 20px 0;
  border-color: transparent #ffd338 transparent transparent;
  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.25));
  transform: translateY(100%);
  z-index: 1;
}

.info-content {
  background-color: #fff;
  box-shadow: 0 2px 5px #ffd338;
}

.info-content::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 1px;
  left: 20px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 20px 0 0;
  border-color: #fff transparent transparent transparent;
  filter: drop-shadow(0 3px 2px #ffd338);
  transform: translateY(100%);
  z-index: 1;
}
</style>
