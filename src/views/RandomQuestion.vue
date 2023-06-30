<template>
  <div class="title background">
    <h2 class="title-name">오늘의 질문</h2>
    <div class="question">
      <span class="letter">{{ this.message }}</span>
    </div>
    <form @submit.prevent="submitForm" class="my-answer">
      <h3 class="second-title">나의 답변</h3>
      <div class="memo-box">
        <textarea
          v-model="memo"
          class="text"
          @input="updateAnswer()"
          placeholder="내용을 입력하세요"
        >
        </textarea>
      </div>
      <div class="btn-control">
        <button class="btn" @click="completed()">작성 완료</button>
      </div>
    </form>
    <div class="other-answer">
      <h3 class="third-title">다른 사람들의 답변</h3>
      <div class="type-container">
        <div v-on:click="selectMBTI('EI')" class="select">
          <div class="selected">
            <p class="selected-value">{{ mbti1 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectEI }">
            <li class="option" v-on:click="selectEIOption('_')">_</li>
            <li class="option" v-on:click="selectEIOption('E')">E</li>
            <li class="option" v-on:click="selectEIOption('I')">I</li>
          </ul>
        </div>
        <div v-on:click="selectMBTI('NS')" class="select">
          <div class="selected">
            <p class="selected-value">{{ mbti2 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectNS }">
            <li class="option" v-on:click="selectNSOption('_')">_</li>
            <li class="option" v-on:click="selectNSOption('N')">N</li>
            <li class="option" v-on:click="selectNSOption('S')">S</li>
          </ul>
        </div>
        <div v-on:click="selectMBTI('TF')" class="select">
          <div class="selected">
            <p class="selected-value">{{ mbti3 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectTF }">
            <li class="option" v-on:click="selectTFOption('_')">_</li>
            <li class="option" v-on:click="selectTFOption('T')">T</li>
            <li class="option" v-on:click="selectTFOption('F')">F</li>
          </ul>
        </div>
        <div v-on:click="selectMBTI('PJ')" class="select">
          <div class="selected">
            <p class="selected-value">{{ mbti4 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectPJ }">
            <li class="option" v-on:click="selectPJOption('_')">_</li>
            <li class="option" v-on:click="selectPJOption('P')">P</li>
            <li class="option" v-on:click="selectPJOption('J')">J</li>
          </ul>
        </div>
      </div>
      <p class="total-mbti">{{ totalMbti }}들의 답변</p>
      <button class="btn-more" @click="pageLink">더보기</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      randomMessage: [],
      memo: "",
      newAnswer: null,
      selectEI: false,
      selectNS: false,
      selectTF: false,
      selectPJ: false,
      mbti1: "_",
      mbti2: "_",
      mbti3: "_",
      mbti4: "_",
      totalMbti: "____",
      message: "",
    };
  },
  mounted() {
    this.getRandomMessage();
  },
  methods: {
    async getRandomMessage() {
      await axios
        .get("/random/question", { withCredentials: true })
        .then((res) => {
          this.randomMessage = res.data;
          this.message = this.randomMessage.question;
          this.$store.commit("SET_ID", this.randomMessage.id);
          console.log(this.randomMessage);
        });
    },
    validComment() {
      if (!this.memo.trim()) {
        alert("내용을 입력해주세요");
        return false;
      }
      return true;
    },
    async completed() {
      if (this.validComment()) {
        const formData = {
          questionID: this.$store.state.id,
          answer: this.memo,
        };
        await axios
          .post(`/random/answer/${this.$store.state.id}/create`, formData, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response) {
              if (
                error.response.data.message ===
                "이미 해당 질문에 대한 답변을 작성하셨습니다."
              ) {
                alert("이미 작성하셨습니다");
              }
            }
          });
        this.memo = "";
      }
    },
    pageLink() {
      if (
        this.mbti1 === "" &&
        this.mbti2 === "" &&
        this.mbti3 === "" &&
        this.mbti4 === ""
      ) {
        alert("적어도 하나의 MBTI를 선택해주세요");
      } else {
        this.$store.state.totalMbti = this.totalMbti;
        this.$router.push({ path: "randomanswer" });
      }
    },
    selectMBTI(selected) {
      if (selected === "EI") {
        if (this.selectEI === true) {
          this.selectEI = false;
        } else {
          this.selectEI = true;
        }
      }
      if (selected === "NS") {
        if (this.selectNS === true) {
          this.selectNS = false;
        } else {
          this.selectNS = true;
        }
      }
      if (selected === "TF") {
        if (this.selectTF === true) {
          this.selectTF = false;
        } else {
          this.selectTF = true;
        }
      }
      if (selected === "PJ") {
        if (this.selectPJ === true) {
          this.selectPJ = false;
        } else {
          this.selectPJ = true;
        }
      }
    },
    selectEIOption(option) {
      this.mbti1 = option;
      this.$store.commit("SET_MBTI1", this.mbti1);
      this.totalMbti += this.mbti1;
      this.updateTotalMbti();
    },
    selectNSOption(option) {
      this.mbti2 = option;
      this.$store.commit("SET_MBTI2", this.mbti2);
      this.totalMbti += this.mbti2;
      this.updateTotalMbti();
    },
    selectTFOption(option) {
      this.mbti3 = option;
      this.$store.commit("SET_MBTI3", this.mbti3);
      this.totalMbti += this.mbti3;
      this.updateTotalMbti();
    },
    selectPJOption(option) {
      this.mbti4 = option;
      this.$store.commit("SET_MBTI4", this.mbti4);
      this.totalMbti += this.mbti4;
      this.updateTotalMbti();
    },
    updateTotalMbti() {
      this.totalMbti = "";
      if (this.mbti1 !== "") this.totalMbti += this.mbti1;
      if (this.mbti2 !== "") this.totalMbti += this.mbti2;
      if (this.mbti3 !== "") this.totalMbti += this.mbti3;
      if (this.mbti4 !== "") this.totalMbti += this.mbti4;
    },
    updateAnswer() {
      this.newAnswer = {
        mbti: this.totalMbti,
        content: this.memo,
        date: new Date().toLocaleDateString(),
      };
    },
  },
};
</script>
<style scoped>
.title-name {
  font-size: 24px;
}
.title {
  margin: 0;
  margin-bottom: 80px;
  padding: 0;
}
.background {
  background-color: #ffffff;
  height: 100vh;
  position: relative;
  overflow: auto;
}
.question {
  background-color: #fff9c8;
  height: 23%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  font-weight: bold;
  padding: 0 50px 0 50px;
  font-size: 20px;
}

.my-answer {
  max-height: 33vh;
  margin-bottom: 4vw;
}

.second-title {
  display: flex;
  padding: 0 2.5vw 0 10.25vw;
  margin-bottom: 5px;
  font-size: 24px;
}

textarea {
  font-size: 24px;
}

.memo-box {
  width: 80vw;
  margin: 10px 0 18px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 18vh;
  max-height: 21vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
}

.text {
  margin-top: 20px;
  width: 70.8vw;
  height: 13.2vh;
  border: none;
}

.btn-control {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.btn {
  border-radius: 20px;
  width: 100px;
  height: 36px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  background-color: #f59607;
  margin: 1.3% 9% 0 0;
}

.other-answer {
  min-height: 45vh;
  background-color: #fff9c8;
}

.third-title {
  display: flex;
  padding: 2.5vw 2.5vw 0 10vw;
  font-size: 24px;
}

.type-container {
  padding: 0 0 10px 0;
  display: flex;
  justify-content: space-evenly;
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
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #ffe99d;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.total-mbti {
  font-size: 18px;
}

.selected-value {
  margin: 0;
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
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #fff9c8;
  border-radius: 50%;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
}

.btn-more {
  border-radius: 20px;
  width: 100px;
  height: 36px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  background-color: #ffd338;
}
</style>
