<template>
	<view class="btn" :style="styles" @click="handleClick">
		<slot></slot>
	</view>
</template>

<script setup>
	import {
		defineEmits,
		defineProps,
		computed
	} from 'vue'

	const props = defineProps({
		plain: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: '#42b883'
		}
	})

	const styles = computed(() => {
		if (props.plain) {
			return {
				background: 'transparent',
				border: `1rpx solid ${props.color}`,
				color: `${props.color}`
			}
		}

		return {
			background: `${props.color}`,
			color: `#fff`,
		}
	})

	const emit = defineEmits(['click'])

	const handleClick = () => {
		emit('click')
	}
</script>

<style lang="scss" scoped>
	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		height: 60rpx;
		padding: 0 20rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
	}
</style>
