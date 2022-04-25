import { createApp } from 'vue'
// sweetAlert套件
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
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

// sweetAlert 客製化
const options = {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  color: '#00AAFF',
  iconColor: '#3E708B',
  padding: '2.5rem',
  timerProgressBar: true,
  timer: 2000
}

const app = createApp(App)
app.use(VueAxios, axios)
app.use(VueSweetalert2, options)
app.use(store)
app.use(router)
app.component('Loading', Loading)
app.mount('#app')
