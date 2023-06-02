<template>
  <div>
    <h1>비밀번호 변경</h1>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <label for="current-pw" class="modal-font-size">현재 비밀번호</label>
        <input type="password" id="current-pw" />
      </div>

      <div class="form-row">
        <label for="new-pw" class="modal-font-size">새 비밀번호</label>
        <input type="password" id="new-pw" />
      </div>

      <div class="form-row">
        <label for="new-pw-confirm" class="modal-font-size"
          >새 비밀번호 확인</label
        >
        <input type="password" id="new-pw-confirm" />
      </div>

      <div class="setting-btn-container">
        <button type="submit" class="btn-save" @click="closeModal">저장</button>
        <button type="button" class="btn-cancel" @click="$emit('closeModal')">
          취소
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    // currentPw: "",
    // newPw: "",
    // newPwConfirm: "",
    closeModal: Function,
  },
  methods: {
    // checkCurrentPassword() {
    //   if (currentPw !== )
    // },
  },
};
</script>

<style scoped></style>
