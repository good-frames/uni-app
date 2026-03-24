<template>
	<view class="checkbox">
		<view v-for="(item, itemIndex) in options" :key="itemIndex" :class="['checkbox-item', 'checkbox-item--data', { checked: isCheck(item) }]" @click="handleClickItem(item)">{{ item.label }}</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		modelValue: {
			type: [String, Object, Number]
		},
		options: {
			type: Array,
			default: () => []
		},
		multiple: {
			type: Boolean,
			default: false
		},
		props: {
			type: Object,
			default: () => ({
				primaryKey: 'value',
				value: 'value',
				label: 'label'
			})
		}
	})
	
	const emit = defineEmits(['update:modelValue', 'change'])
	
	const checked = ref([])
	const checkVal = ref([])
	
	watchEffect(() => {
		checkVal.value = props.modelValue
		checked.value = props.modelValue
	})
	
	const isCheck = (item) => {
		if (props.multiple) {
			return checked.value.includes(item[props.props.primaryKey])
		} else {
			return checked.value === item[props.props.primaryKey]
		}
	}
	
	const handleClickItem = (option) => {
		if (props.multiple) {
			const findIndex = checked.value?.findIndex(item => item === option[props.props.primaryKey])
			
			if (findIndex === -1 || findIndex === undefined) {
				checked.value.push(option[props.props.primaryKey])
				checkVal.value.push(option[props.props.value])
			} else {
				checked.value.splice(findIndex, 1)
				checkVal.value.splice(findIndex, 1)
			}
		} else {
			checked.value = option[props.props.primaryKey]
			checkVal.value = option[props.props.value]
		}
		
		emit('update:modelValue', checkVal.value)
		emit('change', checkVal)
	}
</script>

<style lang="scss" scoped>
	.checkbox {
		overflow: hidden;
		&-item {
			float: left;
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1 1 auto;
			box-sizing: border-box;
			width: 100rpx;
			height: 50rpx;
			margin: 0 20rpx 20rpx 0;
			font-size: 22rpx;
			&:last-child {
				margin-right: 0;
			}
			
			&--data {
				border-radius: 50rpx;
				background-color: $uni-bg-color-grey;
				
				&.checked {
					background-color: #FDE6E9;
					color: #EC3132;
				}
			}
		}
	}
</style>