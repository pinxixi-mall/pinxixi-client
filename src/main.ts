import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { store } from '@/store'
import vantComps from '@/common/vantComps'
// import '@/libs/flexible'
import 'lib-flexible/flexible'
import 'vant/lib/index.css'
import '@/styles/index.less'
// import Vconsole from 'vconsole'

const app = createApp(App)
app.use(router).use(store).use(vantComps)
app.mount('#app')

// new Vconsole()