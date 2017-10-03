import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

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
	const url = '/api/getDiscList'
	
	const data = Object.assign({}, commonParams, {
		platform: 'yqq',
		hostUin: 0,
		uin: 0,
		sin: 0,
		ein: 29,
		sortId: 5,
		categoryId: 10000000,
		rnd: Math.random(),
		needNewCode: 0,
		format: 'json'
	})
	
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}