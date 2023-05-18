<template>
  <div class="main">
    <div class="title-container">
      <h1 class="title">프로필</h1>
      <button class="setting-btn" @click="openModal">
        <img :src="require('@/assets/Settings.png')" alt="" />
      </button>
    </div>
    <div class="profile-container">
      <img :src="require('@/assets/Avatar.png')" class="avatar" />
      <div class="my-name-mbti">
        <span class="my-name">{{ nickname }}</span>
        <span class="my-mbti">{{ mbti }}</span>
      </div>
    </div>

    <div class="black-bg box-sizing" v-if="modalOpen">
      <div class="white-bg">
        <form>
          <div class="form-row">
            <label for="profile-img" class="modal-font-size">
              프로필 사진 변경
            </label>
            <input type="file" />
          </div>
          <div class="form-row">
            <label for="current-pw" class="modal-font-size">
              현재 비밀번호
            </label>
            <input type="password" id="current-pw" />
          </div>
          <div class="form-row">
            <label for="new-pw" class="modal-font-size">새 비밀번호</label>
            <input type="password" id="new-pw" />
          </div>
          <div class="form-row">
            <label for="new-pw-confirm" class="modal-font-size">
              새 비밀번호 확인
            </label>
            <input type="password" id="new-pw-confirm" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save" @click="closeModal">
              저장
            </button>
            <button type="button" class="btn-cancel" @click="closeModal">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="question-container">
      <p class="question-subtitle">답변하지 않은 질문이 있어요!</p>
      <h3 class="question-title">오늘의 질문</h3>

      <button class="question-btn">답변하러 가기</button>
    </div>

    <hr />

    <div class="content-container">
      <h3 class="content-title">MBTI 기록하기</h3>
      <router-link class="content-detail" to="/mbti">
        <div class="content-imgBox">
          <img class="content-img" src="@/assets/saveMbti.png" alt="" />
        </div>
        <p class="content">
          주변 사람들의 MBTI 정보를 저장하여 한 눈에 확인해보아요.
        </p>
        <img class="go-content" src="@/assets/right-arrow.png" alt="" />
      </router-link>
    </div>

    <hr />

    <div class="content-container">
      <h3 class="content-title">MBTI 설명서</h3>
      <router-link class="content-detail" to="/docs">
        <div class="content-imgBox">
          <img class="content-img" src="@/assets/docsMbti.png" alt="" />
        </div>
        <p class="content">
          모든 MBTI에 대한 정보를 확인해 MBTI에 대한 이해를 키워요.
        </p>
        <img class="go-content" src="@/assets/right-arrow.png" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
      nickname: this.$store.state.mypage.nickname,
      mbti: this.$store.state.mypage.mbti,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    pageLink() {
      this.$router.push({ path: "messagebox" });
    },
  },
  computed: {
    messageCount() {
      return this.$store.getters.MESSAGE_COUNT;
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  /* height: 110vh; */
}

.title-container {
  padding: 50px 0 10px 0;
  position: relative;
  box-sizing: border-box;
}

.title {
  margin: 0;
  font-size: 24px;
}

.setting-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 70%;
  right: 5%;
  width: 30px;
  height: 30px;
  background-color: #ffd338;
  border: 0;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.profile-container {
  margin: 30px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 120px;
  background: #fff9c8;
}

.avatar {
  width: 80px;
  height: 80px;
}

.my-name-mbti {
  display: flex;
  flex-direction: column;
  font-size: 20px;
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
  height: 55vh;
  top: 150px;
}

.form-row {
  margin-bottom: 20px;
}

.form-row label {
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-row input {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #f1f1f1;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-cancel {
  padding: 10px 20px;
  background-color: white;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: blue;
}

.btn-save {
  padding: 10px 20px;
  background-color: white;
  color: blue;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  width: 80px;
}

.modal-font-size {
  font-size: 15px;
  margin-top: 20px;
}

.question-container {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.question-subtitle {
  margin: 0;
  margin-bottom: 5px;
  color: #999999;
}

.question-title {
  margin: 0;
  margin-bottom: 25px;
}

.question-btn {
  padding: 5px 20px;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  background-color: #ffd338;
  border: 0;
  border-radius: 20px;
}

hr {
  background-color: #fff9c8;
  height: 3px;
  border: 0;
}

.content-container {
  display: inline-block;
  margin: auto;
  padding: 20px 0;
  width: 85%;
  box-sizing: border-box;
  border: #f59607;
  text-align: start;
}

.content-title {
  margin: 0;
  margin-bottom: 10px;
}

.content-detail {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.content-imgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  background-color: #fff9c8;
  box-sizing: border-box;
}

.content-img {
  height: 60%;
}

.content {
  margin: 0;
  width: 50%;
  word-break: keep-all;
}

.go-content {
  width: 8%;
}
</style>
