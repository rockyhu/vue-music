import { getLyric, getSongVkey } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

// 构造一个Song类
export default class Song {
	constructor ({id, mid, singer, name, album, duration, image}) {
		this.id = id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
	}
	
	// 为Song类添加获取歌词的方法
	getLyric () {
		// 如果歌词已经存在那么直接返回即可
		if (this.lyric) {
			return Promise.resolve(this.lyric)
		}
		
		return new Promise((resolve, reject) => {
			getLyric(this.mid).then((res) => {
				if (res.retcode === ERR_OK) {
					this.lyric = Base64.decode(res.lyric)
					resolve(this.lyric)
				} else {
					reject('no lyric')
				}
			})
		})
	}
	
	// 为Song类添加获取歌曲文件的方法
	getUrl () {
		// 如果歌曲文件已经存在那么直接返回即可
		if (this.url) {
			return Promise.resolve(this.url)
		}
		
		return new Promise((resolve, reject) => {
			getSongVkey(this.mid).then((res) => {
				if (res.code === ERR_OK && res.data.items.length) {
					let vkeyItem = res.data.items[0]
					this.url = `http://dl.stream.qqmusic.qq.com/${vkeyItem['filename']}?vkey=${vkeyItem['vkey']}&guid=3655047200&fromtag=66`
					resolve(this.url)
				}
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

// 定义一个Song的工厂方法
export function createSong (musicData) {
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: filterSinger(musicData.singer),
		name: musicData.songname,
		album: musicData.albumname,
		duration: musicData.interval,
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
		// url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
	})
}

// 定义一个方法将歌手列表转换成字符串
/**
 singer: [
 {
	 id: 5062,
	 mid: "002J4UUk29y8BY",
	 name: "薛之谦"
 }
 ],
 * @param singer
 * @returns {*}
 */
export function filterSinger (singer) {
	let ret = []
	// 边界处理
	if (!singer) {
		return ''
	}
	singer.forEach((s) => {
		ret.push(s.name)
	})
	return ret.join('/')
}