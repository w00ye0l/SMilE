import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "@/router";

export default createStore({
  state: {
    selectMBTI: "",
    totalMbti: "",
    mypage: {
      answered: false,
      nickname: "",
      birthday: "",
      gender: "",
      mbti: "",
    },
    messages: [],
    groups: [],
    selectGuest: [],
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
      "ISFJ",
      "ISFP",
      "ISTJ",
      "ISTP",
    ],
    selectMessage: "",
    id: 0,
    mbti1: "_",
    mbti2: "_",
    mbti3: "_",
    mbti4: "_",
    userID: null,
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
    SET_ANSWERED(state, answered) {
      state.mypage.answered = answered;
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
    SET_MBTI1(state, mbti1) {
      state.mbti1 = mbti1;
    },
    SET_MBTI2(state, mbti2) {
      state.mbti2 = mbti2;
    },
    SET_MBTI3(state, mbti3) {
      state.mbti3 = mbti3;
    },
    SET_MBTI4(state, mbti4) {
      state.mbti4 = mbti4;
    },
    SET_USER_ID(state, userID) {
      state.userID = userID;
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
    selectMbti({ commit }, selectMBTI) {
      commit("SET_SELECTED_MBTI", selectMBTI);
    },
    async getData({ commit }) {
      axios
        .get("/mypage", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          commit("SET_NICKNAME", res.data.nickname);
          commit("SET_BIRTHDAY", res.data.birthday.slice(0, 10));
          commit("SET_GENDER", res.data.gender);
          commit(
            "SET_MBTI",
            res.data.mbti1 + res.data.mbti2 + res.data.mbti3 + res.data.mbti4
          );
          commit("SET_ANSWERED", res.data.answered);
          console.log(this.state.mypage);
          router.push({ name: "mypage" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setGroups({ commit }, payload) {
      commit("SET_GROUPS", payload);
    },
    async updateMyProfile({ commit }, payload) {
      await axios
        .put("/mypage/update", payload, { withCredentials: true })
        .then((res) => {
          console.log(res);
          commit("SET_NICKNAME", res.data.nickname);
          commit("SET_BIRTHDAY", res.data.birthday.slice(0, 10));
          commit("SET_GENDER", res.data.gender);
          commit(
            "SET_MBTI",
            res.data.mbti1 + res.data.mbti2 + res.data.mbti3 + res.data.mbti4
          );
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    setUserID({ commit }, userID) {
      commit("SET_USER_ID", userID);
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
