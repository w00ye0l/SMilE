<template>
  <div class="main-container">
    <h1 class="title">
      <span class="header">SM</span>
      <img :src="require(`@/assets/title-img-orange.svg`)" class="title-img" />
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
            <h2 class="sub-title">
              <span>주변 사람들의</span><br />
              <span class="mbti">MBTI</span>를 저장해<br />한 눈에 확인하세요!
            </h2>
          </div>
          <img
            :src="require(`@/assets/home_swiper_1.svg`)"
            class="swiper-img swiper-img-1"
          />
        </div>
      </swiper-slide>
      <swiper-slide class="wrap-swiper">
        <div class="slider">
          <div class="main-content second">
            <h2 class="sub-title">
              다른 사람들이<br />
              생각하는 <span class="mbti">MBTI</span>는<br />
              어떤지 같이 확인하세요!
            </h2>
          </div>
          <img
            :src="require(`@/assets/home_swiper_2.svg`)"
            class="swiper-img swiper-img-2"
          />
        </div>
      </swiper-slide>
      <swiper-slide class="wrap-swiper">
        <div class="slider">
          <div class="main-content">
            <h2 class="sub-title">
              일정을 기록하고<br />
              만나는 사람의 <span class="mbti">MBTI</span><br />
              대응법을 익혀요!
            </h2>
          </div>
          <img
            :src="require(`@/assets/home_swiper_3.svg`)"
            class="swiper-img swiper-img-3"
          />
        </div>
      </swiper-slide>
      <swiper-slide class="wrap-swiper">
        <div class="slider">
          <div class="main-content">
            <h2 class="sub-title">
              하루의 하나의 질문을 통해<br />
              다른 <span class="mbti">MBTI</span>의 생각을 확인해요!
            </h2>
          </div>
          <img
            :src="require(`@/assets/home_swiper_4.svg`)"
            class="swiper-img swiper-img-4"
          />
        </div>
      </swiper-slide>
    </swiper>

    <div class="btn-container">
      <button
        class="btn btn-start"
        @click="lastBtn"
        :class="{ disabled: isDisabled }"
      >
        시작하기
      </button>
    </div>
  </div>
</template>

<script>
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
    const onSwiper = () => {};
    const onSlideChange = (swiper) => {
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
/*모바일*/
@media (max-width: 541px) {
  .header {
    font-size: 50px;
  }

  .title-img {
    width: 50px;
    height: 50px;
  }

  .sub-title {
    font-size: 24px;
  }

  .my-swiper {
    height: 75%;
  }

  .swiper-img {
    top: 50%;
  }
}

/* 웹 */
@media (min-width: 541px) {
  .header {
    font-size: 60px;
  }

  .my-swiper {
    width: 100%;
    height: 600px;
  }

  .main-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sub-title {
    text-align: center;
    font-size: 30px;
  }

  .swiper-img {
    top: 60%;
  }
}

.main-container {
  position: relative;
  justify-content: center;
  margin: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff9c8;
}

.header {
  color: #f59607;
  font-weight: bold;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding-top: 30px;
}

.title-img {
  width: 60px;
  height: 60px;
}

.slider {
  position: relative;
  height: 90%;
}

.sub-title {
  margin: 50px 0;
  font-weight: bold;
  text-align: center;
  z-index: 9999;
}

.mbti {
  color: #f59607;
}

.swiper-img {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  cursor: pointer;
}

.btn-start.disabled {
  background-color: #f59607;
}
</style>
