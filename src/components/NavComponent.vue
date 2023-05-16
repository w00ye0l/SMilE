<template>
  <div class="container">
    <ul class="navbar">
      <router-link class="nav" to="/mbti">
        <img class="nav-img mbti-tab" alt="" />
      </router-link>
      <router-link class="nav" to="/docs">
        <img class="nav-img docs-tab" alt="" />
      </router-link>
      <!-- <router-link class="nav" to="/community">
        <img class="nav-img community-tab" alt="" />
      </router-link>
      <router-link class="nav" to="/calendar">
        <img class="nav-img calendar-tab" alt="" />
      </router-link> -->
      <router-link class="nav" to="/mypage">
        <img class="nav-img profile-tab" alt="" />
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  /* background-color: red; */
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
.calendar-tab {
  content: url("@/assets/calendar_off.png");
}
.profile-tab {
  content: url("@/assets/profile_off.png");
}

/* 선택 후 tab-css */
.route-active > .mbti-tab {
  content: url("@/assets/mbti_on.png");
}
.route-active > .docs-tab {
  content: url("@/assets/docs_on.png");
}
.route-active > .community-tab {
  content: url("@/assets/community_on.png");
}
.route-active > .calendar-tab {
  content: url("@/assets/calendar_on.png");
}
.route-active > .profile-tab {
  content: url("@/assets/profile_on.png");
}
</style>
