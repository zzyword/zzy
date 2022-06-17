import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defaultBeforeEach, HOME_NAME, setRouteName, setRouter } from '@dc/vue-web-base/src/router'

// 动态导入所有modules下的路由文件信息
const modelsFile = import.meta.globEager('./modules/**/*.ts')

// 路由去中心化
const children = setRouteName(
	Object.keys(modelsFile)
		.map((key: string) => modelsFile[key].default)
		.flat(1) || []
)

/**
 * 系统路由信息
 */
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: HOME_NAME,
		component: () => import('@dc/vue-web-base/src/views/Index.vue'),
		children
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/Login.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

/**
 * 开启路由前置守卫
 */
router.beforeEach(defaultBeforeEach())

setRouter(router)

export default router
