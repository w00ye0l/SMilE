<template>
  <div class="black-bg box-sizing">
    <div class="white-bg">
      <div class="radio-button-control">
        <input
          type="radio"
          :model="radioValues"
          value="그룹추가"
          class="radio-button"
          @click="pageLink"
        />
        <label for="그룹추가" class="radio-name">그룹추가</label>
      </div>
      <br />
      <div class="radio-button-control">
        <input
          type="radio"
          :model="radioValues"
          value="MBTI 정보 추가"
          class="radio-button"
          @click="mbtiLink"
        />
        <label for="MBTI 정보 추가" class="radio-name">MBTI 정보 추가</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    groups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      radioValues: "",
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "/mbti/addGroup" });
    },
    mbtiLink() {
      if (this.groups.length > 0) {
        this.$router.push({ path: "/mbti/addMbti" });
      } else {
        alert("그룹을 먼저 추가해주세요");
      }
    },
  },
};
</script>
<style scoped>
.box-sizing {
  box-sizing: border-box;
}

.black-bg {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
}

.white-bg {
  width: 90vw;
  background: white;
  position: absolute;
  bottom: 90px;
  border-radius: 15px;
  padding: 20px;
  height: 150px;
}

.radio-button-control {
  display: flex;
  justify-content: left;
  margin: 10px 0 5px 0;
  align-items: center;
}

.radio-name {
  font-size: 17px;
  margin-left: 10px;
  font-weight: 600;
}

.radio-button {
  width: 17px;
  height: 17px;
}
</style>
