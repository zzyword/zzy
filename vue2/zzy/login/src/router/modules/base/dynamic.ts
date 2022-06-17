export default [
	{
		path: '/dynamic-table',
		component: () => import('@dc/vue-web-base/src/views/dynamic/table/Manage.vue')
	},
	{
		// 路由需要匹配到动态模块
		path: '/dynamic/:tableId',
		component: () => import('@dc/vue-web-base/src/views/dynamic/Index.vue')
	}
]
