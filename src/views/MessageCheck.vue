<template>
  <div class="background title">
    <div class="messagebox">
      <div>
        <button @click="pageLink" class="cancel-btn">
          <img :src="require(`@/assets/cancel.png`)" class="cancel" />
        </button>
      </div>
      <div>
        <p class="message-title">{{ name }}</p>
        <p class="content">{{ memo }}</p>
      </div>
    </div>
    <img :src="require(`@/assets/logobox.png`)" class="img" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "배고픈 당신에게",
      memo: "오늘은 날씨가 정말 좋네요 파스타 한 접시 하러 갈까요?",
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "randommessage" });
    },
  },
};
</script>
<style scoped>
.title {
  margin: 0;
  padding: 30px 0 20px 0;
}
.background {
  background-color: #fff9c8;
  height: 100vh;
  position: relative;
}

.img {
  left: 100px;
  top: 50px;
  position: absolute;
}

.messagebox {
  height: 70vh;
  width: 70vw;
  margin: 40px 0 0 60px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  position: absolute;
  top: 140px;
}

.cancel-btn {
  border: none;
  background-color: transparent;
  float: right;
  margin: 15px 10px 0 0;
}

.message-title {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.content {
  margin-top: 30px;
  padding: 25px;
}
</style>
