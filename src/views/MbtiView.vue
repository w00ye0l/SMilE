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
        <a
          class="group-name"
          v-for="(group, index) in groups"
          :key="index"
          :href="`#${group.name}`"
        >
          {{ group.name }}
          <!-- <p class="group-text">{{ group.name }}</p> -->
        </a>
      </div>
    </div>

    <div class="friends-container">
      <div
        class="friends-box"
        v-for="(group, index) in groups"
        :key="index"
        :id="group.name"
      >
        <h2>{{ group.name }}</h2>
        <div class="friends-list">
          <div
            class="friend-info"
            v-for="(guest, index) in mbti.filter(
              (guest) => guest.groupID === group.id
            )"
            :key="index"
            v-bind="guest"
            @click="goToDetail(guest)"
          >
            <div class="profile-img"></div>
            <p class="friend-name">{{ guest.name }}</p>
            <p class="friend-mbti">{{ guest.mbti }}</p>
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="modal" :groups="groups" @close="modalClose" />
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import Modal from "@/components/MbtiModal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      modal: false,
      // groups: [],
      mbti: [],
      guest: [],
    };
  },
  mounted() {
    this.getGroup();
    this.getMbti();
  },
  computed: {
    ...mapGetters({ groups: "GROUPS" }),
  },
  methods: {
    ...mapActions(["setGroups"]),
    async getGroup() {
      await axios.get("/group/index", { withCredentials: true }).then((res) => {
        this.setGroups(res.data);
        // this.groups = res.data;
        console.log(this.groups);
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
    goToDetail(guest) {
      console.log(guest);
      this.$store.commit("UPDATE_SELECT_GUEST", guest);
      console.log(this.$store.state.selectGuest);
      this.$router.push({ name: "detail" });
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
  margin-bottom: 80px;
  height: calc(100% - 80px);
}

.title {
  margin: 0;
  padding: 40px 0;
}

.group-container {
  padding: 10px 0;
  background-color: #fff9c8;
}

.group-title-box {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}

.group-title {
  margin: 20px 0;
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
  color: #000;
  text-decoration: none;
  background-color: #ffd338;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  word-break: keep-all;
}

.friends-container {
  padding: 15px 0;
  height: calc(100vh - 341px);
  overflow-x: auto;
}

.friends-box {
  margin-bottom: 20px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
}

.friends-list {
  padding: 15px 5px;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
  overflow-y: scroll;
}

.friend-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 100px;
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

.friend-name {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.friend-mbti {
  padding: 5px 10px;
  color: #fff;
  font-weight: 500;
  background-color: #f59607;
  border-radius: 20px;
}
</style>
