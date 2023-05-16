<template>
  <div class="background">
    <div class="small-box">
      <div class="img-title">
        <img :src="require(`@/assets/first_smile1.png`)" class="title-img" />
        <span class="mbti"> {{ $store.state.totalMbti }}</span>
      </div>
    </div>
    <div class="memo-box">
      <p class="content">{{ selectedMessage.content }}</p>
    </div>
    <div class="btn">
      <button class="back-btn" @click="backLink()">뒤로가기</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedMessage() {
      return this.$store.state.selectedMessage;
    },
  },
  methods: {
    backLink() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.background {
  background-color: #fff9c8;
  height: 100vh;
  margin: 0;
}

.title {
  margin: 0;
  padding: 40px 0 20px 0;
}

.memo-box {
  width: 80vw;
  margin: 30px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 60vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
  overflow-y: scroll;
  word-wrap: break-word;
}

.small-box {
  width: 80vw;
  margin: 30px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 8vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
}

.img-title {
  margin: 0 0 0 20px;
  padding-top: 20px;
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

.btn {
  display: flex;
  justify-content: center;
  margin: 0;
}
.back-btn {
  border-radius: 20px;
  width: 100px;
  height: 35px;
  font-weight: bold;
  border: none;
  background-color: #f59607;
  margin-top: 15px;
}

.content {
  padding: 10px 18px 0 18px;
  line-height: 28px;
}
</style>
