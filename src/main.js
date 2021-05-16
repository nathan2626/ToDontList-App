import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).directive("focus", {
    mounted(el) {
        el.focus();
    },
}).mount('#app')
