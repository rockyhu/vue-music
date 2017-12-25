<template>
	<div class="search-box">
		<i class="icon-search"></i>
		<!-- 采用v-model指令实现数据双向绑定，即改变输入框的值会反应到query变量中，改变query变量的值也会反应到输入框中 -->
		<input type="text" v-model="query" :placeholder="placeholder" class="box">
		<i @click="clear" v-show="query" class="icon-dismiss"></i>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		// 接收父组件传送的参数
		props: {
			placeholder: {
				type: String,
				default: '搜索歌曲、歌手'
			}
		},
		data () {
			return {
				query: ''
			}
		},
		// 定义属性
		methods: {
			clear () {
				this.query = ''
			},
			// 定义setQuery接口，用于设置search-box的input的值
			setQuery (query) {
				this.query = query
			}
		},
		// 钩子函数
		created () {
			this.$watch('query', (newQuery) => {
				this.$emit('query', newQuery)
			})
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"

	.search-box
		display: flex
		align-items: center
		box-sizing: border-box
		width: 100%
		padding: 0 6px
		height: 40px
		background: $color-highlight-background
		border-radius: 6px
		.icon-search
			font-size: 24px
			color: $color-background
		.box
			flex: 1
			margin: 0 5px
			line-height: 18px
			background: $color-highlight-background
			outline: none
			color: $color-text
			font-size: $font-size-medium
			&::placeholder
				color: $color-text-d
		.icon-dismiss
			font-size: 16px
			color: $color-background
</style>