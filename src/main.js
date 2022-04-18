// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'; //載入vee-validate中文語系

import router from './router';
import './Bus';
import currencyFilter from './filters/currency';

Vue.use(VueAxios, axios);

Vue.use(VeeValidate,{
  events: 'input|blur',
});
VeeValidate.Validator.localize('zh_TW',zhTWValidate);

Vue.config.productionTip = false;
axios.defaults.withCredentials=true;

Vue.component('Loading',Loading);
Vue.filter('currency', currencyFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next) => {
  // document.title = `${to.name} - HEXRESTAURANT`;
  // gtag('config', 'G-E7G6JH41FP', {
  //   page_title: `HEXRESTAURANT - ${to.name}`,
  //   page_path: to.path,
  //   page_location: `https://wumenglin.github.io/test/dist/index.html#${to.path}`
  // });
  //console.log(to, from, next);
  if(to.meta.requiresAuth){
      console.log('**進入此頁面需驗證**');

      const api = `${process.env.APIPATH}/api/user/check`;
      axios.post(api) //此環境下this.$http需替換為axios
        .then((response) => {
          console.log('登入狀態驗證',response.data.success,response.data.message);
          if (response.data.success) {
            next();
          }else{
            next({
              path:'/login',
            });
          }
        });
    
  }else{
    next();
  }
})