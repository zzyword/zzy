export default [
	{
		path: '/log/login',
		component: () => import('@dc/vue-web-base/src/views/system-log/login/Manage.vue')
	},
	{
		path: '/log/operation',
		component: () => import('@dc/vue-web-base/src/views/system-log/operation/Manage.vue')
	},
	{
		path: '/log/file-upload',
		component: () => import('@dc/vue-web-base/src/views/system-log/file-upload/Manage.vue')
	},
	{
		path: '/log/version',
		component: () => import('@dc/vue-web-base/src/views/system-log/version/Manage.vue')
	},
	{
		path: '/log/backup',
		component: () => import('@dc/vue-web-base/src/views/system-log/backup/Manage.vue')
	},
	{
		path: '/log/backup-file',
		component: () => import('@dc/vue-web-base/src/views/system-log/backup-file/Manage.vue')
	},
	{
		path: '/log/message',
		component: () => import('@dc/vue-web-base/src/views/system-log/message/Manage.vue')
	}
]
