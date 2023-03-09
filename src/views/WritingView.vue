<template>
  <div class="title background">
    <h2>글 쓰기</h2>
    <div class="btn-control">
      <div class="text">hide text</div>
      <div>
        <button class="btn-temp" @click="tempSave()">임시저장</button>
        <button class="btn-create">작성</button>
      </div>
    </div>
    <div class="second-title">
      <h3>추가</h3>
    </div>
    <div class="select">
      <div class="type-container btn-class">
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
        <div>
          <button class="plus-btn" @click="changeName()">
            <img :src="require(`@/assets/plus.png`)" class="plus" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="message-height">
    <hr class="hr" />
    <div class="third-title">
      <div class="mbti-cancel">
        <h3 class="mbti-title">{{ title }}</h3>
        <button v-show="isShow" class="btn-cancel" @click="remove(value)">
          <img :src="require(`@/assets/close.png`)" class="close" />
        </button>
      </div>
    </div>
    <div class="memo-box">
      <textarea
        v-model="content"
        class="text-box"
        placeholder="내용을 입력하세요"
      >
      </textarea>
    </div>
  </div>
  <hr class="hr2" />
  <div>
    <h3 class="complete">임시 저장</h3>
    <div class="mbti-btn-control">
      <div
        v-for="(item, value) in mbti_complete"
        :key="value"
        class="mbti-completed"
      >
        <button class="temp-button" @click="call_btn(value)">
          {{ value }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      title: "",
      selectMbti: false,
      mbti: "선택",
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
      mbti_complete: {},
      isShow: false,
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
    changeName() {
      this.content = "";
      this.title = this.mbti;
      this.isShow = true;
    },
    tempSave() {
      if (Object.keys(this.mbti_complete).length < 4) {
        this.mbti_complete[this.mbti] = this.content;
      } else {
        alert("4개 이상 만들 수 없습니다");
      }
    },

    remove() {
      if (confirm("삭제하시겠습니까?")) {
        for (const key in this.mbti_complete) {
          if (`${key}` === this.mbti) {
            delete this.mbti_complete[key];
            this.title = "";
            this.content = "";
            this.isShow = false;
          }
        }
      }
    },
    call_btn(mbti) {
      for (const [key, value] of Object.entries(this.mbti_complete)) {
        console.log(key, value);
        if (key === mbti) {
          this.title = key;
          this.content = this.mbti_complete[key];
          this.isShow = true;
          this.mbti = key;
        }
      }
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
  height: 30vh;
  position: relative;
}

.btn-control {
  display: flex;
  justify-content: space-between;
  margin-right: 30px;
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
  margin-left: 45px;
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
  margin-right: 80px;
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
  overflow: hidden;
  overflow-y: scroll;
  height: 180px;
  width: 100px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
}

.select {
  display: inline-block;
  width: 100px;
  height: 50px;
  margin-left: 20px;
}

.selected {
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: white;
  border-radius: 5px;
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
  display: block;
}

.option {
  margin: 3px 0 10px 8px;
  width: 80px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
}
.plus {
  width: 25px;
  height: 25px;
}

.message-height {
  height: 50.3vh;
}
.hr {
  width: 80vw;
}

.third-title {
  padding-left: 40px;
}

.mbti-cancel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
}
.mbti-title {
  font-weight: 500;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-thickness: 2px;
}

.btn-cancel {
  background-color: transparent;
  border: none;
}
.close {
  width: 20px;
  height: 20px;
}
.memo-box {
  width: 80vw;
  margin: 10px 0 15px 0;
  border-radius: 15px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 40vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
}

.text-box {
  margin-top: 20px;
  width: 70.8vw;
  height: 35vh;
  border: none;
}

.hr2 {
  width: 80vw;
}

.complete {
  display: flex;
  padding-left: 40px;
  font-weight: 600;
}

.mbti-btn-control {
  display: flex;
  justify-content: space-evenly;
  width: 99.3vw;
}

.mbti-completed {
  font-weight: 500;
  border-radius: 5px;
  background-color: #ffe99d;
  width: 55px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plus-btn {
  border: none;
  background-color: transparent;
}

.temp-button {
  border: none;
  background-color: transparent;
}
</style>
