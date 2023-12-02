<template>
  <div class="main">
    <div class="title-container">
      <h1 class="title">프로필</h1>
      <div class="btn-container">
        <!-- 회원정보 수정 버튼 -->
        <button class="btn setting-btn" @click="openSettingModal">
          <img :src="require('@/assets/Settings.png')" alt="" />
        </button>

        <!-- 로그아웃 버튼 -->
        <button class="btn logout-btn" @click="logout">
          <img :src="require('@/assets/Logout.png')" alt="" />
        </button>
      </div>
    </div>

    <!-- 회원정보 수정 모달 -->
    <SettingModalVue v-if="settingModal" @close="closeSettingModal" />

    <!-- 프로필 컨테이너 -->
    <div class="profile-container">
      <img
        class="profile-img left-img"
        src="@/assets/mypage_smile1.png"
        alt=""
      />

      <!-- 프로필 이미지 -->
      <div class="profile-img-container" @click="openImageModal">
        <img
          v-if="profileImg === null"
          :src="require('@/assets/Avatar.png')"
          class="avatar"
        />
        <img v-if="profileImg !== null" :src="profileImg" class="avatar" />
        <div class="edit-img-container">
          <font-awesome-icon
            :icon="['fas', 'pen']"
            size="sm"
            style="color: #000"
          />
        </div>
      </div>

      <ProfileImageModal v-if="imageModal" @close="closeImageModal" />

      <!-- 프로필 정보 -->
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

    <!-- 오늘의 질문 컨테이너 -->
    <div v-if="answered === true" class="question-container">
      <h3 class="question-title">오늘의 질문</h3>
      <p class="question-subtitle">작성한 답변 확인하기</p>

      <button class="question-btn">내 답변 확인하기</button>
    </div>

    <div v-else class="question-container">
      <p class="question-subtitle">답변하지 않은 질문이 있어요!</p>
      <h3 class="question-title">오늘의 질문</h3>

      <button class="question-btn" v-on:click="goToRandomQuestion">
        답변하러 가기
      </button>
    </div>

    <hr />

    <div class="content-root-container">
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

      <hr class="content-hr" />

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

    <hr />

    <div class="content-test-container">
      <h3 class="content-title">MBTI 검사하기</h3>
      <a
        class="test-link"
        href="https://www.16personalities.com/ko"
        target="_blank"
      >
        <div class="content-detail">
          <img class="content-test-img" src="@/assets/mbti_test.svg" alt="" />
          <p class="content">MBTI 공식 <br />검사 사이트</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { mapState } from "vuex";
import SettingModalVue from "@/components/SettingModal.vue";
import ProfileImageModal from "@/components/ProfileImageModal.vue";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      settingModal: false,
      imageModal: false,
    };
  },
  computed: {
    ...mapState({
      nickname: (state) => state.mypage.nickname,
      profileImg: (state) => state.mypage.profileImg,
      mbti: (state) => state.mypage.mbti,
      answered: (state) => state.mypage.answered,
    }),
  },
  components: {
    SettingModalVue,
    ProfileImageModal,
  },
  methods: {
    openSettingModal() {
      this.settingModal = true;
    },
    closeSettingModal() {
      this.settingModal = false;
    },
    openImageModal() {
      this.imageModal = true;
    },
    closeImageModal() {
      this.imageModal = false;
    },
    async logout() {
      await axios
        .get("/auth/logout", { withCredentials: true })
        .then((res) => {
          console.log(res);
          this.cookies.remove("id");
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToRandomQuestion() {
      this.$router.push({ name: "randomquestion" });
    },
  },
};
</script>

<style scoped>
@media (min-width: 541px) {
  .main {
    padding: 0 30px;
  }

  .profile-container {
    margin: 0;
    width: 100%;
    border-radius: 20px;
  }

  .left-img {
    border-radius: 0 0 0 20px;
  }

  .right-img {
    border-radius: 0 20px 0 0;
  }

  .content-root-container {
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }

  .content-hr {
    display: none;
  }

  .content-container {
    width: 50%;
  }

  .content-test-container {
    width: 100%;
  }
}

@media (max-width: 540px) {
  .profile-container {
    margin: auto;
    width: calc(100% - 40px);
  }

  .content-container {
    margin: auto;
    width: calc(100% - 40px);
  }

  .content-test-container {
    margin: auto;
    width: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

hr {
  width: calc(100% - 40px);
}

.main {
  overflow-y: auto;
}

.title-container {
  padding: 50px 0;
  width: 100%;
  position: relative;
  box-sizing: border-box;
}

.title {
  margin: 0;
  font-size: 24px;
  text-align: center;
}

.btn-container {
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  align-items: center;
  transform: translate(-50%, -50%);
  gap: 10px;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}

.setting-btn {
  background-color: #ffd338;
}

.logout-btn {
  background-color: #fff9c8;
}

.profile-container {
  position: relative;
  /* padding: 0 60px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 130px;
  background: #fff9c8;
  border-radius: 10px;
}

.profile-img {
  position: absolute;
}

.left-img {
  left: 0;
  bottom: 0;
  border-radius: 0 0 0 10px;
  z-index: 1;
}

.right-img {
  right: 0;
  top: 0;
  border-radius: 0 10px 0 0;
  z-index: 1;
}

.profile-img-container {
  width: 45%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  z-index: 2;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #ccc;
  object-fit: cover;
}

.edit-img-container {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
}

.my-info {
  padding-right: 50px;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  gap: 5px;
  z-index: 2;
}

.name {
  width: 100%;
  font-weight: 500;
  word-wrap: break-word;
}

.mbti {
  padding: 5px 16px;
  width: 80px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  background-color: #f59607;
  border-radius: 20px;
}

.question-container {
  width: 100%;
  height: 140px;
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
  font-size: 18px;
}

.question-btn {
  margin-top: 25px;
  padding: 5px 20px;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  background-color: #ffd338;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}

hr {
  background-color: #fff9c8;
  height: 3px;
  border: 0;
}

.content-root-container {
  width: 100%;
}

.content-container {
  padding: 20px 0;
  text-align: start;
}

.content-title {
  margin: 0;
  margin-bottom: 10px;
}

.content-detail {
  padding: 20px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
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

.content-test-container {
  padding: 20px 0;
}

.test-link {
  text-decoration: none;
}

.content-test-img {
  width: 50%;
  max-width: 400px;
}
</style>
