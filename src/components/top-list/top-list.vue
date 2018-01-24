<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import MusicList from 'components/music-list/music-list'
	import { mapGetters } from 'vuex'
	import { getMusicList } from 'api/rank'
	import { ERR_OK } from 'api/config'
	import { createSong } from 'common/js/song'

	export default {
		data () {
			return {
				songs: [],
				// 显示排行
				rank: true
			}
		},
		computed: {
			title () {
				return this.topList.topTitle
			},
			bgImage () {
				// 因为默认的this.topList.picUrl图片太丑，所以采用第一首歌的图片
				if (this.songs.length) {
					return this.songs[0].image
				}
				return ''
			},
			...mapGetters([
				'topList'
			])
		},
		created () {
			this._getMusicList()
		},
		methods: {
			_getMusicList () {
				// 如果topListid不存在的话，那么直接返回
				if (!this.topList.id) {
					this.$router.push('/rank')
					return
				}
				getMusicList(this.topList.id).then((res) => {
					if (ERR_OK === res.code) {
						this.songs = this._normalizeSongs(res.songlist)
					}
				})
			},
			_normalizeSongs (list) {
				let ret = []
				list.forEach((item) => {
					const musicData = item.data
					if (musicData.songid && musicData.albumid) {
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		components: {
			MusicList
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.slide-enter-active, .slide-leave-active
		transition: all 0.3s ease

	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
</style>