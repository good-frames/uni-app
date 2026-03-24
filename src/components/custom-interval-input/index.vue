<template>
  <view class="custom-interval-input">
    <view class="custom-interval-input__btn btn-reduce iconfont icon-move" :class="{disabled: hasReduce}" @click="reduce"></view>
    <input v-model="value" class="custom-interval-input__input"/>
    <view class="custom-interval-input__btn btn-add iconfont icon-add1" :class="{disabled: hasAdd}" @click="add"></view>
  </view>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: 1
  },
  max: {
    type: [String, Number],
    default: 99
  }
})

const value = ref('')
	
watchEffect(() => {
  value.value = props.modelValue
})

// 减按钮是否禁用
const hasReduce = computed(() => {
  return !(value.value > 1)
})

// 加按钮是否禁用
const hasAdd = computed(() => {
  return !(value.value < props.max)
})

// 点击减按钮
const reduce = () => {
  if (value.value <= 1) {
    return
  }

  value.value--
}

// 点击加按钮
const add = () => {
  if (value.value >= props.max) {
    return
  }

  value.value++
}
</script>

<style lang="scss" scoped>
.custom-interval-input {
  display: flex;
  align-content: center;

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60rpx;
    height: 60rpx;
    background: #F2F3F5;

    &.disabled {
      color: #ccc;
    }
    
    &.btn-reduce {
      border-radius: 8rpx 0 0 8rpx;
    }
    &.btn-add {
      border-radius: 0 8rpx 8rpx 0;
    }
  }

  &__input {
    box-sizing: border-box;
    width: 60rpx;
    height: 60rpx;
    margin: 0 4rpx;
    padding: 0 10rpx;
    background: #F2F3F5;
    text-align: center;
    font-size: 28rpx;
  }
}
</style>
