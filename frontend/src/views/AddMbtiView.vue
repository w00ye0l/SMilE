<template>
  <div class="main">
    <h1 class="title">MBTI 정보 추가</h1>

    <div class="mbti-form">
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
        <div class="selected-mbti" @click="selectMBti">
          <div class="mbti-box">
            <p>{{ selectedMbti }}</p>
            <img :src="require(`@/assets/Polygon.png`)" class="arrow" />
          </div>

          <ul class="mbti-option" v-bind:class="{ active: selectMbti }">
            <li
              class="mbti"
              v-for="(item, index) in mbtiList"
              :key="index"
              v-on:click="selectMbtiOption(item)"
            >
              {{ item }}
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
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      selectMbti: false,
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
    ...mapActions(["addGroupData"]),
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
      if (this.selectedGroup === "") {
        alert("그룹을 선택해주세요.");
        return false;
      }
      return true;
    },
    async addGuest() {
      if (this.validateInput()) {
        const formData = {
          name: this.nameId,
          mbti: this.selectedMbti,
          groupID: this.selectedGroup,
          memo: this.memo,
        };
        console.log(formData);
        await axios
          .post(`/guest/${this.selectedGroup}/create`, formData, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  height: calc(100vh - 80px);
}

.title {
  padding: 40px;
  font-size: 24px;
}

.mbti-form {
  min-height: calc(100vh - 170px);
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  background-color: #fff9c8;
  gap: 20px;
}

.form-control {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.form-label {
  padding-left: 10px;
  font-weight: 600;
  margin-bottom: 10px;
}

.name-input {
  margin: 10px 0;
  padding: 10px 20px;
  width: 100%;
  font-size: 16px;
  border-radius: 20px;
  border: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.selected-mbti {
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
}

.mbti-option {
  display: none;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 120%;
  padding: 10px 0;
  width: 100%;
  height: 200px;
  overflow-y: auto;
  list-style-type: none;
  border: 1px solid rgba(145, 145, 145, 0.3);
  border-radius: 15px;
  z-index: 10;
  gap: 10px;
}

.active {
  display: flex;
}

.mbti {
  width: 90%;
  padding: 10px 20px;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.group-control {
  padding: 15px 5px;
  display: flex;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  gap: 10px;
}

.group {
  padding: 10px 20px;
  width: auto;
  font-size: 14px;
  background-color: #ffd338;
  border: none;
  word-break: keep-all;
  border-radius: 1.7rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.selected-group {
  background-color: #f59607;
}

.memo-box {
  width: 100%;
  height: 80px;
  padding: 10px 10px;
  font-size: 16px;
  background-color: white;
  border-radius: 20px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.btn-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}

.btn {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  font-size: 18px;
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
