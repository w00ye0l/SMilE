<template>
  <div class="background">
    <h1 class="head">
      <span class="header">SM</span>
      <img :src="require(`@/assets/${imgName3}.png`)" class="title-img" />
      <span class="header">E</span>
    </h1>
    <div class="slider">
      <div>
        <h3>주변 사람들의</h3>
        <h3><span class="orange">MBTI</span>를 저장해</h3>
        <h3>한 눈에 확인하세요!</h3>
      </div>
      <div>
        <img :src="require(`@/assets/${imgName1}.png`)" class="img1" />
        <img :src="require(`@/assets/${imgName2}.png`)" class="img2" />
      </div>
    </div>
    <button :disabled="isDisabled" class="btn btn-start">시작하기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      imgName1: "smile3",
      imgName2: "smile2",
      imgName3: "smile1",
    };
  },
  computed: {
    isDisabled() {
      return true;
    },
  },
};
</script>

<style>
body {
  background-color: #fff9c8;
}

.background {
  position: relative;
}

.head {
  font-size: 2rem;
}

.header {
  color: #f59607;
  font-size: 2rem;
  margin-top: 0.67rem 0 0.67rem 0;
  font-weight: bold;
}

.slider {
  height: 500px;
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
  right: 3px;
  width: 170px;
}

.img2 {
  position: absolute;
  left: 3px;
  top: 230px;
  width: 170px;
}

.btn-start {
  width: 180px;
  height: 52px;
  border-radius: 25px;
  color: #ffffff;
  background-color: #c8c8c8;
  font-size: 18px;
  font-weight: 700;
}
</style>
