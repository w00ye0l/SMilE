<template>
  <div class="title background">
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
            return { answer: obj.answer, mbti: totalMbti };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectMessage(message) {
      console.log(message.name);
      this.$router.push({
        name: "randomanswerdetail",
        params: { name: message.answer, mbti: message.mbti },
      });
    },
  },
};
</script>
<style scoped>
.title {
  margin: 0;
  padding: 30px 0 20px 0;
  overflow: scroll;
}
.background {
  background-color: #fff9c8;
  height: 93vh;
  position: relative;
}

.question {
  background-color: white;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  font-weight: bold;
  padding: 0 50px 0 50px;
}

.memo-box {
  width: 80vw;
  margin: 30px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 16.5vh;
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
}
</style>
