import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import * as comps from './config/vantComps'
import 'vant/lib/index.css'
import '@/styles/index.less'
import 'lib-flexible/flexible'

const app = createApp(App)

app.use(router)

for (const key in comps) {
    if (Object.prototype.hasOwnProperty.call(comps, key)) {
        app.use(Reflect.get(comps, key))
    }
}

app.mount('#app')
