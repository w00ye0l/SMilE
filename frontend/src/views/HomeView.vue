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
      class="my-swiper"
    >
      <swiper-slide class="wrap-swiper">
        <div class="slider">
          <div class="main-content">
            <h3>
              <span>주변 사람들의</span><br />
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
          <div class="main-content second">
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
          <div class="main-content">
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
          <div class="main-content">
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
  margin: 0;
  position: relative;
  background-color: #fff9c8;
  min-height: 100vh;
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
/*모바일*/
@media (max-width: 541px) {
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
/* 웹 */
@media (min-width: 541px) {
  .img1 {
    right: -5%;
    width: 40%;
  }

  .img2 {
    left: -7%;
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
    left: 18%;
    top: 30%;
    width: 25%;
  }

  .mid-img {
    position: absolute;
    left: 37%;
    top: 30%;
    width: 25%;
  }

  .right-img {
    position: absolute;
    right: 20%;
    top: 30%;
    width: 25%;
  }

  .left-img2 {
    position: absolute;
    left: 30%;
    top: 35%;
    width: 25%;
  }

  .right-info {
    position: absolute;
    top: 33%;
    right: 33%;
    width: 10%;
  }

  /* 4*/
  .left1-img {
    position: absolute;
    width: 25%;
    top: 30%;
    left: -8%;
  }

  .question-mark {
    position: absolute;
    width: 8%;
    top: 20%;
    left: 6%;
  }

  .ex-mark {
    position: absolute;
    top: 10%;
    width: 3%;
    right: 3%;
  }

  .right-img1 {
    position: absolute;
    width: 15%;
    top: 29%;
    right: 8%;
  }

  .right-img2 {
    position: absolute;
    width: 15%;
    top: 34%;
    right: -3%;
  }

  .right-img3 {
    position: absolute;
    width: 15%;
    top: 15%;
    right: 5%;
  }

  .right-img4 {
    position: absolute;
    width: 15%;
    top: 20%;
    right: -5%;
  }

  .right-img5 {
    position: absolute;
    width: 15%;
    top: 47%;
    right: -2%;
  }

  .right-img6 {
    position: absolute;
    width: 15%;
    top: 44%;
    right: 10%;
  }
  .my-swiper {
    width: 100%;
  }
  .main-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h3 {
    text-align: center;
    font-size: 30px;
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
