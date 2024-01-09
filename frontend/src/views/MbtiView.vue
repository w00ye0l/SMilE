<template>
  <div class="main-container">
    <h1 class="title">내 주변엔?</h1>

    <div class="group-container">
      <div class="group-title-box">
        <h3 class="group-title">그룹</h3>
        <button class="group-add-btn" @click="modalOpen">
          <!-- <img :src="require(`@/assets/plus.png`)" class="group-add-img" /> -->
        </button>
      </div>

      <div class="group-box">
        <a
          class="group-name"
          v-for="(group, index) in groups"
          :key="index"
          :href="`#${group.name}`"
          draggable="false"
        >
          {{ group.name }}
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
        <h2 class="friend-group">{{ group.name }}</h2>
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
            <img
              v-if="guest.image === null"
              :src="require(`@/assets/default_smile.svg`)"
              class="profile-img"
            />
            <img
              v-if="guest.image !== null"
              :src="guest.image"
              class="avatar"
            />
            <p class="friend-name">{{ guest.name }}</p>
            <p class="friend-mbti">{{ guest.mbti }}</p>
          </div>
        </div>

        <hr />
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
@media (min-width: 541px) {
  .main-container {
    padding: 0 30px;
    height: 100%;
  }

  .group-container {
    margin: 0;
    width: 100%;
  }
}

@media (max-width: 540px) {
  .main-container {
    height: calc(100% - 80px);
    margin-bottom: 80px;
  }

  .group-container {
    margin: 0 20px;
    width: calc(100% - 40px);
  }
}

hr {
  width: 100%;
  height: 3px;
  background-color: #fff9c8;
  border: 0;
}

.title {
  margin: 0;
  padding: 50px 0;
  width: 100%;
  font-size: 24px;
  text-align: center;
}

.group-container {
  padding: 10px 0;
  background-color: #fff9c8;
  border-radius: 10px;
}

.group-title-box {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.group-title {
  margin: 10px 0;
  font-size: 20px;
  text-align: start;
}

.group-add-btn {
  position: relative;
  padding: 0;
  width: 30px;
  height: 30px;
  color: #fff;
  background-color: #f59607;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

.group-add-btn::after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -58%);
  content: "\002B";
  font-size: 24px;
}

.group-box {
  margin: 10px;
  padding: 10px;
  width: calc(100% - 20px);
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
}

.group-name {
  width: fit-content;
  padding: 5px 20px;
  color: #000;
  text-decoration: none;
  background-color: #ffd338;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  word-break: keep-all;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.friends-container {
  padding: 15px 0;
  width: 100%;
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

.friend-group {
  text-align: start;
}

.friends-list {
  padding: 15px 5px;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 15px;
  overflow-x: auto;
}

.friend-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 100px;
  width: 100px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  gap: 5px;
  text-align: center;
  cursor: pointer;
}

.profile-img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #fff9c8;
  border: 1px solid #ccc;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #ccc;
  object-fit: cover;
}

.friend-name {
  margin: 0;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.friend-mbti {
  margin: 0;
  padding: 5px 10px;
  color: #fff;
  font-weight: 500;
  background-color: #f59607;
  border-radius: 20px;
}
</style>
