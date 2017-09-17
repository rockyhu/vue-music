<template>
	<div class="recommend">
		<div class="recommend-content">
			<div v-if="recommends.length" class="slider-wrapper">
				<slider>
					<div v-for="item in recommends">
						<a :href="item.linkUrl">
							<img :src="item.picUrl" alt="">
						</a>
					</div>
				</slider>
			</div>
			<div class="recommend-list">
				<h1 class="list-title">热门歌单推荐</h1>
				<ul>

				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
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
						this.discList = res.data.categories
					}
				})
			}
		},
		// 注册组件
		components: {
			Slider
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
			.loading-container
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
</style>