<template>
  <div class="main">
    <div class="banner">
      <h1 class="title">
        S<span class="sub-title">how</span><br />M<span class="sub-title"
          >BTI</span
        ><br /><img
          class="title-img"
          v-bind:src="require('@/assets/first_smile1.png')"
        /><br />E<span class="sub-title">verthing</span>
      </h1>

      <img
        class="banner-img img-left"
        v-bind:src="require('@/assets/login_smile1.png')"
        alt=""
      />
      <img
        class="banner-img img-top"
        v-bind:src="require('@/assets/login_smile2.png')"
        alt=""
      />
      <img
        class="banner-img img-right"
        v-bind:src="require('@/assets/login_smile3.png')"
        alt=""
      />
    </div>

    <div class="login-container">
      <div class="error-container" v-show="errors.length">
        <p class="error-message">{{ errors }}</p>
      </div>
      <form @submit.prevent="submitForm" class="login-form">
        <input
          class="input-box"
          type="email"
          name="email"
          v-model="email"
          placeholder="이메일"
        />
        <input
          class="input-box"
          type="password"
          name="password"
          v-model="password"
          placeholder="비밀번호"
        />
        <button v-on:click="login" class="login-btn" type="submit">
          로그인
        </button>
      </form>

      <router-link class="signup-link" to="signup">계정 만들기</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      email: "",
      password: "",
      errors: "",
    };
  },
  methods: {
    async submitForm() {
      this.errors = [];

      if (!this.email || !this.password) {
        // || : or
        this.showNotification("이메일 또는 비밀번호를 입력해주세요.");
      }

      if (!this.errors.length) {
        const formData = {
          email: this.email,
          password: this.password,
        };
        await axios
          .post("/auth/login/", formData, {
            withCredentials: true,
          })
          // eslint-disable-next-line
          .then((res) => {
            this.cookies.set("id", res.data.id);
            this.$store.dispatch("getData");
          })
          .catch((err) => {
            console.log(err.response.data.message);
            this.errors.push(err.response.data.message);
            this.showNotification(err.response.data.message);
          });
      }
    },
    showNotification(errorMessage) {
      this.errors = errorMessage;
      setTimeout(() => {
        this.errors = "";
      }, 2000);
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}

.banner {
  padding: 50px;
  position: relative;
  width: 100%;
  height: 50vh;
  background-color: #fff9c8;
  overflow: hidden;
}

.banner-img {
  position: absolute;
}

.img-top {
  top: -80px;
  right: -30px;
}

.img-right {
  bottom: -30px;
  right: -30px;
}

.img-left {
  bottom: 20px;
  left: -40px;
}

.title {
  margin: 0;
  font-size: 40px;
  color: #f59607;
  text-align: start;
  line-height: 123.2%;
}

.title-img {
  margin: 5px 0 -5px -5px;
  width: 38px;
  height: 38px;
}

.sub-title {
  color: #ababab;
  font-weight: normal;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 80px;
  padding-bottom: 20px;
  width: 100%;
}

.error-container {
  padding: 10px 20px;
  position: absolute;
  width: 220px;
  top: 2%;
  left: 50%;
  color: #fff;
  background-color: #fc7e7e;
  transform: translateX(-50%);
  border-radius: 10px;
}

.error-message {
  margin: 0;
  padding: 0;
}

.login-form {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.input-box {
  padding: 0 20px;
  width: 220px;
  height: 40px;
  font-size: 16px;
  border: 0;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.login-btn {
  width: 220px;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  background-color: #ffd338;
  border: 0;
  border-radius: 30px;
}

.signup-link {
  color: #f59607;
  font-size: 16px;
  font-weight: bold;
}
</style>
