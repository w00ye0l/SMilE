<template>
  <div class="background title">
    <div class="arrow-box">
      <button class="back-btn" @click="back()">
        <img :src="require(`@/assets/back.png`)" class="back-img" />
      </button>
    </div>
    <div class="small-box-control">
      <div class="small-box">
        <span class="mbti">Q. {{ this.question }}</span>
      </div>
    </div>
    <div class="memo-box">
      <div class="comment-box-top">
        <div class="my-writing-box">
          <div class="img-title1">
            <img
              :src="require(`@/assets/first_smile1.png`)"
              class="title-img"
            />
            <span class="mbti-name"> {{ $route.params.mbti }}</span>
          </div>
          <div v-if="this.userID === this.userId" class="text-modify-delete">
            <span class="writing-modify" @click="writingModify()">수정</span>
            <span class="writing-delete" @click="writingDelete()">삭제</span>
          </div>
        </div>
        <p class="content">{{ content }}</p>
      </div>
      <hr />
      <div :style="containerStyle">
        <div v-if="comments.length === 0" class="nocomment">
          아직 댓글이 없습니다.
        </div>
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
            <div v-if="this.userId === userID" class="comment-actions">
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
      <div class="name-input-box-control">
        <div class="name-input-box">
          <div class="textarea-control">
            <textarea
              type="text"
              placeholder="댓글 추가..."
              v-model="newComment"
            />
          </div>
        </div>
      </div>
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
    this.getAnswer();
  },
  data() {
    return {
      newComment: "",
      message: "",
      comments: "",
      editingCommentId: null,
      content: "",
      totalMbti: "",
      question: "",
      answer: "",
      userID: "",
      commentId: "",
    };
  },
  computed: {
    containerStyle() {
      if (this.comments.length === 0) {
        return { overflow: "none" };
      }
      return { overflow: "none" };
    },
    userId() {
      return this.$store.state.userID;
    },
  },
  methods: {
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
    },
    async postComment() {
      // 답변 ID랑
      if (this.userID === parseInt(this.$route.params.userID)) {
        return;
      }
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
    async getRandomMessage() {
      await axios
        .get("/random/question/", { withCredentials: true })
        .then((res) => {
          this.randomMessage = res.data;
          this.question = this.randomMessage.question;
        });
    },
    async getAnswer() {
      await axios
        .get(`/random/answer/read/${this.$route.params.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.answer = res.data;
          this.content = this.answer.answer.answer;
          this.userID = this.answer.answer.userID;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getComments() {
      await axios
        .get(`/random/comment/${this.$route.params.id}/read`, {
          withCredentials: true,
        })
        .then((res) => {
          this.comments = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async writingDelete() {
      if (confirm("삭제하시겠습니까?")) {
        try {
          await axios.delete(`/random/answer/remove/${this.$route.params.id}`, {
            withCredentials: true,
          });
          this.$router.go(-1);
        } catch (error) {
          console.log(error);
        }
      }
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
    back() {
      this.$router.go(-1);
    },
    writingModify() {
      this.$router.push({
        name: "randomanswermodify",
        params: {
          id: this.$route.params.id,
        },
      });
    },
  },
};
</script>
<style scoped>
.background {
  background-color: #fff9c8;
  height: 100vh;
  position: relative;
  overflow: auto;
}

.title {
  margin: 0;
  margin-bottom: 80px;
  padding: 0;
}

.arrow-box {
  height: 3vh;
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
  overflow-y: auto;
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
  margin-top: 15px;
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
  margin: 10px 0 0 10px;
  overflow: auto;
  flex-direction: column;
}

.comment-box-top {
  height: auto;
}

.my-writing-box {
  display: flex;
  justify-content: space-between;
  width: 98.5%;
}

.text-modify-delete {
  margin: 0 10px 0 20px;
  padding-top: 25px;
  display: flex;
  gap: 10px;
}

.writing-modify {
  color: skyblue;
}

.writing-delete {
  color: red;
}

.comments-container {
  overflow: scroll;
}

.name-input-box-control {
  display: flex;
  justify-content: center;
}
.name-input-box {
  width: 80%;
  height: auto;
  margin: 5px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  min-height: 45px;
  padding: 12px 0 0 15px;
  background-color: white;
}

.textarea-control {
  display: flex;
}
.input-with-image {
  position: relative;
}

.input-with-image img {
  position: absolute;
  top: 7%;
  right: 10.5%;
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
  width: 97%;
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
/* 모바일 뷰 */
@media (max-width: 541px) {
  .back-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 10%;
    top: 1%;
    margin-top: 1%;
  }
  .back-img {
    width: 70%;
    height: 70%;
  }

  textarea {
    width: 80%;
    border: none;
  }
}
/* 웹 뷰 */
@media (min-width: 541px) {
  .background {
    height: 100%;
  }
  .back-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 9.5%;
    top: 1.3%;
    margin-top: 1%;
  }
  .back-img {
    width: 70%;
    height: 70%;
  }

  textarea {
    width: 92%;
    border: none;
  }

  .small-box {
    width: 42vw;
    border-radius: 20px;
    height: 70%;
  }

  .comment-box-top {
    height: 20%;
  }

  .memo-box {
    width: 80%;
  }

  .name-input-box {
    width: 42.5vw;
  }
  .nocomment {
    margin-left: 20px;
  }
  .input-with-image img {
    right: 1.5%;
  }
  .answer {
    margin-left: 20px;
  }
}
</style>
