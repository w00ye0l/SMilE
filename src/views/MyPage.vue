<template>
  <div class="main">
    <div class="title-container">
      <h1 class="title">프로필</h1>
      <div class="btn-container">
        <button class="setting-btn" @click="openModal">
          <img :src="require('@/assets/Settings.png')" alt="" />
        </button>
        <button class="logout-btn" @click="logout">
          <img :src="require('@/assets/Logout.png')" alt="" />
        </button>
      </div>
    </div>

    <div class="profile-container">
      <img
        class="profile-img left-img"
        src="@/assets/mypage_smile1.png"
        alt=""
      />
      <img :src="require('@/assets/Avatar.png')" class="avatar" />
      <div class="my-info">
        <span class="name">{{ nickname }}</span>
        <span class="mbti">{{ mbti }}</span>
      </div>
      <img
        class="profile-img right-img"
        src="@/assets/mypage_smile2.png"
        alt=""
      />
    </div>

    <SettingModalVue v-if="modalOpen" @close="closeModal" />

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
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { mapState } from "vuex";
import SettingModalVue from "@/components/SettingModal.vue";

export default {
  data() {
    return {
      modalOpen: false,
    };
  },
  computed: {
    ...mapState({
      nickname: (state) => state.mypage.nickname,
      mbti: (state) => state.mypage.mbti,
    }),
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    SettingModalVue,
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    async logout() {
      await axios
        .get("/auth/logout", { withCredentials: true })
        .then((res) => {
          this.cookies.remove("id");
          console.log(res);
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
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

.btn-container {
  position: absolute;
  top: 70%;
  right: 0;
  display: flex;
  align-items: center;
  transform: translate(-50%, -50%);
  gap: 10px;
}

.setting-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #ffd338;
  border: 0;
  border-radius: 50%;
}

.logout-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #fff9c8;
  border: 0;
  border-radius: 50%;
}

.profile-container {
  position: relative;
  margin-top: 30px;
  padding: 0 60px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 130px;
  background: #fff9c8;
}

.profile-img {
  position: absolute;
}

.left-img {
  left: 0;
  bottom: 0;
}

.right-img {
  right: 0;
  top: 0;
}

.avatar {
  width: 80px;
  height: 80px;
}

.my-info {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  gap: 5px;
}

.name {
  font-weight: 500;
}

.mbti {
  padding: 5px 16px;
  width: 80px;
  color: #fff;
  font-weight: 500;
  background-color: #f59607;
  border-radius: 20px;
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
  margin-bottom: 0;
  color: #999999;
  font-size: 14px;
}

.question-title {
  margin: 0;
  margin-bottom: 25px;
  font-size: 18px;
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
  max-width: 100px;
  max-height: 100px;
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
  max-width: 8%;
}
</style>
