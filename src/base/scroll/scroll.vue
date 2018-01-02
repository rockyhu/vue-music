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
			},
			// 是否要监听滚动事件
			listenScroll: {
				type: Boolean,
				default: false
			},
			// 上拉是否刷新
			pullup: {
				type: Boolean,
				default: false
			},
			// 是否在滚动开始前派发beforeScrollStart事件
			beforeScroll: {
				type: Boolean,
				default: false
			}
		},
		// 钩子函数
		mounted () {
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},
		// 方法对象
		methods: {
			// 初始化scroll插件
			_initScroll () {
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click
				})

				if (this.listenScroll) {
					let me = this
					// 监听scroll事件
					this.scroll.on('scroll', (pos) => {
						// 派发scroll事件给父组件
						me.$emit('scroll', pos)
					})
				}

				if (this.pullup) {
					this.scroll.on('scrollEnd', () => {
						if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
							this.$emit('scrollToEnd')
						}
					})
				}

				if (this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll')
					})
				}
			},
			// 启动better-scroll, 默认开启
			enable () {
				this.scroll && this.scroll.enable()
			},
			// 禁用better-scroll
			disable () {
				this.scroll && this.scroll.disable()
			},
			// 强制 scroll 重新计算，当 better-scroll 中的元素发生变化的时候调用此方法
			refresh () {
				this.scroll && this.scroll.refresh()
			},
			// scrollTo(x, y, time, easing)
			// 滚动到某个位置，x,y 代表坐标，time 表示动画时间，easing 表示缓动函数
			scrollTo () {
				// 通过apply方法把接收到的参数arguments传递给better-scroll的scrollTo方法
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			// scrollToElement(el, time, offsetX, offsetY, easing)
			// 滚动到某个元素，el（必填）表示 dom 元素，time 表示动画时间，offsetX 和 offsetY 表示坐标偏移量，easing 表示缓动函数
			scrollToElement () {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		// 观察数据或对象的变化
		watch: {
			// 观察data参数的变化，变化时重新刷新scroll
			data () {
				setTimeout(() => {
					this.refresh()
				}, 20)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>