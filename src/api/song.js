import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp'
import axios from 'axios'

// 获取歌曲的歌词
export function getLyric (mid) {
	const url = '/api/lyric'
	
	const data = Object.assign({}, commonParams, {
		songmid: mid,
		pcachetime: +new Date(),
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0,
		g_tk: 1685268878,
		format: 'json'
	})
	
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}

// 获取歌曲vkey
export function getSongVkey (mid) {
	const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
	
	const data = Object.assign({}, commonParams, {
		songmid: mid,
		filename: `C400${mid}.m4a`,
		guid: 3655047200,
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		callback: '__songvkey',
		cid: 205361747
	})
	
	return jsonp(url, data, {
		param: 'jsonpCallback',
		name: '__songvkey'
	})
}