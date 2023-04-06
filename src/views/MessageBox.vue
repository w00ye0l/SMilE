<template>
  <div class="title background">
    <h2>쪽지함</h2>
    <div class="total_delete_btn">
      <button class="total_delete" @click="deleteAllMessages()">
        전체삭제
      </button>
    </div>
    <div
      class="dropbox"
      @click="messageLink()"
      v-for="(message, index) in messages"
      :key="index"
    >
      <div class="name-img">
        <img :src="require(`@/assets/yellowsmile.png`)" class="smile" />
        <div class="name-content">
          <div class="name-left">
            <span class="name">{{ message.name }}</span>
          </div>
          <span class="content">{{ message.content }}</span>
        </div>
      </div>
      <div class="date">
        <span class>{{ message.date }}</span>
        <button class="cancel" @click="deleteMessage(index)">
          <img
            :src="require(`@/assets/cancelorange.png`)"
            class="cancel-image"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },
  data() {},
  methods: {
    deleteMessage(index) {
      if (confirm("삭제하시겠습니까?")) {
        this.$store.commit("deleteMessage", index);
      }
    },
    deleteAllMessages() {
      if (confirm("전체 삭제하시겠습니까?")) {
        this.$store.commit("deleteAllMessages");
      }
    },
    messageLink() {
      this.$router.push({ path: "messageconfirm" });
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

.dropbox {
  width: 90vw;
  height: 8vh;
  background-color: #ffd338;
  border-radius: 25px;
  margin: 30px 0 0 20px;
  display: flex;
  justify-content: space-between;
}

.smile {
  float: left;
  margin: 15px 0 0 10px;
}

.name {
  font-weight: 600;
}

.name-left {
  display: flex;
  margin: 8px 0 0 8px;
}
.name-content {
  display: flex;
  flex-direction: column;
}

.date {
  margin: 8px 10px 0 0;
}

.content {
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cancel {
  border: none;
  background-color: transparent;
}

.cancel-image {
  width: 15px;
  margin: 0 0 5px 5px;
  vertical-align: middle;
}

.total_delete_btn {
  display: flex;
  justify-content: flex-end;
  margin-right: 25px;
}
.total_delete {
  border: none;
  background-color: transparent;
  font-size: 15px;
}
</style>
