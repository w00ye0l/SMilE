<template>
  <div>
    <section class="main-section">
      <div class="header">
        <h1 class="title">Calendar</h1>
        <img src="@/assets/header-img.png" alt="" />
      </div>
      <div class="calendar-container">
        <FullCalendar class="calendar" :options="calendarOptions" />
      </div>

      <div class="todo-list">
        <div class="subtitle-box">
          <h1 class="subtitle">
            오늘 할 일 <span class="today">({{ today }})</span>
          </h1>

          <button class="add-btn" v-on:click="handleDatesSelect(today)">
            <font-awesome-icon
              class="add-text fa-2xs"
              icon="fa-solid fa-plus"
            />
          </button>
        </div>
      </div>
    </section>
    <ModalView
      v-model:event="event"
      v-if="modalOpen"
      @close-modal="modalOpen = false"
    ></ModalView>
  </div>
</template>

<script>
// import { Calendar } from "@fullcalendar/core";
import koLocale from "@fullcalendar/core/locales/ko";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ModalView from "./EventModalView.vue";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    ModalView,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        eventClick: this.handleEventClick,
        // select: this.handleDatesSelect,
        events: this.$store.getters.EVENTS,
        dateClick: this.DateClick,
        selectable: "true",
        longPressDelay: 0,
        // height: "auto",
        dayMaxEvents: true,
        views: {
          dayGridMonth: {
            titleFormat: {
              year: "numeric",
              month: "short",
            },
          },
        },
        locales: [koLocale],
        locale: "ko",
      },
      modalOpen: false,
      event: {},
      titleDate: "",
      today: "",
      tomorrow: "",
    };
  },
  mounted() {
    this.setNowTimes();
  },
  computed: {},
  methods: {
    setNowTimes() {
      let date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      this.today = year + "." + month + "." + day;

      const temp = this.today.split(".");
      this.titleDate = temp[0] + "." + temp[1];
      console.log(this.titleDate);
    },
    handleDatesSelect(arg) {
      console.log(arg);
      this.modalOpen = !this.modalOpen;
      this.event.dateStr = arg;
    },
    handleEventClick(arg) {
      // console.log(this.modalOpen);
      this.modalOpen = !this.modalOpen;

      console.log(arg);
      // console.log(arg.start);
      console.log(arg.event);
      this.event = arg.event;
    },
    DateClick(info) {
      this.today = info.dateStr;
      // console.log(info.date);
      const temp = info.dateStr.split("-");
      this.titleDate = temp[0] + "." + temp[1];
      console.log(this.titleDate);

      // this.tomorrow = new Date(info.date);
      // this.tomorrow.setDate(info.date.getDate() + 1);
      // console.log(this.tomorrow);
    },
  },
};
</script>

<style scoped>
.main-section {
  /* margin-top: 50px; */
  padding: 20px;
  min-height: 100vh;
  background-color: #fff9c8;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 26px;
  color: #f59607;
  font-style: italic;
}

.calendar-container {
  margin-bottom: 30px;
  background-color: #fff;
  /* border: 2px solid #000; */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

.calendar {
  padding: 20px;
  width: 100%;
  min-height: 450px;
}

.title {
  display: flex;
  justify-content: flex-start;
}

.todo-list {
  min-height: 300px;
  background-color: #fff;
  /* border: 2px solid #000; */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

.subtitle-box {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f59607;
}

.subtitle {
  font-size: 20px;
  text-decoration: underline;
}

.today {
  font-size: 16px;
  font-weight: normal;
}

.add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 24px;
  border: 0;
  border-radius: 50%;
  background-color: #f59607;
  color: #fff9c8;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
}

.add-text {
  width: 15px;
  height: 15px;
}
</style>
