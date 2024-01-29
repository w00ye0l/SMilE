<template>
  <div class="main-container">
    <div class="title-box">
      <img
        class="prev-btn"
        src="@/assets/back.svg"
        alt="뒤로 가기"
        @click="moveDocs"
      />
      <h1 class="title">{{ id }}</h1>
    </div>

    <section class="main-section">
      <ul class="menu-list">
        <li
          class="menu"
          :class="{ active: comp === 'relativity' }"
          v-on:click="changeComponent('relativity')"
        >
          상대법
        </li>
        <li
          class="menu"
          :class="{ active: comp === 'caution' }"
          v-on:click="changeComponent('caution')"
        >
          주의할 점
        </li>
        <li
          class="menu"
          :class="{ active: comp === 'character' }"
          v-on:click="changeComponent('character')"
        >
          특징
        </li>
      </ul>

      <component :is="comp" class="info"></component>
    </section>
  </div>
</template>

<script>
import relativity from "@/components/RelativityComponent.vue";
import caution from "@/components/CautionComponent.vue";
import character from "@/components/CharacterComponent.vue";

export default {
  components: { relativity, caution, character },
  data() {
    return {
      comp: "relativity",
      id: this.$route.query.mbti,
    };
  },
  computed: {},
  methods: {
    moveDocs() {
      this.$router.push({ name: "docs" });
    },
    changeComponent(componentName) {
      this.comp = componentName;
    },
  },
};
</script>

<style scoped>
@media (min-width: 541px) {
  .main-container {
    margin-bottom: 50px;
    padding: 0 30px;
  }

  .main-section {
    width: 100%;
    height: 700px;
  }

  .title {
    padding: 50px 0;
    height: 133px;
    font-size: 32px;
  }
}

@media (max-width: 540px) {
  .main-section {
    width: calc(100% - 40px);
    height: 100%;
    margin: 0 20px;
    margin-bottom: 20px;
  }

  .title {
    padding: 50px 0;
    font-size: 28px;
  }
}

.main-container {
  background-color: #fff;
}

.title-box {
  position: relative;
  width: 100%;
}

.prev-btn {
  position: absolute;
  padding: 5px;
  top: 50px;
  left: 30px;
  cursor: pointer;
}

.title {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-section {
  background-color: #fff9c8;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
}

.menu-list {
  margin: 10px;
  padding: 3px;
  display: flex;
  justify-content: space-evenly;
  font-size: 18px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.2);
  gap: 15px;
}

.menu {
  padding: 5px 15px;
  color: #bbb;
  list-style: none;
  cursor: pointer;
}

.info {
  width: 100%;
}

.active {
  color: #000;
  background-color: #ffd338;
  border-radius: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}
</style>
