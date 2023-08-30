<template>
  <div class="container">
    <ul class="navbar">
      <router-link class="nav" to="/mbti">
        <div class="nav-imgBox">
          <img class="nav-img mbti-tab" alt="" />
        </div>
        <p class="tab-name">MBTI 저장</p>
      </router-link>
      <router-link class="nav" to="/docs">
        <div class="nav-imgBox">
          <img class="nav-img docs-tab" alt="" />
        </div>
        <p class="tab-name">MBTI 문서</p>
      </router-link>
      <router-link class="nav" to="/randomquestion">
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
@media (min-width: 541px) {
  .container {
    padding: 20px;
    width: 300px;
    background-color: #fff;
  }

  .navbar {
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: #fff9c871;
    border-radius: 20px;
  }

  .nav {
    width: 200px;
    height: 200px;
  }

  .nav-imgBox {
    width: 40px;
  }
}

@media (max-width: 540px) {
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
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    list-style: none;
  }

  .nav {
    width: 40px;
    height: 40px;
  }

  .nav-imgBox {
    width: 100%;
  }

  .tab-name {
    display: none;
  }
}

.nav {
  padding: 0 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  color: #d9d9d9;
  text-decoration: none;
}

.nav-imgBox {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 선택 전 tab-css */
.mbti-tab {
  content: url("@/assets/mbti_off.png");
}
.docs-tab {
  content: url("@/assets/docs_off.png");
}
.community-tab {
  content: url("@/assets/community_off.png");
}
.profile-tab {
  content: url("@/assets/profile_off.png");
}

.tab-name {
  font-weight: 600;
}

/* 선택 후 tab-css */
.route-active > .nav-imgBox > .mbti-tab {
  content: url("@/assets/mbti_on.png");
}
.route-active > .nav-imgBox > .docs-tab {
  content: url("@/assets/docs_on.png");
}
.route-active > .nav-imgBox > .community-tab {
  content: url("@/assets/community_on.png");
}
.route-active > .nav-imgBox > .profile-tab {
  content: url("@/assets/profile_on.png");
}

.route-active > .tab-name {
  color: #ffd338;
}
</style>
