<template>
  <div class="container">
    <h1 class="title">
      <span class="header">SM</span>
      <img :src="require(`@/assets/title-img.svg`)" class="title-img" />
      <span class="header">E</span>
    </h1>
    <ul class="navbar">
      <router-link class="nav" to="/mbti">
        <div class="nav-imgBox">
          <img class="nav-img mbti-tab" alt="" />
        </div>
        <p class="tab-name">MBTI 저장</p>
      </router-link>
      <router-link class="nav" to="/mbtiDocs">
        <div class="nav-imgBox">
          <img class="nav-img docs-tab" alt="" />
        </div>
        <p class="tab-name">MBTI 문서</p>
      </router-link>
      <router-link class="nav" to="/random/question">
        <div class="nav-imgBox">
          <img class="nav-img community-tab" alt="" />
        </div>
        <p class="tab-name">랜덤 질문</p>
      </router-link>
      <router-link class="nav" to="/mypage">
        <div class="nav-imgBox">
          <img class="nav-img profile-tab" alt="" />
        </div>
        <p class="tab-name">마이페이지</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@media (width > 540px) {
  .title {
    display: flex;
    align-items: center;
    margin-left: 30px;
    letter-spacing: 1px;
  }

  .container {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    width: 100%;
    height: 100px;
    max-width: 1200px;
    background-color: #fff;
    z-index: 9999;
  }

  .navbar {
    margin: 0;
    padding: 0;
    width: calc(100% - 200px);
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-evenly;
    align-items: center;
    background-color: #fff9c871;
    border-radius: 20px;
  }

  .nav {
    justify-content: flex-start;
    padding: 0 30px;
    width: 200px;
    height: 80px;
    gap: 15px;
  }

  .nav-imgBox {
    width: 40px;
  }

  .tab-name {
    font-size: 16px;
  }
}

@media (width < 1030px) {
  .nav {
    width: auto;
    padding: 0;
    gap: 0;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .tab-name {
    font-size: 14px;
  }
}

@media (width <= 540px) {
  .title {
    display: none;
  }

  .container {
    width: 100%;
    position: fixed;
    height: 80px;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #e7e7e7;
    border-radius: 20px 20px 0 0;
    z-index: 999;
  }

  .navbar {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    list-style: none;
  }

  .nav {
    height: 100%;
  }

  .nav-imgBox {
    width: 100%;
  }
}

.nav {
  display: flex;
  align-items: center;
  /* gap: 15px; */
  color: #d9d9d9;
  text-decoration: none;
}

.nav-imgBox {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 선택 전 tab-css */
.mbti-tab {
  content: url("@/assets/mbti_off.svg");
}
.docs-tab {
  content: url("@/assets/docs_off.svg");
}
.community-tab {
  content: url("@/assets/community_off.svg");
}
.profile-tab {
  content: url("@/assets/profile_off.svg");
}

.tab-name {
  margin: 0;
  font-weight: 600;
}

/* 선택 후 tab-css */
.route-active > .nav-imgBox > .mbti-tab {
  content: url("@/assets/mbti_on.svg");
}
.route-active > .nav-imgBox > .docs-tab {
  content: url("@/assets/docs_on.svg");
}
.route-active > .nav-imgBox > .community-tab {
  content: url("@/assets/community_on.svg");
}
.route-active > .nav-imgBox > .profile-tab {
  content: url("@/assets/profile_on.svg");
}

.route-active > .tab-name {
  color: #ffd338;
}
</style>
