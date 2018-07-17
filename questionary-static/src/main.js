// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
Vue.config.productionTip = false

/*2级城市联动*/
import './vue-area-linkage.css'
import VueAreaLinkage from 'vue-area-linkage'
Vue.use(VueAreaLinkage)

/*loading动画*/
import VueLoading from 'vue-loading-template'
Vue.use(VueLoading, {
  /*option*/
  type:'bars',//balls, bars, beat, bubbles, cylon, spin, spiningDubbles, barsCylon
  color:'#f34141',
  size:{ width: '60px', height: '60px' }//大小
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
