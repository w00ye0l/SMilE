<template>
  <div>
    <div class="hide-height">
      <h2>그룹 추가</h2>
      <div class="category-addbtn">
        <p class="category-name1">내 그룹</p>
        <div class="add-control">
          <button class="group-add-btn" @click="addBtn()">추가</button>
        </div>
      </div>
      <div class="group-name" v-for="(item, value) in groups" :key="value">
        <span class="name">{{ item }}</span>
        <div>
          <div class="add-delete-img">
            <button class="fix-btn" @click="fixBtn(value)">
              <img :src="require(`@/assets/pencil.png`)" class="pencil" />
            </button>
            <button class="delete-btn" @click="removeBtn(value)">
              <img :src="require(`@/assets/trashcan.png`)" class="trashcan" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="add-group">
      <p class="category-name2">{{ category }}</p>
      <input
        type="text"
        :placeholder="placeholder"
        v-model="groupId"
        class="input-box"
      />
      <br />
      <div class="btn-control">
        <button class="add-btn" @click="registerBtn(), saveBtn()">
          {{ button }}
        </button>
        <button class="cancel-btn" @click="pageLink()">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupId: "",
      placeholder: "",
      content: "-",
      category: "-",
      button: "-",
      members: "",
      groups: {},
      keys: 0,
      prevKey: -1,
    };
  },
  methods: {
    pageLink() {
      this.$router.push({ path: "savingmbti" });
    },
    addBtn() {
      this.content = this.groupId;
      this.category = "추가할 그룹 명";
      this.button = "추가";
      this.placeholder = "그룹 명";
    },
    registerBtn() {
      if (this.button === "추가") {
        this.content = this.groupId;
        this.groups[this.keys] = this.content;
        this.keys++;
        console.log(this.groups, 1);
      }
    },
    fixBtn(number) {
      this.button = "수정";
      this.category = "그룹 및 수정";
      this.prevKey = number;
      for (const [key, value] of Object.entries(this.groups)) {
        console.log(value);
        if (key === this.prevKey) {
          this.groupId = this.groups[key];
        }
      }
      // this.groups[this.key] = this.content;
    },
    removeBtn(number) {
      this.prevKey = number;
      if (confirm("삭제하시겠습니까?")) {
        for (const key in this.groups) {
          console.log(key, this.key);
          if (`${key}` === this.prevKey.toString()) {
            delete this.groups[key];
            this.groupId = "";
          }
        }
      }
    },
    saveBtn() {
      if (this.button === "수정") {
        this.groups[this.prevKey] = this.groupId;
      }
    },
  },
};
</script>

<style scoped>
.hide-height {
  height: 60vh;
}

.category-addbtn {
  display: flex;
  justify-content: space-between;
}

.add-control {
  display: flex;
  justify-content: center;
  align-items: center;
}
.group-add-btn {
  margin-right: 20px;
  width: 70px;
  height: 40px;
  border-radius: 17px;
  border: none;
  background-color: #f59607;
  font-size: 17px;
}
.category-name1 {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  justify-content: left;
  margin-left: 25px;
}

.group-name {
  margin: 10px 0 30px 30px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  width: 90vw;
  margin: 0 0 15px 20px;
  border-radius: 25px;
  background-color: #ffd338;
  box-shadow: 0px 1.5px 0px 1.5px #d3d3d3;
}

.add-delete-img {
  margin: 10px 10px 0 0;
}

.pencil {
  margin: 0 0 5px 0;
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

.fix-btn {
  border: none;
  background-color: transparent;
}
.delete-btn {
  border: none;
  background-color: transparent;
}
.name {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
}
</style>
