<template>
  <router-view class="router-view" />
  <navComponent v-if="url !== '/'"></navComponent>
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
  text-align: center;
  /* color: #2c3e50; */
  /* padding-bottom: 80px; */
}

.router-view {
  height: 100%;
  margin-bottom: 80px;
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
