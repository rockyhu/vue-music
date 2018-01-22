import storage from 'good-storage'

// 定义搜索缓存的key，避免缓存冲突
const SEARCH_KEY = '__search__'
// 定义最大缓存的数据空间,多余的数据会被踢出，每次插入的数据都会在第一个
const SEARCH_MAX_LENGTH = 15

// 定义播放缓存的key，避免缓存冲突
const PLAY_KEY = '__play__'
// 定义最大缓存的数据空间，多余的数据会被踢出
const PLAY_MAX_LENGTH = 200

// 缓存当前的搜索历史
export function saveSearch (query) {
	// 获取当前search存储空间的列表，如果没有存储过，那就是空数组
	let searches = storage.get(SEARCH_KEY, [])
	
	// 插入query
	insertArray(searches, query, (item) => {
		return item === query
	}, SEARCH_MAX_LENGTH)
	
	// 存储search
	storage.set(SEARCH_KEY, searches)
	
	// 返回
	return searches
}

// 读取搜索历史
export function loadSearch () {
	return storage.get(SEARCH_KEY, [])
}

// 删除搜索历史
export function deleteSearch (query) {
	// 获取当前search存储空间的列表，如果没有存储过，那就是空数组
	let searches = storage.get(SEARCH_KEY, [])
	
	// 删除query
	deleteFromArray(searches, (item) => {
		return item === query
	})
	
	// 存储search
	storage.set(SEARCH_KEY, searches)
	
	// 返回
	return searches
}

// 清空搜索历史
export function clearSearch () {
	storage.remove(SEARCH_KEY)
	return []
}

// 缓存当前播放的歌曲
export function savePlay (song) {
	// 获取当前play存储空间的列表，如果没有存储过，那就是空数组
	let songs = storage.get(PLAY_KEY, [])
	
	// 插入当前播放歌曲
	insertArray(songs, song, (item) => {
		return item.id === song.id
	}, PLAY_MAX_LENGTH)
	
	// 存储play
	storage.set(PLAY_KEY, songs)
	
	// 返回
	return songs
}

// 读取播放历史
export function loadPlay () {
	return storage.get(PLAY_KEY, [])
}

/**
 * 插入数据的规则：
 * 数组最大存储15条数据， 每次插入的数据会放在数组的前面
 * 如果数组中有重复的数据，那么需要把重复的数据给删掉，然后把新的数据插入到前面
 * @param arr 数组
 * @param val 要插入数组的元素
 * @param compare 比较函数
 * @param maxLen 当前数组的长度限制，最大空间
 */
function insertArray (arr, val, compare, maxLen) {
	// findIndex是ES6对数组扩展的一个新函数，可以传入一个function
	// 查找数组arr中是否存在val
	const index = arr.findIndex(compare)
	
	// 如果要插入的数据与数组中的第一条数据相同，即是第一条数据,什么都不需要做
	if (index === 0) {
		return
	}
	// 数组中存在这条数据，并且这条数据不是第一个位置
	if (index > 0) {
		// 删除当前查找到的数据
		arr.splice(index, 1)
	}
	// 插入新的数据,插入到数组的第一个
	arr.unshift(val)
	// 判断数组的长度是否有限制，并且是否大于当前数组的长度限制
	if (maxLen && arr.length > maxLen) {
		// 将数组的最后一个元素给删掉
		arr.pop()
	}
}

/**
 * 删除数组中的元素
 * @param arr 数组
 * @param compare 比较函数
 */
function deleteFromArray (arr, compare) {
	// 查找要删除的元素索引
	const index = arr.findIndex(compare)
	
	if (index > -1) {
		arr.splice(index, 1)
	}
}