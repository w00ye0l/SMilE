<template>
  <div class="background">
    <div class="head">
      <span class="header">SM</span>
      <img :src="require(`@/assets/${img1}.png`)" class="title-img" />
      <span class="header">E</span>
    </div>
    <div class="slider">
      <div class="main_content">
        <h3>
          주변 사람들의<br />
          <span class="mbti">MBTI</span>를 저장해<br />한 눈에 확인하세요!
        </h3>
      </div>
      <div>
        <img :src="require(`@/assets/${img3}.png`)" class="mid-img" />
        <img :src="require(`@/assets/${img2}.png`)" class="left1-img" />
        <img :src="require(`@/assets/${img4}.png`)" class="right1-img" />
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
      img1: "smile1",
      img2: "smile4",
      img3: "smile5",
      img4: "smile6",
    };
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
  height: 100vh;
  background-color: #fff9c8;
}

.head {
  line-height: 2px;
}

.header {
  color: #f59607;
  font-size: 2.5rem;
  margin-top: 0.67rem 0 0.67rem 0;
  font-weight: bold;
}

.title-img {
  margin-top: 5px;
  padding-left: 1px;
  width: 30px;
  height: 30px;
}

.slider {
  height: 600px;
}

.main_content {
  font-weight: bold;
  font-size: 25px;
}

.mbti {
  color: #f59607;
}

.left1-img {
  position: absolute;
  left: -30px;
  top: 300px;
}

.mid-img {
  left: 120px;
  top: 300px;
  position: absolute;
}

.right1-img {
  right: -50px;
  top: 300px;
  position: absolute;
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
