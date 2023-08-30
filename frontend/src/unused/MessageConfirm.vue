<template>
  <div class="background title">
    <div class="message-box">
      <div class="nav">
        <p class="name">{{ message.name }}</p>
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
        <div class="left-control" @click="pageLink()">
          <span class="memo">{{ message.content }}</span>
          <img :src="require(`@/assets/yellowmark.png`)" class="left-message" />
        </div>
        <div v-for="(memo, index) in memos" :key="index">
          <span class="memo2">{{ memo.content }}</span>
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
  computed: {
    message() {
      const index = parseInt(this.$route.params.index);
      return this.$store.state.messages[index];
    },
    memos() {
      return this.$store.state.memos;
    },
  },
  data() {
    return {
      modal: false,
      radioValues: "",
    };
  },
  methods: {
    modalClick() {
      this.modal = true;
    },
    pageLink() {
      this.$router.push({ name: "messagecheck" });
    },
    profileView() {
      this.$router.push({ path: "mypage" });
    },
    toBox() {
      this.$router.go(-1);
    },
    sendMessage(index) {
      const message = this.$store.state.messages[index];
      console.log(index);
      if (message) {
        this.$router.push({ name: "sendmessage", params: { index: index } });
      }
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
  padding: 20px 30px 0 0;
  margin: 0 0 35px 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 210px;
}
.left-message {
  width: 200px;
  margin-right: 45px;
  z-index: 1;
}
.memo2 {
  position: absolute;
  z-index: 2;
  padding: 20px 30px 0 25px;
  margin: 0 0 35px 50px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 230px;
}
.right-message {
  width: 200px;
  margin-left: 45px;
  z-index: 1;
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
