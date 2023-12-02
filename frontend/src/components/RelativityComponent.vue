<template>
  <div class="info-container">
    <div class="info-title-box">
      <div class="info-box info-title">{{ id }} 상대법은?</div>
    </div>
    <div class="info-content-box">
      <pre class="info-box info-content">{{ relativity }}</pre>
    </div>
  </div>
</template>

<script>
import { MBTI } from "../mbti/mbtiData";

export default {
  data() {
    return {
      id: this.$route.query.mbti,
    };
  },
  computed: {
    relativity() {
      let rowData = MBTI[this.id].상대법;
      const data = rowData.replaceAll(". ", ".\n\n");

      return data;
    },
  },
};
</script>

<style scoped>
@media (width >= 540px) {
  .info-container {
    height: 90%;
  }
}

@media (width <= 540px) {
  .info-container {
    height: calc(100vh - 273px);
  }

  .info-content-box {
    margin-bottom: 30px;
  }
}

.info-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.info-title-box {
  display: flex;
  justify-content: flex-end;
}

.info-content-box {
  display: flex;
  justify-content: flex-start;
}

.info-box {
  margin: 20px 10px;
  padding: 10px 15px;
  width: fit-content;
  position: relative;
  border-radius: 10px;
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
  border-width: 0 15px 15px 0;
  border-color: transparent #ffd338 transparent transparent;
  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.25));
  transform: translateY(100%);
  z-index: 1;
}

.info-content {
  width: 90%;
  text-align: start;
  background-color: #fff;
  box-shadow: 0 2px 5px #ffd338;
  white-space: pre-line;
  word-break: keep-all;
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
  border-width: 15px 15px 0 0;
  border-color: #fff transparent transparent transparent;
  filter: drop-shadow(0 3px 2px #ffd338);
  transform: translateY(100%);
  z-index: 1;
}
</style>
