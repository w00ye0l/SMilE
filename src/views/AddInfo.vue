<template>
  <div class="head">
    <h2>MBTI 정보 추가</h2>
  </div>
  <div class="body-color">
    <span class="category-name">MBTI 정보</span>
    <span class="name">이름</span>
    <input
      type="text"
      placeholder="이름"
      v-model="nameId"
      class="name-input-box"
    />
    <span class="mbti">MBTI</span>
    <div class="type-container">
      <div @click="selectMBti" class="select">
        <div class="selected">
          <span class="selected-value">{{ this.mbti }}</span>
          <img :src="require(`@/assets/Polygon.png`)" class="arrow" />
        </div>
        <ul class="select-option" v-bind:class="{ active: selectMbti }">
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
    <span class="group">그룹</span>
    <div class="btn-control">
      <button class="family">가족</button>
      <button class="friend">친구</button>
      <button class="coworker">직장 동료</button>
    </div>
    <span class="memo">메모</span>
    <div class="memo-box">
      <br />
      <textarea v-model="memo" class="text"></textarea>
    </div>
    <div class="add-cancel-control">
      <button class="add-btn" @click="pageLink">추가</button>
      <button class="cancel-btn" @click="pageLink">취소</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectMbti: false,
      nameId: "",
      mbti: "선택해주세요",
      memo: "",
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
      this.$router.push({ path: "savingmbti" });
    },
    selectMBti() {
      console.log(1);
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
.head {
  height: 100px;
}
.body-color {
  height: 86.5vh;
  background-color: #fff9c8;
}

.category-name {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 30px;
}

.name {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 30px;
}
.name-input-box {
  width: 90vw;
  margin: 15px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 45px;
  display: inline-block;
}
input::placeholder {
  text-indent: 15px;
}

.mbti {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 30px;
}
.group {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 20px;
}
.btn-control {
  display: flex;
  justify-content: flex-start;
}

.family {
  background-color: #ffd338;
  width: 3rem;
  height: 2rem;
  border-radius: 1.7rem;
  border: none;
  margin: 1rem 0.8rem 0 1.5rem;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.friend {
  background-color: #ffd338;
  width: 3rem;
  height: 2rem;
  border-radius: 1.7rem;
  border: none;
  margin: 1rem 0.8rem 0 0;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.coworker {
  background-color: #ffd338;
  width: 5rem;
  height: 2rem;
  border-radius: 1.7rem;
  border: none;
  margin: 1rem 0.8rem 0 0;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.memo {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 20px;
}

.memo-box {
  width: 90vw;
  margin: 15px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 18vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
}

.text {
  width: 86.8vw;
  height: 15.2vh;
  border: none;
}

.add-cancel-control {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}

.add-btn {
  width: 100px;
  height: 40px;
  border-radius: 18px;
  border: none;
  background-color: #f59607;
  margin-left: 50px;
  font-size: 17px;
}

.cancel-btn {
  width: 100px;
  height: 40px;
  border-radius: 18px;
  border: none;
  background-color: #ffffff;
  margin-right: 50px;
  font-size: 17px;
}
.type-container {
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
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

.select {
  display: inline-block;
  width: 90vw;
  height: 50px;
}

.select-option {
  padding: 0;
  list-style-type: none;
  height: 240px;
  width: 80vw;
  overflow: hidden;
  overflow-y: scroll;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
}
.select-box {
  width: 50vw;
  margin: 15px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 45px;
  display: inline-block;
  background-color: white;
}

.selected {
  width: 90vw;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.select-option {
  display: none;
  position: relative;
  z-index: 10;
}

.selected-value {
  margin: 0 0 0 15px;
}
.active {
  display: block;
}

.option {
  margin: 2px 0 10px 20px;
  width: 70vw;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
}

.arrow {
  margin-right: 30px;
}
</style>
