<template>
  <div class="title background">
    <h2>오늘의 질문</h2>
    <div class="question">
      <span class="letter">{{ message }}</span>
    </div>
    <div class="my-answer">
      <h3 class="second-title">나의 답변</h3>
      <div class="memo-box">
        <textarea v-model="memo" class="text" placeholder="내용을 입력하세요">
        </textarea>
      </div>
      <div class="btn-control">
        <button class="btn" @click="pageLink">작성 완료</button>
      </div>
    </div>
    <div class="other-answer">
      <h3 class="third-title">다른 사람들의 답변</h3>
      <div class="type-container">
        <div v-on:click="selectMBTI('EI')" class="select">
          <div class="selected">
            <p class="selected-value">{{ this.mbti1 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectEI }">
            <li class="option" v-on:click="selectEIOption('_')">_</li>
            <li class="option" v-on:click="selectEIOption('E')">E</li>
            <li class="option" v-on:click="selectEIOption('I')">I</li>
          </ul>
        </div>
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
        <div v-on:click="selectMBTI('TF')" class="select">
          <div class="selected">
            <p class="selected-value">{{ this.mbti3 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectTF }">
            <li class="option" v-on:click="selectTFOption('_')">_</li>
            <li class="option" v-on:click="selectTFOption('T')">T</li>
            <li class="option" v-on:click="selectTFOption('F')">F</li>
          </ul>
        </div>
        <div v-on:click="selectMBTI('PJ')" class="select">
          <div class="selected">
            <p class="selected-value">{{ this.mbti4 }}</p>
          </div>
          <ul class="select-option" v-bind:class="{ active: selectPJ }">
            <li class="option" v-on:click="selectPJOption('_')">_</li>
            <li class="option" v-on:click="selectPJOption('P')">P</li>
            <li class="option" v-on:click="selectPJOption('J')">J</li>
          </ul>
        </div>
      </div>
      <p>E_FP들의 답변</p>
      <button class="btn-more" @click="pageLink">더보기</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "Q.친구가 기분이 안좋아서 화분을 샀다고 했다. 이때 나의 대답은?",
      memo: "",
      selectEI: false,
      selectNS: false,
      selectTF: false,
      selectPJ: false,
      mbti1: "_",
      mbti2: "_",
      mbti3: "_",
      mbti4: "_",
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "randomanswer" });
    },
    selectMBTI(selected) {
      if (selected === "EI") {
        if (this.selectEI === true) {
          this.selectEI = false;
        } else {
          this.selectEI = true;
        }
      }
      if (selected === "NS") {
        if (this.selectNS === true) {
          this.selectNS = false;
        } else {
          this.selectNS = true;
        }
      }
      if (selected === "TF") {
        if (this.selectTF === true) {
          this.selectTF = false;
        } else {
          this.selectTF = true;
        }
      }
      if (selected === "PJ") {
        if (this.selectPJ === true) {
          this.selectPJ = false;
        } else {
          this.selectPJ = true;
        }
      }
    },
    selectEIOption(option) {
      this.mbti1 = option;
    },
    selectNSOption(option) {
      this.mbti2 = option;
    },
    selectTFOption(option) {
      this.mbti3 = option;
    },
    selectPJOption(option) {
      this.mbti4 = option;
    },
  },
};
</script>
<style>
.title {
  margin: 0;
  padding: 30px 0 20px 0;
}
.background {
  background-color: #ffffff;
  height: 100vh;
  position: relative;
}
.question {
  background-color: #fff9c8;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  font-weight: bold;
  padding: 0 50px 0 50px;
}

.my-answer {
  height: 32vh;
}

.second-title {
  display: flex;
  padding: 0 50px 0 55px;
}

.memo-box {
  width: 80vw;
  margin: 10px 0 15px 0;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 18vh;
  background-color: white;
  display: inline-block;
  white-space: pre-line;
}

.text {
  margin-top: 20px;
  width: 70.8vw;
  height: 13.2vh;
  border: none;
}

.btn-control {
  display: flex;
  justify-content: end;
  margin-right: 40px;
}

.btn {
  border-radius: 20px;
  width: 100px;
  height: 35px;
  font-weight: bold;
  border: none;
  background-color: #f59607;
}

.other-answer {
  height: 37vh;
  background-color: #fff9c8;
}

.third-title {
  display: flex;
  padding: 20px 50px 0 55px;
}

.type-container {
  padding: 0 0 50px 0;
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

.btn-more {
  border-radius: 20px;
  width: 100px;
  height: 35px;
  font-weight: bold;
  border: none;
  background-color: #ffd338;
}
</style>
