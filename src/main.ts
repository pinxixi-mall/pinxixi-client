import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import * as comps from './config/vantComps'
import 'vant/lib/index.css'
import '@/styles/index.less'
import 'lib-flexible/flexible'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router).use(createPinia())

// 注册vant组件
Object.values(comps).forEach(comp => app.use(comp))

app.mount('#app')
