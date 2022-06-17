<template>
	<a-form :model="formState" autocomplete="off" class="form" @finish="onFinish" @finishFailed="onFinishFailed">
		<a-form-item :rules="[{ required: true, message: '请输入手机号码' }]" name="mobile">
			<a-input v-model:value.trim="formState.mobile" class="form-item" placeholder="请输入手机号码">
				<template #prefix>
					<MobileOutlined style="color: rgba(0, 0, 0, 0.25)" />
				</template>
			</a-input>
		</a-form-item>

		<a-form-item :rules="[{ required: true, message: '请输入验证码' }]" name="code">
			<a-input v-model:value.trim="formState.code" class="form-item" placeholder="请输入验证码">
				<template #prefix>
					<MessageOutlined style="color: rgba(0, 0, 0, 0.25)" />
				</template>
				<template #suffix>
					<div @click="sendCode" class="code" :class="{ disabled: codeDisabled }">发送验证码{{ showTime ? '(' + downTime + 's)' : '' }}</div>
				</template>
			</a-input>
		</a-form-item>

		<a-button class="submit-button" html-type="submit" type="primary">登录</a-button>
	</a-form>
</template>

<script setup lang="ts">
import { MobileOutlined, MessageOutlined } from '@ant-design/icons-vue'
import { computed, onUnmounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSystemStore } from '@dc/vue-web-base/src/store/system'
import { useUserStore } from '@dc/vue-web-base/src/store/user'
import { isPhone } from '@dc/vue-web-base/src/utils/verification-util'
import { messageMethod } from '@dc/vue-web-base/src/utils/message-util'
import requestMethod from '@dc/vue-web-base/src/api/login/login'

interface FormState {
	mobile: string
	code: string
	checked: boolean
}

// 创建表单数据
const formState = reactive<FormState>({
	mobile: '',
	code: '',
	checked: true
})

// 路由信息
const router = useRouter()
// 使用系统存储
const systemStore = useSystemStore()
// 用户信息
const userStore = useUserStore()

/**
 * 验证码
 */
const downTime = ref(60)
let interval: unknown = null
//是否显示时间
const showTime = computed(() => {
	return downTime.value < 60
})
const codeDisabled = computed(() => {
	return formState.mobile.length != 11 || downTime.value < 60
})

async function sendCode() {
	if (codeDisabled.value) return

	if (!isPhone(formState.mobile)) {
		messageMethod.info('请输入正确的手机号码')
		return
	}

	// 提前出发禁用
	downTime.value = 59

	interval = setInterval(() => {
		downTime.value -= 1
		if (downTime.value <= 0) {
			downTime.value = 60
			if (interval) clearInterval(interval as number)
		}
	}, 1000)

	if (import.meta.env.VITE_APP_API_MESSAGE) {
		await requestMethod.getCode({ mobile: formState.mobile })
	}
	messageMethod.info('验证码发送成功，请注意查收')
}

onUnmounted(() => {
	if (interval) clearInterval(interval as number)
})

/**
 * 提交表单且数据验证成功后回调事件
 * @param params
 */
const onFinish = async (params: FormState) => {
	if (!import.meta.env.VITE_APP_API_CODE_LOGIN) return
	const mobileKey = import.meta.env.VITE_APP_API_CODE_LOGIN_PARAMS_MOBILE
	const codeKey = import.meta.env.VITE_APP_API_CODE_LOGIN_PARAMS_CODE

	// 获取rsa公钥信息
	messageMethod.success('登录环境安全验证中...')
	// 执行登录
	const { data } = await requestMethod.loginByCode({
		...params,
		[mobileKey ?? 'mobile']: params.mobile,
		[codeKey ?? 'code']: params.code,
		siteCode: 'manage'
	})
	// 设置系统信息缓存
	systemStore.setToken(data.authToken)
	// 设置用户信息缓存
	userStore.setInfo(data)
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
	name: 'LoginCode'
}
</script>

<style scoped lang="scss">
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

.code {
	font-size: 15px;
	font-weight: 400;
	color: #2278e6;
}

.disabled {
	color: #999999;
}
</style>
