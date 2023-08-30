<template>
  <div class="black-bg" @click.self="$emit('close')">
    <div class="white-bg">
      <div class="radio-button-control">
        <input
          type="radio"
          id="그룹추가"
          class="radio-button"
          @click="pageLink"
        />
        <label for="그룹추가" class="radio-name">그룹추가</label>
      </div>

      <div class="radio-button-control">
        <input
          type="radio"
          id="MBTI 정보 추가"
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
      close: Function,
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
  position: absolute;
  left: 50%;
  bottom: 100px;
  transform: translate(-50%, 0);
  padding: 35px 20px;
  width: 90vw;
  max-width: 1000px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 15px;
}

.radio-button-control {
  display: flex;
  align-items: center;
}

.radio-name {
  margin-left: 10px;
  font-size: 18px;
  font-weight: 500;
}

.radio-button {
  width: 18px;
  height: 18px;
}
</style>
