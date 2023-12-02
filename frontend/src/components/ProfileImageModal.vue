<template>
  <div class="modal-background" @click.self="closeModal">
    <div class="modal-body">
      <img
        v-if="newProfileImg === null"
        :src="require('@/assets/Avatar.png')"
        class="profile-img"
      />
      <img
        v-if="newProfileImg !== null"
        :src="newProfileImg"
        class="profile-img"
      />
    </div>
    <div class="btn-container">
      <label for="newProfileImg" class="btn edit-btn">수정</label>
      <input
        class="input-box"
        name="newProfileImg"
        id="newProfileImg"
        type="file"
        accept="image/*"
        ref="newProfileImg"
        @change="changeNewProfileImg"
        :style="{
          display: 'none',
        }"
      />
      |
      <button class="btn close-btn" @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      image: {},
      id: "",
      newProfileImg: "",
    };
  },
  beforeMount() {
    this.id = this.$store.state.mypage.id;
    this.newProfileImg = this.$store.state.mypage.profileImg;
  },
  methods: {
    async changeNewProfileImg() {
      this.image = this.$refs.newProfileImg.files[0];
      console.log(this.image);
      if (this.image) {
        await this.deletePrevImg();
        await this.uploadNewProfileImg(this.image);
      }
    },
    closeModal() {
      this.$emit("close");
    },
    async deletePrevImg() {
      await axios
        .delete("/mypage/image/" + this.id + "/delete", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          this.$emit("close");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async uploadNewProfileImg(formData) {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      console.log(formData);
      const newFormData = {
        id: this.id,
        image: formData,
      };

      await axios
        .post("/mypage/image/" + this.id, newFormData, {
          headers,
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          this.$store.dispatch("updateProfileImage", res.data.image);
          this.$emit("close");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@media (width >= 541px) {
  .btn-container {
    margin-bottom: 200px;
  }
}

@media (width <= 540px) {
  .btn-container {
    margin-bottom: 50px;
  }
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #000000c9;
  z-index: 1000;
}

.modal-body {
  padding: 10px;
  width: 100vw;
  max-width: 800px;
  background: white;
}

.profile-img {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
}

.btn-container {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #f59607;
  font-size: 24px;
  line-height: 1em;
}

.btn {
  background-color: inherit;
  border: 0;
  color: #f59607;
  font-size: 24px;
  cursor: pointer;
}
</style>
