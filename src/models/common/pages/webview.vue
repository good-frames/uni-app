<template>
	<view v-if="params.url">
		<web-view :webview-styles="webviewStyles" :src="`${params.url}`"></web-view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue'
	const params = ref({})
	const webviewStyles = ref({
		progress: {
			color: "#FF3333"
		}
	})

	onLoad((options) => {
		params.value = options
		if (options.title) {
			uni.setNavigationBarTitle({
				title: options.title
			})
		}
	})
</script>
