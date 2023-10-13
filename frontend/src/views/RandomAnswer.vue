<template>
  <div class="title background">
    <button class="back-btn" @click="back()">
      <img :src="require(`@/assets/back.png`)" class="back-img" />
    </button>
    <h2>{{ $store.state.totalMbti }}들의 답변</h2>
    <div class="question">
      <span class="letter">{{ this.message }}</span>
    </div>
    <div
      class="memo-box"
      v-for="(message, index) in mbtiMessage"
      :key="index"
      @click="selectMessage(message)"
    >
      <div class="img-title">
        <img :src="require(`@/assets/first_smile1.png`)" class="title-img" />
        <span class="mbti"> {{ message.mbti }}</span>
      </div>
      <br />
      <div class="answer">
        {{ message.answer }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getRandomMessage();
    this.mbtiMessages();
  },
  data() {
    return {
      message: "",
      mbtiMessage: "",
      mbti: "",
    };
  },
  computed: {
    mbti1() {
      return this.$store.state.mbti1.toLowerCase();
    },
    mbti2() {
      return this.$store.state.mbti2.toLowerCase();
    },
    mbti3() {
      return this.$store.state.mbti3.toLowerCase();
    },
    mbti4() {
      return this.$store.state.mbti4.toLowerCase();
    },
  },
  methods: {
    async getRandomMessage() {
      await axios
        .get("/random/question/", { withCredentials: true })
        .then((res) => {
          this.randomMessage = res.data;
          this.message = this.randomMessage.question;
        });
    },
    async mbtiMessages() {
      await axios
        .get(
          `/random/${this.$store.state.id}/${this.mbti1}${this.mbti2}${this.mbti3}${this.mbti4}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          this.messages = res.data;
          this.mbti = this.messages.answers.map((el) => el.User);
          this.mbtiMessage = this.messages.answers.map((obj) => {
            let totalMbti = "";
            for (let key in obj.User) {
              totalMbti += obj.User[key];
            }
            return {
              answer: obj.answer,
              mbti: totalMbti,
              userID: obj.userID,
              id: obj.id,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectMessage(message) {
      const params = {
        id: message.id,
        mbti: message.mbti,
      };

      this.$router.push({
        name: "randomanswerdetail",
        params: params,
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
}

.question {
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  margin: 0;
  padding: 0;
  overflow: scroll;
  margin-bottom: 80px;
}
.background {
  background-color: #fff9c8;
  height: 100%;
  position: relative;
}

.letter {
  font-weight: bold;
  padding: 0 50px 0 50px;
}

.memo-box {
  width: 90%;
  height: 100px;
  margin: 30px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
}

.img-title {
  margin: 20px 0 0 20px;
  display: flex;
}

.title-img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.mbti {
  margin: 3px 0 0 15px;
  font-size: 20px;
  font-weight: 600;
}

.answer {
  display: flex;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 20px;
}

@media (max-width: 767px) {
  .back-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 12%;
    top: 3%;
    margin-top: 1%;
  }
  .back-img {
    width: 70%;
    height: 70%;
  }

  .question {
    height: 14%;
    border-radius: 20px;
  }
  .memo-box {
    height: 16%;
  }

  .background {
    height: 100vh;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .back-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 14%;
    top: 1.3%;
    margin-top: 1%;
  }
  .back-img {
    width: 70%;
    height: 70%;
  }

  .question {
    height: 16%;
    border-radius: 20px;
  }

  .memo-box {
    height: 16%;
  }
}

@media (min-width: 1024px) {
  .back-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 14.5%;
    top: 1.4%;
    margin-top: 0.3%;
  }
  .back-img {
    width: 20px;
    height: 20px;
  }

  .question {
    height: 16%;
    border-radius: 20px;
  }

  .memo-box {
    height: 17%;
  }
  .letter {
    font-size: 25px;
  }
  .back-btn {
    left: 4.5%;
  }
}
</style>
