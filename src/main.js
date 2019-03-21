// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from  './store'
import {sync} from 'vuex-router-sync'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css';

sync(store, router)
Vue.use(ElementUI)
Vue.config.productionTip = false
//import 'font-awesome/css/font-awesome.min.css'

/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('user');
  // }
  //let user = JSON.parse(sessionStorage.getItem('user'));
  //if (!user) {
  //   next({path: '/main'});
  //} else {
    next();
  //}
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
