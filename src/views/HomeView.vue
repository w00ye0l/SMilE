<template>
  <div class="background">
    <h1 class="title">
      <span class="header">SM</span>
      <img :src="require(`@/assets/first_smile1.png`)" class="title-img" />
      <span class="header">E</span>
    </h1>
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :style="{
        '--swiper-pagination-color': '#f59607',
      }"
      :space-between="100"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide class="wrap-swiper">
        <div class="slider">
          <div>
            <h3 class="sub-title">
              주변 사람들의<br />
              <span class="mbti">MBTI</span>를 저장해<br />한 눈에 확인하세요!
            </h3>
          </div>
          <div>
            <img :src="require(`@/assets/first_smile3.png`)" class="img1" />
            <img :src="require(`@/assets/first_smile2.png`)" class="img2" />
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="wrap-swiper">
        <div class="slider">
          <div class="main_content">
            <h3 class="sub-title">
              다른 사람들이<br />
              생각하는 <span class="mbti">MBTI</span>는<br />
              어떤지 같이 확인하세요!
            </h3>
          </div>
          <div>
            <img :src="require(`@/assets/first_smile5.png`)" class="mid-img" />
            <img :src="require(`@/assets/first_smile4.png`)" class="left-img" />
            <img
              :src="require(`@/assets/first_smile6.png`)"
              class="right-img"
            />
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="wrap-swiper">
        <div class="slider">
          <div class="main_content">
            <h3 class="sub-title">
              일정을 기록하고<br />
              만나는 사람의 <span class="mbti">MBTI</span><br />
              대응법을 익혀요!
            </h3>
          </div>
          <div>
            <img
              :src="require(`@/assets/first_smile7.png`)"
              class="left-img2"
            />
            <img :src="require(`@/assets/first_info.png`)" class="right-info" />
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="wrap-swiper">
        <div class="slider">
          <div class="main_content">
            <h3 class="sub-title">
              하루의 하나의 질문을 통해<br />
              다른 <span class="mbti">MBTI</span>의 생각을 확인해요!
            </h3>
          </div>
          <div>
            <img
              :src="require(`@/assets/first_smile8.png`)"
              class="left1-img"
            />
            <img
              :src="require(`@/assets/first_question.png`)"
              class="question-mark"
            />
            <img :src="require(`@/assets/exmark.png`)" class="ex-mark" />
            <img
              :src="require(`@/assets/first_smile11.png`)"
              class="right-img1"
            />
            <img
              :src="require(`@/assets/first_smile12.png`)"
              class="right-img2"
            />
            <img
              :src="require(`@/assets/first_smile9.png`)"
              class="right-img3"
            />
            <img
              :src="require(`@/assets/first_smile10.png`)"
              class="right-img4"
            />
            <img
              :src="require(`@/assets/first_smile14.png`)"
              class="right-img5"
            />
            <img
              :src="require(`@/assets/first_smile13.png`)"
              class="right-img6"
            />
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <button :disabled="isDisabled" class="btn btn-start">시작하기</button>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isDisabled: true,
    };
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log("slide");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination],
    };
  },
};
</script>

<style scoped>
.background {
  position: relative;
  background-color: #fff9c8;
  height: 100vh;
}

.head {
  line-height: 2px;
}

.header {
  color: #f59607;
  font-size: 2rem;
  font-weight: bold;
}

.slider {
  height: 600px;
}

.title {
  padding-top: 30px;
  margin: 0;
}

.title-img {
  margin-top: 5px;
  padding-left: 1px;
  width: 25px;
  height: 25px;
}

.sub-title {
  font-weight: bold;
  font-size: 25px;
}

.mbti {
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

.left-img {
  position: absolute;
  left: -30px;
  top: 320px;
}

.mid-img {
  left: 120px;
  top: 320px;
  position: absolute;
}

.right-img {
  right: -50px;
  top: 320px;
  position: absolute;
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
