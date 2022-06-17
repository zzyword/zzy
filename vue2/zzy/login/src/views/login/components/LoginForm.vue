<template>
	<a-form :model="formState" autocomplete="off" class="form" @finish="onFinish" @finishFailed="onFinishFailed">
		<a-form-item :rules="[{ required: true, message: '请输入账号/手机号/邮箱' }]" name="userAccount">
			<a-input v-model:value.trim="formState.userAccount" class="form-item" placeholder="请输入账号/手机号/邮箱">
				<template #prefix>
					<UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
				</template>
			</a-input>
		</a-form-item>

		<a-form-item :rules="[{ required: true, message: '请输入密码' }]" name="password">
			<a-input-password v-model:value.trim="formState.password" class="form-item" placeholder="请输入密码">
				<template #prefix>
					<LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
				</template>
			</a-input-password>
		</a-form-item>

		<div style="display: flex">
			<a-checkbox v-model:checked="remember" class="remember">记住密码</a-checkbox>

			<span class="spacer"></span>

			<span class="forget">忘记密码</span>
		</div>

		<a-button class="submit-button" html-type="submit" type="primary">登录</a-button>
	</a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSystemStore } from '@dc/vue-web-base/src/store/system'
import { useUserStore } from '@/store/user'
import { messageMethod } from '@dc/vue-web-base/src/utils/message-util'
import requestMethod from '@dc/vue-web-base/src/api/login/login'
import { JSEncrypt } from 'jsencrypt'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'

/**
 * 是否记住密码
 */
const remember = ref(false)

interface FormState {
	userAccount: string
	password: string
	remember: boolean
}

// 创建表单数据
const formState = reactive<FormState>({
	userAccount: '',
	password: '',
	remember: true
})

// 路由信息
const router = useRouter()
// 使用系统存储
const systemStore = useSystemStore()
// 用户信息
const userStore = useUserStore()

/**
 * 提交表单且数据验证成功后回调事件
 * @param params
 */
const onFinish = async (params: FormState) => {
	// 获取rsa公钥信息
	messageMethod.success('登录环境安全验证中...')
	const rsa = await requestMethod.rsa()
	const { publicKey, rsaKey } = rsa.data

	// 加密密码信息
	const encrypt = new JSEncrypt({})
	encrypt.setPublicKey(publicKey)
	const password = encrypt.encrypt(params.password)

	// 执行登录
	const { data } = await requestMethod.login({
		...params,
		password,
		rsaKey,
		siteCode: 'manage'
	})
	// 设置系统信息缓存
	systemStore.setToken(data.authToken)
	// 设置用户信息缓存
	userStore.setInfo(data)
	console.log(userStore.user)
	// 提示成功
	messageMethod.success('登录成功')
	// 跳转到主页
	setTimeout(() => {
		// 跳转到主页
		router.push('/')
	}, 1000)
}

/**
 * 提交表单且数据验证失败后回调事件
 * @param errorFields
 */
const onFinishFailed = ({ errorFields }: { values: FormState; errorFields: Array<{ errors: Array<string>; name: Array<string> }>; outOfDate: boolean }) => {
	// 错误提示
	messageMethod.error(errorFields[0].errors)
}
</script>

<script lang="ts">
export default {
	name: 'LoginForm'
}
</script>

<style lang="scss" scoped>
@import '@dc/vue-web-base/src/assets/scss/variables.scss';

/**
输入框
 */
.form-item {
	width: 370px;
	height: 40px;
	background: #ffffff;
	border-radius: 4px;
}

.submit-button {
	width: 368px;
	height: 40px;
	background: $primary-color-400;
	border-radius: 4px;
	border: none;
	margin-top: 25px;
}

/**
记住密码
 */
.remember {
	font-size: 0.875rem;
	font-weight: 400;
	color: #ffffff;
}

/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	-webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
