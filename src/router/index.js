import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import NotFoundComponent from 'components/nofound/not-found-component'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		// 定义没有找到组件的路由
		{ path: '*', component: NotFoundComponent },
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
			component: Rank
		},
		{
			path: '/search',
			component: Search
		}
	]
})