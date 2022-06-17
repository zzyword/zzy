export default [
	{
		// 用户管理
		path: '/account/user',
		component: () => import('@dc/vue-web-base/src/views/account/user/Manage.vue')
	},
	{
		// 单位管理
		path: '/account/organization',
		component: () => import('@dc/vue-web-base/src/views/account/organization/Manage.vue')
	},
	{
		// 部门管理
		path: '/account/department',
		component: () => import('@dc/vue-web-base/src/views/account/department/Manage.vue')
	},
	{
		// 角色
		path: '/account/role',
		component: () => import('@dc/vue-web-base/src/views/account/role/Manage.vue')
	},
	{
		// 个人信息
		path: '/account/information',
		component: () => import('@dc/vue-web-base/src/views/account/information/Manage.vue')
	},
	{
		// 个人信息详情
		path: '/account/information/detail',
		component: () => import('@dc/vue-web-base/src/views/account/information/UpdateInfo.vue')
	}
]
