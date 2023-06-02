<template>
  <div class="background">
    <div class="small-box-control">
      <div class="small-box">
        <span class="mbti"> {{ message }}</span>
      </div>
    </div>
    <div class="memo-box">
      <div class="comment-box-top">
        <div class="img-title1">
          <img :src="require(`@/assets/first_smile1.png`)" class="title-img" />
          <span class="mbti-name"> {{ $route.params.name }}</span>
        </div>
        <p class="content">{{ selectedMessage.content }}</p>
      </div>
      <hr />
      <div class="comments-container">
        <div
          class="comment-box"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <div class="img-title2">
            <img :src="require(`@/assets/Avatar.png`)" class="title-img" />
            <div>
              <span class="mbti-name"> {{ comment.name }}</span>
              <span class="mbti-id">{{ comment.userId }}</span>
            </div>
          </div>
          <span class="answer">{{ comment.content }}</span>
          <hr />
        </div>
      </div>
    </div>
    <form @submit.prevent="submitForm" class="input-with-image">
      <input
        type="text"
        placeholder="댓글 추가..."
        v-model="newComment"
        class="name-input-box"
      />
      <button @click="postComment" class="image-button">
        <img :src="require(`@/assets/direction.png`)" alt="이미지" />
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      newComment: "",
    };
  },
  computed: {
    selectedMessage() {
      return this.$store.state.selectedMessage;
    },
    message() {
      return this.$store.state.message;
    },
    ...mapState(["comments"]),
  },
  methods: {
    ...mapMutations(["UPDATE_NEW_COMMENT", "ADD_COMMENT"]),
    backLink() {
      this.$router.go(-1);
    },
    postComment() {
      if (this.newComment.trim() === "") {
        return;
      }

      this.ADD_COMMENT({
        name: this.$route.params.name,
        userId: "(USERID)",
        content: this.newComment,
      });

      this.UPDATE_NEW_COMMENT(this.newComment);
      this.newComment = "";
    },
  },
};
</script>
<style scoped>
.background {
  background-color: #fff9c8;
  height: 100vh;
  margin: 0;
  padding-top: 30px;
}

.title {
  margin: 0;
  padding: 40px 0 20px 0;
}

.memo-box {
  width: 80vw;
  margin: 30px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 60vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
  word-wrap: break-word;
}
.small-box-control {
  display: flex;
  justify-content: center;
  height: 15vh;
}
.small-box {
  width: 80vw;
  padding-top: 7px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 15vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-content: center;
}

.img-title1 {
  margin: 0 0 0 20px;
  padding-top: 20px;
  display: flex;
}

.title-img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.mbti {
  margin: 0 0 0 5px;
  padding: 10px 10px 0 10px;
  font-size: 20px;
  font-weight: 600;
  overflow-y: auto;
  overflow-x: hidden;
  word-wrap: break-word;
}

.mbti-name {
  margin: 0 0 0 5px;
  font-size: 20px;
  font-weight: 600;
  padding: 2px 10px 0 10px;
}

.mbti-id {
  margin: 0 0 0 5px;
  font-size: 20px;
  font-weight: 400;
  padding: 2px 0 0 10px;
}

.btn {
  display: flex;
  justify-content: center;
  margin: 0;
}
.back-btn {
  border-radius: 20px;
  width: 100px;
  height: 35px;
  font-weight: bold;
  border: none;
  background-color: #f59607;
  margin-top: 15px;
}

.content {
  padding: 10px 18px 0 18px;
  line-height: 28px;
}

.comment-box {
  line-height: 30px;
  overflow-y: auto;
}

.answer {
  display: flex;
  margin: 10px 0 0 20px;
  overflow: hidden;
}

.comment-box-top {
  height: 80%;
  overflow-y: auto;
}

.comments-container {
  height: 13.5%;
  overflow-y: auto;
}
.name-input-box {
  width: 81vw;
  margin: 5px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 45px;
  display: inline-block;
  padding-left: 15px;
}

.input-with-image {
  position: relative;
}

.input-with-image img {
  position: absolute;
  top: 5px;
  right: 50px;
}

.image-button {
  width: 0;
  height: 0;
  padding: 0;
  border: none;
  background: none;
}

.img-title2 {
  margin: 0 0 0 20px;
  display: flex;
}
</style>
