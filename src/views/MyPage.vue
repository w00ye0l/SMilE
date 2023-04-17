<template>
  <div>
    <h2 class="title">마이 페이지</h2>
    <div class="img-box">
      <img :src="require(`@/assets/Avatar.png`)" class="avatar" />
      <div class="my-name-mbti">
        <span class="my-name">{{ $store.state.mypage[0].nickname }}</span>
        <span class="my-mbti">{{ $store.state.mypage[0].mbti }}</span>
      </div>
    </div>
    <button class="btn-edit" @click="openModal">프로필 수정</button>
    <div class="black-bg box-sizing" v-if="modalOpen">
      <div class="white-bg">
        <form>
          <div class="form-row">
            <label for="profile-img" class="modal-font-size">
              프로필 사진 변경
            </label>
            <input type="file" />
          </div>
          <div class="form-row">
            <label for="current-pw" class="modal-font-size">
              현재 비밀번호
            </label>
            <input type="password" id="current-pw" />
          </div>
          <div class="form-row">
            <label for="new-pw" class="modal-font-size">새 비밀번호</label>
            <input type="password" id="new-pw" />
          </div>
          <div class="form-row">
            <label for="new-pw-confirm" class="modal-font-size">
              새 비밀번호 확인
            </label>
            <input type="password" id="new-pw-confirm" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save" @click="closeModal">
              저장
            </button>
            <button type="button" class="btn-cancel" @click="closeModal">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="dropbox">
      <span class="category-name">쪽지함</span>
      <button class="btn-more" @click="pageLink">더보기</button>
    </div>
    <div class="box-container">
      <div v-for="index in messageCount" :key="index" class="message">
        <span class="message-content"> 새로운 쪽지가 도착했습니다.</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    messageCount() {
      return this.$store.getters.MESSAGE_COUNT;
    },
  },
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    pageLink() {
      this.$router.push({ path: "messagebox" });
    },
  },
};
</script>
<style>
.title {
  margin: 0;
  padding: 40px 0 20px 0;
}

.avatar {
  float: left;
  margin: 15px 0 0 30px;
}

.img-box {
  background: #fff9c8;
  margin: 20px 0 0 20px;
  width: 90vw;
  height: 120px;
  border-radius: 20px;
  border: 1px solid black;
}

.my-name-mbti {
  display: flex;
  flex-direction: column;
  float: left;
  margin: 20px 0 0 20px;
  font-size: 20px;
}

.my-name {
  margin-left: 10px;
}

.my-mbti {
  margin-top: 10px;
}

.category-name {
  font-size: 20px;
  font-weight: 600;
  justify-content: left;
  margin-left: 20px;
}

.dropbox {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-more {
  border: none;
  background: none;
  font-size: 18px;
  margin-right: 25px;
}

.btn-edit {
  margin-top: 20px;
  width: 90vw;
  height: 35px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 5rem;
  border: 1px solid rgb(220, 220, 220);
}

.black-bg {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
}

.white-bg {
  width: 90vw;
  background: white;
  position: absolute;
  bottom: 20px;
  border-radius: 15px;
  padding: 20px;
  height: 55vh;
  top: 150px;
}

.modal-container h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-row {
  margin-bottom: 20px;
}

.form-row label {
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-row input {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #f1f1f1;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-cancel {
  padding: 10px 20px;
  background-color: white;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: blue;
}

.btn-save {
  padding: 10px 20px;
  background-color: white;
  color: blue;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  width: 80px;
}

.modal-font-size {
  font-size: 15px;
  margin-top: 20px;
}

.box-container {
  width: 90vw;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  border-radius: 20px;
  height: 30vh;
  margin: 10px 0 0 15px;
  overflow-y: scroll;
}

.message {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85vw;
  height: 35px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 5rem;
  margin: 15px 0 10px 10px;
  border: 1px solid rgb(220, 220, 220);
  background-color: #ffd338;
}

.message-content {
  display: flex;
  align-items: center;
}
</style>
