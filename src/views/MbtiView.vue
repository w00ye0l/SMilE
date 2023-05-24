<template>
  <div class="main-container">
    <h2 class="title">내 주변엔?</h2>

    <div class="group-container">
      <div class="group-title-box">
        <h3 class="group-title">그룹</h3>
        <button class="group-add-btn" @click="modalOpen">
          <img :src="require(`@/assets/plus.png`)" class="group-add-img" />
        </button>
      </div>

      <div class="group-box">
        <div class="group-name" v-for="(group, index) in groups" :key="index">
          {{ group.name }}
          <!-- <p class="group-text">{{ group.name }}</p> -->
        </div>
      </div>
    </div>

    <div class="friends-box">
      <div class="friend-info" v-for="(guest, index) in mbti" :key="index">
        <span class="profile-img"></span>
        <span class="friend-name">{{ guest.name }}</span>
        <span class="friend-mbti">{{ guest.mbti }}</span>
      </div>
    </div>

    <Modal v-if="modal" :groups="groups" @close="modalClose" />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Modal from "@/components/MbtiModal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      radioValues: "",
      modal: false,
      groups: [],
      mbti: [],
    };
  },
  computed: {
    ...mapState(["groupData"]),
    filteredGroups() {
      return this.groups.filter(
        (group) =>
          this.groupData[group.groupId] &&
          this.groupData[group.groupId].length > 0
      );
    },
  },
  mounted() {
    this.getGroup();
    this.getMbti();
  },
  methods: {
    async getGroup() {
      await axios.get("/group/index", { withCredentials: true }).then((res) => {
        this.groups = res.data;
      });
    },
    async getMbti() {
      await axios
        .get("/guest/index", { withCredentials: true })
        .then((res) => {
          console.log(res);
          this.mbti = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    modalOpen() {
      this.modal = true;
    },
    modalClose() {
      this.modal = false;
    },
    toAddInfo(groupId, groupItem) {
      this.$router.push({
        name: "detail",
        query: {
          groupId,
          groupItem: JSON.stringify(groupItem),
          mbti: groupItem.mbti,
          memo: groupItem.memo,
        },
      });
    },
  },
};
</script>

<style scoped>
.main-container {
  height: calc(100vh - 80px);
}

.title {
  margin: 0;
  padding: 40px 0;
}

.group-container {
  margin-bottom: 20px;
  padding: 10px 0;
  background-color: #fff9c8;
}

.group-title-box {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}

.group-title {
  font-size: 20px;
}

.group-add-btn {
  border: none;
  width: 30px;
  background: transparent;
}

.group-add-img {
  width: 24px;
  height: 24px;
}

.group-box {
  width: 100%;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 2%;
}

.group-box::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.group-name {
  padding: 5px 20px;
  background-color: #ffd338;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  word-break: keep-all;
}

.friends-box {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.friend-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 80px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  gap: 5px;
}

.profile-img {
  width: 60px;
  height: 60px;
  justify-content: flex-start;
  border-radius: 50%;
  background-color: #fff9c8;
}

.friend-mbti {
  padding: 5px 10px;
  color: #fff;
  font-weight: 500;
  background-color: #f59607;
  border-radius: 20px;
}
</style>
