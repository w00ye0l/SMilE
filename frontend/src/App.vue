<template>
  <div class="root-div">
    <router-view class="router-view" />
    <navComponent v-if="url !== '/'"></navComponent>
  </div>
</template>

<script>
import navComponent from "@/components/NavComponent.vue";

export default {
  components: { navComponent },
  data() {
    return {
      url: "",
    };
  },
  created() {
    this.nowUrl(this.$route.path);
  },
  methods: {
    nowUrl() {
      console.log(this.$route.path);
      return (this.url = this.$route.path);
    },
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.nowUrl(this.$route.path);
      }
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Fredoka", sans-serif;
  src: url(https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700);
  unicode-range: U+0041-005A, U+0061-007A;
}

@font-face {
  font-family: "GmarketSansMedium";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff");
}

* {
  box-sizing: border-box;
  font-family: "Fredoka", "GmarketSansMedium", sans-serif;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100%;
  background-color: #fff;
  overflow: auto;
}

@media (min-width: 541px) {
  body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cccccc;
    border-radius: 30px;
  }

  .root-div {
    width: 100%;
    max-width: 1200px;
    /* height: 100vh; */
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    margin: auto;
  }

  .router-view {
    width: 80%;
    height: calc(100% - 130px);
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
  }
}

@media (max-width: 540px) {
  .root-div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .router-view {
    height: 100%;
    margin-bottom: 80px;
    background-color: #fff;
  }
}

.fc .fc-toolbar-title {
  color: #f59607;
}

.fc .fc-button-primary {
  background-color: #f59607 !important;
  border-color: #f59607 !important;
  color: var(--fc-button-text-color);
}

.fc-theme-standard .fc-scrollgrid {
  border: 0 !important;
}

.fc-theme-standard td,
.fc-theme-standard th {
  border: 1px solid #f59607 !important;
}

.fc .fc-highlight {
  background: #fffbed !important;
}
</style>
