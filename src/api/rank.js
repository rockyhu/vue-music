import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

// 获取排行榜数据
export function getTopList () {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
	
	const data = Object.assign({}, commonParams, {
		needNewCode: 1,
		platform: 'h5'
	})
	
	return jsonp(url, data, options)
}

// 获取排行榜歌单列表
export function getMusicList (topid) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
	
	const data = Object.assign({}, commonParams, {
		page: 'detail',
		type: 'top',
		tpl: 3,
		needNewCode: 1,
		platform: 'h5',
		topid
	})
	
	return jsonp(url, data, options)
}