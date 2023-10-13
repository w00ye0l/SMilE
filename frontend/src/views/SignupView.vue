<template>
  <div class="body">
    <div class="title-section">
      <h1 class="title">회원가입</h1>
    </div>

    <form @submit.prevent="submitForm" class="main-section" id="signup">
      <h2 class="profile-label">프로필 사진</h2>
      <div class="profile">
        <input
          class="profile-btn"
          type="file"
          accept="image/*"
          ref="profileImage"
          @change="profileImg"
        />
      </div>

      <div class="input-container">
        <div class="input-div">
          <label class="input-label" for="email">이메일</label>
          <input
            class="input-box"
            type="email"
            id="email"
            name="email"
            v-model="email"
          />
        </div>

        <div class="input-div">
          <label class="input-label" for="nickname">닉네임</label>
          <input
            class="input-box"
            type="text"
            id="nickname"
            name="nickname"
            v-model="nickname"
          />
        </div>

        <div class="input-div">
          <label class="input-label" for="password">비밀번호</label>
          <input
            class="input-box"
            type="password"
            id="password"
            name="password"
            v-model="password"
          />
        </div>

        <div class="input-div">
          <label class="input-label" for="passwordConfirm">비밀번호 확인</label>
          <input
            class="input-box"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            v-model="passwordConfirm"
          />
        </div>

        <div class="input-div">
          <label class="input-label" for="birthday">생년월일</label>
          <input
            class="input-box"
            type="date"
            id="birthday"
            name="birthday"
            v-model="birthday"
          />
        </div>

        <div class="input-div">
          <label class="input-label">성별</label>
          <div class="gender-box">
            <label class="gender-label" for="man">
              <input
                class="gender-radio"
                id="man"
                type="radio"
                name="gender"
                v-model="gender"
                value="M"
              />
              <img
                v-on:click="manCheck"
                class="gender-img"
                v-bind:src="require(`@/assets/m-${man}.png`)"
                alt=""
              />
            </label>

            <label class="gender-label" for="woman">
              <input
                class="gender-radio"
                id="woman"
                type="radio"
                name="gender"
                v-model="gender"
                value="W"
              />
              <img
                v-on:click="womanCheck"
                class="gender-img"
                v-bind:src="require(`@/assets/w-${woman}.png`)"
                alt=""
              />
            </label>
          </div>
        </div>

        <div class="mbti-div">
          <label class="input-label">MBTI</label>
          <div class="mbti-box">
            <!-- E/I -->
            <div class="mbti-set">
              <label>
                <input name="mbti1" type="radio" v-model="mbti1" value="E" />
                <div class="mbti-btn">E</div>
              </label>
              <label>
                <input name="mbti1" type="radio" v-model="mbti1" value="I" />
                <div class="mbti-btn">I</div>
              </label>
            </div>

            <!-- N/S -->
            <div class="mbti-set">
              <label>
                <input name="mbti2" type="radio" v-model="mbti2" value="N" />
                <div class="mbti-btn">N</div>
              </label>
              <label>
                <input name="mbti2" type="radio" v-model="mbti2" value="S" />
                <div class="mbti-btn">S</div>
              </label>
            </div>

            <!-- F/T -->
            <div class="mbti-set">
              <label>
                <input name="mbti3" type="radio" v-model="mbti3" value="F" />
                <div class="mbti-btn">F</div>
              </label>
              <label>
                <input name="mbti3" type="radio" v-model="mbti3" value="T" />
                <div class="mbti-btn">T</div>
              </label>
            </div>

            <!-- J/P -->
            <div class="mbti-set">
              <label>
                <input name="mbti4" type="radio" v-model="mbti4" value="J" />
                <div class="mbti-btn">J</div>
              </label>
              <label>
                <input name="mbti4" type="radio" v-model="mbti4" value="P" />
                <div class="mbti-btn">P</div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="signup">
        <button v-on:click="signup" class="signup-btn" type="submit">
          회원가입
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      image: {},
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
      birthday: "",
      man: "off",
      woman: "off",
      gender: "",
      mbti1: "",
      mbti2: "",
      mbti3: "",
      mbti4: "",
      errors: [],
    };
  },
  methods: {
    profileImg() {
      this.image = this.$refs.profileImage.files[0];
      console.log(this.image);
    },
    manCheck() {
      if (this.gender === "" || this.gender === "W") {
        if (this.man === "off") {
          this.man = "on";
          this.woman = "off";
          this.gender = "M";
        } else {
          this.man = "off";
          this.woman = "on";
          this.gender = "W";
        }
      }
    },
    womanCheck() {
      if (this.gender === "" || this.gender === "M") {
        if (this.woman === "off") {
          this.woman = "on";
          this.man = "off";
          this.gender = "M";
        } else {
          this.woman = "off";
          this.man = "on";
          this.gender = "W";
        }
      }
    },
    async submitForm() {
      this.errors = [];

      if (this.nickname === "") {
        this.errors.push("The nickname is missing");
      }

      if (this.password === "") {
        this.errors.push("The password is too short");
      }

      if (this.password !== this.passwordConfirm) {
        this.errors.push("The password are not matching");
      }

      if (!this.errors.length) {
        const formData = {
          image: this.image,
          email: this.email,
          nickname: this.nickname,
          password: this.password,
          birthday: this.birthday,
          gender: this.gender,
          mbti1: this.mbti1,
          mbti2: this.mbti2,
          mbti3: this.mbti3,
          mbti4: this.mbti4,
        };

        console.log(formData);

        const headers = {
          "content-Type": "multipart/form-data",
        };

        await axios
          .post("/auth/signup", formData, { headers })
          .then((res) => {
            console.log(res);
            this.$router.push({ name: "login" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  background-color: #fff9c8;
}

.title-section {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.title {
  margin: 0;
  font-size: 24px;
}

.main-section {
  background-color: #fff9c8;
}

.profile-label {
  margin: 0;
  padding: 20px;
  font-size: 20px;
}

/* .profile-btn {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 0;
  border-radius: 30px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  font-weight: bold;
} */

/* #file-upload-button {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 0;
  border-radius: 30px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  font-weight: bold;
} */

.input-container {
  margin: 30px;
}

.input-div {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-label {
  font-size: 16px;
  font-weight: bold;
}

.input-box {
  width: 200px;
  height: 30px;
  padding: 0 20px;
  font-size: 16px;
  border: 0;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.gender-box {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
  height: 60px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.gender-label {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gender-radio {
  display: none;
}

.mbti-div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.mbti-box {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 130px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.mbti-set {
  display: flex;
  flex-direction: column;
}

.mbti-set input {
  display: none;
}

.mbti-btn {
  margin: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  font-size: 24px;
  font-weight: bold;
  background-color: #fff9c8;
  border-radius: 30px;
}

.mbti-set input:checked + div {
  background-color: #ffe99d;
}

.signup-btn {
  margin-bottom: 30px;
  width: 220px;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  background-color: #ffd338;
  border: 0;
  border-radius: 30px;
}

@media (min-width: 541px) {
  .title-section {
    width: 100%;
  }
  .profile-label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0 20px 0;
  }
  .signup {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 80px;
  }
}
</style>
