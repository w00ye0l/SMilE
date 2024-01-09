<template>
  <div class="main-container">
    <div class="info-container">
      <div class="profile-box">
        <div class="profile-img-container">
          <img
            class="prev-btn"
            src="@/assets/back.png"
            alt="뒤로 가기"
            @click="moveMbti"
          />

          <div class="profile-img-box">
            <div v-on:click="deleteImage" class="delete-img-container"></div>
            <img
              v-if="guest.image === null"
              :src="require(`@/assets/default_smile.svg`)"
              ref="preview"
              class="profile-img"
            />
            <img
              v-if="guest.image !== null"
              :src="guest.image"
              ref="preview"
              class="avatar"
            />
            <label for="mbtiImg" class="edit-img-container">
              <font-awesome-icon
                :icon="['fas', 'pen']"
                size="sm"
                style="color: #000"
              />
            </label>
            <input
              class="input-box"
              name="mbtiImg"
              id="mbtiImg"
              type="file"
              accept="image/*"
              ref="mbtiImg"
              @change="mbtiImg"
              :style="{
                display: 'none',
              }"
            />
          </div>

          <img
            class="delete-mbti"
            src="@/assets/trashcan.png"
            alt="정보 삭제하기"
            @click="deleteDetail"
          />
        </div>
        <input class="profile-name" v-model="name" />
      </div>

      <div class="form-control">
        <label class="form-label">MBTI</label>
        <div class="selected-mbti-container" @click="selectMBti">
          <div class="mbti-box">
            <p class="selected-mbti">{{ mbti }}</p>
            <img :src="require(`@/assets/Polygon.png`)" class="arrow" />
          </div>

          <ul class="mbti-option" v-bind:class="{ active: selectMbti }">
            <li
              v-for="(m, index) in mbtiList"
              :key="index"
              class="mbti"
              v-bind:class="{ active: m === this.mbti }"
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
            :class="{ group, 'selected-group': groupID === group.id }"
          >
            {{ group.name }}
          </button>
        </div>
      </div>

      <div class="form-control">
        <label class="form-label">메모</label>
        <textarea class="memo-box" v-model="memo"></textarea>
      </div>

      <div class="form-control">
        <label class="form-label">이 MBTI는 어떨까?</label>
        <div class="doc-btn-container">
          <button class="doc-btn" @click="docMove(guest.mbti)">상대법</button>
          <button class="doc-btn" @click="docMove(guest.mbti)">
            주의할 점
          </button>
          <button class="doc-btn" @click="docMove(guest.mbti)">특징</button>
        </div>
      </div>

      <div class="btn-container">
        <button
          class="btn edit-btn"
          @click="editDetail"
          :disabled="changeDetail"
        >
          수정
        </button>
        <button class="btn cancel-btn" @click="closeDetail">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectMbti: false,
      image: this.$store.state.selectGuest.image,
      name: this.$store.state.selectGuest.name,
      mbti: this.$store.state.selectGuest.mbti,
      groupID: this.$store.state.selectGuest.groupID,
      memo: this.$store.state.selectGuest.memo,
      changeDetail: true,
    };
  },
  computed: {
    guest() {
      return this.$store.state.selectGuest;
    },
    mbtiList() {
      return this.$store.state.mbtiList;
    },
    groups() {
      return this.$store.state.groups;
    },
    groupName() {
      return this.groups.filter((obj) => obj["id"] === this.groupID)[0].name;
    },
  },
  watch: {
    name: function () {
      if (this.guest.name !== this.name) {
        this.changeDetail = false;
      } else {
        this.changeDetail = true;
      }
    },
    groupID: function () {
      if (this.guest.groupID !== this.groupID) {
        this.changeDetail = false;
      } else {
        this.changeDetail = true;
      }
    },
    mbti: function () {
      if (this.guest.mbti !== this.mbti) {
        this.changeDetail = false;
      } else {
        this.changeDetail = true;
      }
    },
    memo: function () {
      if (this.guest.memo !== this.memo) {
        this.changeDetail = false;
      } else {
        this.changeDetail = true;
      }
    },
    image: function () {
      if (this.guest.image !== this.image) {
        this.changeDetail = false;
      } else {
        this.changeDetail = true;
      }
    },
  },
  methods: {
    moveMbti() {
      this.$router.push({ path: "/mbti" });
    },
    selectMBti() {
      if (this.selectMbti === true) {
        this.selectMbti = false;
      } else {
        this.selectMbti = true;
      }
    },
    selectGroup(groupId) {
      this.groupID = groupId;
    },
    selectMbtiOption(selectedMbti) {
      this.mbti = selectedMbti;
    },
    docMove(mbti) {
      // this.$store.commit("SET_SELECTED_MBTI", mbti);
      this.$router.push({
        path: "/doc",
        query: {
          mbti: mbti,
        },
      });
    },
    async mbtiImg() {
      const fileInput = this.$refs.mbtiImg;

      if (fileInput.files.length > 0) {
        this.image = fileInput.files[0];
        console.log(this.image);
        await this.base64(this.image);
      }
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
        if (file) {
          reader.readAsDataURL(file);
        } else {
          resolve("");
        }
      });
    },
    async deleteImage() {
      if (this.image) {
        if (confirm("이미지를 삭제하시겠습니까?")) {
          this.deleteMbtiImg();
        }
      }
    },
    async deleteMbtiImg() {
      this.guest.image = null;

      await axios
        .delete("/guest/image/" + this.guest.id + "/delete", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "detail" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteDetail() {
      if (confirm("MBTI 정보를 삭제하시겠습니까?")) {
        await axios
          .delete(`/guest/remove/${this.guest.id}`, { withCredentials: true })
          .then((res) => {
            this.$router.push({ name: "mbti" });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async editDetail() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const imageData = {
        id: this.guest.id,
        image: this.image,
      };
      const formData = {
        name: this.name,
        mbti: this.mbti,
        memo: this.memo,
        groupID: this.groupID,
      };

      if (typeof this.image === "object") {
        console.log("ok");
        await axios
          .post("/guest/image/" + this.guest.id, imageData, {
            headers,
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      await axios
        .put(`/guest/update/${this.guest.id}`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "mbti" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeDetail() {
      this.$router.push({ name: "mbti" });
    },
  },
};
</script>

<style scoped>
@media (min-width: 541px) {
  .main-container {
    height: 100%;
  }

  .info-container {
    padding: 0 80px;
  }
}

@media (max-width: 540px) {
  .main-container {
    height: calc(100% - 80px);
  }
}

.main-container {
  position: relative;
  padding: 40px 20px;
}

.info-container {
  width: 100%;
}

.prev-btn {
  position: absolute;
  padding: 7px;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

.profile-box {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.profile-img-container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img-box {
  position: relative;
}

.profile-img {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 50%;
  object-fit: cover;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #ddd;
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

.edit-img-container {
  position: absolute;
  bottom: 0;
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

.delete-mbti {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.profile-name {
  padding: 5px;
  width: fit-content;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: 0;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.form-control {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.form-label {
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
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
  padding: 10px 20px;
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
  padding: 15px 0;
  display: flex;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  gap: 10px;
}

.group {
  padding: 5px 15px;
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
  padding: 10px 20px;
  width: 100%;
  height: 120px;
  font-size: 16px;
  border-radius: 20px;
  border: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  resize: none;
  white-space: pre-line;
  outline: none;
}

.doc-btn-container {
  display: flex;
  justify-content: flex-start;
  padding: 15px 0;
  width: 100%;
  gap: 20px;
}

.doc-btn {
  padding: 5px 15px;
  font-size: 16px;
  background-color: #ffd338;
  border-radius: 20px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.btn-container {
  margin-top: 60px;
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

.edit-btn {
  border: none;
  background-color: #f59607;
}

.cancel-btn {
  border: solid 1px #f59607;
  background-color: #ffffff;
}
</style>
