<template>
  <div class="head"></div>
  <div class="body-color">
    <span class="circle"></span>
    <p class="name">홍길동</p>
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
    </div>
    <span class="memo">메모</span>
    <div class="memo-box">
      <br />
      <textarea v-model="memo" class="text" placeholder="어저꾸 저저꾸">
      </textarea>
    </div>
    <span class="group">이 MBTI는 어떨까?</span>
    <div class="btn-control">
      <button class="feature">상대법</button>
      <button class="feature">주의할 점</button>
      <button class="feature">특징</button>
    </div>
    <div class="add-cancel-control">
      <button class="revise-btn">수정</button>
      <button class="cancel-btn">닫기</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "a",
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
};
</script>
<style scoped>
.head {
  height: 100px;
}
.body-color {
  height: 88.5vh;
  background-color: #fff9c8;
}

.name {
  font-size: 20px;
  padding-top: 50px;
  font-weight: bold;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  left: 37.5%;
  top: 7.5%;
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
