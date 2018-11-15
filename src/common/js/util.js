// 获取(min,max)直接的一个随机数，包括min,max边界
function getRandomInt (min, max) {
	// 向下取整
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// 洗牌函数 - 将数组的元素打乱
export function shuffle (arr) {
	// 拷贝副本 - 目的是不改变目前的数组
	let _arr = arr.slice()
	for (let i = 0; i < _arr.length; i++) {
		// 随机一个0~i之间的随机数
		let j = getRandomInt(0, i)
		// _arr[i]_arr[j]进行交换
		let t = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = t
	}
	return _arr
}

// 节流函数 - 延迟delay秒执行func函数,func函数只会执行一次
export function debounce (func, delay) {
	let timer
	
	// 获取函数的参数
	return function (...args) {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}