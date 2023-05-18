<template>
  <div>
    <div class="head"></div>
    <div v-if="group" class="body-color">
      <span class="circle"></span>
      <span class="name">{{ group.name }}</span>
      <span class="mbti">MBTI</span>
      <div class="type-container">
        <div @click="selectMBti" class="select">
          <div class="selected">
            <span class="selected-value">{{ this.mbti }}</span>
            <img :src="require(`@/assets/arrow.png`)" class="arrow" />
          </div>
          <ul class="select-option" v-bind:class="{ active: selectMbti }">
            <li
              class="option"
              v-for="(item, index) in selectList"
              :key="index"
              v-on:click="selectMbtiOption(item.name)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <span class="group">그룹</span>
      <div class="btn-control">
        <button class="family">{{ groupId }}</button>
      </div>
      <span class="memo">메모</span>
      <div class="memo-box">
        <br />
        <textarea v-model="memo" class="text" placeholder="어저꾸 저저꾸">
        </textarea>
      </div>
      <span class="group">이 MBTI는 어떨까?</span>
      <div class="btn-control">
        <button class="feature" @click="docMove(this.mbti)">상대법</button>
        <button class="feature" @click="docMove(this.mbti)">주의할 점</button>
        <button class="feature" @click="docMove(this.mbti)">특징</button>
      </div>
      <div class="add-cancel-control">
        <button class="revise-btn" @click="modify()">수정</button>
        <button class="cancel-btn" @click="pageLink()">닫기</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: ["groupId", "groupItem"],
  data() {
    return {
      selectMbti: false,
      selected: "",
      memo: "",
      selectList: [
        { name: "선택해주세요!", value: "" },
        { name: "ESTJ", value: "a" },
        { name: "ESTP", value: "b" },
        { name: "ESFJ", value: "c" },
        { name: "ESFP", value: "d" },
        { name: "ENTJ", value: "e" },
        { name: "ENTP", value: "f" },
        { name: "ENFJ", value: "g" },
        { name: "ENFP", value: "h" },
        { name: "ISTJ", value: "i" },
        { name: "ISTP", value: "j" },
        { name: "ISFJ", value: "k" },
        { name: "ISFP", value: "l" },
        { name: "INTJ", value: "m" },
        { name: "INTP", value: "n" },
        { name: "INFJ", value: "o" },
        { name: "INFP", value: "p" },
      ],
      group: null,
      mbti: "",
    };
  },
  methods: {
    selectMBti() {
      if (this.selectMbti === true) {
        this.selectMbti = false;
      } else {
        this.selectMbti = true;
      }
    },
    selectMbtiOption(option) {
      this.mbti = option;
    },
    modify() {
      this.updateGroupData({
        groupId: this.groupId,
        name: this.group.name,
        mbti: this.mbti,
        memo: this.memo,
      });
      this.$router.go(-1);
    },
    pageLink() {
      this.$router.push({ path: "/mbti" });
    },
    docMove(mbti) {
      this.$store.commit("SET_SELECTED_MBTI", mbti);
      this.$router.push({
        path: "/doc",
        query: {
          id: mbti,
        },
      });
    },
    ...mapMutations(["updateGroupData"]),
  },
  mounted() {
    this.group = JSON.parse(this.$route.query.groupItem);
    this.mbti = this.$route.query.mbti;
    this.memo = this.$route.query.memo;
    this.selected = this.selectList.find(
      (item) => item.name === this.mbti
    ).value;
  },
};
</script>
<style scoped>
.head {
  height: 70px;
}
.body-color {
  height: 83.4vh;
  background-color: #fff9c8;
  position: relative;
}

.name {
  font-size: 20px;
  padding-top: 55px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  left: 38%;
  top: -6.5%;
  background-color: #ffd338;
  position: absolute;
}

.mbti {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 30px;
}

.type-container {
  padding: 15px 0;
  display: flex;
  align-items: center;
}

.select-option {
  padding: 10px 0 0 0;
  list-style-type: none;
  height: 240px;
  width: 80vw;
  overflow: hidden;
  overflow-y: scroll;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  display: none;
  position: absolute;
  z-index: 10;
  margin-left: 20px;
}

.select {
  display: inline-block;
  width: 90vw;
  height: 50px;
}

.selected {
  width: 90vw;
  height: 45px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.selected-value {
  margin: 0 0 0 15px;
}

.arrow {
  margin-right: 30px;
}

.active {
  display: block;
}

.option {
  margin: 2px 0 10px 20px;
  width: 70vw;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
}

.group {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 20px;
}
.btn-control {
  display: flex;
  justify-content: flex-start;
}

.family {
  background-color: #ffd338;
  width: 6rem;
  height: 2.5rem;
  border-radius: 1.7rem;
  border: none;
  margin: 1rem 0.8rem 0 1.5rem;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.memo {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 20px;
}

.memo-box {
  width: 90vw;
  margin: 15px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 12vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
}

.text {
  width: 80vw;
  height: 8vh;
  border: none;
  margin-left: 10px;
}

.add-cancel-control {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}

.revise-btn {
  width: 100px;
  height: 40px;
  border-radius: 18px;
  border: none;
  background-color: #f59607;
  margin-left: 50px;
  font-size: 17px;
}

.cancel-btn {
  width: 100px;
  height: 40px;
  border-radius: 18px;
  border: none;
  background-color: #ffffff;
  margin-right: 50px;
  font-size: 17px;
}

.feature {
  background-color: #ffd338;
  width: 6rem;
  height: 2rem;
  border-radius: 1.7rem;
  border: none;
  margin: 1rem 0 3rem 2rem;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  font-size: 15px;
}
</style>
