import { createApp } from "vue";
import "./style.css";
import i18n from "./i18n";
import router from "./router";
import App from "./App.vue";

createApp(App).use(i18n).use(router).mount("#app");
