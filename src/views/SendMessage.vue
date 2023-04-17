<template>
  <div class="title background">
    <h2>쪽지 보내기</h2>
    <div class="messagebox">
      <div class="close-send">
        <button @click="pageLink" class="cancel-btn">
          <img :src="require(`@/assets/cancel.png`)" class="cancel" />
        </button>
        <button class="add-btn">
          <span class="send" @click="pageLink()">보내기</span>
        </button>
      </div>
      <textarea
        v-model="memo"
        class="text"
        @input="updateMemo()"
        placeholder="내용을 입력하세요"
      >
      </textarea>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      memo: "",
      newMessage: null,
    };
  },
  methods: {
    pageLink() {
      if (this.memo === "") {
        alert("내용을 입력해주세요");
      } else {
        this.$store.commit("UPDATE_MEMO", this.newMessage);
        this.$router.push({ path: "messageconfirm" });
      }
    },
    updateMemo() {
      this.newMessage = {
        content: this.memo,
        date: new Date().toLocaleDateString(),
      };
    },
  },
};
</script>
<style scoped>
.title {
  margin: 0;
  padding: 30px 0 20px 0;
}
.background {
  background-color: #fff9c8;
  height: 100vh;
}

.messagebox {
  height: 70vh;
  width: 70vw;
  margin: 40px 0 0 60px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.close-send {
  display: flex;
  justify-content: space-between;
  margin: 0 20px 0 15px;
}

.add-btn {
  width: 100px;
  height: 40px;
  border-radius: 18px;
  border: none;
  background-color: #f59607;
  margin-left: 50px;
  font-size: 17px;
  margin-top: 17px;
}

.cancel-btn {
  border: none;
  background-color: transparent;
}
.cancel {
  width: 20px;
  height: 20px;
  margin: 23px 0 0 5px;
}

.send {
  font-weight: bold;
}

.text {
  margin-top: 20px;
  width: 55.8vw;
  height: 60.2vh;
  border: none;
}
</style>
