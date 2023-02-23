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
          일정을 기록하고<br />
          만나는 사람의 <span class="mbti">MBTI</span><br />
          대응법을 익혀요!
        </h3>
      </div>
      <div>
        <img :src="require(`@/assets/first_smile7.png`)" class="left-img" />
        <img :src="require(`@/assets/first_info.png`)" class="right-info" />
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
  padding-top: 30px;
  margin: 0;
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

.left-img2 {
  position: absolute;
  left: 20px;
  top: 295px;
  width: 250px;
}

.right-info {
  position: absolute;
  top: 300px;
  right: 35px;
  width: 100px;
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
