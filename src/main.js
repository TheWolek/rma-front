import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

const emitter = mitt()
const app = createApp(App)

app.config.globalProperties.emitter = emitter
app.use(router)

fetch("http://localhost:3000/warehouse/shelve")
    .then(async res => {
        const resData = await res.json()

        if (!res.ok) {
            const error = (resData && resData.message) || res.status
            return Promise.reject(error)
        }

        app.config.globalProperties.shelves = resData
    })
    .catch(error => {
        console.log(error)
    })

app.mount('#app')
