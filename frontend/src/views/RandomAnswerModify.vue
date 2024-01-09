<template>
  <div class="main-container">
    <div class="title-box">
      <img
        class="prev-btn"
        src="@/assets/back.svg"
        alt="뒤로 가기"
        @click="moveRandomQuestionDetail"
      />
      <h1 class="title">오늘의 질문</h1>
    </div>

    <div class="container question-container">
      <span class="question">{{ randomQuestion.question }}</span>
    </div>

    <h2 class="sub-title">나의 답변</h2>
    <form @submit.prevent="submitForm" class="container my-answer-form">
      <textarea
        v-model="content"
        class="answer-textarea"
        placeholder="내용을 입력하세요"
      >
      </textarea>
      <div class="btn-container">
        <button class="btn" @click="completed">수정 완료</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      randomQuestion: {},
      content: "",
    };
  },
  mounted() {
    this.getAnswer();
    this.getRandomQuestion();
  },
  methods: {
    async getRandomQuestion() {
      await axios
        .get("/random/question", { withCredentials: true })
        .then((res) => {
          this.randomQuestion = res.data;
        });
    },
    async getAnswer() {
      await axios
        .get(`/random/answer/read/${this.$route.params.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.answer = res.data;
          this.content = this.answer.answer.answer;
        })
        .catch(() => {});
    },
    moveRandomQuestionDetail() {
      this.$router.go(-1);
    },
    async completed() {
      if (this.content) {
        const formData = {
          id: this.randomQuestion.id,
          answer: this.content,
        };
        await axios
          .put(`/random/answer/update/${this.$route.params.id}`, formData, {
            withCredentials: true,
          })
          .then(() => {})
          .catch(() => {});
      }

      this.$router.go(-1);
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

  .my-answer-form {
    margin: 0;
    height: 300px;
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

  .my-answer-form {
    height: 250px;
  }
}

.title-box {
  position: relative;
  width: 100%;
}

.prev-btn {
  position: absolute;
  padding: 5px;
  top: 50px;
  left: 30px;
  cursor: pointer;
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
</style>
