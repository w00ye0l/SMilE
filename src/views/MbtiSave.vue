<template>
  <div class="container">
    <h2 class="title">내 주변엔?</h2>
    <div class="background">
      <div class="add-tab">
        <h3 class="left-name">그룹</h3>
        <button class="right-tab" @click="modalclick()">
          <img :src="require(`@/assets/plus.png`)" class="right-tab-img" />
        </button>
      </div>
      <div class="group-control">
        <div v-for="(group, index) in groups" :key="index">
          <span class="family">{{ group.groupId }}</span>
        </div>
      </div>
    </div>
    <div v-for="(group, index) in filteredGroups" :key="index">
      <div class="groups">
        <h3 class="category">{{ group.groupId }}</h3>
        <div class="user-control">
          <div
            class="user-info"
            v-for="(groupItem, groupIndex) in groupData[group.groupId]"
            :key="groupIndex"
          >
            <span class="circle"></span>
            <span class="name">{{ groupItem.name }}</span>
            <span class="character">{{ groupItem.mbti }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="black-bg box-sizing" v-if="modal == true">
      <div class="white-bg">
        <div class="radio-button-control">
          <input
            type="radio"
            :model="radioValues"
            value="그룹추가"
            class="radio-button"
            @click="pageLink"
          />
          <label for="그룹추가" class="radio-name">그룹추가</label>
        </div>
        <br />
        <div class="radio-button-control">
          <input
            type="radio"
            :model="radioValues"
            value="MBTI 정보 추가"
            class="radio-button"
            @click="mbtiLink"
          />
          <label for="MBTI 정보 추가" class="radio-name">MBTI 정보 추가</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      radioValues: "",
      modal: false,
    };
  },
  computed: {
    ...mapState(["groups", "groupData"]),
    filteredGroups() {
      return this.groups.filter(
        (group) =>
          this.groupData[group.groupId] &&
          this.groupData[group.groupId].length > 0
      );
    },
  },
  methods: {
    modalclick() {
      this.modal = true;
    },
    pageLink() {
      this.$router.push({ path: "groupadd" });
    },
    mbtiLink() {
      if (this.groups.length > 0) {
        this.$router.push({ path: "addinfo" });
      } else {
        alert("그룹을 먼저 추가해주세요");
      }
    },
  },
};
</script>
<style scoped>
.title {
  margin: 0;
  padding: 20px 0 20px 0;
}

.background {
  background-color: #fff9c8;
  height: 15vh;
}

.add-tab {
  display: flex;
  justify-content: space-between;
}

.left-name {
  font-size: 1.4rem;
  margin-left: 1.2rem;
}

.right-tab-img {
  font-size: 1.4rem;
  margin-top: 0.5rem;
  width: 30px;
  height: 30px;
}

.right-tab {
  margin-right: 1rem;
  border: none;
  width: 30px;
  background: transparent;
}

.group-control {
  display: flex;
  align-items: center;
}

.family {
  background-color: #ffd338;
  width: 4.7rem;
  height: 2.5rem;
  border-radius: 1.7rem;
  border: none;
  margin: 0 0.8rem 0 1rem;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category {
  font-size: 1.4rem;
  margin-left: 1.5rem;
  display: flex;
  justify-content: flex-start;
}

.user-info {
  height: 135px;
  width: 100px;
  border-radius: 20px;
  background-color: white;
  margin-left: 20px;
  box-shadow: 0px 1.5px 0px 1px #d3d3d3;
  border: solid 0.01px #d3d3d3;
}

.circle {
  display: flex;
  width: 60px;
  height: 60px;
  display: flex;
  margin: 1rem 0.5rem 0 1.3rem;
  justify-content: flex-start;
  border-radius: 50%;
  background-color: #fff9c8;
}

.name {
  margin: 0.5rem 0 0.1rem 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.character {
  display: flex;
  justify-content: flex-start;
  margin-left: 1.75rem;
  font-weight: 500;
}

.box-sizing {
  box-sizing: border-box;
}

.black-bg {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
}

.white-bg {
  width: 90vw;
  background: white;
  position: absolute;
  bottom: 90px;
  border-radius: 15px;
  padding: 20px;
  height: 150px;
}

.radio-button-control {
  display: flex;
  justify-content: left;
  margin: 10px 0 5px 0;
  align-items: center;
}

.radio-name {
  font-size: 17px;
  margin-left: 10px;
  font-weight: 600;
}

.radio-button {
  width: 17px;
  height: 17px;
}

.container {
  padding-bottom: 90px;
}

.user-control {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
}

.user-control::-webkit-scrollbar {
  display: none;
}
</style>
