<template>
	<div class="player" v-show="playlist.length>0">
		<transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
			<div class="normal-player" v-show="fullScreen">
				<div class="background">
					<img width="100%" height="100%" :src="currentSong.image">
				</div>
				<div class="top">
					<div class="back" @click="back">
						<i class="icon-back"></i>
					</div>
					<h1 class="title" v-html="currentSong.name"></h1>
					<h2 class="subtitle" v-html="currentSong.singer"></h2>
				</div>
				<div class="middle" @touchstart="middleTouchStart" @touchmove="middleTouchMove"
					 @touchend="middleTouchEnd">
					<div class="middle-l" ref="middleL">
						<div class="cd-wrapper" ref="cdWrapper">
							<div class="cd" :class="cdCls">
								<img class="image" :src="currentSong.image">
							</div>
						</div>
						<div class="playing-lyric-wrapper">
							<div class="playing-lyric">{{playingLyric}}</div>
						</div>
					</div>
					<!-- 歌词 -->
					<scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
						<div class="lyric-wrapper">
							<div v-if="currentLyric">
								<p ref="lyricLine" class="text" :class="{'current' : currentLineNum === index}"
								   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
							</div>
						</div>
					</scroll>
				</div>
				<div class="bottom">
					<div class="dot-wrapper">
						<span class="dot" :class="{'active' : currentShow === 'cd'}"></span>
						<span class="dot" :class="{'active' : currentShow === 'lyric'}"></span>
					</div>
					<!-- 播放进度条 -->
					<div class="progress-wrapper">
						<span class="time time-l">{{format(currentTime)}}</span>
						<div class="progress-bar-wrapper">
							<progress-bar @percentChange="onProgressBarChange" :percent="percent"></progress-bar>
						</div>
						<span class="time time-r">{{format(currentSong.duration)}}</span>
					</div>
					<!-- 播放操作按钮 -->
					<div class="operators">
						<div class="icon i-left">
							<i :class="iconMode" @click="changeMode"></i>
						</div>
						<div class="icon i-left" :class="disableCls">
							<i @click="prev" class="icon-prev"></i>
						</div>
						<div class="icon i-center" :class="disableCls">
							<i @click="togglePlaying" :class="playIcon"></i>
						</div>
						<div class="icon i-right" :class="disableCls">
							<i @click="next" class="icon-next"></i>
						</div>
						<div class="icon i-right">
							<i class="icon" @click="toggleFavorite(currentSong)"
							   :class="getFavoriteIcon(currentSong)"></i>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="mini">
			<div class="mini-player" v-show="!fullScreen" @click="open">
				<div class="icon">
					<img :class="cdCls" width="40" height="40" :src="currentSong.image">
				</div>
				<div class="text">
					<h2 class="name" v-html="currentSong.name"></h2>
					<p class="desc" v-html="currentSong.singer"></p>
				</div>
				<div class="control">
					<progress-circle :radius="radius" :percent="percent">
						<i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
					</progress-circle>
				</div>
				<div class="control" @click.stop="showPlaylist">
					<i class="icon-playlist"></i>
				</div>
			</div>
		</transition>
		<playlist ref="playlist"></playlist>
		<audio ref="audio" :src="currentUrl" @play="ready" @error="error" @timeupdate="updateTime"
			   @ended="end"></audio>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import animations from 'create-keyframe-animation'
	import { prefixStyle } from 'common/js/dom'
	import { ERR_OK } from 'api/config'
	import { getSongVkey } from 'api/song'
	import ProgressBar from 'base/progress-bar/progress-bar'
	import ProgressCircle from 'base/progress-circle/progress-circle'
	import { playMode } from 'common/js/config'
	import Lyric from 'lyric-parser'
	import Scroll from 'base/scroll/scroll'
	import Playlist from 'components/playlist/playlist'
	import { playerMixin } from 'common/js/mixin'

	const transform = prefixStyle('transform')
	const transitionDuration = prefixStyle('transitionDuration')

	export default {
		// 挂载mixin
		mixins: [playerMixin],
		// 计算属性
		data () {
			return {
				// 当前歌曲是否准备好，可以播放
				songReady: false,
				// 当前的播放时间
				currentTime: 0,
				// 圆形进度条半径
				radius: 32,
				// 当前歌曲歌词对象
				currentLyric: null,
				// 当前歌词所在的行
				currentLineNum: 0,
				// 默认显示的页面
				currentShow: 'cd',
				// 当前播放的歌词
				playingLyric: '',
				// 当前播放歌曲的链接
				currentUrl: ''
			}
		},
		// 计算属性
		computed: {
			// cd样式
			cdCls () {
				return this.playing ? 'play' : 'play pause'
			},
			// 播放按钮图标
			playIcon () {
				return this.playing ? 'icon-pause' : 'icon-play'
			},
			// mini播放器图标
			miniIcon () {
				return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
			},
			// 当音乐没有准备好的时候的状态
			disableCls () {
				return this.songReady ? '' : 'disable'
			},
			// 当前音乐的播放进度百分比
			percent () {
				return this.currentTime / this.currentSong.duration
			},
			// vuex语法糖
			...mapGetters([
				'fullScreen',
				'playing',
				'currentIndex'
			])
		},
		// 钩子hook
		created () {
			// 为什么在created中定义呢？因为touch不需要添加setter和getter
			// 也就是说在computed或data中定义均会添加setter和getter
			// 保存当前手指滑动的对象
			this.touch = {}
		},
		// 方法属性
		methods: {
			// 切换到迷你播放器
			back () {
				this.setFullScreen(false)
			},
			// 打开播放器全屏
			open () {
				this.setFullScreen(true)
			},

			// 钩子动画
			// 进入
			enter (el, done) {
				// 获取初始位置及比例
				const {x, y, scale} = this._getPosAndScale()

				let animation = {
					0: {
						transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
					},
					60: {
						transform: `translate3d(0, 0, 0) scale(1.1)`
					},
					100: {
						transform: `translate3d(0, 0, 0) scale(1)`
					}
				}

				// 注册动画
				animations.registerAnimation({
					name: 'move',
					animation,
					presets: {
						duration: 400,
						easing: 'linear'
					}
				})

				// 运行动画
				animations.runAnimation(this.$refs.cdWrapper, 'move', done)
			},
			// 进入后
			afterEnter () {
				animations.unregisterAnimation('move')
				this.$refs.cdWrapper.style.animation = ''
			},
			// 离开
			leave (el, done) {
				this.$refs.cdWrapper.style.transition = 'all 0.4s'
				const {x, y, scale} = this._getPosAndScale()
				this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
				// 监听cdWrapper元素的transitionend事件，完成后，执行done
				this.$refs.cdWrapper.addEventListener('transitionend', done)
			},
			// 离开后
			afterLeave () {
				// 清空属性设置
				this.$refs.cdWrapper.style.transition = ''
				this.$refs.cdWrapper.style[transform] = ''
			},

			// 切换播放/暂停
			togglePlaying () {
				if (!this.songReady) {
					return
				}
				this.setPlayingState(!this.playing)

				// 切换播放歌词
				if (this.currentLyric) {
					this.currentLyric.togglePlay()
				}
			},

			// 前进
			prev () {
				// 如果歌曲没有准备好，那么就不切换
				if (!this.songReady) {
					return
				}
				// 如果歌曲列表只有一个歌曲的时候，那么就循环播放即可
				if (this.playlist.length === 1) {
					this.loop()
					return
				} else {
					let index = this.currentIndex - 1
					if (index === -1) {
						index = this.playlist.length - 1
					}
					// 提交mutation修改
					this.setCurrentIndex(index)
					// 如果在暂停的状态下，切换到下一首歌，会自动播放音乐，但状态不调整，所以，需要设置
					if (!this.playing) {
						this.togglePlaying()
					}
				}
				// 点击后，将songReady设置为没有准备好的状态，为切换到下一首做准备
				this.songReady = false
			},
			// 后退
			next () {
				// 如果歌曲没有准备好，那么就不切换
				if (!this.songReady) {
					return
				}

				// 如果歌曲列表只有一个歌曲的时候，那么就循环播放即可
				if (this.playlist.length === 1) {
					this.loop()
					return
				} else {
					let index = this.currentIndex + 1
					// 当当前播放音乐索引等于播放队列的长度时，index索引置0
					if (index === this.playlist.length) {
						index = 0
					}
					// 提交mutation修改
					this.setCurrentIndex(index)
					// 如果在暂停的状态下，切换到下一首歌，会自动播放音乐，但状态不调整，所以，需要设置
					if (!this.playing) {
						this.togglePlaying()
					}
				}
				// 点击后，将songReady设置为没有准备好的状态，为切换到下一首做准备
				this.songReady = false
			},

			// audio 提供的事件

			// 音乐已准备好，可以播放
			ready () {
				this.songReady = true
				this.savePlayHistory(this.currentSong)
			},
			// 音乐调用错误，主要解决音乐加载失败，或者是没有网络，这里也设置为true，从而不影响正常使用
			error () {
				this.songReady = true
			},
			// 进度条变化的时候
			updateTime (e) {
				this.currentTime = e.target.currentTime
			},
			// 播放时间的格式化
			format (interval) {
				// 向下取整
				interval = interval | 0
				// 分,除于60，然后向下取整
				const minute = interval / 60 | 0
				// 秒，与60求余即可
				const second = this._pad(interval % 60)

				return `${minute}:${second}`
			},
			// 监听播放进度条百分比的改变 - 子组件派发的事件
			onProgressBarChange (percent) {
				const currentTime = this.currentSong.duration * percent
				// audio的currentTime属性是可读写的
				this.$refs.audio.currentTime = currentTime
				// 拖动过后，播放
				if (!this.playing) {
					this.togglePlaying()
				}
				// 设置歌词的进度
				if (this.currentLyric) {
					// 设置为当前时间进度的位置
					this.currentLyric.seek(currentTime * 1000)
				}
			},
			// 当前歌曲播放完毕
			end () {
				// 如果当前的播放模式是循环模式
				if (this.mode === playMode.loop) {
					this.loop()
				} else {
					this.next()
				}
			},
			// 循环播放
			loop () {
				// 将audio的currentTime设置为0即可
				this.$refs.audio.currentTime = 0
				if (this.currentUrl) {
					this.$refs.audio.play()
				}
				// 循环播放下，重置歌词为最开始的时间位置
				if (this.currentLyric) {
					this.currentLyric.seek(0)
				}
			},
			// 获取歌词
			getLyric () {
				this.currentSong.getLyric().then((lyric) => {
					if (this.currentSong.lyric !== lyric) {
						return
					}
					// 当前歌词对象
					this.currentLyric = new Lyric(lyric, this.handleLyric)
					if (this.playing) {
						this.currentLyric.play()
					}
				}).catch(() => {
					// 清空
					this.currentLyric = null
					this.playingLyric = ''
					this.currentLineNum = 0
				})
			},
			// 获取歌曲文件播放链接
			getUrl () {
				this.currentSong.getUrl().then((url) => {
					this.currentUrl = url
				}).catch(() => {
					this.currentUrl = ''
				})
			},
			// 歌词的回调函数 - 当前正在播放的歌词所在的信息
			handleLyric ({lineNum, txt}) {
				this.currentLineNum = lineNum
				if (lineNum > 5) {
					// 歌词滚动
					let lineEl = this.$refs.lyricLine[lineNum - 5]
					lineEl && this.$refs.lyricList.scrollToElement(lineEl, 1000)
				} else {
					// 直接滚动到顶部
					this.$refs.lyricList.scrollTo(0, 0, 1000)
				}
				// 设置当前的歌词
				this.playingLyric = txt
			},
			// 显示播放列表
			showPlaylist () {
				this.$refs.playlist.show()
			},
			// cd与歌词lyric左右滑动
			// 手指touch开始
			middleTouchStart (e) {
				this.touch.initialized = true
				const touch = e.touches[0]

				// 记录当前touch位置的x与y轴坐标
				this.touch.startX = touch.pageX
				this.touch.startY = touch.pageY
			},
			// 手指touch移动
			middleTouchMove (e) {
				if (!this.touch.initialized) {
					return
				}

				const touch = e.touches[0]
				// 计算偏移量
				const deltaX = touch.pageX - this.touch.startX
				const deltaY = touch.pageY - this.touch.startY

				// 如果纵坐标方向的偏移大于横坐标方向的偏移，就认为是纵向滚动，什么都不做
				if (Math.abs(deltaY) > Math.abs(deltaX)) {
					return
				}
				// 定义lyric的左侧的left位置
				const left = this.currentShow === 'cd' ? 0 : -window.innerWidth

				// ????
				const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))

				// 滑动的百分比
				this.touch.percent = Math.abs(offsetWidth / window.innerWidth)

				// this.$refs.lyricList.$el表示获取lyricList组件对应的DOM元素
				this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
				// 设置动画过度时间
				this.$refs.lyricList.$el.style[transitionDuration] = 0
				// 设置cd的透明度
				this.$refs.middleL.style.opacity = 1 - this.touch.percent
				this.$refs.middleL.style[transitionDuration] = 0
			},
			// 手指touch结束
			middleTouchEnd (e) {
				let offsetWidth
				let opacity
				// 左滑动
				if (this.currentShow === 'cd') {
					// 只要滑动百分比大于0.1，那么就设置左滑动，否则不滑动
					if (this.touch.percent > 0.1) {
						offsetWidth = -window.innerWidth
						this.currentShow = 'lyric'
						opacity = 0
					} else {
						offsetWidth = 0
						this.currentShow = 'cd'
						opacity = 1
					}
				} else {
					// 右滑动
					if (this.touch.percent < 0.9) {
						offsetWidth = 0
						this.currentShow = 'cd'
						opacity = 1
					} else {
						offsetWidth = -window.innerWidth
						this.currentShow = 'lyric'
						opacity = 0
					}
				}

				const time = 300

				// this.$refs.lyricList.$el表示获取lyricList组件对应的DOM元素
				this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
				// 设置动画过度时间
				this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
				// 设置cd的透明度
				this.$refs.middleL.style.opacity = opacity
				this.$refs.middleL.style[transitionDuration] = `${time}ms`
			},

			// 前置补0
			_pad (num, n = 2) {
				let len = num.toString().length
				while (len < n) {
					num = '0' + num
					len++
				}
				return num
			},
			// 获取初始的位置及缩放的比例
			_getPosAndScale () {
				// mini版的cd的宽度
				const targetWidth = 40

				const paddingLeft = 40
				const paddingBottom = 30
				const paddingTop = 80
				const width = window.innerWidth * 0.8
				// 初始的缩放比例
				const scale = targetWidth / width
				const x = -(window.innerWidth / 2 - paddingLeft)
				const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
				return {
					x,
					y,
					scale
				}
			},
			// vuex语法糖,可通过this.来调用方法
			...mapMutations({
				setFullScreen: 'SET_FULL_SCREEN'
			}),
			...mapActions([
				'savePlayHistory'
			])
		},
		// 观测属性变化
		watch: {
			// 观测当前音乐的变化即当前音乐变化的时候，播放音乐
			currentSong (newSong, oldSong) {
				// 如果播放列表不存在歌曲了
				if (!newSong.id) {
					return
				}
				// 当新的歌曲与当前歌曲是同一首歌的时候
				if (newSong.id === oldSong.id) {
					return
				}
				// 在切换音乐的时候，如果当前的歌词对象存在的话，那么要先停止当前歌词对象
				if (this.currentLyric) {
					this.currentLyric.stop()
				}
				clearTimeout(this.timer)
				// 这里待优化
				// ...
				this.getUrl()
				this.timer = setTimeout(() => {
					if (this.currentUrl) {
						this.$refs.audio.play()
						this.getLyric()
					}
				}, 500)
			},
			// 观测当前音乐的播放状态
			playing (newPlaying) {
				const audio = this.$refs.audio
				this.$nextTick(() => {
					newPlaying && this.currentUrl ? audio.play() : audio.pause()
				})
			}
		},
		// 注册组件
		components: {
			ProgressBar,
			ProgressCircle,
			Scroll,
			Playlist
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"

	.player
		.normal-player
			position: fixed
			left: 0
			right: 0
			top: 0
			bottom: 0
			z-index: 150
			background: $color-background
			.background
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				z-index: -1
				opacity: 0.6
				filter: blur(20px)
			.top
				position: relative
				margin-bottom: 25px
				.back
					position absolute
					top: 0
					left: 6px
					z-index: 50
					.icon-back
						display: block
						padding: 9px
						font-size: $font-size-large-x
						color: $color-theme
						transform: rotate(-90deg)
				.title
					width: 70%
					margin: 0 auto
					line-height: 40px
					text-align: center
					no-wrap()
					font-size: $font-size-large
					color: $color-text
				.subtitle
					line-height: 20px
					text-align: center
					font-size: $font-size-medium
					color: $color-text
			.middle
				position: fixed
				width: 100%
				top: 80px
				bottom: 170px
				white-space: nowrap
				font-size: 0
				.middle-l
					display: inline-block
					vertical-align: top
					position: relative
					width: 100%
					height: 0
					padding-top: 80%
					.cd-wrapper
						position: absolute
						left: 10%
						top: 0
						width: 80%
						height: 100%
						.cd
							width: 100%
							height: 100%
							box-sizing: border-box
							border: 10px solid rgba(255, 255, 255, 0.1)
							border-radius: 50%
							&.play
								animation: rotate 20s linear infinite
							&.pause
								animation-play-state: paused
							.image
								position: absolute
								left: 0
								top: 0
								width: 100%
								height: 100%
								border-radius: 50%

					.playing-lyric-wrapper
						width: 80%
						margin: 30px auto 0 auto
						overflow: hidden
						text-align: center
						.playing-lyric
							height: 20px
							line-height: 20px
							font-size: $font-size-medium
							color: $color-text-l
				.middle-r
					display: inline-block
					vertical-align: top
					width: 100%
					height: 100%
					overflow: hidden
					.lyric-wrapper
						width: 80%
						margin: 0 auto
						overflow: hidden
						text-align: center
						.text
							line-height: 32px
							color: $color-text-l
							font-size: $font-size-medium
							&.current
								color: $color-text
			.bottom
				position: absolute
				bottom: 50px
				width: 100%
				.dot-wrapper
					text-align: center
					font-size: 0
					.dot
						display: inline-block
						vertical-align: middle
						margin: 0 4px
						width: 8px
						height: 8px
						border-radius: 50%
						background: $color-text-l
						&.active
							width: 20px
							border-radius: 5px
							background: $color-text-ll
				.progress-wrapper
					display: flex
					align-items: center
					width: 80%
					margin: 0 auto
					padding: 10px 0
					.time
						color: $color-text
						font-size: $font-size-small
						flex: 0 0 30px
						line-height: 30px
						width: 30px
						&.time-l
							text-align: left
						&.time-r
							text-align: right
					.progress-bar-wrapper
						flex: 1
				.operators
					display: flex
					align-items: center
					.icon
						flex: 1
						color: $color-theme
						&.disable
							color: $color-theme-d
						i
							font-size: 30px
					.i-left
						text-align: right
					.i-center
						padding: 0 20px
						text-align: center
						i
							font-size: 40px
					.i-right
						text-align: left
					.icon-favorite
						color: $color-sub-theme
			&.normal-enter-active, &.normal-leave-active
				transition: all 0.4s
				.top, .bottom
					transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
			&.normal-enter, &.normal-leave-to
				opacity: 0
				.top
					transform: translate3d(0, -100px, 0)
				.bottom
					transform: translate3d(0, 100px, 0)
		.mini-player
			display: flex
			align-items: center
			position: fixed
			left: 0
			bottom: 0
			z-index: 180
			width: 100%
			height: 60px
			background: $color-highlight-background
			&.mini-enter-active, &.mini-leave-active
				transition: all 0.4s
			&.mini-enter, &.mini-leave-to
				opacity: 0
			.icon
				flex: 0 0 40px
				width: 40px
				padding: 0 10px 0 20px
				img
					border-radius: 50%
					&.play
						animation: rotate 10s linear infinite
					&.pause
						animation-play-state: paused
			.text
				display: flex
				flex-direction: column
				justify-content: center
				flex: 1
				line-height: 20px
				overflow: hidden
				.name
					margin-bottom: 2px
					no-wrap()
					font-size: $font-size-medium
					color: $color-text
				.desc
					no-wrap()
					font-size: $font-size-small
					color: $color-text-d
			.control
				flex: 0 0 30px
				width: 30px
				padding: 0 10px
				.icon-play-mini, .icon-pause-mini, .icon-playlist
					font-size: 30px
					color: $color-theme-d
				.icon-mini
					font-size: 32px
					position: absolute
					left: 0
					top: 0

	@keyframes rotate
		0%
			transform: rotate(0)
		100%
			transform: rotate(360deg)
</style>