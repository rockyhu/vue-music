<template>
	<transition name="slide">
		<music-list :title="title" :songs="songs" :bg-image="bgImage"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import { mapGetters } from 'vuex'
	import { getSongList } from 'api/recommend'
	import { ERR_OK } from 'api/config'
	import { createSong } from 'common/js/song'

	export default {
		// 变量属性
		data () {
			return {
				songs: []
			}
		},
		// 计算属性
		computed: {
			// 歌单标题
			title () {
				return this.disc.dissname
			},
			bgImage () {
				return this.disc.imgurl
			},
			...mapGetters([
				'disc'
			])
		},
		// 钩子函数
		created () {
			this._getSongList()
		},
		methods: {
			// 获取歌单下歌曲列表数据
			_getSongList () {
				if (!this.disc.dissid) {
					this.$router.push('/recommend')
					return
				}
				getSongList(this.disc.dissid).then((res) => {
					if (res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.cdlist[0].songlist)
					}
				})
			},
			// 歌曲列表处理
			_normalizeSongs (list) {
				let ret = []
				list.forEach((musicData) => {
					if (musicData.songid && musicData.albumid) {
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