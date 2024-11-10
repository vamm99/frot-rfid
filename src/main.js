import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import echo from './assets/echo';



const app = createApp(App)

// Si quieres que Echo esté disponible globalmente, puedes hacer lo siguiente:
app.config.globalProperties.$echo = echo;
app.use(createPinia())
app.use(router)

app.mount('#app')
