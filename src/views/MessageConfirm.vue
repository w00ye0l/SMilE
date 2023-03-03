<template>
  <div class="background title">
    <div class="message-box">
      <div class="nav">
        <p class="name">{{ name }}</p>
        <div class="right-side">
          <button class="btn">
            <img :src="require(`@/assets/navigator.png`)" class="navigator" />
          </button>
          <button class="btn">
            <img :src="require(`@/assets/colon.png`)" class="colon" />
          </button>
        </div>
      </div>
    </div>
    <img :src="require(`@/assets/logobox.png`)" class="img" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "ENFP님",
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "randommessage" });
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

.nav {
  display: flex;
  justify-content: space-between;
}

.img {
  left: 100px;
  top: 50px;
  position: absolute;
}

.message-box {
  height: 70vh;
  width: 70vw;
  margin: 40px 0 0 60px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  position: absolute;
  top: 140px;
}

.cancel-btn {
  border: none;
  background-color: transparent;
  float: right;
  margin: 15px 10px 0 0;
}

.name {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f59607;
  margin-left: 20px;
}

.right-side {
  margin-right: 15px;
}

.btn {
  background: none;
  border: none;
}
.navigator {
  width: 20px;
  height: 20px;
  margin-top: 23px;
  border: 1px solid white;
}

.colon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  border: 1px solid white;
}

.content {
  margin-top: 30px;
  padding: 25px;
}
</style>
