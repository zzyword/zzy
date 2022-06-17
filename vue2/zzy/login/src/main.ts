import { createApp } from 'vue'
import App from './App.vue'

// 蚂蚁ui
import Antd from 'ant-design-vue'
import './assets/scss/theme.less'

// 状态管理工具
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
// 添加路由
import router from './router'

// 权限指令
import auth from '@dc/vue-web-base/src/directives/v-auth'
// 抽屉
import dcDrawer from '@dc/vue-web-base/src/components/dc-drawer'
// 基础表单
import formItem from '@dc/vue-web-base/src/components/form-item'

createApp(App)
	// 权限指令
	.use(auth)
	// 抽屉
	.use(dcDrawer)
	// 基础表单
	.use(formItem)
	// 蚂蚁ui框架
	.use(Antd)
	// 使用pinia代替vuex缓存
	.use(createPinia().use(piniaPluginPersist))
	// 路由
	.use(router)
	// 挂载
	.mount('#app')
