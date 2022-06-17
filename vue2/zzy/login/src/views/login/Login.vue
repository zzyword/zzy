<template>
	<div class="page">
		<!--左上角的logo-->
		<div class="logo" />

		<div class="spacer"></div>

		<!--内容部分-->
		<div class="container">
			<!--树叶装饰-->
			<div class="top"></div>
			<div class="bottom"></div>

			<div class="spacer" />

			<div class="title">登录</div>

			<!--标签页-->
			<login-tabs v-model:active="active" />

			<!--登录表单-->
			<login-form v-show="active === 0" style="margin-top: 25px" />
			<!--手机号码登录-->
			<login-code v-show="active === 1" style="margin-top: 25px" />

			<!--			<div class="third-login">-->
			<!--				<div>其他登录方式</div>-->

			<!--				<alipay-circle-filled class="icon first-icon" />-->
			<!--				<taobao-circle-filled class="icon" />-->
			<!--				<weibo-circle-filled class="icon" />-->

			<!--				<div class="spacer" />-->

			<!--				<div class="register">注册账户</div>-->
			<!--			</div>-->

			<div class="spacer-2" />

			<!--			<div class="help">
				<div>帮助</div>
				<div>隐私</div>
				<div>条款</div>
			</div>-->

			<div class="copy-right" v-if="copyright">{{ copyright }}</div>
		</div>

		<!--底部-->
		<!--		<footer class="footer">-->
		<!--			<span>Copyright@2022 版权所有：嘉兴东臣信息科技有限公司</span>-->
		<!--			<a class="filing" href="https://beian.miit.gov.cn/" target="_blank">浙ICP备10045767号</a>-->
		<!--			<span class="chrome">-->
		<!--				<span>推荐使用谷歌浏览器：</span>-->
		<!--				<a target="_blank" href="https://www.google.cn/chrome/">-->
		<!--					<a-tooltip title="下载谷歌浏览器" arrowPointAtCenter>-->
		<!--						<img src="@/assets/images/login/google.png" alt="chrome">-->
		<!--					</a-tooltip>-->
		<!--                </a>-->
		<!--			</span>-->
		<!--		</footer>-->
	</div>
</template>

<script lang="ts" setup>
import { AlipayCircleFilled, TaobaoCircleFilled, WeiboCircleFilled } from '@ant-design/icons-vue'
import LoginForm from './components/LoginForm.vue'
import LoginTabs from './components/LoginTabs.vue'
import LoginCode from './components/LoginCode.vue'
import { computed, ref } from 'vue'

const copyright = computed<string>(() => import.meta.env.VITE_APP_COPYRIGHT)

const active = ref(0)
</script>
<script lang="ts">
export default {
	name: 'Login'
}
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>
