<template>
	<scroll-view scroll-y="true" class="scroll-list" @scrolltolower="handleScrolltolower">
		<slot :list="list"></slot>

		<view v-show="loading" class="no-data">加载中...</view>
		<view v-show="!hasData" class="no-data">没有更多...</view>
	</scroll-view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref
	} from "vue";
	const props = defineProps({
		getApi: {
			type: Function,
			default: () => {}
		}
	})

	const loading = ref(false)
	const list = ref([])
	const pagination = ref({
		pageNum: 1,
		pageSize: 10,
		total: 1000
	})

	onMounted(() => {
		getList()
	})

	const hasData = computed(() => {
		return Math.ceil(pagination.value.total / pagination.value.pageSize) >= pagination.value.pageNum
	})

	// 上拉加载更多
	const handleScrolltolower = () => {
		if (loading.value) return
		getList(false)
	}

	// 获取数据
	const getList = async (refrsh = true) => {
		if (refrsh) {
			pagination.value = {
				pageNum: 1,
				pageSize: 10,
				total: 1000
			}
		} else {
			pagination.value.pageNum++
		}

		if (!hasData.value) return

		loading.value = true

		const [arr, total] = await props.getApi({
			pageNum: pagination.value.pageNum,
			pageSize: pagination.value.pageSize,
		})

		const newData = arr

		if (refrsh) {
			list.value = newData
		} else {
			list.value = list.value.concat(newData)
		}

		pagination.value.total = total

		loading.value = false
	}
</script>

<style lang="scss" scoped>
	.scroll-list {
		width: 100%;
		height: 100%;
	}

	.no-data {
		padding: 20rpx 0;
		text-align: center;
		color: #ccc;
	}
</style>
