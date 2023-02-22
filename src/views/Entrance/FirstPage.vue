<template>
  <div class="background">
    <h1 class="title">
      <span class="header">SM</span>
      <img :src="require(`@/assets/smile1.png`)" class="title-img" />
      <span class="header">E</span>
    </h1>
    <div class="slider">
      <div>
        <h3>
          주변 사람들의<br />
          <span class="orange">MBTI</span>를 저장해<br />한 눈에 확인하세요!
        </h3>
      </div>
      <div>
        <img :src="require(`@/assets/smile3.png`)" class="img1" />
        <img :src="require(`@/assets/smile2.png`)" class="img2" />
      </div>
    </div>
    <button :disabled="isDisabled" class="btn btn-start">시작하기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isDisabled() {
      return true;
    },
  },
};
</script>

<style scoped>
.background {
  position: relative;
  background-color: #fff9c8;
  height: 100vh;
  margin: 0;
}

.head {
  line-height: 2px;
}

.header {
  color: #f59607;
  font-size: 2rem;
  margin-top: 0.67rem 0 0.67rem 0;
  font-weight: bold;
}

.slider {
  height: 600px;
}

.title {
  margin: 0;
}

.title-img {
  margin-top: 5px;
  padding-left: 1px;
  width: 25px;
  height: 25px;
}

h3 {
  font-weight: bold;
  font-size: 25px;
}

.orange {
  color: #f59607;
}

.img1 {
  position: absolute;
  right: -60px;
  width: 250px;
}

.img2 {
  position: absolute;
  left: -60px;
  top: 300px;
  width: 250px;
}

.btn-start {
  width: 180px;
  height: 52px;
  border-radius: 25px;
  color: #ffffff;
  background-color: #c8c8c8;
  font-size: 18px;
  font-weight: 700;
  border: none;
}
</style>
