import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

// 获取推荐页面轮播图数据
export function getRecommend () {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	
	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})
	
	return jsonp(url, data, options)
}

// 获取歌单数据
export function getDiscList() {
	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
	
	const data = Object.assign({}, commonParams, {
		platform: 'yqq',
		hostUin: 0,
		uin: 0,
		sin: 0,
		ein: 29,
		sortId: 5,
		categoryId: 10000000,
		rnd: Math.random(),
		needNewCode: 1
	})
	
	return jsonp(url, data, options)
}