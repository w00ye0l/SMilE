<template>
  <div class="body">
    <h1 class="title">ENFP</h1>
    <section class="main-section">
      <ul class="menu-list">
        <li class="menu">상대법</li>
        <li class="menu">주의할 점</li>
        <li class="menu">특징</li>
      </ul>

      <div class="info-container">
        <div class="info-title-box">
          <div class="info-box info-title">ENF 상대법은?</div>
        </div>
        <div class="info-content-box">
          <div class="info-box info-content">상대법 어쩌구 저쩌구</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.body {
  height: 100vh;
  background-color: #fff9c8;
}

.title {
  margin: 0;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-section {
  height: 88vh;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
}

.menu-list {
  margin: 0;
  padding: 40px 0;
  display: flex;
  justify-content: space-evenly;
  font-size: 20px;
}

.menu {
  list-style: none;
}

.info-container {
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
}

.info-title-box {
  display: flex;
  justify-content: flex-end;
}

.info-content-box {
  display: flex;
  justify-content: flex-start;
}

.info-box {
  margin: 20px;
  padding: 15px 20px;
  width: fit-content;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  z-index: 2;
}

.info-title {
  background-color: #ffd338;
}

.info-title::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 1px;
  right: 20px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 20px 20px 0;
  border-color: transparent #ffd338 transparent transparent;
  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.25));
  transform: translateY(100%);
  z-index: 1;
}

.info-content {
  background-color: #fff;
}

.info-content::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 1px;
  left: 20px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 20px 0 0;
  border-color: #fff transparent transparent transparent;
  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.25));
  transform: translateY(100%);
  z-index: 1;
}
</style>
