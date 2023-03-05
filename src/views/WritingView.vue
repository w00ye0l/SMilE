<template>
  <div class="title background">
    <h2>글 쓰기</h2>
    <div class="btn-control">
      <div class="text">hide text</div>
      <div>
        <button class="btn-temp">임시저장</button>
        <button class="btn-create">작성</button>
      </div>
    </div>
    <div class="second-title">
      <h3>추가</h3>
    </div>
    <div class="select">
      <div class="type-container">
        <div @click="selectMBti" class="select">
          <div class="selected">
            <span class="selected-value">{{ this.mbti }}</span>
            <img :src="require(`@/assets/arrow2.png`)" class="arrow" />
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectMbti: false,
      mbti: "ENFP",
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
  background-color: #ffffff;
  height: 100vh;
  position: relative;
}

.btn-control {
  display: flex;
  justify-content: space-around;
}

.text {
  text-indent: -9999px;
}

.btn-temp {
  margin: 0 10px 0 30px;
  border-radius: 20px;
  width: 80px;
  height: 35px;
  border: 1px solid #ffd338;
  background-color: transparent;
}

.btn-create {
  margin-right: 10px;
  border-radius: 20px;
  width: 60px;
  height: 35px;
  border: none;
  background-color: #ffd338;
}

.second-title {
  float: left;
  margin-left: 30px;
}

.select {
  float: left;
  margin: 15px 25px 0 0;
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
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
}

.selected-value {
  margin: 0;
  font-weight: 500;
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
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
}
</style>
