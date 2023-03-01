<template>
  <div>
    <h2 class="title">내 주변엔?</h2>
    <div class="background">
      <div class="add-tab">
        <h3 class="left-name">그룹</h3>
        <button class="right-tab" @click="modalclick()">
          <img :src="require(`@/assets/plus.png`)" class="right-tab-img" />
        </button>
      </div>
      <div class="btn-control">
        <button class="family">가족</button>
        <button class="friend">친구</button>
        <button class="coworker">직장 동료</button>
      </div>
    </div>
    <div>
      <h3 class="category">가족</h3>
      <div class="user-info">
        <span class="circle"></span>
        <span class="name">홍길동</span>
        <span class="character">INFP</span>
      </div>
    </div>
    <div>
      <h3 class="category">친구</h3>
      <div class="user-info">
        <span class="circle"></span>
        <span class="name">홍길동</span>
        <span class="character">INFP</span>
      </div>
    </div>
    <div>
      <h3 class="category">직장 동료</h3>
      <div class="user-info">
        <span class="circle"></span>
        <span class="name">홍길동</span>
        <span class="character">INFP</span>
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
export default {
  data() {
    return {
      radioValues: "",
      modal: false,
    };
  },
  methods: {
    modalclick() {
      this.modal = true;
    },
    pageLink() {
      this.$router.push({ path: "groupadd" });
    },
    mbtiLink() {
      this.$router.push({ path: "addinfo" });
    },
  },
};
</script>
<style scoped>
.title {
  margin: 0;
  padding: 40px 0 20px 0;
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
  margin: 0 0.8rem 0 1rem;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.friend {
  background-color: #ffd338;
  width: 3rem;
  height: 2rem;
  border-radius: 1.7rem;
  border: none;
  margin: 0 0.8rem 0 0;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.coworker {
  background-color: #ffd338;
  width: 5rem;
  height: 2rem;
  border-radius: 1.7rem;
  border: none;
  margin: 0 0.8rem 0 0;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.category {
  font-size: 1.4rem;
  margin-left: 1.2rem;
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
  display: flex;
  justify-content: flex-start;
  margin: 0.5rem 0 0.1rem 1.7rem;
}

.character {
  display: flex;
  justify-content: flex-start;
  margin-left: 2rem;
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
  bottom: 20px;
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
</style>
