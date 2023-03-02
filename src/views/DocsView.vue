<template>
  <div class="body">
    <h1 class="title">MBTI 정보</h1>
    <section class="main-section">
      <div class="type-container">
        <div class="type">All</div>
        <select class="type">
          <option value="_">_</option>
          <option value="E">E</option>
          <option value="I">I</option>
        </select>
        <div v-on:click="selectMBTI('NS')" class="select">
          <div class="selected">
            <p class="selected-value">{{ this.mbti2 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectNS }">
            <li class="option" v-on:click="selectNSOption('_')">_</li>
            <li class="option" v-on:click="selectNSOption('N')">N</li>
            <li class="option" v-on:click="selectNSOption('S')">S</li>
          </ul>
        </div>
        <div class="type">_</div>
        <div class="type">_</div>
      </div>

      <div class="mbti-container">
        <template v-for="(iColor, idx1) in ei" v-bind:key="idx1">
          <template v-for="(jColor, idx2) in ns" v-bind:key="idx2">
            <template v-for="(kColor, idx3) in tf" v-bind:key="idx3">
              <template v-for="(lColor, idx4) in pj" v-bind:key="idx4">
                <div
                  v-on:click="docMove(`${idx1}${idx2}${idx3}${idx4}`)"
                  class="mbti-link"
                >
                  <div class="mbti-box">
                    <p
                      class="mbti-text"
                      v-bind:style="{
                        background:
                          'linear-gradient(to right, ' +
                          iColor +
                          ', ' +
                          jColor +
                          ')',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                      }"
                    >
                      {{ idx1 }}{{ idx2 }}
                    </p>
                    <p
                      class="mbti-text"
                      v-bind:style="{
                        background:
                          'linear-gradient(to right, ' +
                          kColor +
                          ', ' +
                          lColor +
                          ')',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                      }"
                    >
                      {{ idx3 }}{{ idx4 }}
                    </p>
                  </div>
                </div>
              </template>
            </template>
          </template>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectEI: false,
      selectNS: false,
      selectTF: false,
      selectPJ: false,
      mbti1: "_",
      mbti2: "_",
      mbti3: "_",
      mbti4: "_",
      ei: { E: "#ffd338", I: "#000" },
      ns: { N: "red", S: "#fff" },
      tf: { T: "#ffd335", F: "#bafb6e" },
      pj: { P: "#293fff", J: "#b9740c" },
    };
  },
  methods: {
    docMove(selectMBTI) {
      this.$store.state.selectMBTI = selectMBTI;
      this.$router.push({
        path: "/doc",
        query: {
          id: selectMBTI,
        },
      });
    },
    selectMBTI(selected) {
      if (selected === "NS") {
        if (this.selectNS === true) {
          this.selectNS = false;
        } else {
          this.selectNS = true;
        }
        console.log(this.selectNS);
      }
    },
    selectNSOption(option) {
      this.mbti2 = option;
    },
  },
};
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

.type-container {
  padding: 30px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.type {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-weight: bold;
  background-color: #fff9c8;
  border: 0;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  -webkit-appearance: none; /* 크롬 화살표 없애기 */
  -moz-appearance: none; /* 파이어폭스 화살표 없애기 */
  appearance: none; /* 화살표 없애기 */
  text-align: center; /* 텍스트 가운데 정렬 */
}

.select-option {
  padding: 0;
  list-style-type: none;
}

.select {
  display: inline-block;
  width: 50px;
  height: 50px;
}

.selected {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #fff9c8;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.selected-value {
  margin: 0;
}

.select-option {
  display: none;
  position: relative;
  z-index: 10;
}

.active {
  display: initial;
}

.option {
  margin: 10px 0;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #fff9c8;
  border-radius: 50%;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
}

.mbti-container {
  margin: 10vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.mbti-link {
  text-decoration: none;
}

.mbti-box {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.mbti-text {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}
</style>
