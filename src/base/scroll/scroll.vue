<template>
	<div ref="wrapper">
		<!-- 插槽 -->
		<slot></slot>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'

	export default {
		// 接收父组件传送的参数
		props: {
			// 是否截留scroll事件，详情见better-scroll的github
			probeType: {
				type: Number,
				default: 1
			},
			// 是否手动派发点击事件
			click: {
				type: Boolean,
				default: true
			},
			// 接收data歌单数据
			data: {
				type: Array,
				default: null
			}
		},
		// 钩子函数
		mounted() {
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},
		// 方法对象
		methods: {
			// 初始化scroll插件
			_initScroll() {
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click
				})
			},
			// 启动better-scroll, 默认开启
			enable() {
				this.scroll && this.scroll.enable()
			},
			// 禁用better-scroll
			disable() {
				this.scroll && this.scroll.disable()
			},
			// 强制 scroll 重新计算，当 better-scroll 中的元素发生变化的时候调用此方法
			refresh() {
				this.scroll && this.scroll.refresh()
			}
		},
		// 观察数据或对象的变化
		watch: {
			// 观察data参数的变化，变化时重新刷新scroll
			data() {
				setTimeout(() => {
					this.refresh()
				}, 20)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>