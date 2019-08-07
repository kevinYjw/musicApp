// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import store from './store';

fastclick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(VueLazyload,{
	loading: require('common/image/default.png'),
})

//基础样式
import 'style/index.styl';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
