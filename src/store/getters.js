/**
 * Created by rockyhu on 2017/9/20.
 */
// 对state状态做映射
export const singer = state => state.singer

// 对歌单列表状态做映射
export const disc = state => state.disc

// 对排行榜歌单列表状态做映射
export const topList = state => state.topList

// 对播放器state状态做映射
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
// getter中支持计算属性
export const currentSong = (state) => {
	return state.playlist[state.currentIndex] || {}
}

// 搜索历史
export const searchHistory = state => state.searchHistory
// 播放历史
export const playHistory = state => state.playHistory

// 我喜欢的歌曲
export const favoriteList = state => state.favoriteList