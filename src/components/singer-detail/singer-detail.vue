<template>
	<transition name="slide">
		<music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import { mapGetters } from 'vuex'
	import { getSingerDetail } from 'api/singer'
	import { ERR_OK } from 'api/config'
	import { createSong } from 'common/js/song'
	import MusicList from 'components/music-list/music-list'

	export default {
		// 数据属性
		data () {
			return {
				songs: []
			}
		},
		// 计算属性
		computed: {
			// 标题
			title() {
				return this.singer.name
			},
			// 背景图
			bgImage() {
				return this.singer.avatar
			},
			// vuex提供的获取数据语法糖
			...mapGetters([
				'singer'
			])
		},
		// 钩子
		created () {
			this._getDetail()
		},
		// 方法属性
		methods: {
			// 获取歌手详情
			_getDetail () {
				// 没有this.singer.id不存在的时候，获取不到数据，那么直接返回到歌手列表即可
				if (!this.singer.id) {
					this.$router.push('/singer')
					return
				}
				getSingerDetail(this.singer.id).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.data.list)
						console.log(this.songs)
					}
				})
			},
			// 规范化song数据
			_normalizeSongs (list) {
				let ret = []
				list.forEach((item) => {
					// es6对象的解构赋值
					let {musicData} = item
					if (musicData.songid && musicData.albummid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		// 注册组件
		components: {
			MusicList
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">

	.slide-enter-active, .slide-leave-active
		transition: all 0.3s

	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
</style>