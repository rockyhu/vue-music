<template>
	<div class="song-list">
		<ul>
			<li @click.stop="selectItem(song, index)" v-for="(song, index) in songs" class="item">
				<div class="rankicon" v-show="rank">
					<span :class="getRankCls(index)">{{getRankText(index)}}</span>
				</div>
				<div class="content">
					<h2 class="name">{{song.name}}</h2>
					<p class="desc">{{getDesc(song)}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		// 接收父组件的参数
		props: {
			// 歌曲列表
			songs: {
				type: Array,
				default: []
			},
			// 是否存在排行样式，默认不存在排行样式
			rank: {
				type: Boolean,
				default: false
			}
		},
		// 方法属性
		methods: {
			// 描述处理
			getDesc (song) {
				return `${song.singer} 。${song.album}`
			},
			// 派发点击事件给父元素
			selectItem (item, index) {
				this.$emit('select', item, index)
			},
			// 排行榜样式
			getRankCls (index) {
				if (index <= 2) {
					return `icon icon${index}`
				} else {
					return 'text'
				}
			},
			// 排行榜文案
			getRankText (index) {
				if (index > 2) {
					return index + 1
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import "~common/stylus/mixin"

	.song-list
		.item
			display: flex
			align-items: center
			box-sizing: border-box
			height: 64px
			font-size: $font-size-medium
			.rankicon
				flex: 0 0 25px
				width: 25px
				margin-right: 30px
				text-align: center
				.icon
					display: inline-block
					width: 25px
					height: 24px
					background-size: 25px 24px
					&.icon0
						bg-image('first')
					&.icon1
						bg-image('second')
					&.icon2
						bg-image('third')
				.text
					color: $color-theme
					font-size: $font-size-large
			.content
				flex: 1
				line-height: 20px
				overflow: hidden
				.name
					no-wrap()
					color: $color-text
				.desc
					no-wrap()
					margin-top: 4px
					color: $color-text-d
</style>