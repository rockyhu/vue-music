<template>
	<div class="singer">
		<!-- list-view插件 -->
		<list-view @select="selectSinger" :data="singers"></list-view>
		<!-- 挂载子路由 -->
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import { getSingerList } from 'api/singer'
	import { ERR_OK } from 'api/config'
	import Singer from 'common/js/singer'
	import ListView from 'base/listview/listview'
	// 引入vuex提供的mapMutations语法糖
	import {mapMutations} from 'vuex'

	const HOT_NAME = '热门'
	const HOT_SINGER_LEN = 10

	export default {
		// 定义数据
		data() {
			return {
				singers: []
			}
		},
		// 钩子
		created() {
			this._getSingerList()
		},
		// 方法对象
		methods: {
			// 歌手点击跳转方法
			selectSinger(singer) {
				// 跳转路由，路由编程式写法
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
			// 获取歌手数据
			_getSingerList() {
				getSingerList().then((res) => {
					if (res.code === ERR_OK) {
						this.singers = this._normalizeSinger(res.data.list)
					}
				})
			},
			// 规范化singer数据
			_normalizeSinger(list) {
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				}
				// 遍历list
				list.forEach((item, index) => {
					if (index < HOT_SINGER_LEN) {
						map.hot.items.push(new Singer({
							id: item.Fsinger_mid,
							name: item.Fsinger_name
						}))
					}
					const key = item.Findex
					if (!map[key]) {
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}))
				})

				// 为了得到有序列表，我们需要处理 map
				let hot = []
				let ret = []
				for (let key in map) {
					let val = map[key]
					if (val.title.match(/[a-zA-Z]/)) {
						ret.push(val)
					} else if (val.title === HOT_NAME) {
						hot.push(val)
					}
				}
				// 对数组进行排序
				ret.sort((a, b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				// 返回一维数组
				return hot.concat(ret)
			},
			// ES6扩展运算符,vuex提供的设置数据的语法糖mapMutations
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
		},
		// 注册组件
		components: {
			ListView
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.singer
		position: fixed
		top: 88px
		bottom: 0
		width: 100%
</style>