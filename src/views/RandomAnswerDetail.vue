<template>
  <div class="background">
    <div class="small-box-control">
      <div class="small-box">
        <span class="mbti"> {{ this.message }}</span>
      </div>
    </div>
    <div class="memo-box">
      <div class="comment-box-top">
        <div class="img-title1">
          <img :src="require(`@/assets/first_smile1.png`)" class="title-img" />
          <span class="mbti-name"> {{ $route.params.mbti }}</span>
        </div>
        <p class="content">{{ $route.params.name }}</p>
      </div>
      <hr />
      <div class="comments-container">
        <div v-if="comments.length === 0">아직 댓글이 없습니다.</div>
        <div
          class="comment-box"
          v-for="(
            { id, comment, userID, User: { mbti1, mbti2, mbti3, mbti4 } }, index
          ) in comments"
          :key="index"
        >
          <div class="comment-content">
            <div class="img-title2">
              <img :src="require(`@/assets/Avatar.png`)" class="title-img" />
              <div class="user-content">
                <span class="mbti-name">
                  {{ [mbti1, mbti2, mbti3, mbti4].join("") }}
                </span>
                <span class="mbti-id">{{ userID }}</span>
              </div>
            </div>
            <div class="comment-actions">
              <span class="modify" @click="modifyComment(id)">수정</span>
              <span class="delete" @click="removeComment(id)">삭제</span>
            </div>
          </div>
          <span class="answer">{{ comment }}</span>
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
      <button @click="postComment()" class="image-button">
        <img :src="require(`@/assets/direction.png`)" alt="이미지" />
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getRandomMessage();
    this.getComments();
  },
  data() {
    return {
      newComment: "",
      message: "",
      comments: "",
      editingCommentId: null,
    };
  },
  computed: {},
  methods: {
    backLink() {
      this.$router.go(-1);
    },
    validComment() {
      if (this.newComment.trim() === "") {
        alert("댓글을 입력하세요");
        return false;
      }
      return true;
    },
    async modifyComment(commentId) {
      const commentToEdit = this.comments.find((c) => c.id === commentId);
      this.newComment = commentToEdit.comment;
      this.editingCommentId = commentId;
      console.log(this.editingCommentId);
    },
    async postComment() {
      if (this.validComment()) {
        const formData = {
          answerID: this.$route.params.id,
          comment: this.newComment,
        };
        try {
          if (this.editingCommentId) {
            await axios.put(
              `/random/comment/update/${this.editingCommentId}`,
              formData,
              {
                withCredentials: true,
              }
            );
            this.editingCommentId = null;
          } else {
            await axios.post(
              `/random/comment/${this.$route.params.id}/create`,
              formData,
              { withCredentials: true }
            );
          }
          await this.getComments();
        } catch (error) {
          console.log(error);
        }
        this.newComment = "";
      }
    },
    async getComments() {
      console.log(this.$route.params.id);
      await axios
        .get(`/random/comment/${this.$route.params.id}/read`, {
          withCredentials: true,
        })
        .then((res) => {
          this.comments = res.data;
          console.log(this.comments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getRandomMessage() {
      await axios
        .get("/random/question/", { withCredentials: true })
        .then((res) => {
          this.randomMessage = res.data;
          this.message = this.randomMessage.question;
        });
    },
    async removeComment(commentId) {
      if (confirm("삭제하시겠습니까?")) {
        try {
          await axios.delete(`/random/comment/remove/${commentId}`, {
            withCredentials: true,
          });
          await this.getComments();
        } catch (err) {
          console.log(err);
        }
      }
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
  padding: 2px 5px 0 10px;
}

.mbti-id {
  margin: 0 0 0 5px;
  font-size: 20px;
  font-weight: 400;
  padding: 2px 0 0 5px;
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
.comment-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
}
.img-title2 {
  margin: 0 0 0 20px;
  display: flex;
  align-items: center;
}
.comment-actions {
  display: flex;
  gap: 10px;
}

.user-content {
  display: flex;
}

.modify {
  color: skyblue;
}
.delete {
  color: red;
}
</style>
