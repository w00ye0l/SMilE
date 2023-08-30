<template>
  <div class="add-group">
    <p class="category-name2">{{ category }}</p>
    <input
      type="text"
      :placeholder="placeholder"
      :value="localInputValue"
      @input="updateInputValue($event.target.value)"
      class="input-box"
      maxlength="10"
    />
    <br />
    <div class="btn-control">
      <button class="add-btn" @click="registerBtn()">
        {{ button }}
      </button>
      <button class="cancel-btn" @click="pageLink()">취소</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
    inputValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localInputValue: this.inputValue,
    };
  },
  watch: {
    inputValue(newValue) {
      this.localInputValue = newValue;
    },
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "/mbti" });
    },
    registerBtn() {
      if (this.localInputValue === "") {
        alert("그룹의 이름을 작성해주세요.");
        return;
      }
      this.$emit("register", this.localInputValue);
      this.localInputValue = "";
    },
    updateInputValue(value) {
      this.localInputValue = value;
    },
  },
};
</script>
<style scoped>
.add-group {
  background: #fff9c8;
  height: 255px;
}

.category-name2 {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  justify-content: left;
  margin-left: 20px;
  padding-top: 30px;
}

.input-box {
  width: 90vw;
  margin: 0 0 15px 0;
  padding-left: 15px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 45px;
  display: inline-block;
}

input::placeholder {
  text-indent: 5px;
  padding-left: 0;
}

.btn-control {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}

.add-btn {
  width: 100px;
  height: 40px;
  border-radius: 17px;
  border: none;
  background-color: #f59607;
  margin-left: 50px;
  font-size: 17px;
}

.cancel-btn {
  width: 100px;
  height: 40px;
  border-radius: 17px;
  border: none;
  background-color: #ffffff;
  margin-right: 50px;
  font-size: 17px;
}
</style>
