import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import Vuelazyload from 'vue-lazyload'
import 'common/stylus/index.styl'
// 移动端调试工具，需要调试的时候，可以开启
// import Vconsole from 'vconsole'

/* eslint-disable no-new */
// new Vconsole()

Vue.config.productionTip = false

// 解决移动端点击300ms延迟的问题
fastclick.attach(document.body)

Vue.use(Vuelazyload, {
	// webpack支持图片的require，将图片转换为base64格式
	loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})