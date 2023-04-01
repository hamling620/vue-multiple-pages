import { createApp } from 'vue'
import App from './App.vue'

import 'vant/es/button/style'
import 'vant/es/switch/style'
import 'vant/es/calendar/style'
import 'vant/es/address-edit/style'
import 'vant/es/cell/style'
import '@/assets/scss/index.scss'

const app = createApp(App)

app.mount('#app')
