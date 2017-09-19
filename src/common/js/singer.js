/**
 * Created by rockyhu on 2017/9/17.
 */
// 构造一个Singer类
export default class Singer {
	constructor ({id, name}) {
		this.id = id
		this.name = name
		this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
	}
}