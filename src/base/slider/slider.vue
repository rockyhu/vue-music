<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<!-- 插槽 -->
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"></span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import { addClass } from 'common/js/dom'

	export default {
		data () {
			return {
				// 轮播图数量
				dots: [],
				// 当前的slider索引
				currentPageIndex: 0
			}
		},
		// 接收父组件的参数
		props: {
			// 是否可以循环轮播
			loop: {
				type: Boolean,
				default: true
			},
			// 是否可以自动轮播
			autoPlay: {
				type: Boolean,
				default: true
			},
			// 滚动到下一个的阈值
			threshold: {
				type: Number,
				default: 0.3
			},
			// 滚动速度
			speed: {
				type: Number,
				default: 400
			},
			// 自动轮播时间间隔
			interval: {
				type: Number,
				default: 4000
			}
		},
		// 钩子函数
		mounted () {
			// 20为一个经验值
			setTimeout(() => {
				this._setSliderWidth()
				this._initDots()
				this._initSlider()
				if (this.autoPlay) {
					this._play()
				}
			}, 20)

			// 监听窗口resize事件
			window.addEventListener('resize', () => {
				if (!this.slider) {
					return
				}
				this._setSliderWidth(true)
				this.slider.refresh()
			})
		},
		// 方法函数
		methods: {
			// 设置slider容器的宽度
			_setSliderWidth (isResize) {
				this.children = this.$refs.sliderGroup.children

				let width = 0
				let sliderWidth = this.$refs.slider.clientWidth

				for (let i = 0; i < this.children.length; i++) {
					let child = this.children[i]
					// 为每一个slider添加slider-item样式
					addClass(child, 'slider-item')

					// 设置每一个slider的宽度
					child.style.width = sliderWidth + 'px'
					width += sliderWidth
				}

				// 循环的话，左右需要添加一个slider
				if (this.loop && !isResize) {
					width += 2 * sliderWidth
				}

				this.$refs.sliderGroup.style.width = width + 'px'
			},
			// 初始化dots
			_initDots () {
				this.dots = new Array(this.children.length)
			},
			// 初始化slider
			_initSlider () {
				this.slider = new BScroll(this.$refs.slider, {
					scrollX: true,
					scrollY: false,
					// 惯性
					momentum: false,
					snap: {
						loop: this.loop,
						threshold: this.threshold,
						speed: this.speed
					}
				})

				this.slider.on('scrollEnd', () => {
					let pageIndex = this.slider.getCurrentPage().pageX
					this.currentPageIndex = pageIndex
					if (this.autoPlay) {
						clearTimeout(this.timer)
						this._play()
					}
				})
			},
			// 播放
			_play () {
				let pageIndex = this.currentPageIndex + 1
				if (pageIndex === this.dots.length && this.loop) {
					pageIndex = 0
				}
				this.timer = setTimeout(() => {
					this.slider.goToPage(pageIndex, 0, this.speed)
				}, this.interval)
			}
		},
		activated () {
			if (this.autoPlay) {
				this._play()
			}
		},
		deactivated () {
			clearTimeout(this.timer)
		},
		// 钩子函数，销毁
		beforeDestroy () {
			clearTimeout(this.timer)
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.slider
		min-height: 1px
		.slider-group
			position: relative
			overflow: hidden
			white-space: nowrap
			.slider-item
				float: left
				box-sizing: border-box
				overflow: hidden
				text-align: center
				a
					display: block
					width: 100%
					overflow: hidden
					text-decoration: none
					img
						display: block
						width: 100%
		.dots
			position: absolute
			right: 0
			left: 0
			bottom: 12px
			text-align: center
			font-size: 0
			.dot
				display: inline-block
				margin: 0 4px
				width: 8px
				height: 8px
				border-radius: 50%
				background: $color-text-l
				&.active
					width: 20px
					border-radius: 5px
					background: $color-text-ll
</style>