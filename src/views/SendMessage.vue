<template>
  <div class="title background">
    <h2>쪽지 보내기</h2>
    <div class="messagebox">
      <div class="close-send">
        <span>x</span>
        <button class="send-btn">보내기</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title {
  margin: 0;
  padding: 30px 0 20px 0;
}
.background {
  background-color: #fff9c8;
  height: 100vh;
}

.messagebox {
  height: 70vh;
  width: 70vw;
  margin: 40px 0 0 60px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.close-send {
  display: flex;
  justify-content: space-between;
}

.send-btn {
  height: 20px;
}
</style>
