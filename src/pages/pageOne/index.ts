import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/scss/index.scss'

import(/* webpackChunkName: "math" */'@/utils/math').then(module => {
  console.log(module.add(100, 200))
})

const app = createApp(App)
app.mount('#app')
