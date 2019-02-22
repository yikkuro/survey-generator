import Vue from 'vue';
import { IntializeVuetify } from '@/plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
IntializeVuetify();

const VueUploadComponent = require('vue-upload-component');
Vue.component('file-upload', VueUploadComponent);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
