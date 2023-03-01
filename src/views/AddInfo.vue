<template>
  <div class="head">
    <h2>MBTI 정보 추가</h2>
  </div>
  <div class="body-color">
    <span class="category-name">MBTI 정보</span>
    <span class="name">이름</span>
    <input
      type="text"
      placeholder="이름"
      v-model="nameId"
      class="name-input-box"
    />
    <span class="mbti">MBTI</span>
    <div class="select-box">
      <select v-model="selected" class="select">
        <option
          v-for="(item, idx) in selectList"
          :key="idx"
          :value="item.value"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <span class="group">그룹</span>
    <div class="btn-control">
      <button class="family">가족</button>
      <button class="friend">친구</button>
      <button class="coworker">직장 동료</button>
    </div>
    <span class="memo">메모</span>
    <div class="memo-box">
      <br />
      <textarea v-model="memo" class="text"></textarea>
    </div>
    <div class="add-cancel-control">
      <button class="add-btn" @click="pageLink">추가</button>
      <button class="cancel-btn" @click="pageLink">취소</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameId: "",
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
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "savingmbti" });
    },
  },
};
</script>
<style scoped>
.head {
  height: 100px;
}
.body-color {
  height: 86.5vh;
  background-color: #fff9c8;
}

.category-name {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 30px;
}

.name {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 30px;
}
.name-input-box {
  width: 90vw;
  margin: 15px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 45px;
  display: inline-block;
}
input::placeholder {
  text-indent: 15px;
}

.mbti {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  justify-content: left;
  margin-left: 30px;
  padding-top: 30px;
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
  width: 3rem;
  height: 2rem;
  border-radius: 1.7rem;
  border: none;
  margin: 1rem 0.8rem 0 1.5rem;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.friend {
  background-color: #ffd338;
  width: 3rem;
  height: 2rem;
  border-radius: 1.7rem;
  border: none;
  margin: 1rem 0.8rem 0 0;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.coworker {
  background-color: #ffd338;
  width: 5rem;
  height: 2rem;
  border-radius: 1.7rem;
  border: none;
  margin: 1rem 0.8rem 0 0;
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
  height: 18vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
}

.text {
  width: 86.8vw;
  height: 15.2vh;
  border: none;
}

.add-cancel-control {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}

.add-btn {
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

.select {
  display: flex;
  justify-content: left;
  margin: 5px 0 0 15px;
  width: 80vw;
  height: 35px;
  border: none;
  font-size: 1rem;
  font-weight: 400;
}

.select-box {
  width: 90vw;
  margin: 15px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 45px;
  display: inline-block;
  background-color: white;
}
</style>
