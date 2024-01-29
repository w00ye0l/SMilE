<template>
  <div class="main-section">
    <div class="title-container">
      <img
        class="prev-btn"
        src="@/assets/back.svg"
        alt="뒤로 가기"
        @click="moveLogin"
      />
      <h1 class="title">회원가입</h1>
    </div>

    <form @submit.prevent="submitForm" class="signup-form" id="signup">
      <div class="input-container">
        <div class="input-div profile-img">
          <div class="preview-container">
            <img
              :src="require('@/assets/default_smile.svg')"
              ref="preview"
              class="preview"
            />
            <div v-on:click="deleteImage" class="delete-img-container"></div>
          </div>
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
            ref="email"
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
            ref="nickname"
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
            ref="password"
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
            ref="passwordConfirm"
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
                v-bind:src="require(`@/assets/m-${man}.svg`)"
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
                v-bind:src="require(`@/assets/w-${woman}.svg`)"
                alt=""
              />
            </label>
          </div>
        </div>

        <div class="mbti-div">
          <label class="input-label">MBTI</label>
          <div class="mbti-box" ref="mbti">
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
        <button class="signup-btn" type="submit">회원가입</button>
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
    };
  },
  methods: {
    // 뒤로 가기
    moveLogin() {
      this.$router.push({ name: "login" });
    },
    async profileImg() {
      const fileInput = this.$refs.profileImg;

      if (fileInput.files.length > 0) {
        this.image = fileInput.files[0];
        await this.base64(this.image);
      }
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
        if (file) {
          reader.readAsDataURL(file);
        } else {
          resolve("");
        }
      });
    },
    async deleteImage() {
      if (Object.keys(this.image).length) {
        if (confirm("이미지를 삭제하시겠습니까?")) {
          this.image = {};
          this.$refs.profileImg.value = "";
          const previewImage = this.$refs.preview;
          previewImage.src = require("@/assets/default_smile.svg");
        }
      }
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
      if (this.email.trim() === "") {
        alert("이메일을 입력해주세요.");
        setTimeout(() => {
          this.$refs.email.focus();
          this.$refs.email.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 0);
      } else if (this.nickname.trim() === "") {
        alert("닉네임을 입력해주세요.");
        setTimeout(() => {
          this.$refs.nickname.focus();
          this.$refs.nickname.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 0);
      } else if (this.password.trim() === "") {
        alert("비밀번호를 입력해주세요.");
        setTimeout(() => {
          this.$refs.password.focus();
          this.$refs.password.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 0);
      } else if (this.password.trim() !== this.passwordConfirm.trim()) {
        alert("비밀번호 확인이 일치하지 않습니다.");
        setTimeout(() => {
          this.$refs.passwordConfirm.focus();
          this.$refs.passwordConfirm.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 0);
      } else if (!(this.mbti1 || this.mbti2 || this.mbti3 || this.mbti4)) {
        alert("MBTI를 선택해주세요.");
        setTimeout(() => {
          this.$refs.mbti.focus();
          this.$refs.mbti.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 0);
      } else {
        const headers = {
          "Content-Type": "multipart/form-data",
        };
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

        await axios
          .post("/auth/signup", formData, { headers, withCredentials: true })
          .then(() => {
            this.$router.push({ name: "login" });
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
  },
};
</script>

<style scoped>
@media (width > 540px) {
  .main-section {
    padding: 0 80px;
  }

  .signup-form {
    width: 100%;
  }
}

@media (width <= 640px) {
  .main-section {
    width: 100%;
  }
}

@media (width <= 540px) {
  .main-section {
    margin: auto;
    width: calc(100% - 40px);
  }
}

.main-section {
  position: relative;
}

.title-container {
  width: 100%;
  position: relative;
}

.title {
  margin: 0;
  padding: 50px 0;
  font-size: 24px;
  text-align: center;
}

.prev-btn {
  position: absolute;
  padding: 5px;
  top: 50px;
  left: 30px;
  cursor: pointer;
}

.signup-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 100px;
  padding: 0 20px;
  background-color: #fff9c8;
  border-radius: 10px;
}

.input-container {
  margin: 30px 0;
}

.input-div {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.preview-container {
  position: relative;
}

.preview {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #ccc;
  object-fit: cover;
}

.delete-img-container {
  position: absolute;
  top: 0;
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

.delete-img-container::after {
  position: absolute;
  top: -5px;
  left: 6.5px;
  content: "\00D7";
  font-size: 24px;
}

.profile-img {
  margin-top: 0;
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
  margin-bottom: 10px;
  padding-left: 10px;
  width: 110px;
  font-size: 16px;
  font-weight: bold;
  text-align: start;
}

.input-box {
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  border: 0;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.gender-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  gap: 50px;
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
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  gap: 20px;
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
  color: #000;
  background-color: #ffd338;
}

.signup {
  display: flex;
  justify-content: center;
  align-content: center;
}

.signup-btn {
  margin-bottom: 30px;
  width: 150px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background-color: #f59607;
  border: 0;
  border-radius: 30px;
}
</style>
