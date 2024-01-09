<template>
  <div class="main-section">
    <!-- 오늘의 질문 -->
    <div class="title-container">
      <img
        class="prev-btn"
        src="@/assets/back.svg"
        alt="뒤로 가기"
        @click="moveRandomQuestion"
      />
      <h1 class="title-box">Q. {{ question }}</h1>
    </div>

    <!-- 글 컨테이너 -->
    <article class="article-container">
      <!-- 답변 컨테이너 -->
      <div class="answer-container">
        <!-- 답변 작성 유저 -->
        <div class="writer-container">
          <div class="writer-profile">
            <img
              v-if="writeUser.image === ''"
              :src="require(`@/assets/default_smile.svg`)"
              class="writer-profileImg"
              alt="작성자 프로필 이미지"
            />
            <img
              v-if="writeUser.image !== ''"
              :src="writeUser.image"
              class="writer-profileImg"
              alt="작성자 프로필 이미지"
            />
            <p class="writer-mbti">{{ writerMbti }}</p>
          </div>

          <div v-if="writerId === userId" class="article-btn-container">
            <button class="btn article-btn modify-btn" @click="writingModify">
              수정
            </button>
            <button class="btn article-btn delete-btn" @click="writingDelete">
              삭제
            </button>
          </div>
        </div>

        <p class="answer">{{ answer.answer }}</p>
      </div>

      <!-- 댓글 컨테이너 -->
      <div class="comment-container">
        <!-- 댓글이 없다면 -->
        <template v-if="comments.length === 0">
          <p class="no-comment-box">아직 댓글이 없습니다.</p>
        </template>
        <!-- 댓글이 있다면 -->
        <template v-else>
          <div
            class="comment-box"
            v-for="(
              {
                id,
                comment,
                userID,
                User: { image, mbti1, mbti2, mbti3, mbti4 },
              },
              index
            ) in comments"
            :key="index"
          >
            <div class="comment-content">
              <!-- 댓글 유저 프로필 -->
              <div class="comment-user-profile">
                <img :src="image" class="comment-user-profileImg" />
                <p class="comment-user-mbti">
                  {{ [mbti1, mbti2, mbti3, mbti4].join("") }}
                </p>
              </div>

              <!-- 댓글 버튼 컨테이너 -->
              <div v-if="this.userId === userID" class="article-btn-container">
                <button
                  class="btn comment-btn modify-btn"
                  @click="modifyComment(id)"
                >
                  수정
                </button>
                <button
                  class="btn comment-btn delete-btn"
                  @click="removeComment(id)"
                >
                  삭제
                </button>
              </div>
            </div>

            <!-- 댓글 -->
            <p class="comment">{{ comment }}</p>
          </div>
        </template>
      </div>
    </article>

    <!-- 댓글 폼 -->
    <form @submit.prevent="submitForm" class="comment-form">
      <textarea
        class="comment-textarea"
        type="text"
        placeholder="댓글 추가..."
        v-model="comment"
      />
      <img
        class="comment-write-btn"
        @click="postComment"
        :src="require(`@/assets/direction.svg`)"
        alt="이미지"
      />
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
      question: "",
      answer: "",
      writeUser: {},
      writerId: "",
      comments: "",
      comment: "",
      editingCommentId: null,
      commentId: "",
    };
  },
  computed: {
    userId() {
      return this.$store.state.mypage.id;
    },
    writerMbti() {
      return (
        this.writeUser.mbti1 +
        this.writeUser.mbti2 +
        this.writeUser.mbti3 +
        this.writeUser.mbti4
      );
    },
  },
  methods: {
    // 오늘의 질문 가져오기
    async getRandomMessage() {
      await axios
        .get("/random/question/", { withCredentials: true })
        .then((res) => {
          this.question = res.data.question;
        });
    },
    // 글 가져오기
    async getAnswer() {
      await axios
        .get(`/random/answer/read/${this.$route.params.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.answer = res.data.answer;
          this.writerId = res.data.answer.userID;
          this.writeUser = res.data.writeUser;
        })
        .catch(() => {});
    },
    // 댓글 가져오기
    async getComments() {
      await axios
        .get(`/random/comment/${this.$route.params.id}/read`, {
          withCredentials: true,
        })
        .then((res) => {
          this.comments = res.data;
        })
        .catch(() => {});
    },
    // 뒤로 가기
    moveRandomQuestion() {
      this.$router.go(-1);
    },
    // 글 수정
    writingModify() {
      this.$router.push({
        name: "randomanswermodify",
        params: {
          id: this.answer.id,
        },
      });
    },
    // 글 삭제
    async writingDelete() {
      if (confirm("삭제하시겠습니까?")) {
        await axios
          .delete(`/random/answer/remove/${this.answer.id}`, {
            withCredentials: true,
          })
          .then(() => {
            this.$store.commit("SET_ANSWERED", 0);
            this.$router.push({ name: "randomquestion" });
          })
          .catch(() => {});
      }
    },
    // 댓글 검증
    validComment() {
      if (this.comment.trim() === "") {
        alert("댓글을 입력하세요");
        return false;
      }
      return true;
    },
    // 댓글 작성 및 수정
    async postComment() {
      const valid = this.validComment();

      if (valid) {
        const formData = {
          answerID: this.answer.answerID,
          comment: this.comment,
        };
        if (this.editingCommentId) {
          await axios
            .put(`/random/comment/update/${this.editingCommentId}`, formData, {
              withCredentials: true,
            })
            .then(() => {
              this.editingCommentId = null;
            })
            .catch(() => {});
        } else {
          await axios
            .post(`/random/comment/${this.$route.params.id}/create`, formData, {
              withCredentials: true,
            })
            .then(() => {})
            .catch(() => {});
        }
        await this.getComments();
        this.comment = "";
      }
    },
    // 댓글 수정 전환
    async modifyComment(commentId) {
      const commentToEdit = this.comments.find((c) => c.id === commentId);
      this.comment = commentToEdit.comment;
      this.editingCommentId = commentId;
    },
    // 댓글 삭제
    async removeComment(commentId) {
      if (confirm("삭제하시겠습니까?")) {
        await axios
          .delete(`/random/comment/remove/${commentId}`, {
            withCredentials: true,
          })
          .then(() => {
            this.getComments();
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style scoped>
@media (width > 540px) {
  .main-section {
    padding: 0 30px;
  }

  .article-container {
    width: 100%;
  }

  .comment-form {
    width: 100%;
  }
}

@media (width <= 540px) {
  .article-container {
    margin: auto;
    width: calc(100% - 40px);
  }

  .comment-form {
    margin: auto;
    width: calc(100% - 40px);
  }
}

.title-container {
  width: 100%;
  position: relative;
}

.prev-btn {
  position: absolute;
  padding: 5px;
  top: 50px;
  left: 30px;
  cursor: pointer;
}

.title-box {
  margin: 0;
  padding: 50px 0;
  width: 100%;
  text-align: center;
  font-size: 24px;
}

.article-container {
  /* padding: 20px; */
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.answer-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.writer-container {
  padding: 0 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  background-color: #fff9c8;
}

.writer-profile {
  display: flex;
  align-items: center;
  gap: 20px;
}

.writer-profileImg {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  object-fit: cover;
}

.writer-mbti {
  font-size: 24px;
  font-weight: bold;
}

.article-btn-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn {
  width: 50px;
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
  border: 0;
  cursor: pointer;
}

.article-btn {
  background-color: #ffe99d;
}

.article-btn:hover {
  background-color: #ffd338;
}

.comment-btn {
  background-color: #fff9c8;
}

.comment-btn:hover {
  background-color: #ffe99d;
}

.modify-btn {
  color: lightblue;
}

.delete-btn {
  color: lightpink;
}

.answer {
  margin: 0;
  padding: 10px 20px;
  width: 100%;
  height: 300px;
  font-size: 18px;
  text-align: start;
  white-space: pre-line;
  overflow-y: auto;
}

.comment-container {
  border-top: 2px solid #ccc;
  margin-top: 20px;
  width: 100%;
}

.no-comment-box {
  margin: 0;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  color: #999;
}

.comment-box {
  margin-bottom: 10px;
  padding: 10px 20px;
  width: 100%;
  border-bottom: 2px solid #eee;
}

.comment-content {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.comment-user-profileImg {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  object-fit: cover;
}

.comment-user-mbti {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.comment {
  margin: 0 10px;
  font-size: 18px;
  text-align: start;
}

.comment-form {
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 50px;
  height: 100px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.comment-textarea {
  padding: 10px 20px;
  width: calc(100% - 60px);
  height: 100%;
  font-size: 16px;
  border: 0;
  border-radius: 10px;
  resize: none;
  outline: 0;
}

.comment-write-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 0;
  width: 50px;
  height: 50px;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
