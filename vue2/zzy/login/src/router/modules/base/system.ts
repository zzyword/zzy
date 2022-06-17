export default [
	{
		// 菜单管理
		path: '/system/menu',
		component: () => import('@dc/vue-web-base/src/views/system/menu/Manage.vue')
	},
	{
		// 系统参数
		path: '/system/parameter',
		component: () => import('@dc/vue-web-base/src/views/system/parameter/Manage.vue')
	},
	{
		// 字典类型
		path: '/system/dictionary-type',
		component: () => import('@dc/vue-web-base/src/views/system/dictionary-type/Manage.vue')
	},
	{
		// 数据字典
		path: '/system/dictionary',
		component: () => import('@dc/vue-web-base/src/views/system/dictionary/Manage.vue')
	},
	{
		// 消息管理
		path: '/system/message',
		component: () => import('@dc/vue-web-base/src/views/system/message/Manage.vue')
	}
]
