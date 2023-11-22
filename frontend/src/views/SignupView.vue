<template>
  <div class="body">
    <div class="title-section">
      <h1 class="title">회원가입</h1>
    </div>

    <form @submit.prevent="submitForm" class="main-section" id="signup">
      <!-- <div class="profile">
        <h2 class="profile-label">프로필 사진</h2>
        <input
          class="profile-btn"
          type="file"
          accept="image/*"
          ref="profileImage"
          @change="profileImg"
        />
      </div> -->

      <div class="input-container">
        <div class="input-div profile-img">
          <img
            :src="require('@/assets/Avatar.png')"
            ref="preview"
            class="preview"
          />
          <label for="profileImg" class="profile-label">프로필 이미지</label>
          <input
            class="input-box"
            name="profileImg"
            id="profileImg"
            type="file"
            accept="image/*"
            ref="profileImg"
            @change="profileImg"
            :style="{
              display: 'none',
            }"
          />
        </div>

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
    async profileImg() {
      this.image = this.$refs.profileImg.files[0];
      console.log(this.image);
      await this.base64(this.image);
    },
    base64(file) {
      // 비동기적으로 동작하기 위하여 promise를 return 해준다.
      return new Promise((resolve) => {
        // 업로드된 파일을 읽기 위한 FileReader() 객체 생성
        let reader = new FileReader();
        // 읽기 동작이 성공적으로 완료됐을 때 발생
        reader.onload = (e) => {
          resolve(e.target.result);
          // 썸네일을 보여주고자 하는 <img>에 id값을 가져와 src에 결과값을 넣어준다.
          const previewImage = this.$refs.preview;
          previewImage.src = e.target.result;
        };
        // file 데이터를 base64로 인코딩한 문자열. 이 문자열을 브라우저가 인식하여 원래 데이터로 만들어준다.
        reader.readAsDataURL(file);
      });
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
          "Content-Type": "multipart/form-data",
        };

        await axios
          .post("/auth/signup", formData, { headers, withCredentials: true })
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
  width: 100%;
  height: 100%;
  background-color: #fff9c8;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

/* .profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #ccc;
  object-fit: cover;
}

.profile-img {
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.profile-label {
  padding: 5px 10px;
  background-color: #ffd338;
  border-radius: 5px;
  cursor: pointer;
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

  .signup {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
