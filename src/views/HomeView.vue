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

@media (max-width: 767px) {
  .img1 {
    right: -12%;
    width: 40%;
  }

  .img2 {
    left: -12%;
    width: 40%;
  }

  h3 {
    font-size: 20px;
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
    left: 5%;
    top: 40%;
    width: 40%;
  }

  .mid-img {
    position: absolute;
    left: 33%;
    top: 40%;
    width: 40%;
  }

  .right-img {
    position: absolute;
    right: 1%;
    top: 40%;
    width: 40%;
  }

  .left-img2 {
    position: absolute;
    left: 15%;
    top: 35%;
    width: 40%;
  }

  .right-info {
    position: absolute;
    top: 33%;
    right: 18%;
    width: 20%;
  }

  /* 4*/
  .left1-img {
    position: absolute;
    width: 60%;
    top: 40%;
    left: -17%;
  }

  .question-mark {
    position: absolute;
    width: 20%;
    top: 25%;
    left: 15%;
  }

  .ex-mark {
    position: absolute;
    top: 20%;
    width: 8%;
    right: 10%;
  }

  .right-img1 {
    position: absolute;
    width: 30%;
    top: 40%;
    right: 17%;
  }

  .right-img2 {
    position: absolute;
    width: 30%;
    top: 45%;
    right: -5%;
  }

  .right-img3 {
    position: absolute;
    width: 30%;
    top: 27%;
    right: 13%;
  }

  .right-img4 {
    position: absolute;
    width: 30%;
    top: 31%;
    right: -8%;
  }

  .right-img5 {
    position: absolute;
    width: 30%;
    top: 59%;
    right: -5%;
  }

  .right-img6 {
    position: absolute;
    width: 30%;
    top: 54%;
    right: 18%;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .img1 {
    right: -10%;
    width: 50%;
  }

  .img2 {
    left: -10%;
    width: 50%;
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
    left: 3%;
    top: 40%;
    width: 40%;
  }

  .mid-img {
    position: absolute;
    left: 30%;
    top: 40%;
    width: 40%;
  }

  .right-img {
    position: absolute;
    right: 4.5%;
    top: 40%;
    width: 40%;
  }

  .left-img2 {
    position: absolute;
    left: 18%;
    top: 35%;
    width: 40%;
  }

  .right-info {
    position: absolute;
    top: 35%;
    right: 23%;
    width: 15%;
  }

  /*4 */
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

@media (min-width: 1024px) {
  .img1 {
    right: -4.2%;
    width: 45%;
  }

  .img2 {
    left: -4.2%;
    width: 45%;
  }

  h3 {
    font-size: 35px;
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
    left: 37.5%;
    top: 40%;
    width: 11%;
  }

  .mid-img {
    position: absolute;
    left: 45%;
    top: 40%;
    width: 11%;
  }

  .right-img {
    position: absolute;
    right: 37%;
    top: 40%;
    width: 11%;
  }

  .left-img2 {
    position: absolute;
    left: 35%;
    top: 41%;
    width: 15%;
  }

  .right-info {
    position: absolute;
    top: 41%;
    right: 40%;
    width: 7%;
  }
  /*4 */
  .left1-img {
    position: absolute;
    width: 25%;
    top: 36%;
    left: -8%;
  }

  .question-mark {
    position: absolute;
    width: 7%;
    top: 23%;
    left: 8%;
  }

  .ex-mark {
    position: absolute;
    top: 15%;
    width: 3%;
    right: 5%;
  }

  .right-img1 {
    position: absolute;
    width: 13%;
    top: 46%;
    right: 8%;
  }

  .right-img2 {
    position: absolute;
    width: 13%;
    top: 52%;
    right: -2%;
  }

  .right-img3 {
    position: absolute;
    width: 13%;
    top: 26%;
    right: 7%;
  }

  .right-img4 {
    position: absolute;
    width: 13%;
    top: 32%;
    right: -2%;
  }

  .right-img5 {
    position: absolute;
    width: 13%;
    top: 70%;
    right: -2%;
  }

  .right-img6 {
    position: absolute;
    width: 13%;
    top: 66%;
    right: 8%;
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
