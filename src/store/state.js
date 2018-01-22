import { playMode } from 'common/js/config'
import { loadSearch, loadPlay } from 'common/js/cache'

// 状态的管理
const state = {
	// 歌手数据
	singer: {},
	
	// 歌单数据
	disc: {},
	
	// 播放器数据状态管理
	
	// 是否播放
	playing: false,
	// 是否全屏
	fullScreen: false,
	// 播放列表
	playlist: [],
	// 顺序列表
	sequenceList: [],
	// 播放模式 - 顺序播放
	mode: playMode.sequence,
	// 当前播放的索引
	currentIndex: -1,
	// 搜索历史
	searchHistory: loadSearch(),
	// 播放历史
	playHistory: loadPlay()
}

export default state