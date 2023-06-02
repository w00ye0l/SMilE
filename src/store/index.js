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
      birthday: "",
      gender: "",
      mbti: "",
    },
    messages: [],
    memos: [],
    answers: [],
    messageCount: 0,
    groups: [],
    selectGuest: [],
    keys: 0,
    groupId: "",
    groupData: {},
    title: {},
    contents: {},
    mbti: "선택",
    mbti_complete: {},
    mbtiList: [
      "ENFJ",
      "ENFP",
      "ENTJ",
      "ENTP",
      "ESFJ",
      "ESFP",
      "ESTJ",
      "ESTP",
      "INFJ",
      "INFP",
      "INTJ",
      "INTP",
      "ISTJ",
      "ISTP",
      "ISFJ",
      "ISFP",
    ],
    selectMessage: "",
    message: "Q. 친구가 기분이 안좋아서 화분을 샀다. 나의 대답은?..",
    newComment: "",
    comments: [],
    id: 0,
  },
  getters: {
    EVENTS: (state) => state.events,
    MESSAGE_COUNT: (state) => state.messages.length,
    ANSWERS: (state) => state.answers,
    MESSAGES: (state) => state.messages,
    GROUPS: (state) => state.groups,
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

    SET_SELECTED_MBTI(state, mbti) {
      state.selectMBTI = mbti;
    },
    SET_NICKNAME(state, nickname) {
      state.mypage.nickname = nickname;
    },
    SET_BIRTHDAY(state, birthday) {
      state.mypage.birthday = birthday;
    },
    SET_GENDER(state, gender) {
      state.mypage.gender = gender;
    },
    SET_MBTI(state, mbti) {
      state.mypage.mbti = mbti;
    },
    UPDATE_NEW_COMMENT(state, payload) {
      state.newComment = payload;
    },
    ADD_COMMENT(state, payload) {
      state.comments.push(payload);
    },
    SET_GROUPS(state, payload) {
      state.groups = payload;
    },
    UPDATE_SELECT_GUEST(state, payload) {
      state.selectGuest = payload;
    },
    SET_ID(state, id) {
      state.id = id;
    },
  },
  actions: {
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
      axios
        .get("/mypage", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.password);
          commit("SET_NICKNAME", res.data.nickname);
          commit("SET_BIRTHDAY", res.data.birthday.slice(0, 10));
          commit("SET_GENDER", res.data.gender);
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
    setGroups({ commit }, payload) {
      commit("SET_GROUPS", payload);
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
