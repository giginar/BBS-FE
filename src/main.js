import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {  faHome,  faUser,  faUserPlus,  faSignInAlt,  faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
