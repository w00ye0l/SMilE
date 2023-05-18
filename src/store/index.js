import { createStore } from "vuex";
import axios from "axios";
import router from "../router/index.js";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    selectMBTI: "",
    totalMbti: "",
    events: [],
    mypage: {
      nickname: "",
      mbti: "",
    },
    messages: [
      {
        name: "ENFJ",
        content:
          "오늘은 날씨가 좋네요 내일 뭐하시나요?ads.ads.ads.ads.d.as.dsa..........dsa.adsdas.ads.dsa.ads.dsa.ads.dasajojaqwjejewlkjwlkqejlkjawlkdjawlkdjawjkadsjldjakjdkasjdkasjdaskjaskjdkjalsdasjkladjklajsldkjaslkdjasjdlkasjdalksjdlaksjdlkasjdaslkj",
        date: "2022/02/16 14:36",
      },
      {
        name: "INFP",
        content: "내일은 날씨가 흐립니다 내일은 어떨 거 같나요",
        date: "2022/02/15 15:10",
      },
      {
        name: "ENFJ",
        content: "오늘은 피곤하네요",
        date: "2022/02/16 14:36",
      },
      {
        name: "ENFJ",
        content: "오늘은 피곤하네요",
        date: "2022/02/16 14:36",
      },
      {
        name: "ENFJ",
        content: "오늘은 피곤하네요",
        date: "2022/02/16 14:36",
      },
    ],
    memos: [],
    answers: [],
    messageCount: 0,
    groups: [],
    keys: 0,
    groupId: "",
    groupData: {},
    title: {},
    contents: {},
    mbti: "선택",
    mbti_complete: {},
    mbtiList: [
      { name: "ENFJ" },
      { name: "ENFP" },
      { name: "ENTJ" },
      { name: "ENTP" },
      { name: "ESFJ" },
      { name: "ESFP" },
      { name: "ESTJ" },
      { name: "ESTP" },
      { name: "INFJ" },
      { name: "INFP" },
      { name: "INTJ" },
      { name: "INTP" },
      { name: "ISTJ" },
      { name: "ISTP" },
      { name: "ISFJ" },
      { name: "ISFP" },
    ],
    selectMessage: "",
  },
  getters: {
    EVENTS: (state) => state.events,
    MESSAGE_COUNT: (state) => state.messages.length,
    ANSWERS: (state) => state.answers,
    MESSAGES: (state) => state.messages,
  },
  mutations: {
    ADD_EVENT: (state, event) => {
      state.events.push(event);
    },
    DELETE_MESSAGE: (state, index) => {
      state.messages.splice(index, 1);
    },
    DELETE_ALL_MESSAGE: (state) => {
      state.messages = [];
    },
    UPDATE_MEMO(state, memo) {
      state.memos.push(memo);
    },
    UPDATE_ANSWER(state, memo) {
      state.answers.push(memo);
    },

    ADD_GROUP(state, payload) {
      state.groups[state.keys] = payload;
      state.keys = state.groups.length;
    },

    UPDATE_GROUP(state, payload) {
      state.groups[payload.key].groupId = payload.groupId;
    },
    REMOVE_GROUP(state, index) {
      if (index > -1 && index < state.groups.length) {
        state.groups.splice(index, 1);
        state.keys--;
      } else {
        console.warn("Invalid index for removal:", index);
      }
    },

    SET_GROUP_ID(state, payload) {
      state.groupId = payload.value;
      if (payload.key !== -1 && state.groups[payload.key]) {
        state.groups[payload.key].groupId = payload.value;
      }
    },
    ADD_GROUP_DATA(state, payload) {
      if (!state.groupData[payload.groupId]) {
        state.groupData[payload.groupId] = [];
      }
      state.groupData[payload.groupId].push(payload.data);
    },
    UPDATE_GROUP_DATA(state, payload) {
      if (!state.groupData[payload.groupId]) {
        state.groupData[payload.groupId] = [];
      }
      const groupIndex = state.groupData[payload.groupId].findIndex(
        (item) => item.name === payload.name
      );
      if (groupIndex !== -1) {
        if (payload.mbti) {
          state.groupData[payload.groupId][groupIndex].mbti = payload.mbti;
        }
        if (payload.memo) {
          state.groupData[payload.groupId][groupIndex].memo = payload.memo;
        }
      }
    },
    UPDATE_CONTENT(state, payload) {
      state.contents[payload.mbti] = payload.content;
    },
    SET_TITLE(state, title) {
      state.title = title;
    },
    UPDATE_MBTI(state, mbti) {
      state.mbti = mbti;
      if (!Object.prototype.hasOwnProperty.call(state.contents, mbti)) {
        state.contents[mbti] = "";
      }
    },
    ADD_TO_MBTI_COMPLETE(state, mbti) {
      state.mbti_complete[mbti.key] = mbti.value;
    },
    REMOVE_FROM_MBTI_COMPLETE(state, key) {
      delete state.mbti_complete[key];
    },

    SET_SELECTED_MESSAGE(state, message) {
      state.selectedMessage = message;
    },
    SET_NICKNAME(state, nickname) {
      state.mypage.nickname = nickname;
    },
    SET_MBTI(state, mbti) {
      state.mypage.mbti = mbti;
    },
  },
  actions: {
    addGroup({ commit }, payload) {
      commit("ADD_GROUP", { groupId: payload.groupId });
    },
    updateGroup({ commit }, payload) {
      commit("UPDATE_GROUP", payload);
    },
    removeGroup({ commit }, payload) {
      commit("REMOVE_GROUP", payload);
    },
    addGroupData({ commit }, payload) {
      commit("ADD_GROUP_DATA", payload);
    },
    updateContent({ commit }, content) {
      commit("UPDATE_CONTENT", content);
    },
    updateTitle({ commit }, title) {
      commit("SET_TITLE", title);
    },
    updateMbti({ commit }, mbti) {
      commit("UPDATE_MBTI", mbti);
    },
    addToMbtiComplete({ commit }, payload) {
      commit("ADD_TO_MBTI_COMPLETE", payload);
    },
    removeFromMbtiComplete({ commit }, key) {
      commit("REMOVE_FROM_MBTI_COMPLETE", key);
    },
    getData({ commit }) {
      console.log("getData Actions");
      axios
        .get("/mypage", {
          withCredentials: true,
        })
        .then((res) => {
          commit("SET_NICKNAME", res.data.nickname);
          commit(
            "SET_MBTI",
            res.data.mbti1 + res.data.mbti2 + res.data.mbti3 + res.data.mbti4
          );
          console.log(this.state.mypage);
        })
        .then(() => router.push("/mypage"))
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
