<template>
  <div class="main-container">
    <div class="title-box">
      <img
        class="prev-btn"
        src="@/assets/back.png"
        alt="뒤로 가기"
        @click="moveMbtiView"
      />
      <h1 class="title">그룹 추가</h1>
    </div>

    <form class="group-form" @submit.prevent ref="groupForm">
      <label class="group-label">{{ category }}</label>
      <h2 class="edit-group" v-if="editGroupName !== ''">
        기존 그룹명: <span class="edit-group-name">{{ editGroupName }}</span>
      </h2>
      <input
        type="text"
        v-model="groupName"
        class="group-input"
        maxlength="10"
      />

      <div class="btn-container">
        <button class="btn add-btn" @click="registerBtn">
          {{ button }}
        </button>
        <template v-if="editGroupName !== ''">
          <button class="btn cancel-btn" @click.prevent="editCancel">
            취소
          </button>
        </template>
      </div>
    </form>

    <div class="group-container">
      <div class="group-box" v-for="(item, idx) in groups" :key="idx">
        <p class="group-name">{{ item.name }}</p>
        <div class="button-box">
          <button class="group-btn" @click="fixBtn(item.id)">
            <img :src="require(`@/assets/pencil.png`)" class="pencil" />
          </button>
          <button class="group-btn" @click="removeBtn(item.id)">
            <img :src="require(`@/assets/trashcan.png`)" class="trashcan" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import GroupBtn from "@/components/GroupAddComponent.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      groupName: "",
      editGroupName: "",
      category: "그룹명",
      button: "추가",
      showOn: true,
      groupId: 0,
    };
  },
  mounted() {
    this.getGroup();
  },
  computed: {
    ...mapGetters({ groups: "GROUPS" }),
  },
  methods: {
    ...mapActions(["setGroups"]),
    async getGroup() {
      await axios.get("/group/index", { withCredentials: true }).then((res) => {
        console.log(res.data);
        this.setGroups(res.data);
      });
    },
    moveMbtiView() {
      this.$router.go(-1);
    },
    editCancel() {
      this.category = "그룹명";
      this.button = "추가";
      this.editGroupName = "";
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
          this.$emit("updateGroups");
          this.getGroup();
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
          this.$emit("updateGroups");
          this.getGroup();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    registerBtn() {
      if (this.groupName === "") {
        alert("그룹의 이름을 작성해주세요.");
        return;
      }

      if (this.button === "추가") {
        this.addGroup();
        this.groupName = "";
      } else if (this.button === "수정") {
        this.editGroup(this.groupId);
        console.log(this.groupId);

        this.editCancel();
      }
    },
    updateGetName(number) {
      return this.groups.filter((obj) => obj["id"] === number)[0].name;
    },
    fixBtn(number) {
      this.category = "그룹명 수정";
      this.button = "수정";
      this.groupId = number;
      this.editGroupName = this.updateGetName(number);

      window.scrollTo({
        top: 0,
        behavior: "smooth", // 부드러운 스크롤 효과를 위해 추가 (선택 사항)
      });
    },
    async removeBtn(groupId) {
      if (confirm("삭제하시겠습니까?")) {
        await axios
          .delete(`/group/remove/${groupId}`, { withCredentials: true })
          .then((res) => {
            console.log(res);
            this.getGroup();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
@media (width > 540px) {
  .main-container {
    padding: 0 30px;
  }

  .group-form {
    width: 100%;
  }

  .group-container {
    margin: 30px 0;
    width: 100%;
  }
}

@media (width <= 540px) {
  .group-form {
    margin: 0 20px;
    width: calc(100% - 40px);
  }

  .group-container {
    margin: 30px 20px;
    width: calc(100% - 40px);
  }
}

.title-box {
  position: relative;
  width: 100%;
}

.prev-btn {
  position: absolute;
  padding: 5px;
  top: 50px;
  left: 30px;
  cursor: pointer;
}

.title {
  margin: 0;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.group-form {
  padding: 20px 30px;
  background: #fff9c8;
  border-radius: 10px;
}

.edit-group {
  margin: 0;
  margin-bottom: 10px;
  font-size: 16px;
  height: 20px;
  font-weight: normal;
}

.edit-group-name {
  color: #f59607;
  font-weight: bold;
}

.group-label {
  margin-bottom: 10px;
  display: flex;
  font-size: 20px;
  font-weight: 600;
}

.group-input {
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
  margin-top: 30px;
}

.btn {
  padding: 0 30px;
  height: 40px;
  font-size: 18px;
  border: 0;
  border-radius: 20px;
  cursor: pointer;
}

.add-btn {
  color: #fff;
  background-color: #f59607;
}

.cancel-btn {
  background-color: #fff;
  border: 1px solid #f59607;
}

.group-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  padding: 0 30px;
  gap: 10px;
}

.group-box {
  padding: 10px 20px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ffd338;
  border-radius: 30px;
}

.group-name {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.button-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.group-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  height: fit-content;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: 50%;
}

.group-btn:hover {
  outline: 1px solid #000;
}
</style>
