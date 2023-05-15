<template>
  <div class="modal-container">
    <div class="overlay" v-on:click="$emit('close-modal')"></div>
    <div class="modal">
      <header class="header">
        <img class="header-img" src="@/assets/header-img-big.png" alt="" />
        <h1 class="select-date">{{ event.dateStr }}</h1>
      </header>

      <form @submit.prevent="addEvent" class="submit-form">
        <div class="content-box">
          <p class="content-name">일정 이름</p>
          <input
            type="text"
            class="title"
            placeholder="일정 이름을 입력해주세요."
            v-model="title"
          />
        </div>

        <div class="content-box">
          <p class="content-name">중요도</p>
          <div class="importance">
            <div>
              <input
                name="important"
                id="top"
                type="radio"
                value="top"
                v-model="important"
              />
              <label for="top">상</label>
            </div>
            <div>
              <input
                name="important"
                id="middle"
                type="radio"
                value="middle"
                v-model="important"
              />
              <label for="middle">중</label>
            </div>
            <div>
              <input
                name="important"
                id="bottom"
                type="radio"
                value="bottom"
                v-model="important"
              />
              <label for="bottom">하</label>
            </div>
          </div>
        </div>

        <div class="content-box participant-title">
          <p class="content-name">참여자</p>
        </div>
        <div class="participant-box"></div>

        <div class="submit-box">
          <button class="submit-btn">일정 추가</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
  },
  data() {
    return {
      title: "",
      important: "",
    };
  },
  created() {
    console.log(this.event.dateStr);
  },
  methods: {
    addEvent() {
      let bgC;

      if (this.important === "top") {
        bgC = "#f59607";
      } else if (this.important === "middle") {
        bgC = "#ffd338";
      } else {
        bgC = "#ffe99d";
      }

      this.$store.commit("ADD_EVENT", {
        title: this.title,
        date: this.event.dateStr,
        display: "list-item",
        borderColor: bgC,
        textColor: "black",
      });

      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.modal-container,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.overlay {
  background-color: #0000005b;
}

.modal {
  padding: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  min-height: 500px;
  background-color: #fff;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.header {
  margin-bottom: 20px;
}

.header-img {
  width: 64px;
  height: 64px;
}

.select-date {
  font-size: 24px;
  color: #f59607;
}

.submit-form {
  padding: 20px;
  /* background-color: rgb(255, 250, 244); */
}

.content-box {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f59607;
}

.content-name {
  width: 100px;
  text-align: start;
  color: #f59607;
  font-weight: bold;
  background-color: #fff;
}

.participant-title {
  margin-bottom: 5px;
}

.participant-box {
  margin-bottom: 20px;
  min-height: 200px;
  background-color: #fff9c8;
  border-radius: 20px;
}

.title {
  width: 80%;
  border: 0;
}

.importance {
  width: 80%;
  display: flex;
  justify-content: space-evenly;
}

.submit-btn {
  padding: 10px;
  background-color: #f59607;
  border: 0;
  border-radius: 30px;
  font-weight: bold;
  font-size: 20px;
}
</style>
