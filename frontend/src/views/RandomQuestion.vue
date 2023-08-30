<template>
  <div class="main-section">
    <h2 class="title-name">오늘의 질문</h2>

    <div class="question">
      <p class="letter">{{ message }}</p>
    </div>

    <form @submit.prevent="submitForm" class="my-answer">
      <h3 class="second-title">나의 답변</h3>
      <textarea
        v-model="memo"
        class="memo-box"
        @input="updateAnswer()"
        placeholder="내용을 입력하세요"
      >
      </textarea>
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
      <p class="total-mbti">
        {{ totalMbti === "____" ? "모든 사람" : totalMbti }}들의 답변 보기
      </p>
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
            this.$store.commit("SET_ANSWERED", true);
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
      this.$store.state.totalMbti = this.totalMbti;
      this.$router.push({ path: "randomanswer" });
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
  margin: 0;
  padding: 50px 0;
}

.main-section {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  height: 100%;
  position: relative;
  overflow: auto;
}

.question {
  background-color: #fff9c8;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  font-weight: bold;
  padding: 0 50px;
  font-size: 18px;
}

.my-answer {
  padding: 0 40px;
  width: 100%;
  max-height: 33vh;
}

.second-title {
  display: flex;
  margin-bottom: 0;
  font-size: 20px;
}

.memo-box {
  margin: 20px 0;
  padding: 10px;
  width: 100%;
  height: 100px;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  white-space: pre-line;
}

.btn-control {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.btn {
  margin: 0;
  width: 100px;
  height: 36px;
  font-size: 15px;
  font-weight: bold;
  background-color: #f59607;
  border: none;
  border-radius: 20px;
}

@media (min-width: 541px) {
  .main-section {
    padding: 0 30px;
  }

  .question {
    height: 14%;
    border-radius: 20px;
  }

  .other-answer {
    height: 45%;
    border-radius: 20px;
  }

  .select-option {
    position: relative;
  }
}

@media (max-width: 540px) {
  .main-section {
    margin-bottom: 80px;
  }

  .question {
    height: 15vh;
  }

  .other-answer {
    height: 40vh;
  }

  .select-option {
    position: absolute;
    top: -420%;
    left: 0;
  }
}

.other-answer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff9c8;
}

.third-title {
  margin: 0;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  font-size: 24px;
}

.type-container {
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
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

.total-mbti {
  font-size: 18px;
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
