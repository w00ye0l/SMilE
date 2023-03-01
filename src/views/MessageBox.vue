<template>
  <div class="title background">
    <h2>쪽지함</h2>
    <div class="dropbox">
      <img :src="require(`@/assets/smileblack.png`)" />
      <span>1</span>
    </div>
  </div>
</template>
<style scoped>
.title {
  margin: 0;
  padding: 40px 0 20px 0;
}
.background {
  background-color: #fff9c8;
  height: 100vh;
}

.dropbox {
  width: 90vw;
  height: 8vh;
  background-color: #ffd338;
  border-radius: 25px;
  margin: 30px 0 0 20px;
}
</style>
