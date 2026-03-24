<template>
	<view :style="{ height: lineHeight * line * 2 + 'rpx', lineHeight: lineHeight * 2 + 'rpx' }"
		class="multiline-text-box">
		<view id="text" class="multiline-text-box__text">
			<slot v-if="$slots.default"></slot>
			<view v-else>{{ text }}</view>
		</view>
		<!-- <text class="multiline-text-box__text" id="text">{{ text }}</text> -->
		<view v-if="showMore" class="multiline-text-box__more">
			<slot v-if="$slots.more" name="more"></slot>
			<template v-else>
				<text class="multiline-text-box__more--default">{{ moreText }}</text>
			</template>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		getCurrentInstance,
		onMounted,
		ref
	} from "vue";
	const props = defineProps({
		// 文本内容
		text: {
			type: String,
			default: ''
		},
		// 行数
		line: {
			type: [Number, String],
			default: 2
		},
		// 行高
		lineHeight: {
			type: [Number, String],
			default: 18
		},
		// 更多提示文案
		moreText: {
			type: String,
			default: '...'
		}
	})

	const {
		proxy
	} = getCurrentInstance()
	const TextRect = ref()

	onMounted(() => {
		const query = uni.createSelectorQuery().in(proxy)
		query.select('#text').boundingClientRect(data => {
			TextRect.value = data
		}).exec()
	})

	const showMore = computed(() => {
		const lineHeight = Number(props.lineHeight)
		const line = Number(props.line)
		return TextRect.value && TextRect.value.height > (line * lineHeight)
	})
</script>

<style lang="scss" scoped>
	.multiline-text-box {
		position: relative;
		overflow: hidden;

		&__text {
			width: 100%;
			white-space: normal;
			word-wrap: break-word;
			word-break: normal;
		}

		&__more {
			position: absolute;
			right: 0;
			bottom: 0;

			&--default {
				display: block;
				width: 80rpx;
				text-align: right;
				background: linear-gradient(90deg, transparent 10%, #fff 60%, #fff)
			}
		}
	}
</style>
