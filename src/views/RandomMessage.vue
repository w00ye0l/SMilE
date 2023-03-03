<template>
  <div class="title background">
    <h2>랜덤 쪽지</h2>
    <div class="type-container">
      <div @click="selectMBti" class="select">
        <div class="selected">
          <span class="selected-value">{{ this.mbti }}</span>
          <img :src="require(`@/assets/arrow.png`)" class="arrow" />
        </div>
        <ul
          class="select-option"
          v-bind:class="{ active: selectMbti }"
          @scroll="listScroll"
        >
          <li
            class="option"
            v-for="(item, index) in mbtiList"
            :key="index"
            v-on:click="selectMbtiOption(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="images">
      <img :src="require(`@/assets/randomimg1.png`)" class="img1" />
      <img :src="require(`@/assets/randomimg3.png`)" class="img2" />
      <img :src="require(`@/assets/randomimg2.png`)" class="img3" />
    </div>
    <div class="btn-control">
      <div class="re-cover">
        <button class="re-btn">
          <img :src="require(`@/assets/re.png`)" class="re" />
        </button>
      </div>
      <div class="letter-cover">
        <button class="letter-btn" @click="pageLink">
          <img :src="require(`@/assets/letter.png`)" class="letter" />
        </button>
      </div>
    </div>
    <div class="btn-name">
      <span class="btn-name1">다시</span>
      <span class="btn-name2">전송</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectMbti: false,
      mbti: "선택해주세요",
      mbtiList: [
        { name: "ENFJ" },
        { name: "ENFP" },
        { name: "ENTJ" },
        { name: "ENTP" },
        { name: "ESFJ" },
        { name: "ESFP" },
        { name: "ESTJ" },
        { name: "ESTP" },
        { name: "INFJ" },
        { name: "INFP" },
        { name: "INTJ" },
        { name: "INTP" },
        { name: "ISTJ" },
        { name: "ISTP" },
        { name: "ISFJ" },
        { name: "ISFP" },
      ],
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "sendmessage" });
    },
    selectMBti() {
      if (this.selectMbti === true) {
        this.selectMbti = false;
      } else {
        this.selectMbti = true;
      }
    },
    selectMbtiOption(option) {
      this.mbti = option;
    },
  },
};
</script>
<style scoped>
.title {
  margin: 0;
  padding: 30px 0 20px 0;
}

.background {
  background-color: #fff9c8;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.type-container {
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
}

.type {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-weight: bold;
  background-color: #fff9c8;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  -webkit-appearance: none; /* 크롬 화살표 없애기 */
  -moz-appearance: none; /* 파이어폭스 화살표 없애기 */
  appearance: none; /* 화살표 없애기 */
  text-align: center; /* 텍스트 가운데 정렬 */
}

.select-option {
  padding: 0;
  list-style-type: none;
}

.select {
  display: inline-block;
  width: 50px;
  height: 50px;
}

.selected {
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.selected-value {
  margin: 0;
}

.arrow {
  margin-left: 15px;
}

.select-option {
  display: none;
  position: relative;
  z-index: 10;
}

.active {
  display: initial;
}

.option {
  margin: 10px 0;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
}

.images {
  height: 400px;
}

.img1 {
  position: absolute;
  left: -55px;
  top: 250px;
  width: 230px;
}

.img2 {
  position: absolute;
  top: 250px;
  right: -40px;
  width: 230px;
}

.img3 {
  position: absolute;
  top: 220px;
  right: 130px;
  width: 160px;
}

.btn-control {
  display: flex;
  justify-content: space-evenly;
}

.re-cover {
  width: 85px;
  height: 75px;
  border-radius: 15px;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  background-color: white;
}
.re {
  width: 50px;
  height: 50px;
  margin-top: 15px;
}

.letter-cover {
  width: 85px;
  height: 75px;
  border-radius: 15px;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  background-color: white;
}

.letter {
  width: 55px;
  height: 40px;
  margin-top: 17px;
}

.btn-name {
  display: flex;
  justify-content: space-evenly;
}

.btn-name1 {
  font-size: 20px;
  font-weight: bold;
  margin: 5px 25px 0 0;
}

.btn-name2 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
}

.re-btn {
  border: none;
  background-color: transparent;
}

.letter-btn {
  border: none;
  background-color: transparent;
}
</style>
