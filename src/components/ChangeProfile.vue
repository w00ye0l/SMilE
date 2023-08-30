<template>
  <form class="form-container" @submit.prevent="onSubmit">
    <div class="input-div">
      <label for="nickname" class="input-label">닉네임</label>
      <input class="input-box" type="text" id="nickname" v-model="nickname" />
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

    <div class="setting-btn-container">
      <div class="btn btn-update" @click="updateInfo">수정</div>
      <div class="btn btn-cancel" @click="$emit('closeModal')">취소</div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      birthday: "",
      gender: "",
      man: "off",
      woman: "off",
      mbti1: "",
      mbti2: "",
      mbti3: "",
      mbti4: "",
    };
  },
  beforeMount() {
    this.nickname = this.$store.state.mypage.nickname;
    this.birthday = this.$store.state.mypage.birthday;
    this.gender = this.$store.state.mypage.gender;
    if (this.gender === "M") {
      this.man = "on";
    } else {
      this.woman = "on";
    }
    this.mbti1 = this.$store.state.mypage.mbti[0];
    this.mbti2 = this.$store.state.mypage.mbti[1];
    this.mbti3 = this.$store.state.mypage.mbti[2];
    this.mbti4 = this.$store.state.mypage.mbti[3];
  },
  methods: {
    manCheck() {
      if (this.gender === "W") {
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
      if (this.gender === "M") {
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
    async updateInfo() {
      const formData = {
        nickname: this.nickname,
        birthday: this.birthday,
        gender: this.gender,
        mbti1: this.mbti1,
        mbti2: this.mbti2,
        mbti3: this.mbti3,
        mbti4: this.mbti4,
      };
      console.log(formData);
      this.$store.dispatch("updateMyProfile", formData);
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
.form-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff9c8;
  border-radius: 20px;
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
  width: 60%;
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
  width: 60%;
  height: 60px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.gender-label {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  cursor: pointer;
}

.mbti-set input:checked + div {
  background-color: #ffd338;
}

.setting-btn-container {
  width: 80%;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
}

.btn {
  width: 80px;
  padding: 5px 10px;
  font-size: 18px;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}

.btn-update {
  background-color: #f59607;
  color: #fff;
}

.btn-cancel {
  background-color: #fff;
  border: 1px solid #f59607;
}
</style>
