import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import plugin_papaparse from './plugin_papaparse.js';

const app = createApp(App);
app.use(BootstrapIconsPlugin);
app.use(plugin_papaparse);
app.mount('#app');
