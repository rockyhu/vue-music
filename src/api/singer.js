/**
 * Created by rockyhu on 2017/9/17.
 */
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

// 获取歌手数据
export function getSingerList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
	
	const data = Object.assign({}, commonParams, {
		channel: 'singer',
		page: 'list',
		key: 'all_all_all',
		pagesize: 100,
		pagenum: 1,
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		g_tk: 1685268878
	})
	
	return jsonp(url, data, options)
}