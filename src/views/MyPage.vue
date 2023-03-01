<template>
  <div>
    <h2 class="title">마이 페이지</h2>
    <div class="img-box">
      <img :src="require(`@/assets/Avatar.png`)" class="avatar" />
      <div class="my-name-mbti">
        <span>이름</span>
        <span class="my-mbti">MBTI</span>
      </div>
    </div>
    <div class="dropbox">
      <span class="category-name">쪽지함</span>
      <button class="btn-more">더보기</button>
    </div>
    <div class="box-container">
      <img :src="require(`@/assets/smileblack.png`)" class="smile" />
      <img :src="require(`@/assets/smileblack.png`)" class="smile" />
      <img :src="require(`@/assets/smileblack.png`)" class="smile" />
      <img :src="require(`@/assets/smileblack.png`)" class="smile" />
    </div>
    <span class="category-friend">친구 분포도</span>
    <div class="dis-chart"></div>
  </div>
</template>
<style>
.title {
  margin: 0;
  padding: 40px 0 20px 0;
}

.avatar {
  float: left;
  margin: 15px 0 0 30px;
}

.img-box {
  background: #fff9c8;
  margin: 20px 0 0 20px;
  width: 90vw;
  height: 120px;
  border-radius: 20px;
  border: 1px solid black;
}

.my-name-mbti {
  display: flex;
  flex-direction: column;
  float: left;
  margin: 20px 0 0 20px;
  font-size: 20px;
}

.my-mbti {
  margin-top: 10px;
}

.category-name {
  font-size: 20px;
  font-weight: 600;
  justify-content: left;
  margin-left: 20px;
}

.dropbox {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-more {
  border: none;
  background: none;
  font-size: 18px;
  margin-right: 25px;
}

.box-container {
  width: 90vw;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  border-radius: 20px;
  height: 65px;
  margin: 10px 0 0 15px;
}

.smile {
  float: left;
  display: flex;
  margin: 15px 0 0 15px;
  width: 30px;
  height: 30px;
}

.category-friend {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  justify-content: left;
  margin: 15px 0 0 20px;
}

.dis-chart {
  width: 90vw;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  border-radius: 20px;
  height: 25vh;
  margin: 10px 0 0 15px;
}
</style>
