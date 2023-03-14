<template>
  <div>
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

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      this.errors = [];

      if (!this.email || !this.password) {
        // || : or
        this.errors.push("please provide an email and password!!");
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
            console.log("login");
            this.$router.push("/mypage");
          })
          .catch((error) => {
            console.log("not login");
            if (error.res) {
              for (const property in error.res.data) {
                this.errors.push(`${property}: ${error.res.data[property]}`);
              }
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again!");
            }
          });
      }
      // axios
      //   .get("/mypage")
      //   // eslint-disable-next-line
      //   .then((res) => {});
    },
  },
};
</script>

<style scoped>
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
  padding: 70px;
  width: 100%;
  height: 50vh;
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
