import { createApp } from 'vue';
import { pinia } from './stores';
import App from './App.vue';
import router from './router';
import { truncateWords } from './filters';
import './index.css';

const app = createApp(App);
// Register the truncateWords filter as a global property
app.config.globalProperties.$truncateWords = truncateWords;

app.use(router).use(pinia).mount('#app');
