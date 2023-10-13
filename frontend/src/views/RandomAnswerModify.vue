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
          v-model="content"
          class="text"
          placeholder="내용을 입력하세요"
        >
        </textarea>
      </div>
      <div class="btn-control">
        <button class="btn" @click="completed()">작성 완료</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      message: "",
      content: "",
    };
  },
  mounted() {
    this.getAnswer();
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
    async getAnswer() {
      await axios
        .get(`/random/answer/read/${this.$route.params.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.answer = res.data;
          this.content = this.answer.answer.answer;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async completed() {
      try {
        if (this.content) {
          const formData = {
            id: this.$route.params.id,
            answer: this.content,
          };
          await axios.put(
            `/random/answer/update/${this.$route.params.id}`,
            formData,
            { withCredentials: true }
          );
        }
      } catch (error) {
        console.log(error);
      }
      this.$router.go(-1);
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
  height: 90vh;
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
  max-height: 70vh;
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
  height: 40vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
}

.text {
  margin-top: 15px;
  width: 76.8vw;
  height: 37vh;
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
  height: 35px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  background-color: #f59607;
  margin: 1.3% 10% 0 0;
}

@media (min-width: 541px) {
  .background {
    height: 100%;
  }

  .question {
    width: 100%;
  }
  .my-answer {
    width: 100%;
  }
  .second-title {
    padding-left: 10px;
  }

  .memo-box {
    width: 100%;
  }
  .text {
    width: 100%;
    padding: 10px;
  }

  .btn {
    margin-right: 20px;
    height: 40px;
  }
}
</style>
