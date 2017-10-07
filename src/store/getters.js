/**
 * Created by rockyhu on 2017/9/20.
 */
// 对state状态做映射
export const singer = state => state.singer

// 对歌单列表状态做映射
export const disc = state => state.disc

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