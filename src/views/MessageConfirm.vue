<template>
  <div class="background title">
    <div class="message-box">
      <div class="nav">
        <p class="name">{{ name }}</p>
        <div class="right-side">
          <button class="btn" @click="sendMessage()">
            <img :src="require(`@/assets/navigator.png`)" class="navigator" />
          </button>
          <button class="btn" @click="modalClick()">
            <img :src="require(`@/assets/colon.png`)" class="colon" />
          </button>
        </div>
      </div>
      <div>
        <div class="left-control">
          <span class="memo">{{ memo }}</span>
          <img :src="require(`@/assets/yellowmark.png`)" class="left-message" />
        </div>
        <div>
          <span class="memo2">{{ memo2 }}</span>
          <img :src="require(`@/assets/whitemark.png`)" class="right-message" />
        </div>
        <div class="left-control">
          <span class="memo">{{ memo }}</span>
          <img :src="require(`@/assets/yellowmark.png`)" class="left-message" />
        </div>
        <div>
          <span class="memo2">{{ memo2 }}</span>
          <img :src="require(`@/assets/whitemark.png`)" class="right-message" />
        </div>
      </div>
    </div>
    <img :src="require(`@/assets/logobox.png`)" class="img" />
    <div class="black-bg box-sizing" v-if="modal == true">
      <div class="white-bg">
        <div class="radio-button-control">
          <input
            type="radio"
            :model="radioValues"
            value="그룹추가"
            class="radio-button"
            @click="profileView()"
          />
          <label for="그룹추가" class="radio-name">프로필보기</label>
        </div>
        <br />
        <div class="radio-button-control">
          <input
            type="radio"
            :model="radioValues"
            value="MBTI 정보 추가"
            class="radio-button"
            @click="toBox()"
          />
          <label for="MBTI 정보 추가" class="radio-name">대화 나가기</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "ENFP님",
      memo: "오늘은 날씨가 정말 좋네요 파스타 한 접시 하러 갈까요?",
      memo2: "날씨가 별로여서 안 땡기네요",
      modal: false,
      radioValues: "",
    };
  },
  methods: {
    modalClick() {
      this.modal = true;
    },
    profileView() {
      this.$router.push({ path: "mypage" });
    },
    toBox() {
      this.$router.push({ path: "messagebox" });
    },
    sendMessage() {
      this.$router.push({ path: "sendmessage" });
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

.nav {
  display: flex;
  justify-content: space-between;
}

.img {
  left: 100px;
  top: 50px;
  position: absolute;
}

.message-box {
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

.name {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f59607;
  margin-left: 20px;
}

.right-side {
  margin-right: 15px;
}

.btn {
  background: none;
  border: none;
}
.navigator {
  width: 20px;
  height: 20px;
  margin-top: 23px;
  border: 1px solid white;
}

.colon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  border: 1px solid white;
}

.content {
  margin-top: 30px;
  padding: 25px;
}

.memo {
  position: absolute;
  z-index: 2;
  padding: 15px 30px 0 0;
  margin-right: 35px;
}
.left-message {
  width: 200px;
  margin-right: 45px;
  z-index: 1;
}
.memo2 {
  position: absolute;
  z-index: 2;
  padding: 30px 30px 0 25px;
  margin-left: 30px;
}
.right-message {
  width: 200px;
  margin-left: 45px;
}

.box-sizing {
  box-sizing: border-box;
}

.black-bg {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
}

.white-bg {
  width: 90vw;
  background: white;
  position: absolute;
  bottom: 20px;
  border-radius: 15px;
  padding: 20px;
  height: 150px;
}

.radio-button-control {
  display: flex;
  justify-content: left;
  margin: 10px 0 5px 0;
  align-items: center;
}

.radio-name {
  font-size: 17px;
  margin-left: 10px;
  font-weight: 600;
}

.radio-button {
  width: 17px;
  height: 17px;
}
</style>
