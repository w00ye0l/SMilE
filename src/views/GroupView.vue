<template>
  <div class="main-container">
    <h1 class="title">그룹 추가</h1>
    <div class="subtitle-box">
      <h2 class="subtitle">내 그룹</h2>
      <button class="group-add-btn" @click="addBtn">추가</button>
    </div>

    <div class="group-container">
      <div class="group-box" v-for="(item, idx) in groups" :key="idx">
        <p class="group-name">{{ item.name }}</p>
        <div class="button-box">
          <button class="btn" @click="fixBtn(item.id)">
            <img :src="require(`@/assets/pencil.png`)" class="pencil" />
          </button>
          <button class="btn" @click="removeBtn(item.id)">
            <img :src="require(`@/assets/trashcan.png`)" class="trashcan" />
          </button>
        </div>
      </div>
    </div>

    <GroupBtn
      class="group-add-modal"
      v-if="showOn"
      :category="category"
      :placeholder="placeholder"
      :button="button"
      :propGroupName="propGroupName"
      :propGroupId="groupId"
      @updateGroups="getGroup"
    />
  </div>
</template>

<script>
import GroupBtn from "@/components/GroupAddComponent.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  components: {
    GroupBtn,
  },
  data() {
    return {
      placeholder: "그룹 명",
      category: "추가할 그룹 명",
      button: "추가",
      propGroupName: "",
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
        // this.groups = res.data;
      });
    },
    addBtn() {
      this.category = "추가할 그룹 명";
      this.button = "추가";
      this.placeholder = "그룹 명";
    },
    updateGetName(number) {
      return this.groups.filter((obj) => obj["id"] === number)[0].name;
    },
    fixBtn(number) {
      this.category = "그룹명 수정";
      this.button = "수정";
      this.groupId = number;
      this.placeholder = this.updateGetName(number);
      console.log(this.groupId);
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
}

.title {
  padding: 40px 0;
  font-size: 24px;
}

.subtitle-box {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subtitle {
  font-size: 20px;
}

.group-add-btn {
  padding: 5px 20px;
  font-size: 18px;
  border: 0;
  border-radius: 20px;
  background-color: #f59607;
}

.group-container {
  padding: 10px 20px;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: auto;
}

.group-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.group-box {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ffd338;
  border-radius: 30px;
}

.group-name {
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

.btn {
  height: fit-content;
  border: none;
  background-color: transparent;
}

.group-add-modal {
  position: absolute;
  bottom: -8%;
  left: 0;
  height: 35%;
}
</style>
