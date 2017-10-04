// 为dom添加样式
export function addClass (el, className) {
	if (hasClass(el, className)) {
		return
	}
	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

// 判断DOM是否存在指定的class演示
export function hasClass (el, className) {
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
	return reg.test(el.className)
}

// 获取或设置元素上的data属性
export function getData (el, name, val) {
	const prefix = 'data-'
	name = prefix + name
	if (val) {
		return el.setAttribute(name, val)
	} else {
		return el.getAttribute(name)
	}
}

// 浏览器的能力检测特性，CSSStyleDeclaration
let elementStyle = document.createElement('div').style

let vendor = (() => {
	// 目前存在的浏览器前缀产商
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	}
	
	// 判断当前浏览器支持哪一种前缀
	for (let key in transformNames) {
		if (elementStyle[transformNames[key]] !== undefined) {
			return key
		}
	}
})()

// JS设置CSS属性时，根据不同浏览器设置兼容前缀
export function prefixStyle (style) {
	if (vendor === false) {
		return false
	}
	
	if (vendor === 'standard') {
		return style
	}
	
	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}