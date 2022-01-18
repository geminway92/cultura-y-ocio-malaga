import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import styles from './css/styles.css'

import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
// createApp(App).use(store).use(router).mount('#app')




createApp(App)
  .use(store)
  .use(router)
  .use(VueCal)
  .mount("#app");

