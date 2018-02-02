import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = (resolve) => {
	import('components/recommend/recommend').then((module) => {
		resolve(module)
	})
}

const Singer = (resolve) => {
	import('components/singer/singer').then((module) => {
		resolve(module)
	})
}

const Rank = (resolve) => {
	import('components/rank/rank').then((module) => {
		resolve(module)
	})
}

const Search = (resolve) => {
	import('components/search/search').then((module) => {
		resolve(module)
	})
}

const SingerDetail = (resolve) => {
	import('components/singer-detail/singer-detail').then((module) => {
		resolve(module)
	})
}

const Disc = (resolve) => {
	import('components/disc/disc').then((module) => {
		resolve(module)
	})
}

const UserCenter = (resolve) => {
	import('components/user-center/user-center').then((module) => {
		resolve(module)
	})
}

const TopList = (resolve) => {
	import('components/top-list/top-list').then((module) => {
		resolve(module)
	})
}

const NotFoundComponent = (resolve) => {
	import('components/nofound/not-found-component').then((module) => {
		resolve(module)
	})
}

export default new Router({
	// mode: 'history',
	routes: [
		// 定义没有找到组件的路由
		{path: '*', component: NotFoundComponent},
		{
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			component: Recommend,
			// 子路由
			children: [
				{
					// 在主路由的基础上添加id属性
					path: ':id',
					component: Disc
				}
			]
		},
		{
			path: '/singer',
			component: Singer,
			// 子路由
			children: [
				{
					// 在主路由的基础上添加id属性
					path: ':id',
					component: SingerDetail
				}
			]
		},
		{
			path: '/rank',
			component: Rank,
			// 子路由
			children: [
				{
					// 在主路由的基础上添加id属性
					path: ':id',
					component: TopList
				}
			]
		},
		{
			path: '/search',
			component: Search,
			// 子路由
			children: [
				{
					// 在主路由的基础上添加id属性
					path: ':id',
					component: SingerDetail
				}
			]
		},
		{
			path: '/user',
			component: UserCenter
		}
	]
})