<template>
  <div class="body">
    <h1 class="title">MBTI 정보</h1>
    <section class="main-section">
      <div class="mbti-container">
        <div
          class="mbti-box"
          v-for="(mbti, idx) in mbtiList"
          v-bind:key="idx"
          v-on:click="docMove(mbti)"
        >
          <p class="mbti-text">
            {{ mbti }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mbtiList: this.$store.state.mbtiList,
    };
  },
  methods: {
    docMove(selectMBTI) {
      this.$store.dispatch("selectMbti", selectMBTI);
      this.$router.push({
        path: "/doc",
        query: {
          mbti: selectMBTI,
        },
      });
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #fff9c8;
}

.title {
  margin: 0;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.main-section {
  background-color: #fff;
  border-radius: 20px 20px 0 0;
}

.mbti-container {
  padding: 10vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.mbti-box {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.mbti-text {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #f59607;
}
</style>
