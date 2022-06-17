export default [
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404'
	},
	{
		path: '/404',
		component: () => import('@dc/vue-web-base/src/views/exception/404.vue')
	},
	{
		path: '/403',
		component: () => import('@dc/vue-web-base/src/views/exception/403.vue')
	},
	{
		path: '/500',
		component: () => import('@dc/vue-web-base/src/views/exception/500.vue')
	}
]
