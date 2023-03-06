<template>
  <div class="title background">
    <h2>E_FP들의 답변</h2>
    <div class="question">
      <span class="letter">{{ message }}</span>
    </div>
    <div class="memo-box" v-for="(item, index) in messageList" :key="index">
      <div class="img-title">
        <img :src="require(`@/assets/first_smile1.png`)" class="title-img" />
        <span class="mbti"> {{ mbti }}</span>
      </div>
      <br />
      <div class="answer">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Q.친구가 기분이 안좋아서 화분을 샀다고 했다. 이때 나의 대답은?",
      answer: "무슨 일이야!",
      mbti: "ENFP",
      messageList: [
        { name: "엥 기분이 왜  안 좋았지?" },
        { name: "무슨 일이야" },
        { name: "나쁜일 있어?" },
        { name: "기분이 별로네" },
      ],
    };
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
  height: 100vh;
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
  height: 18vh;
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
  margin-left: 25px;
}
</style>
