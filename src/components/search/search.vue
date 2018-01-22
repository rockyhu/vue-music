<template>
	<div class="search">
		<div class="search-box-wrapper">
			<search-box ref="searchBox" @query="onQueryChange"></search-box>
		</div>
		<div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
			<scroll class="shortcut" ref="shortcut" :refreshDelay="refreshDelay" :data="shortcut">
				<div>
					<div class="hot-key">
						<h1 class="title">热门搜索</h1>
						<ul>
							<li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
								<span>{{item.k}}</span>
							</li>
						</ul>
					</div>
					<div class="search-history" v-show="searchHistory.length">
						<h1 class="title">
							<span class="text">搜索历史</span>
							<span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
						</h1>
						<search-list @select="addQuery" @delete="deleteSearchHistory"
									 :searches="searchHistory"></search-list>
					</div>
				</div>
			</scroll>
		</div>
		<div ref="searchResult" class="search-result" v-show="query">
			<suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
		</div>
		<confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史？" confirmBtnText="清空"></confirm>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import SearchBox from 'base/search-box/search-box'
	import { getHotKey } from 'api/search'
	import { ERR_OK } from 'api/config'
	import Suggest from 'components/suggest/suggest'
	import SearchList from 'base/search-list/search-list'
	import Confirm from 'base/confirm/confirm'
	import Scroll from 'base/scroll/scroll'
	import { mapActions } from 'vuex'
	import { playlistMixin, searchMixin } from 'common/js/mixin'

	export default {
		mixins: [playlistMixin, searchMixin],
		// 钩子函数
		created () {
			this._getHotKey()
		},
		// 定义属性
		data () {
			return {
				hotKey: []
			}
		},
		// 计算属性
		computed: {
			// 将hotKey和searchHistory合并为一个数组，当其中的一个发生改变时，shortcut都将发生改变
			shortcut () {
				return this.hotKey.concat(this.searchHistory)
			}
		},
		// 定义方法
		methods: {
			// 实现mixin中的方法,用来设置shortcutWrapper和searchResult的bottom
			handlePlaylist (playlist) {
				const bottom = playlist.length > 0 ? '60px' : ''

				// 分别设置shortcutWrapper和searchResult的bottom
				this.$refs.shortcutWrapper.style.bottom = bottom
				// 重新刷新scroll的高度
				this.$refs.shortcut.refresh()

				this.$refs.searchResult.style.bottom = bottom
				// 运行suggest组件代理的refresh方法，用于重新计算suggest组件下的scroll组件的高度
				this.$refs.suggest.refresh()
			},
			showConfirm () {
				this.$refs.confirm.show()
			},
			_getHotKey () {
				getHotKey().then((res) => {
					if (res.code === ERR_OK) {
						// 截取hotkey数组的前10个
						this.hotKey = res.data.hotkey.slice(0, 11)
					}
				})
			},
			...mapActions([
				'clearSearchHistory'
			])
		},
		// 观测属性改变
		watch: {
			// 观测query的变化
			query (newQuery) {
				// 从搜索列表切换到搜索首页的时候，query是从有到无的变化
				if (!newQuery) {
					// 重新刷新一个scroll组件，重新计算高度
					setTimeout(() => {
						this.$refs.shortcut.refresh()
					}, 20)
				}
			}
		},
		// 注册组件
		components: {
			SearchBox,
			Suggest,
			SearchList,
			Confirm,
			Scroll
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"

	.search
		.search-box-wrapper
			margin: 20px
		.shortcut-wrapper
			position: fixed
			top: 178px
			bottom: 0
			width: 100%
			.shortcut
				height: 100%
				overflow: hidden
				.hot-key
					margin: 0 20px 20px 20px
					.title
						margin-bottom: 20px
						font-size: $font-size-medium
						color: $color-text-l
					.item
						display: inline-block
						padding: 5px 10px
						margin: 0 20px 10px 0
						border-radius: 6px
						background: $color-highlight-background
						font-size: $font-size-medium
						color: $color-text-d
				.search-history
					position: relative
					margin: 0 20px
					.title
						display: flex
						align-items: center
						height: 40px
						font-size: $font-size-medium
						color: $color-text-l
						.text
							flex: 1
						.clear
							extend-click()
							.icon-clear
								font-size: $font-size-medium
								color: $color-text-d
		.search-result
			position: fixed
			width: 100%
			top: 178px
			bottom: 0
</style>