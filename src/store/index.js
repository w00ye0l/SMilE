import { createStore } from "vuex";

export default createStore({
  state: {
    selectMBTI: "",
    totalMbti: "",
    events: [],
    mypage: [
      {
        nickname: "카페모카",
        mbti: "INFP",
      },
    ],
    messages: [
      {
        name: "ENFJ",
        content: "오늘은 날씨가 좋네요",
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
    ],
    memos: [],
    answers: [],
    messageCount: 0,
    groups: [],
    keys: 0,
    groupId: "",
    groupData: {},
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
      state.keys++;
    },

    UPDATE_GROUP(state, payload) {
      state.groups[payload.key].groupId = payload.groupId;
    },
    REMOVE_GROUP(state, payload) {
      state.groups.splice(payload, 1);
    },

    SET_GROUP_ID(state, payload) {
      state.groupId = payload.value;
      if (payload.key !== -1) {
        state.groups[payload.key].groupId = payload.value;
      }
    },
    ADD_GROUP_DATA(state, payload) {
      if (!state.groupData[payload.groupId]) {
        state.groupData[payload.groupId] = [];
      }
      state.groupData[payload.groupId].push(payload.data);
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
  },
  modules: {},
});
