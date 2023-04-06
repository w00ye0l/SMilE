import { createStore } from "vuex";

export default createStore({
  state: {
    selectMBTI: "",
    total_mbti: "",
    events: [],
    messages: [
      {
        name: "익명",
        content: "오늘은 날씨가 좋네요",
        date: "2022/02/16 14:36",
      },
      {
        name: "익명",
        content: "오늘은 날씨가 흐립니다",
        date: "2022/02/16 15:36",
      },
    ],
    memo: "",
  },
  getters: {
    EVENTS: (state) => state.events,
  },
  mutations: {
    ADD_EVENT: (state, event) => {
      state.events.push(event);
    },
    deleteMessage: (state, index) => {
      state.messages.splice(index, 1);
    },
    deleteAllMessages: (state) => {
      state.messages = [];
    },
    updateMemo(state, memo) {
      state.memo = memo;
    },
  },
  actions: {},
  modules: {},
});
