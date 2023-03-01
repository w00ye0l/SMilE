<template>
  <div class="group-info">
    <div>
      <h2>그룹 추가</h2>
      <p class="category-name1">내 그룹</p>
      <div class="group-manage">
        <span class="group-name">가족</span>
        <div class="add-delete-img">
          <img :src="require(`@/assets/pencil.png`)" class="pencil" />
          <img :src="require(`@/assets/trashcan.png`)" class="trashcan" />
        </div>
      </div>
    </div>
    <div class="group-manage">
      <span class="group-name">친구</span>
      <div class="add-delete-img">
        <img :src="require(`@/assets/pencil.png`)" class="pencil" />
        <img :src="require(`@/assets/trashcan.png`)" class="trashcan" />
      </div>
    </div>
  </div>
  <div class="add-group">
    <p class="category-name2">추가할 그룹 명</p>
    <input
      type="text"
      placeholder="그룹 명"
      v-model="groupId"
      class="input-box"
    />
    <br />
    <div class="btn-control">
      <button class="add-btn" @click="pageLink">추가</button>
      <button class="cancel-btn" @click="pageLink">취소</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupId: "",
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "savingmbti" });
    },
  },
};
</script>

<style scoped>
.group-info {
  height: 600px;
}
.category-name1 {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  justify-content: left;
  margin-left: 20px;
}

.group-manage {
  display: flex;
  justify-content: space-between;
  width: 90vw;
  margin: 0 0 15px 20px;
  border-radius: 20px;
  background-color: #ffd338;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.group-name {
  margin: 10px 0 0 30px;
  font-size: 20px;
}

.add-delete-img {
  margin: 10px 10px 0 0;
}

.pencil {
  margin: 0 10px 5px 0;
}

.trashcan {
  margin: 0 0 5px 0;
}
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
  border-radius: 20px;
  border: none;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
  height: 45px;
  display: inline-block;
}

input::placeholder {
  text-indent: 15px;
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
