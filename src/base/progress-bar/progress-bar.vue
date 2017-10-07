<template>
	<div class="progress-bar" ref="progressBar" @click="progressClick">
		<div class="bar-inner">
			<div class="progress" ref="progress"></div>
			<div class="progress-btn-wrapper" ref="progressBtn" @touchstart="progressTouchStart"
				 @touchmove="progressTouchMove" @touchend="progressTouchEnd">
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { prefixStyle } from 'common/js/dom'

	// 进度条拖动按钮的宽度
	const progressBtnWidth = 16

	// transform做兼容
	const transform = prefixStyle('transform')

	export default {
		// 接收参数
		props: {
			percent: {
				type: Number,
				default: 0
			}
		},
		// 钩子
		created () {
			// 保存touch相关的信息
			this.touch = {}
		},
		// 方法属性
		methods: {
			// 开始触摸
			progressTouchStart (e) {
				// 表示触摸已经初始化
				this.touch.initialized = true
				// 开始触摸的位置，touchs[0]表示第一个手指
				console.log(e.touches)
				this.touch.startX = e.touches[0].pageX
				// 当前拖动按钮的位置
				this.touch.left = this.$refs.progress.clientWidth

			},
			// 触摸移动
			progressTouchMove (e) {
				// 如果没有经过Touchstart，直接进入touchmove，那么直接终止掉
				if (!this.touch.initialized) {
					return
				}
				// 拖动距离即拖动偏移量
				const deltaX = e.touches[0].pageX - this.touch.startX
				// 拖动按钮的位置不能少于0,同时也不能大于bar的长度
				const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
				this._offset(offsetWidth)
			},
			// 结束触摸
			progressTouchEnd (e) {
				// 重置touch初始化状态
				this.touch.initialized = false
				this._triggerPercent()
			},
			// 点击设置播放进度
			progressClick (e) {
				// getBoundingClientRect这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
				const rect = this.$refs.progressBar.getBoundingClientRect()
				// e.pageX表示相对整个页面的坐标
				const offsetWidth = e.pageX - rect.left
				this._offset(offsetWidth)
				// 这里当我们点击 progressBtn 的时候，e.offsetX获取不对
				// this._offset(e.offsetX)
				this._triggerPercent()
			},
			// 拖动结束时，设置播放的进度
			_triggerPercent () {
				const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
				// 当前播放的百分比
				const percent = this.$refs.progress.clientWidth / barWidth
				// 派发事件
				this.$emit('percentChange', percent)
			},
			// offset设置封装
			_offset (offsetWidth) {
				this.$refs.progress.style.width = `${offsetWidth}px`
				this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
			}
		},
		// 观测变量的变化
		watch: {
			// 播放百分比
			percent (newPercent) {
				// 新的百分比大于等于0 并且 当前没有拖动播放进度条
				if (newPercent >= 0 && !this.touch.initialized) {
					const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
					const offsetWidth = newPercent * barWidth
					this._offset(offsetWidth)
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.progress-bar
		height: 30px
		.bar-inner
			position: relative
			top: 13px
			height: 4px
			background: rgba(0, 0, 0, 0.3)
			.progress
				position: absolute
				height: 100%
				background: $color-theme
			.progress-btn-wrapper
				position: absolute
				left: -8px
				top: -13px
				width: 30px
				height: 30px
				.progress-btn
					position: relative
					top: 7px
					left: 7px
					box-sizing: border-box
					width: 16px
					height: 16px
					border: 3px solid $color-text
					border-radius: 50%
					background: $color-theme
</style>