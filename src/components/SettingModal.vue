<template>
  <div class="modal-background" @click.self="closeModal">
    <div class="modal-body">
      <ul class="tab-list">
        <li
          class="tab"
          :class="currentTab === 'profile' ? 'active' : ''"
          @click="changeTab('profile')"
        >
          회원정보 변경
        </li>
        <li
          class="tab"
          :class="currentTab === 'password' ? 'active' : ''"
          @click="changeTab('password')"
        >
          비밀번호 변경
        </li>
      </ul>
      <component
        class="change-container"
        :is="currentTab"
        @closeModal="closeModal"
      ></component>
    </div>
  </div>
</template>

<script>
import ChangeProfileVue from "@/components/ChangeProfile.vue";
import ChangePasswordVue from "@/components/ChangePassword.vue";

export default {
  components: {
    profile: ChangeProfileVue,
    password: ChangePasswordVue,
  },
  data() {
    return {
      currentTab: "profile",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    changeTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  padding: 20px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-body {
  padding: 20px;
  width: 100%;
  min-height: 65%;
  background: white;
  border-radius: 20px;
}

.tab-list {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  list-style: none;
}

.tab {
  margin: 0;
  /* width: fit-content; */
}

.active {
  padding-bottom: 1px;
  color: #f59607;
  border-bottom: 1px solid #f59607;
}
</style>
