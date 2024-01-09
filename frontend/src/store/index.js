import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "@/router";
import cookie from "vue-cookies";

export default createStore({
  state: {
    mypage: {
      id: 0,
      nickname: "",
      profileImg: "",
      birthday: "",
      gender: "",
      mbti: "",
      answered: 0,
    },
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
    randomQuestionId: 0,
    mbti1: "_",
    mbti2: "_",
    mbti3: "_",
    mbti4: "_",
  },
  getters: {
    GROUPS: (state) => state.groups,
  },
  mutations: {
    SET_USER_ID(state, id) {
      state.mypage.id = id;
    },
    SET_NICKNAME(state, nickname) {
      state.mypage.nickname = nickname;
    },
    SET_PROFILEIMG(state, profileImg) {
      state.mypage.profileImg = profileImg;
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
    SET_GROUPS(state, payload) {
      state.groups = payload;
    },
    UPDATE_SELECT_GUEST(state, payload) {
      state.selectGuest = payload;
    },
    SET_RANDOM_QUESTION_ID(state, randomQuestionId) {
      state.randomQuestionId = randomQuestionId;
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
  },
  actions: {
    updateProfileImage({ commit }, image) {
      commit("SET_PROFILEIMG", image);
    },
    async getData({ commit }) {
      axios
        .get("/mypage", { withCredentials: true })
        .then((res) => {
          console.log(res);
          cookie.set("id", res.data.id);
          commit("SET_USER_ID", res.data.id);
          commit("SET_NICKNAME", res.data.nickname);
          commit("SET_PROFILEIMG", res.data.image);
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
          commit("SET_USER_ID", res.data.id);
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
