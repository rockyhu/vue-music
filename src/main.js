import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

Vue.config.productionTip = false

// 解决移动端点击300ms延迟的问题
fastclick.attach(document.body)

import 'common/stylus/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})