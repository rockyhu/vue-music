<template>
	<div class="music-list">
		<div class="back" @click="back">
			<i class="icon-back"></i>
		</div>
		<h1 class="title" v-html="title"></h1>
		<div class="bg-image" :style="bgStyle" ref="bgImage">
			<div class="play-wrapper">
				<div class="play" v-show="songs.length>0" ref="playBtn">
					<i class="icon-play"></i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter" ref="filter"></div>
		</div>
		<div class="bg-layer" ref="layer"></div>
		<scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list"
				ref="list">
			<div class="song-list-wrapper">
				<song-list @select="selectItem" :songs="songs"></song-list>
			</div>
			<div class="loading-container" v-show="!songs.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import SongList from 'base/song-list/song-list'
	import { mapActions } from 'vuex'
	import { prefixStyle } from 'common/js/dom'

	// 预留偏移量
	const RESERVED_HEIGHT = 40
	// CSS的transform属性
	const transform = prefixStyle('transform')
	// CSS的backdrop-filter属性
	const backdrop = prefixStyle('backdrop-filter')

	export default {
		// 接收父组件的参数
		props: {
			// 背景图
			bgImage: {
				type: String,
				default: ''
			},
			// 音乐数据
			songs: {
				type: Array,
				default: []
			},
			// 标题
			title: {
				type: String,
				default: ''
			}
		},
		// 属性
		data () {
			return {
				scrollY: 0
			}
		},
		// 钩子
		created () {
			this.probeType = 3
			this.listenScroll = true
		},
		// 计算属性
		computed: {
			// 背景图
			bgStyle () {
				return `background-image:url(${this.bgImage})`
			}
		},
		// 钩子
		mounted () {
			this.imageHeight = this.$refs.bgImage.clientHeight
			this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
			this.$refs.list.$el.style.top = `${this.imageHeight}px`
		},
		// 方法属性
		methods: {
			// 滚动事件
			scroll (pos) {
				this.scrollY = pos.y
			},
			// 返回事件
			back () {
				this.$router.back()
			},
			// 点击播放音乐
			selectItem (item, index) {
				this.selectPlay({
					list: this.songs,
					index: index
				})
			},
			// Vuex语法糖
			...mapActions([
				'selectPlay'
			])
		},
		// 观测属性变化
		watch: {
			scrollY (newY) {
				let translateY = Math.max(this.minTranslateY, newY)
				let zIndex = 0
				let scale = 1
				let blur = 0

				this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`

				// 比例
				const percent = Math.abs(newY / this.imageHeight)

				if (newY > 0) {
					scale = 1 + percent
					zIndex = 10
				} else {
					blur = Math.min(20 * percent, 20)
				}

				this.$refs.filter.style[backdrop] = `blur(${blur}px)`

				// 滚动到顶部
				if (newY < this.minTranslateY) {
					zIndex = 10
					this.$refs.bgImage.style.paddingTop = 0
					this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
					this.$refs.playBtn.style.display = 'none'
				} else {
					this.$refs.bgImage.style.paddingTop = '70%'
					this.$refs.bgImage.style.height = 0
					this.$refs.playBtn.style.display = ''
				}
				this.$refs.bgImage.style.zIndex = zIndex
				this.$refs.bgImage.style[transform] = `scale(${scale})`
			}
		},
		// 注册组件
		components: {
			Scroll,
			Loading,
			SongList
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"

	.music-list
		position: fixed
		z-index: 100
		top: 0
		left: 0
		right: 0
		bottom: 0
		background: $color-background
		.back
			position absolute
			top: 0
			left: 0
			z-index: 50
			.icon-back
				display: block
				padding: 10px
				font-size: $font-size-large-x
				color: $color-theme
		.title
			position: absolute
			top: 0
			left: 10%
			z-index: 40
			width: 80%
			no-wrap()
			text-align: center
			line-height: 40px
			font-size: $font-size-large
			color: $color-text
		.bg-image
			position: relative
			width: 100%
			height: 0
			padding-top: 70%
			transform-origin: top
			background-size: cover
			.play-wrapper
				position: absolute
				bottom: 20px
				z-index: 50
				width: 100%
				.play
					box-sizing: border-box
					width: 135px
					padding: 7px 0
					margin: 0 auto
					text-align: center
					border: 1px solid $color-theme
					color: $color-theme
					border-radius: 100px
					font-size: 0
					.icon-play
						display: inline-block
						vertical-align: middle
						margin-right: 6px
						font-size: $font-size-medium-x
					.text
						display: inline-block
						vertical-align: middle
						font-size: $font-size-small
			.filter
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
				background: rgba(7, 17, 27, 0.4)
		.bg-layer
			position: relative
			height: 100%
			background: $color-background
		.list
			position: fixed
			top: 0
			bottom: 0
			width: 100%
			background: $color-background
			.song-list-wrapper
				padding: 20px 30px
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
</style>