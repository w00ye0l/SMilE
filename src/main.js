import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
createApp(App)
  .use(store)
  .use(router, axios)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
