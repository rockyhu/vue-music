<template>
	<scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest">
		<ul class="suggest-list">
			<li @click="selectItem(item)" class="suggest-item" v-for="item in result">
				<div class="icon">
					<i :class="getIconCls(item)"></i>
				</div>
				<div class="name">
					<p class="text" v-html="getDisplayName(item)"></p>
				</div>
			</li>
			<loading v-show="hasMore" title=""></loading>
		</ul>
	</scroll>
</template>

<script type="text/ecmascript-6">
	import { search } from 'api/search'
	import { ERR_OK } from 'api/config'
	import { createSong } from 'common/js/song'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import Singer from 'common/js/singer'
	import { mapMutations } from 'vuex'

	const TYPE_SINGER = 'singer'
	const perpage = 20

	export default {
		props: {
			query: {
				type: String,
				default: ''
			},
			// 是否显示歌手
			showSinger: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				// 当前请求页
				page: 1,
				// 搜索结果数组
				result: [],
				// 上拉是否刷新
				pullup: true,
				// 是否加载完
				hasMore: true
			}
		},
		methods: {
			search () {
				this.page = 1
				this.hasMore = true
				this.$refs.suggest.scrollTo(0, 0)
				search(this.query, this.page, this.showSinger, perpage).then((res) => {
					if (res.code === ERR_OK) {
						this.result = this._genResult(res.data)
						this._checkMore(res.data)
					}
				})
			},
			searchMore () {
				if (!this.hasMore) {
					return
				}
				this.page++
				search(this.query, this.page, this.showSinger, perpage).then((res) => {
					if (res.code === ERR_OK) {
						this.result = this.result.concat(this._genResult(res.data))
						this._checkMore(res.data)
					}
				})
			},
			getDisplayName (item) {
				if (item.type === TYPE_SINGER) {
					return item.singername
				} else {
					return `${item.name}-${item.singer}`
				}
			},
			getIconCls (item) {
				if (item.type === TYPE_SINGER) {
					return 'icon-mine'
				} else {
					return 'icon-music'
				}
			},
			selectItem (item) {
				if (item.type === TYPE_SINGER) {
					const singer = new Singer({
						id: item.singermid,
						name: item.singername
					})
					this.$router.push({
						path: `/search/${singer.id}`
					})
					this.setSinger(singer)
				}
			},
			_checkMore (data) {
				const song = data.song
				if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
					this.hasMore = false
				}
			},
			// 处理搜索的结果数据
			_genResult (data) {
				let ret = []
				if (this.page === 1 && data.zhida && data.zhida.singerid) {
					ret.push({...data.zhida, ...{type: TYPE_SINGER}})
				}
				if (data.song) {
					ret = ret.concat(this._normalizeSongs(data.song.list))
				}
				return ret
			},
			_normalizeSongs (list) {
				let ret = []
				list.forEach((musicData) => {
					if (musicData.songid && musicData.albumid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			},
			// ES6扩展运算符,vuex提供的设置数据的语法糖mapMutations
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
		},
		watch: {
			// watch query的变化，即当query发生变化的时候，去执行search方法
			query () {
				this.search()
			}
		},
		// 注册组件
		components: {
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"

	.suggest
		height: 100%
		overflow: hidden
		.suggest-list
			padding: 0 30px
			.suggest-item
				display: flex
				align-items: center
				padding-bottom: 20px
			.icon
				flex: 0 0 30px
				width: 30px
				[class^="icon-"]
					font-size: 14px
					color: $color-text-d
			.name
				flex: 1
				font-size: $font-size-medium
				color: $color-text-d
				overflow: hidden
				.text
					no-wrap()
		.no-result-wrapper
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)
</style>