<template>
  <div class="background">
    <div class="head">
      <span class="header">SM</span>
      <img :src="require(`@/assets/first_smile1.png`)" class="title-img" />
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
        <img :src="require(`@/assets/first_smile5.png`)" class="mid-img" />
        <img :src="require(`@/assets/first_smile4.png`)" class="left-img" />
        <img :src="require(`@/assets/first_smile6.png`)" class="right-img" />
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
  height: 100vh;
  background-color: #fff9c8;
}

.head {
  margin: 0;
  padding-top: 30px;
}

.header {
  color: #f59607;
  font-size: 2.5rem;
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

.left-img {
  position: absolute;
  left: -30px;
  top: 300px;
}

.mid-img {
  left: 120px;
  top: 300px;
  position: absolute;
}

.right-img {
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
