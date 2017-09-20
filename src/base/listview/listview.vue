<template>
	<scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" :probeType="probeType"
			@scroll="scroll">
		<ul>
			<li v-for="group in data" class="list-group" ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li v-for="item in group.items" class="list-group-item">
						<img v-lazy="item.avatar" class="avatar" alt="">
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart="onShortCutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
			<ul>
				<li v-for="(item, index) in shortCutList" class="item" :class="{'current' : currentIndex === index}"
					:data-index="index">{{item}}
				</li>
			</ul>
		</div>
	</scroll>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import { getData } from 'common/js/dom'

	// 定义右侧每个元素的高度
	const ANCHOR_HEIGHT = 18

	export default {
		// 钩子
		created() {
			// 不要监听，目的是做两个方法中的数据对象共享
			this.touch = {}
			// 是否需要监听scroll组件的scroll事件
			this.listenScroll = true
			// 歌手组的高度数组
			this.listHeight = []
			// 设置better-scroll采用不截留的方式滚动监听事件
			this.probeType = 3
		},
		// 观测在纵坐标方法的实时滚动位置和当前的滚动索引位置
		data() {
			return {
				// 纵坐标实时滚动位置坐标
				scrollY: -1,
				// 当前索引
				currentIndex: 0
			}
		},
		// 接收父组件传送的参数
		props: {
			// 渲染数据
			data: {
				type: Array,
				default: []
			}
		},
		// 计算属性
		computed: {
			// 歌手右侧快捷栏目数组
			shortCutList() {
				// 数组的map方法:映射 ，从数组映射出一个新的数组
				return this.data.map((group) => {
					return group.title.substr(0, 1)
				})
			}
		},
		// 方法对象
		// 私有方法放在下面，关于公众方法或者绑定事件的方法放在上面
		methods: {
			// 开始滚动事件
			onShortCutTouchStart(e) {
				// 获取点击的索引
				let anchorIndex = getData(e.target, 'index')
				// 获取第一个触碰的手指
				let firstTouch = e.touches[0]
				// 获取第一个触碰手指的纵坐标及当前的索引
				this.touch.y1 = firstTouch.pageY
				this.touch.anchorIndex = anchorIndex
				this._scrollTo(anchorIndex)
			},
			// 滚动事件
			onShortCutTouchMove(e) {
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY
				// 计算纵坐标方向的偏移了几个锚点
				// | 0 表示向下取整，相当于Math.floor
				let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
				// 计算当前偏移到了哪一个索引
				let anchorIndex = parseInt(this.touch.anchorIndex) + delta
				this._scrollTo(anchorIndex)
			},
			// scroll组件的滚动事件
			scroll(pos) {
				// 实时获取到better-scroll在Y轴上的位置
				this.scrollY = pos.y
			},
			// 对scrollTo做简单封装
			_scrollTo(index) {
				// 当index为null时，直接跳出（点击快捷栏目顶部或尾部的时候）
				if (!index && index !== 0) {
					return
				}
				// touchmove的时候，index会出现负数或者大于字母快捷栏目的个数
				if (index < 0) {
					index = 0
				} else if (index > this.listHeight.length - 2) {
					index = this.listHeight.length - 2
				}
				// 点击右侧字母快捷栏目跳转到指定的区间，并且计算scrollY，因为要高亮字母快捷导航
				this.scrollY = -this.listHeight[index]
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
			},
			// 计算每个group的高度区间数组
			_calculateHeight() {
				// 重新计算时，初始化高度数组
				// [0, 760, 1030, 1370, 1780, 1910, 2110, 2450, 2720, 3060, 3190, 3950, 4430, 4700, 4900, 5100, 5370, 5570, 5980, 6460, 7010, 7560, 7900, 9010]
				this.listHeight = []
				const list = this.$refs.listGroup
				// listHeight保存的是一个上限到下限的位置数组，所以第一个上限是0
				let height = 0
				this.listHeight.push(height)
				// 遍历list数组
				for (let i = 0; i < list.length; i++) {
					let item = list[i]
					// 因为item是一个DOM元素，索引可以采用clientHeight获取高度
					height += item.clientHeight
					this.listHeight.push(height)
				}
			}
		},
		// 观测对象
		watch: {
			// 观测数据变化
			data() {
				setTimeout(() => {
					this._calculateHeight()
				}, 20)
			},
			// 观测scrollY的变化
			scrollY(newY) {
				const listHeight = this.listHeight

				// 当滚动到顶部，newY>0
				if (newY > 0) {
					this.currentIndex = 0
					return
				}

				// 在中间部分滚动
				for (let i = 0; i < listHeight.length - 1; i++) {
					let height1 = listHeight[i]
					let height2 = listHeight[i + 1]
					if (-newY >= height1 && -newY < height2) {
						this.currentIndex = i
						return
					}
				}

				// 当滚动到底部，且-newY大于最后一个元素的上限
				this.currentIndex = listHeight.length - 2
			}
		},
		// 注册子组件
		components: {
			Scroll
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.listview
		position: relative
		width: 100%
		height: 100%
		overflow: hidden
		background: $color-background
		.list-group
			padding-bottom: 30px
			.list-group-title
				height: 30px
				line-height: 30px
				padding-left: 20px
				font-size: $font-size-small
				color: $color-text-l
				background: $color-highlight-background
			.list-group-item
				display: flex
				align-items: center
				padding: 20px 0 0 30px
				.avatar
					width: 50px
					height: 50px
					border-radius: 50%
				.name
					margin-left: 20px
					color: $color-text-l
					font-size: $font-size-medium
		.list-shortcut
			position: absolute
			z-index: 30
			right: 0
			top: 50%
			transform: translateY(-50%)
			width: 20px
			padding: 20px 0
			border-radius: 10px
			text-align: center
			background: $color-background-d
			font-family: Helvetica
			.item
				padding: 3px
				line-height: 1
				color: $color-text-l
				font-size: $font-size-small
				&.current
					color: $color-theme
		.list-fixed
			position: absolute
			top: 0
			left: 0
			width: 100%
			.fixed-title
				height: 30px
				line-height: 30px
				padding-left: 20px
				font-size: $font-size-small
				color: $color-text-l
				background: $color-highlight-background
		.loading-container
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)
</style>