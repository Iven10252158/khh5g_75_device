import { createApp } from 'vue'
import Loading from 'vue3-loading-overlay'
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.component('Loading', Loading)
app.mount('#app')
