<template>
  <div class="main-section">
    <div class="title-container">
      <img
        class="prev-btn"
        src="@/assets/back.png"
        alt="뒤로 가기"
        @click="moveRandomQuestion"
      />
      <h1 class="title">
        <span class="selected-mbti">{{ selectedMbti }}</span>
        들의 답변
      </h1>
    </div>

    <div class="question-container">
      <span class="question">{{ randomQuestion }}</span>
    </div>

    <div
      class="answer-container"
      v-for="(answer, index) in answerList"
      :key="index"
      @click="selectAnswer(answer)"
    >
      <div class="answer-profile">
        <img :src="require(`@/assets/title-img.png`)" class="profile-img" />
        <span class="mbti"> {{ answer.totalMbti }}</span>
      </div>
      <div class="answer">
        {{ answer.answer }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.getRandomQuestion();
    this.getAnswerList();
  },
  data() {
    return {
      randomQuestionId: this.$store.state.randomQuestionId,
      randomQuestion: "",
      answerList: [],
      mbti: this.$route.query.mbti,
    };
  },
  computed: {
    selectedMbti() {
      if (this.mbti === "____") {
        return "모든 사람";
      }
      return this.mbti;
    },
  },
  methods: {
    // 랜덤 질문 가져오기
    async getRandomQuestion() {
      await axios
        .get("/random/question/", { withCredentials: true })
        .then((res) => {
          console.log(res);
          this.randomMessage = res.data;
          this.randomQuestion = res.data.question;
        });
    },
    // 답변 리스트 가져오기
    async getAnswerList() {
      console.log(this.mbti);

      await axios
        .get(`/random/${this.$store.state.randomQuestionId}/${this.mbti}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          this.answerList = res.data.answers;

          if (this.answerList) {
            this.answerList.forEach((answer) => {
              answer.totalMbti =
                answer.User.mbti1 +
                answer.User.mbti2 +
                answer.User.mbti3 +
                answer.User.mbti4;
            });
          }

          console.log(this.answerList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 답변 선택
    selectAnswer(answer) {
      console.log(answer);
      const params = {
        id: answer.id,
        // mbti: answer.totalMbti,
      };

      this.$router.push({
        name: "randomanswerdetail",
        params: params,
      });
    },
    // 뒤로 가기
    moveRandomQuestion() {
      this.$router.go(-1);
      // this.$router.push({ name: "randomanswer" });
    },
  },
};
</script>

<style scoped>
@media (width > 540px) {
  .main-section {
    padding: 0 30px;
  }

  .question-container {
    width: 100%;
  }

  .answer-container {
    width: 100%;
  }
}

@media (width <= 540px) {
  .question-container {
    margin: 0 20px;
  }

  .answer-container {
  }
}

.main-section {
  /* background-color: #fff9c8; */
}

.title-container {
  width: 100%;
  position: relative;
}

.title {
  margin: 0;
  padding: 50px 0;
  font-size: 24px;
  text-align: center;
}

.prev-btn {
  position: absolute;
  padding: 5px;
  top: 50px;
  left: 30px;
  cursor: pointer;
}

.selected-mbti {
  color: #f59607;
}

.question-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  min-height: 100px;
  background-color: #fff9c8;
  border-radius: 10px;
}

.question {
  margin: 0;
  padding: 20px 50px;
  width: 100%;
  font-size: 18px;
  word-break: keep-all;
}

.answer-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 20px;
  padding: 14px 20px;
  height: 120px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.answer-profile {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.profile-img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}

.mbti {
  font-size: 24px;
  font-weight: bold;
}

.answer {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: start;
}
</style>
