<template>
	<div class="tabs">
		<div class="tab-item" v-for="(item, index) in tabs" :class="{ 'tab-active': index === props.active }" :key="item" @click="onTabClick(index)">
			{{ item }}
		</div>
		<div class="indicator" v-for="(item, index) in tabs" :class="{ 'indicator-active': index === props.active }" :key="'indicator' + index"></div>
	</div>
</template>

<script setup lang="ts">
const tabs = ['账户密码登录', '手机号登录']

let props = defineProps<{ active: number }>()
let emits = defineEmits<{ (e: 'update:active', active: number): void }>()

function onTabClick(index: number) {
	emits('update:active', index)
}
</script>

<script lang="ts">
export default {
	name: 'LoginTabs'
}
</script>

<style lang="scss" scoped>
.tabs {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto 1px;

	width: 370px;
	padding: 5px 25px;

	justify-self: center;

	// 标签
	.tab-item {
		font-size: 1rem;
		font-weight: 400;
		color: #021c1b;
		text-align: center;

		grid-row: 1/2;
	}

	.tab-active {
		color: #ffffff;
	}

	// 指示器
	.indicator {
		width: 150px;
		height: 2px;
		margin-top: 8px;

		grid-row: 2/3;
	}

	.indicator-active {
		background: #ffffff;
	}
}
</style>
