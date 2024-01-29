<template>
  <div class="main-container">
    <div class="title-container">
      <img
        class="prev-btn"
        src="@/assets/back.svg"
        alt="뒤로 가기"
        @click="moveMbtiView"
      />
      <h1 class="title">MBTI 정보 추가</h1>
    </div>

    <div class="mbti-form">
      <div class="input-div profile-img">
        <div class="preview-container">
          <img
            :src="require('@/assets/default_smile.svg')"
            ref="preview"
            class="preview"
          />
          <div v-on:click="deleteImage" class="delete-img-container"></div>
        </div>
        <label for="profileImg" class="profile-label">이미지 선택</label>
        <input
          class="input-box"
          name="profileImg"
          id="profileImg"
          type="file"
          accept="image/*"
          ref="profileImg"
          @change="profileImg"
          :style="{
            display: 'none',
          }"
        />
      </div>

      <div class="form-control">
        <label class="form-label">이름</label>
        <input
          type="text"
          placeholder="이름"
          v-model="nameId"
          class="name-input"
        />
      </div>

      <div class="form-control">
        <label class="form-label">MBTI</label>
        <div class="selected-mbti-container" @click="selectMBti">
          <div class="mbti-box">
            <p class="selected-mbti">{{ selectedMbti }}</p>
            <img :src="require(`@/assets/polygon.svg`)" class="arrow" />
          </div>

          <ul class="mbti-option" v-bind:class="{ active: selectMbti }">
            <li
              v-for="(m, index) in mbtiList"
              :key="index"
              class="mbti"
              v-bind:class="{ active: m === this.selectedMbti }"
              v-on:click="selectMbtiOption(m)"
            >
              {{ m }}
            </li>
          </ul>
        </div>
      </div>

      <div class="form-control">
        <label class="form-label">그룹</label>
        <div class="group-control">
          <button
            v-for="(group, index) in groups"
            :key="index"
            @click="selectGroup(group.id)"
            :class="{ group, 'selected-group': selectedGroup === group.id }"
          >
            {{ group.name }}
          </button>
        </div>
      </div>

      <div class="form-control">
        <label class="form-label">메모</label>
        <textarea class="memo-box" v-model="memo"></textarea>
      </div>

      <div class="btn-container">
        <button class="btn add-btn" @click="addGuest">추가</button>
        <button class="btn cancel-btn" @click="goToBack">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      selectMbti: false,
      image: {},
      nameId: "",
      selectedMbti: "선택해주세요",
      memo: "",
      selectedGroup: 0,
      groups: [],
    };
  },
  computed: {
    ...mapState(["mbtiList"]),
  },
  mounted() {
    this.getGroup();
  },
  methods: {
    moveMbtiView() {
      this.$router.go(-1);
    },
    async getGroup() {
      await axios.get("/group/index", { withCredentials: true }).then((res) => {
        this.groups = res.data;
      });
    },
    validateInput() {
      if (!this.nameId.trim()) {
        alert("이름을 입력해주세요.");
        return false;
      }
      if (this.selectedMbti === "선택해주세요") {
        alert("MBTI를 선택해주세요.");
        return false;
      }
      if (this.selectedGroup === 0) {
        alert("그룹을 선택해주세요.");
        return false;
      }
      return true;
    },
    base64(file) {
      // 비동기적으로 동작하기 위하여 promise를 return 해준다.
      return new Promise((resolve) => {
        // 업로드된 파일을 읽기 위한 FileReader() 객체 생성
        let reader = new FileReader();
        // 읽기 동작이 성공적으로 완료됐을 때 발생
        reader.onload = (e) => {
          resolve(e.target.result);
          // 썸네일을 보여주고자 하는 <img>에 id값을 가져와 src에 결과값을 넣어준다.
          const previewImage = this.$refs.preview;
          previewImage.src = e.target.result;
        };
        // file 데이터를 base64로 인코딩한 문자열. 이 문자열을 브라우저가 인식하여 원래 데이터로 만들어준다.
        reader.readAsDataURL(file);
      });
    },
    async profileImg() {
      this.image = this.$refs.profileImg.files[0];
      await this.base64(this.image);
    },
    async deleteImage() {
      if (this.image) {
        if (confirm("이미지를 삭제하시겠습니까?")) {
          this.image = {};
          this.$refs.profileImg.value = "";
          const previewImage = this.$refs.preview;
          previewImage.src = require("@/assets/default_smile.svg");
        }
      }
    },
    async addGuest() {
      if (this.validateInput()) {
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        const formData = {
          image: this.image,
          name: this.nameId,
          mbti: this.selectedMbti,
          groupID: this.selectedGroup,
          memo: this.memo,
        };

        await axios
          .post(`/guest/${this.selectedGroup}/create`, formData, {
            headers,
            withCredentials: true,
          })
          .then(() => {})
          .catch(() => {});
        this.$router.push({ path: "/mbti" });
      }
    },
    goToBack() {
      this.$router.push({ path: "/mbti" });
    },
    selectMBti() {
      if (this.selectMbti === true) {
        this.selectMbti = false;
      } else {
        this.selectMbti = true;
      }
    },
    selectMbtiOption(option) {
      this.selectedMbti = option;
    },
    selectGroup(groupId) {
      this.selectedGroup = groupId;
    },
  },
};
</script>

<style scoped>
@media (min-width: 541px) {
  .main-container {
    padding: 0 80px;
  }

  .title {
    padding: 50px 80px;
  }

  .prev-btn {
    left: 90px;
  }

  .mbti-form {
    padding: 0 80px;
  }

  .mbti-option {
    padding: 10px 150px;
  }
}

@media (max-width: 540px) {
  .main-container {
    padding: 0 20px;
  }

  .title {
    padding: 50px 0;
  }

  .prev-btn {
    left: 10px;
  }

  .mbti-option {
    padding: 10px 50px;
  }
}

.main-container {
}

.title-container {
  width: 100%;
  position: relative;
}

.title {
  margin: 0;
  width: 100%;

  font-size: 24px;
  text-align: center;
}

.prev-btn {
  position: absolute;
  padding: 5px;
  top: 50px;
  left: 30px;
  cursor: pointer;
}

.mbti-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  padding: 30px 20px;
  width: 100%;
  background-color: #fff9c8;
  border-radius: 10px;
}

.input-div {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-container {
  position: relative;
}

.preview {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #ccc;
  object-fit: cover;
}

.delete-img-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
}

.delete-img-container::after {
  position: absolute;
  top: -5px;
  left: 6.5px;
  content: "\00D7";
  font-size: 24px;
}

.profile-img {
  margin: 0;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.profile-label {
  padding: 5px 10px;
  background-color: #ffd338;
  border-radius: 5px;
  cursor: pointer;
}

.form-control {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.form-label {
  margin-bottom: 10px;
  padding-left: 10px;
  font-weight: 600;
}

.name-input {
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  border-radius: 20px;
  border: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.selected-mbti-container {
  position: relative;
  width: 100%;
}

.mbti-box {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.selected-mbti {
  margin: 0;
  font-weight: bold;
  color: #f59607;
}

.mbti-option {
  position: absolute;
  top: 120%;
  display: none;
  justify-content: center;
  flex-flow: wrap;
  margin: 0;
  width: 100%;
  height: 200px;
  overflow-y: auto;
  list-style-type: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  z-index: 20;
  gap: 10px;
  background-color: #fff;
}

.active {
  display: flex;
}

.mbti {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  padding: 10px;
  font-weight: bold;
  background-color: #fff9c8;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.mbti.active {
  background-color: #ffd338;
}

.group-control {
  padding: 5px;
  display: flex;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  gap: 10px;
}

.group {
  padding: 10px 20px;
  width: auto;
  font-size: 16px;
  background-color: #ffd338;
  border: none;
  word-break: keep-all;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.selected-group {
  background-color: #f59607;
}

.memo-box {
  width: 100%;
  height: 100px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: white;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  resize: none;
  white-space: pre-line;
  outline: none;
}

.btn-container {
  margin: 20px;
  display: flex;
  justify-content: space-evenly;
}

.btn {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
}

.add-btn {
  border: none;
  background-color: #f59607;
}

.cancel-btn {
  border: solid 1px #f59607;
  background-color: #ffffff;
}
</style>
