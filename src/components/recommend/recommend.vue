<template>
	<div class="recommend">
		<scroll ref="scroll" class="recommend-content" :data="discList">
			<div>
				<div v-if="recommends.length" class="slider-wrapper">
					<slider>
						<div v-for="item in recommends">
							<a :href="item.linkUrl">
								<!-- fastclick监听到img的点击事件的时候，如果标签有needsclick样式,则不会阻止 -->
								<img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li v-for="item in discList" class="item">
							<div class="icon">
								<!-- 采用vue-lazyload懒加载图片 -->
								<img width="60" height="60" v-lazy="item.imgurl" alt="">
							</div>
							<div class="text">
								<!-- v-html标签对字段做转义 -->
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!discList.length">
				<!-- 正在载入... -->
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import Loading from 'base/loading/loading'
	import Scroll from 'base/scroll/scroll'
	import Slider from 'base/slider/slider'
	import { getRecommend, getDiscList } from 'api/recommend'
	import { ERR_OK } from 'api/config'

	export default {
		data() {
			return {
				recommends: [],
				discList: []
			}
		},
		// 钩子函数
		created() {
			this._getRecommend()
			this._getDiscList()
		},
		// 方法对象
		methods: {
			// 获取推荐页面轮播图数据
			_getRecommend() {
				// getRecommend返回Promise对象
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
						this.recommends = res.data.slider
					}
				})
			},
			// 获取歌单数据
			_getDiscList() {
				getDiscList().then((res) => {
					if (res.code === ERR_OK) {
						this.discList = res.data.list
					}
				})
			},
			// 一旦有图片加载完成的时候，就重新刷新scroll插件
			loadImage() {
				// 避免多张图片加载完时，都触发refresh事件
				if (!this.checkLoaded) {
					this.$refs.scroll.refresh()
					this.checkLoaded = true
				}
			}
		},
		// 注册组件
		components: {
			Slider,
			Scroll,
			Loading
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.recommend
		position: fixed
		width: 100%
		top: 88px
		bottom: 0
		.recommend-content
			height: 100%
			overflow: hidden
			.slider-wrapper
				position: relative
				width: 100%
				overflow: hidden
			.recommend-list
				.list-title
					height: 65px
					line-height: 65px
					text-align: center
					font-size: $font-size-medium
					color: $color-theme
				.item
					display: flex
					box-sizing: border-box
					align-items: center
					padding: 0 20px 20px 20px
					.icon
						flex: 0 0 60px
						width: 60px
						padding-right: 20px
					.text
						display: flex
						flex-direction: column
						justify-content: center
						flex: 1
						line-height: 20px
						overflow: hidden
						font-size: $font-size-medium
						.name
							margin-bottom:10px
							color: $color-text
						.desc
							color: $color-text-d
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
</style>