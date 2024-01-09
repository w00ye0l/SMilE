<template>
  <div class="modal-background" @click.self="closeModal">
    <div class="modal-body">
      <div v-on:click="deleteImage" class="delete-img-container"></div>
      <img
        v-if="newProfileImg === null"
        :src="require('@/assets/default_smile.svg')"
        class="profile-img"
      />
      <img
        v-if="newProfileImg !== null"
        :src="newProfileImg"
        class="profile-img"
      />
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
        <button class="btn close-btn" @click="closeModal">닫기</button>
      </div>
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
    async deleteImage() {
      if (this.newProfileImg) {
        if (confirm("이미지를 삭제하시겠습니까?")) {
          await this.deletePrevImg();
          this.$store.dispatch("getData");
        }
      }
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
    /* margin-bottom: 200px; */
  }
}

@media (width <= 540px) {
  .btn-container {
    /* margin-bottom: 50px; */
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
  z-index: 10000;
}

.modal-body {
  position: relative;
  padding: 100px 10px;
  padding-top: 50px;
  max-width: 800px;
  height: 80vh;
  background: #eee;
}

.delete-img-container {
  position: absolute;
  top: 60px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
}

.delete-img-container::after {
  position: absolute;
  top: -7px;
  left: 7.5px;
  content: "\00D7";
  font-size: 30px;
}

.profile-img {
  max-width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  object-fit: contain;
}

.btn-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px 0;
  width: 100%;
  color: #f59607;
}

.btn {
  padding: 5px 15px;
  border: 1px solid #f59607;
  border-radius: 20px;
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
}

.edit-btn {
  color: #fff;
  background-color: #f59607;
}

.close-btn {
  color: #000;
  background-color: #fff;
}
</style>
