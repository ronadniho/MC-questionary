// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
Vue.config.productionTip = false

/*2级城市联动*/
import './vue-area-linkage.css'
// import 'vue-area-linkage/dist/index.css';
import VueAreaLinkage from 'vue-area-linkage'
Vue.use(VueAreaLinkage)

/*基于 vue 2.x 开发的弹窗插件
包含 Alert, Confirm, Toast*/
import {Alert, Confirm, Toast} from 'wc-messagebox'
import './wc-messagebox.css'
Vue.use(Alert, {})
Vue.use(Confirm, {})
Vue.use(Toast, 3000)


/*loading动画*/
import VueLoading from 'vue-loading-template'
Vue.use(VueLoading, {
  /*option*/
  type:'spin',//balls, bars, beat, bubbles, cylon, spin, spiningDubbles, barsCylon
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
