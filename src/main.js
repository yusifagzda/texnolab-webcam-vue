import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket-vue3';
import store from "@/store.js";

const app = createApp(App);

app.use(store);
app.use(VueNativeSock, 'ws://127.0.0.1:8888', {
    store: store,
    // format: 'json',
    reconnection: true, // (Boolean) whether to reconnect automatically (false)
    reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
    reconnectionDelay: 1000, // (Number) how long to initially wait before attempting a new (1000)
});

app.mount('#app')

export default app;

