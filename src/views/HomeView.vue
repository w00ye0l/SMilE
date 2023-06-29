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
      ref="swiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide class="wrap-swiper">
        <div class="slider">
          <div>
            <h3>
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
            <h3>
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
            <h3>
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
            <h3>
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
    <button
      class="btn btn-start"
      @click="lastBtn()"
      :class="{ disabled: isDisabled }"
    >
      시작하기
    </button>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import { ref } from "vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  setup() {
    let currentSlide = ref(0);
    let isDisabled = ref(false);
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = (swiper) => {
      console.log(swiper.activeIndex);
      currentSlide.value = swiper.activeIndex + 1;
      if (currentSlide.value === 4) {
        isDisabled.value = true;
      } else {
        isDisabled.value = false;
      }
    };
    return {
      onSwiper,
      onSlideChange,
      currentSlide,
      modules: [Pagination],
      isDisabled,
    };
  },
  methods: {
    lastBtn() {
      if (this.currentSlide === 4) {
        this.$router.push({ path: "login" });
        this.isDisabled = true;
      }
    },
  },
};
</script>
<style scoped>
.background {
  position: relative;
  background-color: #fff9c8;
  min-height: 100vh;
}

#app {
  padding-bottom: 0;
}

.head {
  line-height: 2px;
}

.header {
  color: #f59607;
  font-size: 40px;
  font-weight: bold;
}

.slider {
  height: 75vh;
}

.title {
  padding-top: 30px;
  margin: 0;
}

.title-img {
  margin-top: 5px;
  padding-left: 1px;
  width: 30px;
  height: 30px;
}

h3 {
  font-weight: bold;
  font-size: 25px;
}

.mbti {
  color: #f59607;
}

.img1 {
  position: absolute;
  right: -3%;
  width: 180px;
  bottom: 25vh;
  max-width: 280px;
}

.img2 {
  position: absolute;
  left: -3%;
  bottom: 10%;
  width: 180px;
  max-width: 280px;
}

@media (max-width: 280px) {
  .img1 {
    right: -11%;
  }

  .img2 {
    left: -11%;
  }

  .left-img {
    position: absolute;
    left: -7%;
    top: 40%;
    max-width: 150px;
  }

  .mid-img {
    position: absolute;
    left: 30%;
    top: 40%;
    max-width: 150px;
  }

  .right-img {
    position: absolute;
    right: -16%;
    top: 40%;
    max-width: 150px;
  }

  .left-img2 {
    position: absolute;
    left: 15%;
    top: 40%;
    max-width: 150px;
  }

  .right-info {
    position: absolute;
    top: 35%;
    right: 7%;
    max-width: 80px;
  }

  .left1-img {
    position: absolute;
    width: 180px;
    top: 300px;
    left: -70px;
  }

  .question-mark {
    position: absolute;
    width: 50px;
    top: 240px;
    left: 25px;
  }

  .ex-mark {
    position: absolute;
    top: 160px;
    width: 25px;
    right: 30px;
  }

  .right-img1 {
    position: absolute;
    width: 100px;
    top: 275px;
    right: 70px;
  }

  .right-img2 {
    position: absolute;
    width: 100px;
    top: 295px;
    right: -10px;
  }

  .right-img3 {
    position: absolute;
    width: 100px;
    top: 200px;
    right: 50px;
  }

  .right-img4 {
    position: absolute;
    width: 100px;
    top: 220px;
    right: -25px;
  }

  .right-img5 {
    position: absolute;
    top: 370px;
    right: -10px;
    width: 100px;
  }

  .right-img6 {
    position: absolute;
    width: 100px;
    top: 360px;
    right: 70px;
  }
}

@media (min-width: 281px) and (max-width: 375px) {
  .img1 {
    right: -11%;
  }

  .img2 {
    left: -11%;
  }

  .left-img {
    position: absolute;
    left: 3%;
    top: 40%;
    max-width: 150px;
  }

  .mid-img {
    position: absolute;
    left: 30%;
    top: 40%;
    max-width: 150px;
  }

  .right-img {
    position: absolute;
    right: 5%;
    top: 40%;
    max-width: 150px;
  }

  .left-img2 {
    position: absolute;
    left: 15%;
    top: 40%;
    max-width: 150px;
  }

  .right-info {
    position: absolute;
    top: 35%;
    right: 15%;
    max-width: 80px;
  }

  .left1-img {
    position: absolute;
    width: 180px;
    top: 300px;
    left: -70px;
  }

  .question-mark {
    position: absolute;
    width: 50px;
    top: 240px;
    left: 25px;
  }

  .ex-mark {
    position: absolute;
    top: 160px;
    width: 25px;
    right: 30px;
  }

  .right-img1 {
    position: absolute;
    width: 100px;
    top: 275px;
    right: 70px;
  }

  .right-img2 {
    position: absolute;
    width: 100px;
    top: 295px;
    right: -10px;
  }

  .right-img3 {
    position: absolute;
    width: 100px;
    top: 200px;
    right: 50px;
  }

  .right-img4 {
    position: absolute;
    width: 100px;
    top: 220px;
    right: -25px;
  }

  .right-img5 {
    position: absolute;
    top: 370px;
    right: -10px;
    width: 100px;
  }

  .right-img6 {
    position: absolute;
    width: 100px;
    top: 360px;
    right: 70px;
  }
}

@media (min-width: 376px) and (max-width: 540px) {
  .img1 {
    right: -13%;
    width: 220px;
  }

  .img2 {
    left: -13%;
    width: 220px;
  }

  h3 {
    font-size: 30px;
  }

  .left-img {
    position: absolute;
    left: -5%;
    top: 40%;
    max-width: 400px;
  }

  .mid-img {
    position: absolute;
    left: 29%;
    top: 40%;
    max-width: 400px;
  }

  .right-img {
    position: absolute;
    right: -10%;
    top: 40%;
    max-width: 400px;
  }

  .left-img2 {
    position: absolute;
    left: 5%;
    top: 35%;
    width: 250px;
  }

  .right-info {
    position: absolute;
    top: 35%;
    right: 11%;
    width: 100px;
  }

  .left1-img {
    position: absolute;
    width: 180px;
    top: 300px;
    left: -70px;
  }

  .question-mark {
    position: absolute;
    width: 50px;
    top: 240px;
    left: 25px;
  }

  .ex-mark {
    position: absolute;
    top: 160px;
    width: 25px;
    right: 30px;
  }

  .right-img1 {
    position: absolute;
    width: 100px;
    top: 275px;
    right: 70px;
  }

  .right-img2 {
    position: absolute;
    width: 100px;
    top: 295px;
    right: -10px;
  }

  .right-img3 {
    position: absolute;
    width: 100px;
    top: 200px;
    right: 50px;
  }

  .right-img4 {
    position: absolute;
    width: 100px;
    top: 220px;
    right: -25px;
  }

  .right-img5 {
    position: absolute;
    top: 370px;
    right: -10px;
    width: 100px;
  }

  .right-img6 {
    position: absolute;
    width: 100px;
    top: 360px;
    right: 70px;
  }
}

@media (min-width: 540px) and (max-width: 767px) {
  .img1 {
    right: -13%;
    width: 220px;
  }

  .img2 {
    left: -13%;
    width: 220px;
  }

  h3 {
    font-size: 30px;
  }

  .left-img {
    position: absolute;
    left: 7%;
    top: 40%;
    max-width: 400px;
  }

  .mid-img {
    position: absolute;
    left: 33%;
    top: 40%;
    max-width: 400px;
  }

  .right-img {
    position: absolute;
    right: 7%;
    top: 40%;
    max-width: 400px;
  }

  .left-img2 {
    position: absolute;
    left: 5%;
    top: 35%;
    width: 250px;
  }

  .right-info {
    position: absolute;
    top: 35%;
    right: 15%;
    width: 100px;
  }

  .left1-img {
    position: absolute;
    width: 180px;
    top: 300px;
    left: -70px;
  }

  .question-mark {
    position: absolute;
    width: 50px;
    top: 240px;
    left: 25px;
  }

  .ex-mark {
    position: absolute;
    top: 160px;
    width: 25px;
    right: 30px;
  }

  .right-img1 {
    position: absolute;
    width: 100px;
    top: 275px;
    right: 70px;
  }

  .right-img2 {
    position: absolute;
    width: 100px;
    top: 295px;
    right: -10px;
  }

  .right-img3 {
    position: absolute;
    width: 100px;
    top: 200px;
    right: 50px;
  }

  .right-img4 {
    position: absolute;
    width: 100px;
    top: 220px;
    right: -25px;
  }

  .right-img5 {
    position: absolute;
    top: 370px;
    right: -10px;
    width: 100px;
  }

  .right-img6 {
    position: absolute;
    width: 100px;
    top: 360px;
    right: 70px;
  }
}

@media (min-width: 768px) and (max-width: 908px) {
  .img1 {
    right: -8.5%;
    width: 300px;
  }

  .img2 {
    left: -8.5%;
    width: 300px;
  }

  h3 {
    font-size: 40px;
  }

  .header {
    font-size: 60px;
  }

  .title-img {
    width: 47px;
    height: 47px;
  }
  .left-img {
    position: absolute;
    left: 21%;
    top: 40%;
    max-width: 400px;
  }

  .mid-img {
    position: absolute;
    left: 38%;
    top: 40%;
    max-width: 400px;
  }

  .right-img {
    position: absolute;
    right: 21.5%;
    top: 40%;
    max-width: 400px;
  }

  .left-img2 {
    position: absolute;
    left: 30%;
    top: 35%;
    width: 250px;
  }

  .right-info {
    position: absolute;
    top: 35%;
    right: 25%;
    width: 100px;
  }

  .left1-img {
    position: absolute;
    width: 350px;
    top: 300px;
    left: -70px;
  }

  .question-mark {
    position: absolute;
    width: 100px;
    top: 190px;
    left: 95px;
  }

  .ex-mark {
    position: absolute;
    top: 120px;
    width: 45px;
    right: 80px;
  }

  .right-img1 {
    position: absolute;
    width: 230px;
    top: 360px;
    right: 150px;
  }

  .right-img2 {
    position: absolute;
    width: 230px;
    top: 380px;
    right: -40px;
  }

  .right-img3 {
    position: absolute;
    width: 230px;
    top: 180px;
    right: 100px;
  }

  .right-img4 {
    position: absolute;
    width: 230px;
    top: 210px;
    right: -50px;
  }

  .right-img5 {
    position: absolute;
    width: 230px;
    top: 550px;
    right: -40px;
  }

  .right-img6 {
    position: absolute;
    width: 230px;
    top: 550px;
    right: 140px;
  }
}

@media (min-width: 912px) and (max-width: 1240px) {
  .img1 {
    right: -8.5%;
    width: 300px;
  }

  .img2 {
    left: -8.5%;
    width: 300px;
  }

  h3 {
    font-size: 40px;
  }

  .header {
    font-size: 60px;
  }

  .title-img {
    width: 47px;
    height: 47px;
  }

  .left-img {
    position: absolute;
    left: 25%;
    top: 40%;
    max-width: 400px;
  }

  .mid-img {
    position: absolute;
    left: 40%;
    top: 40%;
    max-width: 400px;
  }

  .right-img {
    position: absolute;
    right: 25%;
    top: 40%;
    max-width: 400px;
  }

  .left-img2 {
    position: absolute;
    left: 30%;
    top: 35%;
    width: 250px;
  }

  .right-info {
    position: absolute;
    top: 35%;
    right: 30%;
    width: 100px;
  }
  .left1-img {
    position: absolute;
    width: 350px;
    top: 300px;
    left: -70px;
  }

  .question-mark {
    position: absolute;
    width: 100px;
    top: 190px;
    left: 95px;
  }

  .ex-mark {
    position: absolute;
    top: 120px;
    width: 45px;
    right: 80px;
  }

  .right-img1 {
    position: absolute;
    width: 230px;
    top: 360px;
    right: 150px;
  }

  .right-img2 {
    position: absolute;
    width: 230px;
    top: 380px;
    right: -40px;
  }

  .right-img3 {
    position: absolute;
    width: 230px;
    top: 180px;
    right: 100px;
  }

  .right-img4 {
    position: absolute;
    width: 230px;
    top: 210px;
    right: -50px;
  }

  .right-img5 {
    position: absolute;
    width: 230px;
    top: 550px;
    right: -40px;
  }

  .right-img6 {
    position: absolute;
    width: 230px;
    top: 550px;
    right: 140px;
  }
}

@media (min-width: 1240px) and (max-width: 1620px) {
  .img1 {
    right: -6.5%;
    width: 300px;
  }

  .img2 {
    left: -6.5%;
    width: 300px;
  }

  h3 {
    font-size: 40px;
  }

  .header {
    font-size: 60px;
  }

  .title-img {
    width: 47px;
    height: 47px;
  }

  .left-img {
    position: absolute;
    left: 37%;
    top: 40%;
    max-width: 400px;
  }

  .mid-img {
    position: absolute;
    left: 46%;
    top: 40%;
    max-width: 400px;
  }

  .right-img {
    position: absolute;
    right: 34%;
    top: 40%;
    max-width: 400px;
  }

  .left-img2 {
    position: absolute;
    left: 33%;
    top: 35%;
    width: 250px;
  }

  .right-info {
    position: absolute;
    top: 35%;
    right: 39%;
    width: 100px;
  }

  .left1-img {
    position: absolute;
    width: 350px;
    top: 300px;
    left: -70px;
  }

  .question-mark {
    position: absolute;
    width: 100px;
    top: 190px;
    left: 95px;
  }

  .ex-mark {
    position: absolute;
    top: 10px;
    width: 45px;
    right: 80px;
  }

  .right-img1 {
    position: absolute;
    width: 200px;
    top: 240px;
    right: 130px;
  }

  .right-img2 {
    position: absolute;
    width: 200px;
    top: 260px;
    right: -40px;
  }

  .right-img3 {
    position: absolute;
    width: 200px;
    top: 90px;
    right: 100px;
  }

  .right-img4 {
    position: absolute;
    width: 200px;
    top: 120px;
    right: -30px;
  }

  .right-img5 {
    position: absolute;
    width: 200px;
    top: 400px;
    right: -30px;
  }

  .right-img6 {
    position: absolute;
    width: 200px;
    top: 400px;
    right: 120px;
  }
}

@media (min-width: 1630px) and (max-width: 1920px) {
  .img1 {
    right: -6.5%;
    width: 300px;
  }

  .img2 {
    left: -6.5%;
    width: 300px;
  }

  h3 {
    font-size: 40px;
  }

  .header {
    font-size: 60px;
  }

  .title-img {
    width: 47px;
    height: 47px;
  }

  .left-img {
    position: absolute;
    left: 38%;
    top: 40%;
    max-width: 400px;
  }

  .mid-img {
    position: absolute;
    left: 45%;
    top: 40%;
    max-width: 400px;
  }

  .right-img {
    position: absolute;
    right: 38%;
    top: 40%;
    max-width: 400px;
  }

  .left-img2 {
    position: absolute;
    left: 33%;
    top: 35%;
    width: 250px;
  }

  .right-info {
    position: absolute;
    top: 35%;
    right: 39%;
    width: 100px;
  }

  .left1-img {
    position: absolute;
    width: 350px;
    top: 300px;
    left: -70px;
  }

  .question-mark {
    position: absolute;
    width: 100px;
    top: 190px;
    left: 95px;
  }

  .ex-mark {
    position: absolute;
    top: 10px;
    width: 45px;
    right: 80px;
  }

  .right-img1 {
    position: absolute;
    width: 200px;
    top: 240px;
    right: 130px;
  }

  .right-img2 {
    position: absolute;
    width: 200px;
    top: 260px;
    right: -40px;
  }

  .right-img3 {
    position: absolute;
    width: 200px;
    top: 90px;
    right: 100px;
  }

  .right-img4 {
    position: absolute;
    width: 200px;
    top: 120px;
    right: -30px;
  }

  .right-img5 {
    position: absolute;
    width: 200px;
    top: 400px;
    right: -30px;
  }

  .right-img6 {
    position: absolute;
    width: 200px;
    top: 400px;
    right: 120px;
  }
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

.btn-start.disabled {
  background-color: #f59607; /* 버튼 비활성화 시 적용될 색상 */
}
</style>
