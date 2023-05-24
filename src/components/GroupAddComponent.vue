<template>
  <form class="group-form" @submit.prevent>
    <label class="title">{{ category }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="groupName"
      class="group-input"
      maxlength="10"
    />

    <div class="btn-container">
      <button class="btn add-btn" @click="registerBtn(button)">
        {{ button }}
      </button>
      <button class="btn cancel-btn" @click.prevent="pageLink">취소</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  props: {
    category: String,
    placeholder: String,
    button: String,
    propGroupName: String,
    propGroupId: Number,
    getGroup: Function,
  },
  data() {
    return {
      groupName: this.propGroupName,
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ name: "mbti" });
    },
    async addGroup() {
      const formData = {
        name: this.groupName,
      };
      console.log(formData);
      await axios
        .post("/group/create", formData, { withCredentials: true })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editGroup(id) {
      console.log(id);
      const formData = {
        name: this.groupName,
      };
      console.log(formData);
      await axios
        .put(`/group/update/${id}`, formData, { withCredentials: true })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    registerBtn(type) {
      if (this.groupName === "") {
        alert("그룹의 이름을 작성해주세요.");
      } else if (type === "추가") {
        this.addGroup();
        this.groupName = "";
      } else if (type === "수정") {
        this.editGroup(this.propGroupId);
        console.log(this.propGroupId);
        this.groupName = "";
      }
    },
  },
};
</script>

<style scoped>
.group-form {
  background: #fff9c8;
  width: 100%;
  padding: 30px;
}

.title {
  margin-bottom: 10px;
  display: flex;
  font-size: 20px;
  font-weight: 600;
}

.group-input {
  margin-bottom: 30px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 20px;
  border: 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.btn-container {
  display: flex;
  justify-content: space-evenly;
}

.btn {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: 0;
  font-size: 20px;
}

.add-btn {
  background-color: #f59607;
}

.cancel-btn {
  background-color: #ffffff;
}
</style>
