<template>
	<view class="custom-img">
		<view class="source">
			<image :src="src" :mode="mode" @error="handleError" @load="handleLoad"></image>
			<view v-if="state === 'ok' && completeTransition" class="loading__transition"></view>
		</view>

		<view v-if="state === 'loading'" class="loading">
			<slot v-if="$slots.loading" name="loading"></slot>
			<image v-else :src="loadingImg" mode="aspectFit"></image>
		</view>

		<view v-if="state === 'error'" class="error">
			<slot v-if="$slots.error" name="error"></slot>
			<image v-else :src="errorImg" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script setup>
	import eImg from './error.png'
	import lImg from './loading.gif'

	import {
		ref,
		watch
	} from 'vue'

	const props = defineProps({
		/* S uni-image 属性 */
		src: {
			type: String,
			default: ''
		},
		mode: {
			type: String,
			default: 'scaleToFill'
		},
		lazyLoad: {
			type: Boolean,
			default: false
		},
		fadeShow: {
			type: Boolean,
			default: true
		},
		webp: {
			type: Boolean,
			default: false
		},
		showMenuByLongpress: {
			type: Boolean,
			default: false
		},
		draggable: {
			type: Boolean,
			default: true
		},
		/* E uni-image 属性 */

		// 加载成功之后，是否需要加载完成动画
		completeTransition: {
			type: Boolean,
			default: true
		},
		// 加载错误时显示的图片
		errorImg: {
			type: String,
			default: eImg
		},
		// 加载中显示的图片
		loadingImg: {
			type: String,
			default: lImg
		}
	})
	const emit = defineEmits(['error', 'load'])

	const state = ref('loading')

	watch(
		() => props.src,
		(src) => {
			console.log('src', src)
			if (!src) {
				state.value = 'error'
			}
		}, {
			immediate: true
		}
	)

	// 加载失败
	const handleError = (event) => {
		state.value = 'error'
		emit('error', event)
	}

	// 加载成功
	const handleLoad = (event) => {
		state.value = 'ok'
		emit('load', event)
	}
</script>

<style lang="scss" scoped>
	.custom-img {
		position: relative;
		width: 100%;
		height: 100%;

		.source,
		.loading,
		.error {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.loading__transition {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #fff;
			animation: loading__transition 1.2s forwards;
		}

		@keyframes loading__transition {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}
	}
</style>
