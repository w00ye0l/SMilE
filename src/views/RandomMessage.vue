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
    <div class="images">
      <img :src="require(`@/assets/randomimg1.png`)" class="img1" />
      <img :src="require(`@/assets/randomimg3.png`)" class="img2" />
      <img :src="require(`@/assets/randomimg2.png`)" class="img3" />
    </div>
    <div class="btn-control">
      <div class="re-cover">
        <button class="re-btn">
          <img :src="require(`@/assets/re.png`)" class="re" />
        </button>
      </div>
      <div class="letter-cover">
        <button class="letter-btn" @click="pageLink">
          <img :src="require(`@/assets/letter.png`)" class="letter" />
        </button>
      </div>
    </div>
    <div class="btn-name">
      <span class="btn-name1">다시</span>
      <span class="btn-name2">전송</span>
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
  methods: {
    pageLink() {
      this.$router.push({ path: "sendmessage" });
    },
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

.images {
  height: 400px;
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

.btn-control {
  display: flex;
  justify-content: space-evenly;
}

.re-cover {
  width: 85px;
  height: 75px;
  border-radius: 15px;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  background-color: white;
}
.re {
  width: 50px;
  height: 50px;
  margin-top: 15px;
}

.letter-cover {
  width: 85px;
  height: 75px;
  border-radius: 15px;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  background-color: white;
}

.letter {
  width: 55px;
  height: 40px;
  margin-top: 17px;
}

.btn-name {
  display: flex;
  justify-content: space-evenly;
}

.btn-name1 {
  font-size: 20px;
  font-weight: bold;
  margin: 5px 25px 0 0;
}

.btn-name2 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
}

.re-btn {
  border: none;
  background-color: transparent;
}

.letter-btn {
  border: none;
  background-color: transparent;
}
</style>
