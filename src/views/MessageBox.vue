<template>
  <div class="title background">
    <h2>쪽지함</h2>
    <div class="dropbox">
      <div class="name-img">
        <img :src="require(`@/assets/yellowsmile.png`)" class="smile" />
        <div class="name-content">
          <div class="name-left">
            <span class="name">익명</span>
          </div>
          <span class="content">오늘은 날씨가 좋네요</span>
        </div>
      </div>
      <div class="date">
        <span class>2022/02/16 14:36</span>
      </div>
    </div>
    <div class="dropbox">
      <div class="name-img">
        <img :src="require(`@/assets/yellowsmile.png`)" class="smile" />
        <div class="name-content">
          <div class="name-left">
            <span class="name">익명</span>
          </div>
          <span class="content">오늘은 날씨가 좋네요</span>
        </div>
      </div>
      <div class="date">
        <span class>2022/02/16 14:36</span>
      </div>
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
  display: flex;
  justify-content: space-between;
}

.smile {
  float: left;
  margin: 15px 0 0 10px;
}

.name {
  font-weight: 600;
}

.name-left {
  display: flex;
  margin: 8px 0 0 8px;
}
.name-content {
  display: flex;
  flex-direction: column;
}

.date {
  margin: 8px 10px 0 0;
}

.content {
  margin-left: 8px;
}
</style>
