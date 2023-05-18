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
        <span class="name">{{ item.groupId }}</span>
        <div>
          <div class="add-delete-img">
            <button class="fix-btn" @click="fixBtn(value)">
              <img :src="require(`@/assets/pencil.png`)" class="pencil" />
            </button>
            <button class="delete-btn" @click="removeBtn(item.groupId)">
              <img :src="require(`@/assets/trashcan.png`)" class="trashcan" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <GroupBtn
      v-if="showOn"
      :category="category"
      :placeholder="placeholder"
      :button="button"
      :inputValue="inputValue"
      :groups="groups"
      @register="registerBtn"
    />
  </div>
</template>

<script>
import GroupBtn from "@/views/GroupBtn.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    GroupBtn,
  },
  data() {
    return {
      placeholder: "그룹 명",
      content: "-",
      category: "추가할 그룹 명",
      button: "추가",
      members: "",
      keys: 0,
      prevKey: -1,
      inputValue: "",
      showOn: false,
    };
  },
  computed: {
    ...mapState(["groupId", "groups"]),
  },
  methods: {
    ...mapActions(["addGroup", "updateGroup", "removeGroup"]),
    addBtn() {
      this.showOn = true;
      this.category = "추가할 그룹 명";
      this.button = "추가";
      this.placeholder = "그룹 명";
      this.inputValue = "";
    },
    registerBtn(inputValue) {
      this.inputValue = inputValue;
      if (this.inputValue === "") {
        alert("그룹의 이름을 작성해주세요.");
      } else if (
        this.groups.some((group) => group.groupId === this.inputValue)
      ) {
        alert("이미 존재하는 그룹 이름입니다.");
      } else if (this.groups.length === 3 && this.button === "추가") {
        alert("최대 3개의 그룹까지만 생성할 수 있습니다.");
      } else {
        if (this.button === "추가") {
          this.addGroup({ groupId: this.inputValue });
          this.inputValue = "";
        } else if (this.button === "수정") {
          this.updateGroup({ key: this.prevKey, groupId: this.inputValue });
          this.inputValue = "";
        }
      }
    },
    fixBtn(number) {
      if (this.groups[number]) {
        this.button = "수정";
        this.category = "그룹 및 수정";
        this.prevKey = number;
        this.inputValue = this.groups[number].groupId;
      } else {
        console.warn("Invalid index:", number);
      }
    },
    updateGroupId(value) {
      if (this.prevKey !== -1) {
        this.$store.commit("SET_GROUP_ID", {
          groups: this.groups,
          key: this.prevKey,
          value,
        });
      }
    },
    removeBtn(groupId) {
      if (confirm("삭제하시겠습니까?")) {
        const index = this.groups.findIndex((item) => item.groupId === groupId);
        if (index !== -1) {
          this.removeGroup(index);
          if (this.prevKey === index) {
            this.prevKey = -1;
            this.inputValue = "";
            this.button = "추가";
            this.category = "추가할 그룹 명";
            this.placeholder = "그룹 명";
          } else if (this.prevKey > index) {
            this.prevKey--;
          }
          this.$store.commit("SET_GROUP_ID", { key: this.prevKey, value: "" });
        }
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
