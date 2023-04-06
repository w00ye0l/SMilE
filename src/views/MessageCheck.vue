<template>
  <div class="background title">
    <div class="messagebox">
      <div>
        <button @click="pageLink" class="cancel-btn">
          <img :src="require(`@/assets/cancel.png`)" class="cancel" />
        </button>
      </div>
      <p class="message-title">{{ message.name }}</p>
      <div>
        <p class="content">{{ message.content }}</p>
      </div>
    </div>
    <img :src="require(`@/assets/logobox.png`)" class="img" />
  </div>
</template>
<script>
export default {
  computed: {
    message() {
      const index = parseInt(this.$route.params.index);
      return this.$store.state.messages[index];
    },
  },
  mounted() {
    console.log(this.$route.params);
  },
  data() {
    return {};
  },
  methods: {
    pageLink() {
      this.$router.push({ name: "messageconfirm" });
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

.img {
  left: 100px;
  top: 50px;
  position: absolute;
}

.messagebox {
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

.message-title {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.content {
  margin-top: 30px;
  padding: 25px;
}
</style>
