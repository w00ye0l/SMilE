<template>
  <div class="body">
    <h1 class="title">{{ id }}</h1>
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

      <div class="info-container">
        <component :is="comp" class="info"></component>
      </div>
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
      id: this.$store.state.selectMBTI,
    };
  },
  computed: {},
  methods: {
    changeComponent(componentName) {
      this.comp = componentName;
    },
  },
};
</script>

<style scoped>
.body {
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
  background-color: #fff;
  border-radius: 20px 20px 0 0;
}

.menu-list {
  margin: 0;
  padding: 0;
  padding-top: 30px;
  display: flex;
  justify-content: space-evenly;
  font-size: 20px;
}

.menu {
  list-style: none;
}

.info-container {
  padding: 20px;
  width: 100%;
  height: calc(100vh - 250px);
  display: flex;
  flex-direction: column;
  position: relative;
}

.info {
  width: 100%;
}

.active {
  font-weight: bold;
  border-bottom: 2px solid #ffd338;
}
</style>
