<template>
  <div class="title background">
    <h2>랜덤 쪽지</h2>
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
    <div>
      <img :src="require(`@/assets/randomimg1.png`)" class="img1" />
      <img :src="require(`@/assets/randomimg3.png`)" class="img2" />
      <img :src="require(`@/assets/randomimg2.png`)" class="img3" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "",
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
.title {
  margin: 0;
  padding: 30px 0 20px 0;
}

.background {
  background-color: #fff9c8;
  height: 100vh;
  position: relative;
}

.select {
  display: flex;
  justify-content: left;
  margin: 5px 0 0 15px;
  width: 30vw;
  height: 35px;
  border: none;
  font-size: 1rem;
  font-weight: 400;
}

.select-box {
  width: 40vw;
  margin: 15px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 45px;
  display: inline-block;
  background-color: white;
}

.img1 {
  position: absolute;
  left: -55px;
  top: 250px;
  width: 230px;
}

.img2 {
  position: absolute;
  top: 250px;
  right: -40px;
  width: 230px;
}

.img3 {
  position: absolute;
  top: 220px;
  right: 130px;
  width: 160px;
}
</style>
