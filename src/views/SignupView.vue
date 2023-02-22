<template>
  <div class="body">
    <div class="title-section">
      <h1 class="title">회원가입</h1>
    </div>

    <form @submit.prevent="submitForm" class="main-section">
      <h2 class="profile-label">프로필 사진</h2>
      <button class="profile-btn">파일 선택</button>

      <div class="input-container">
        <div class="input-div">
          <label class="input-label" for="">이메일</label>
          <input class="input-box" type="email" />
        </div>

        <div class="input-div">
          <label class="input-label" for="">닉네임</label>
          <input class="input-box" type="text" />
        </div>

        <div class="input-div">
          <label class="input-label" for="">비밀번호</label>
          <input class="input-box" type="password" />
        </div>

        <div class="input-div">
          <label class="input-label" for="">비밀번호 확인</label>
          <input class="input-box" type="password" />
        </div>

        <div class="input-div">
          <label class="input-label" for="">생년월일</label>
          <input class="input-box" type="date" />
        </div>

        <div class="input-div">
          <label class="input-label" for="">성별</label>
          <div class="gender-box">
            <label class="gender-label" for="man">
              <input
                class="gender-radio"
                id="man"
                type="radio"
                name="gender"
                v-model="gender"
                value="man"
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
                value="woman"
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
          <label class="input-label" for="">MBTI</label>
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

      <button class="signup-btn">회원가입</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      man: "off",
      woman: "off",
      gender: "",
    };
  },
  methods: {
    manCheck() {
      // console.log("m", this.gender, this.man, this.woman);
      if (this.gender === "" || this.gender === "woman") {
        if (this.man === "off") {
          this.man = "on";
          this.woman = "off";
          this.gender = "man";
        } else {
          this.man = "off";
          this.woman = "on";
          this.gender = "woman";
        }
      }
    },
    womanCheck() {
      // console.log("w", this.gender, this.man, this.woman);
      if (this.gender === "" || this.gender === "man") {
        if (this.woman === "off") {
          this.woman = "on";
          this.man = "off";
          this.gender = "man";
        } else {
          this.woman = "off";
          this.man = "on";
          this.gender = "woman";
        }
      }
    },
  },
};
</script>

<style scoped>
.body {
  height: 100vh;
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

.profile-btn {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 0;
  border-radius: 30px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  font-weight: bold;
}

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
  padding: 0 10px;
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
</style>
