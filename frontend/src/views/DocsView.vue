<template>
  <div class="main-container">
    <h1 class="title">MBTI 정보</h1>
    <section class="main-section">
      <h3 class="sub-title">
        MBTI를 선택해서<br />해당 MBTI에 대한 정보를 확인해요!
      </h3>
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
      // this.$store.dispatch("selectMbti", selectMBTI);
      this.$router.push({
        path: "/doc",
        query: {
          mbti: selectMBTI,
        },
      });

      // 스크롤 위치 조절
      setTimeout(() => {
        // 만약 대상 요소를 찾을 수 없다면 위로 스크롤
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    },
  },
};
</script>

<style scoped>
@media (min-width: 541px) {
  .main-container {
    margin-bottom: 50px;
    padding: 0 30px;
  }

  .main-section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    min-height: 700px;
  }

  .mbti-container {
    padding: 30px 20%;
    width: 100%;
    height: calc(100% - 120px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .mbti-box {
    width: 100px;
    height: 100px;
  }

  .mbti-text {
    font-size: 28px;
  }
}

@media (max-width: 540px) {
  .main-section {
    width: calc(100% - 40px);
    height: 100%;
    margin: 0 20px;
    margin-bottom: 20px;
  }

  .mbti-container {
    padding: 10vh 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .mbti-box {
    width: 70px;
    height: 70px;
  }

  .mbti-text {
    font-size: 24px;
  }
}

.main-container {
  /* width: 100%; */
  background-color: #fff;
  /* background-color: #fff9c8; */
}

.title {
  margin: 0;
  padding: 50px 0;
  width: 100%;
  font-size: 24px;
  text-align: center;
}

.sub-title {
  margin: 0;
  padding: 30px 20px;
  height: 120px;
  font-size: 20px;
  font-weight: bold;
  color: #f59607;
  text-align: center;
}

.main-section {
  /* background-color: #fff; */
  background-color: #fff9c8;
  border-radius: 20px;
}

.mbti-box {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffd338;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.mbti-text {
  margin: 0;
  font-weight: bold;
  color: #000000b4;
}
</style>
