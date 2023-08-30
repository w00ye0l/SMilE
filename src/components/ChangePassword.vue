<template>
  <form class="form-container" @submit.prevent="onSubmit">
    <div class="input-div">
      <label for="currentPw" class="input-label">현재 비밀번호</label>
      <input
        class="input-box"
        type="password"
        name="currentPw"
        id="currentPw"
        v-model="currentPw"
      />
    </div>

    <div class="input-div">
      <label for="newPw" class="input-label">새 비밀번호</label>
      <input
        class="input-box"
        type="password"
        name="newPw"
        id="newPw"
        v-model="newPw"
      />
    </div>

    <div class="input-div">
      <label for="newPwConfirm" class="input-label">새 비밀번호 확인</label>
      <input
        class="input-box"
        type="password"
        name="newPwConfirm"
        id="newPwConfirm"
        v-model="newPwConfirm"
      />
    </div>

    <div class="setting-btn-container">
      <div class="btn btn-update" @click="updatePassword">저장</div>
      <div class="btn btn-cancel" @click="$emit('closeModal')">취소</div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentPw: "",
      newPw: "",
      newPwConfirm: "",
    };
  },
  methods: {
    async updatePassword() {
      const formData = {
        currentPassword: this.currentPw,
        newPassword: this.newPw,
        confirmPassword: this.newPwConfirm,
      };

      await axios
        .put("/mypage/editpw", formData, { withCredentials: true })
        .then((res) => {
          console.log(res);
          this.$emit("closeModal");
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
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
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.input-label {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
}

.input-box {
  width: 100%;
  height: 30px;
  padding: 0 20px;
  font-size: 16px;
  border: 0;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
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
