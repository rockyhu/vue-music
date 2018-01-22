import { mapGetters, mapMutations, mapActions } from 'vuex'
import { shuffle } from 'common/js/util'
import { playMode } from 'common/js/config'

export const playlistMixin = {
	computed: {
		...mapGetters([
			'playlist'
		])
	},
	mounted () {
		this.handlePlaylist(this.playlist)
	},
	activated () {
		this.handlePlaylist(this.playlist)
	},
	watch: {
		playlist (newVal) {
			this.handlePlaylist(newVal)
		}
	},
	methods: {
		handlePlaylist () {
			throw new Error('component must implement handlePlaylist method')
		}
	}
}

// player组件与playlist组件之间的js功能逻辑代码共享
export const playerMixin = {
	computed: {
		// 当前音乐的播放模式
		iconMode () {
			return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
		},
		...mapGetters([
			'sequenceList',
			'currentSong',
			'playlist',
			'mode'
		])
	},
	methods: {
		// 改变播放模式
		changeMode () {
			const mode = (this.mode + 1) % 3
			this.setPlayMode(mode)
			
			let list = null
			// 如果是随机播放，那么随机打乱播放次序
			if (mode === playMode.random) {
				list = shuffle(this.sequenceList)
			} else {
				// 否则，播放次序不变
				list = this.sequenceList
			}
			this.resetCurrentIndex(list)
			this.setPlaylist(list)
		},
		// 重置currentIndex，当前播放的音乐索引
		resetCurrentIndex (list) {
			// 找到当前播放音乐的索引
			let index = list.findIndex((item) => {
				return item.id === this.currentSong.id
			})
			this.setCurrentIndex(index)
		},
		...mapMutations({
			setPlayingState: 'SET_PLAYING_STATE',
			setCurrentIndex: 'SET_CURRENT_INDEX',
			setPlayMode: 'SET_PLAY_MODE',
			setPlaylist: 'SET_PLAYLIST'
		})
	}
}

// add-song组件与search组件之间的js功能逻辑代码共享
export const searchMixin = {
	data () {
		return {
			query: '',
			refreshDelay: 100
		}
	},
	computed: {
		...mapGetters([
			'searchHistory'
		])
	},
	methods: {
		onQueryChange (query) {
			this.query = query
		},
		blurInput () {
			// 父组件可以调用子组件的方法
			// 调用search-box子组件的blur方法
			this.$refs.searchBox.blur()
		},
		addQuery (query) {
			this.$refs.searchBox.setQuery(query)
		},
		// 保存搜索历史
		saveSearch () {
			this.saveSearchHistory(this.query)
		},
		...mapActions([
			'saveSearchHistory',
			'deleteSearchHistory'
		])
	}
}