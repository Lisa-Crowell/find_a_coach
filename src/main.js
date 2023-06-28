import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from "./router";
import store from "./store/index.js";

// createApp(App).mount('#app')
// createApp({}).mount('#app');

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
