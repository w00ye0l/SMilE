<template>
  <div class="main-container">
    <h1 class="title">오늘의 질문</h1>

    <!-- 질문 컨테이너 -->
    <div class="container question-container">
      <p class="question">{{ randomQuestion }}</p>
    </div>

    <!-- 나의 답변 -->
    <template v-if="myAnswer">
      <h2 class="sub-title">나의 답변</h2>
      <div class="container my-answer-container">
        <div class="answer-box">
          <p class="my-answer">{{ myAnswer }}</p>
        </div>
        <div class="btn-container">
          <button class="btn" @click="goMyAnswer">자세히 보기</button>
        </div>
      </div>
    </template>
    <template v-else>
      <h2 class="sub-title">나의 답변</h2>
      <form @submit.prevent="submitForm" class="container my-answer-form">
        <textarea
          v-model="answer"
          class="answer-textarea"
          placeholder="내용을 입력하세요"
        >
        </textarea>
        <div class="btn-container">
          <button class="btn" @click="completed">작성 완료</button>
        </div>
      </form>
    </template>

    <!-- 다른 사람들 답변 -->
    <h2 class="sub-title">다른 사람들의 답변</h2>
    <div class="container other-answer-container">
      <p class="total-mbti">
        <span class="selected-mbti">{{
          totalMbti === "____" ? "모든 사람" : totalMbti
        }}</span
        >들의 답변 보기
      </p>

      <!-- MBTI 선택 -->
      <div class="type-container">
        <div v-on:click="selectMBTI('EI')" class="select">
          <div class="selected">
            <p class="selected-value">{{ mbti1 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectEI }">
            <li class="selected option" v-on:click="selectEIOption('E')">E</li>
            <li class="selected option" v-on:click="selectEIOption('I')">I</li>
            <li class="selected option" v-on:click="selectEIOption('_')">_</li>
          </ul>
        </div>
        <div v-on:click="selectMBTI('NS')" class="select">
          <div class="selected">
            <p class="selected-value">{{ mbti2 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectNS }">
            <li class="selected option" v-on:click="selectNSOption('N')">N</li>
            <li class="selected option" v-on:click="selectNSOption('S')">S</li>
            <li class="selected option" v-on:click="selectNSOption('_')">_</li>
          </ul>
        </div>
        <div v-on:click="selectMBTI('TF')" class="select">
          <div class="selected">
            <p class="selected-value">{{ mbti3 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectTF }">
            <li class="selected option" v-on:click="selectTFOption('T')">T</li>
            <li class="selected option" v-on:click="selectTFOption('F')">F</li>
            <li class="selected option" v-on:click="selectTFOption('_')">_</li>
          </ul>
        </div>
        <div v-on:click="selectMBTI('PJ')" class="select">
          <div class="selected">
            <p class="selected-value">{{ mbti4 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectPJ }">
            <li class="selected option" v-on:click="selectPJOption('P')">P</li>
            <li class="selected option" v-on:click="selectPJOption('J')">J</li>
            <li class="selected option" v-on:click="selectPJOption('_')">_</li>
          </ul>
        </div>
      </div>

      <button class="btn btn-more" @click="checkOtherAnswer">더보기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.getRandomMessage();
    this.checkMyAnswer();
  },
  data() {
    return {
      randomQuestionId: "",
      randomQuestion: "",
      answer: "",
      myAnswerObj: {},
      myAnswer: "",
      selectEI: false,
      selectNS: false,
      selectTF: false,
      selectPJ: false,
      mbti1: this.$store.state.mbti1,
      mbti2: this.$store.state.mbti2,
      mbti3: this.$store.state.mbti3,
      mbti4: this.$store.state.mbti4,
    };
  },
  computed: {
    totalMbti() {
      return this.mbti1 + this.mbti2 + this.mbti3 + this.mbti4;
    },
  },
  methods: {
    // 랜덤 질문 가져오기
    async getRandomMessage() {
      await axios
        .get("/random/question", { withCredentials: true })
        .then((res) => {
          console.log(res);
          this.randomQuestion = res.data.question;
          this.randomQuestionId = res.data.id;
          this.$store.commit("SET_RANDOM_QUESTION_ID", res.data.id);
          console.log(this.randomQuestion);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 나의 답변 작성 확인
    async checkMyAnswer() {
      const answerId = this.$store.state.mypage.answered;

      if (answerId !== 0) {
        await axios
          .get("/random/answer/read/" + answerId, { withCredentials: true })
          .then((res) => {
            console.log(res);
            this.myAnswerObj = res.data;
            this.myAnswer = res.data.answer.answer;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 내 답변 확인하기
    goMyAnswer() {
      const params = {
        id: this.myAnswerObj.answer.id,
        // mbti: this.$store.state.mypage.mbti,
      };

      this.$router.push({
        name: "randomanswerdetail",
        params: params,
      });
    },
    // 답변 유효성 검사
    validComment() {
      if (!this.answer.trim()) {
        alert("내용을 입력해주세요");
        return false;
      }
      return true;
    },
    // 답변 작성
    async completed() {
      if (this.validComment()) {
        const formData = {
          questionID: this.$store.state.id,
          answer: this.answer,
        };
        await axios
          .post(`/random/answer/${this.randomQuestionId}/create`, formData, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            this.$store.commit("SET_ANSWERED", res.data.answered);
            alert("작성이 완료되었습니다.");
          })
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
        this.answer = "";
        this.checkMyAnswer();
      }
    },
    // EI 옵션 변경
    selectEIOption(option) {
      this.mbti1 = option;
      this.$store.commit("SET_MBTI1", this.mbti1);
    },
    // NS 옵션 변경
    selectNSOption(option) {
      this.mbti2 = option;
      this.$store.commit("SET_MBTI2", this.mbti2);
    },
    // TF 옵션 변경
    selectTFOption(option) {
      this.mbti3 = option;
      this.$store.commit("SET_MBTI3", this.mbti3);
    },
    // TF 옵션 변경
    selectPJOption(option) {
      this.mbti4 = option;
      this.$store.commit("SET_MBTI4", this.mbti4);
    },
    // 다른 사람 MBTI 변경
    selectMBTI(selected) {
      if (selected === "EI") {
        if (this.selectEI === true) {
          this.selectEI = false;
        } else {
          this.selectEI = true;
          this.selectNS = false;
          this.selectTF = false;
          this.selectPJ = false;
        }
      }
      if (selected === "NS") {
        if (this.selectNS === true) {
          this.selectNS = false;
        } else {
          this.selectEI = false;
          this.selectNS = true;
          this.selectTF = false;
          this.selectPJ = false;
        }
      }
      if (selected === "TF") {
        if (this.selectTF === true) {
          this.selectTF = false;
        } else {
          this.selectEI = false;
          this.selectNS = false;
          this.selectTF = true;
          this.selectPJ = false;
        }
      }
      if (selected === "PJ") {
        if (this.selectPJ === true) {
          this.selectPJ = false;
        } else {
          this.selectEI = false;
          this.selectNS = false;
          this.selectTF = false;
          this.selectPJ = true;
        }
      }
    },
    // 다른 사람 답변 확인
    checkOtherAnswer() {
      // this.$store.state.totalMbti = this.totalMbti;
      console.log(this.totalMbti);
      this.$router.push({
        path: "randomanswer",
        query: {
          mbti: this.totalMbti,
        },
      });
    },
  },
};
</script>

<style scoped>
@media (width > 540px) {
  .main-container {
    padding: 0 30px;
  }

  .container {
    width: 100%;
    margin-bottom: 40px;
  }

  .sub-title {
    width: 100%;
  }

  .my-answer-container {
    margin: 0;
    height: 200px;
  }

  .my-answer-form {
    margin: 0;
    height: 200px;
  }

  .type-container {
    gap: 30px;
  }

  .select-option {
    position: relative;
  }
}

@media (width <= 540px) {
  .main-container {
    margin-bottom: 80px;
  }

  .container {
    margin: 0 20px;
    margin-bottom: 30px;
  }

  .sub-title {
    width: calc(100% -40px);
  }

  .my-answer-container {
    height: 150px;
  }

  .my-answer-form {
    width: calc(100% - 40px);
    height: 150px;
  }

  .other-answer-container {
    width: calc(100% - 40px);
  }

  .type-container {
    gap: 10px;
  }

  .select-option {
    position: absolute;
    top: -420%;
    left: 0;
  }
}

.title {
  margin: 0;
  padding: 50px 0;
  width: 100%;
  font-size: 24px;
  text-align: center;
}

.main-container {
  background-color: #ffffff;
  position: relative;
}

.container {
  display: flex;
  align-items: center;
  border-radius: 10px;
}

.question-container {
  justify-content: center;
  min-height: 100px;
  background-color: #fff9c8;
}

.question {
  margin: 0;
  padding: 20px 50px;
  width: 100%;
  font-size: 18px;
  word-break: keep-all;
}

.sub-title {
  margin: 0 20px;
  margin-bottom: 10px;
  text-align: start;
  font-size: 20px;
}

.my-answer-container {
  flex-direction: column;
  justify-content: space-between;
}

.answer-box {
  width: 100%;
  height: calc(100% - 56px);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow-y: auto;
  word-break: keep-all;
}

.my-answer {
  margin: 0;
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  text-align: start;
  white-space: pre-line;
}

.my-answer-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.answer-textarea {
  margin: 0;
  padding: 10px 20px;
  width: 100%;
  height: calc(100% - 56px);
  font-size: 16px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  white-space: pre-line;
  resize: none;
  outline: 0;
}

.btn-container {
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.btn {
  margin: 0;
  width: 120px;
  height: 40px;
  font-size: 16px;
  color: #fff;
  background-color: #f59607;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.other-answer-container {
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 230px;
  background-color: #fff9c8;
}

.type-container {
  display: flex;
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.select {
  display: inline-block;
  position: relative;
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
  cursor: pointer;
}

.select-option {
  display: none;
  padding: 0;
  list-style-type: none;
  z-index: 10;
}

.selected-value {
  margin: 0;
}

.active {
  display: initial;
}

.option {
  margin: 10px 0;
}

.total-mbti {
  font-size: 18px;
}

.selected-mbti {
  color: #f59607;
  font-weight: bold;
}

.btn-more {
  color: #000;
  background-color: #ffd338;
}
</style>
