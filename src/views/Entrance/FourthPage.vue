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
          하루의 하나의 질문을 통해<br />
          다른 <span class="mbti">MBTI</span>의 생각을 확인해요!
        </h3>
      </div>
      <div>
        <img :src="require(`@/assets/first_smile8.png`)" class="left1-img" />
        <img
          :src="require(`@/assets/first_question.png`)"
          class="question-mark"
        />
        <img :src="require(`@/assets/exmark.png`)" class="ex-mark" />
        <img :src="require(`@/assets/first_smile11.png`)" class="right-img1" />
        <img :src="require(`@/assets/first_smile12.png`)" class="right-img2" />
        <img :src="require(`@/assets/first_smile9.png`)" class="right-img3" />
        <img :src="require(`@/assets/first_smile10.png`)" class="right-img4" />
        <img :src="require(`@/assets/first_smile14.png`)" class="right-img5" />
        <img :src="require(`@/assets/first_smile13.png`)" class="right-img6" />
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

.left1-img {
  position: absolute;
  width: 230px;
  top: 350px;
  left: -70px;
}

.question-mark {
  position: absolute;
  width: 70px;
  top: 255px;
  left: 35px;
}

.ex-mark {
  position: absolute;
  top: 230px;
  width: 30px;
  right: 30px;
}

.right-img1 {
  position: absolute;
  top: 375px;
  right: 78px;
}

.right-img2 {
  position: absolute;
  top: 400px;
  right: -20px;
}

.right-img3 {
  position: absolute;
  top: 275px;
  right: 50px;
}

.right-img4 {
  position: absolute;
  top: 300px;
  right: -45px;
}

.right-img5 {
  position: absolute;
  top: 495px;
  right: -20px;
}

.right-img6 {
  position: absolute;
  top: 480px;
  right: 80px;
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
