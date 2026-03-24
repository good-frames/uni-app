<template>
  <view :style="styles" class="custom-nav">
    <slot v-if="$slots.default"></slot>
    <view v-else class="custom-nav__title">{{ title }}</view>
  </view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'

  const props = defineProps({
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 背景色
    background: {
      type: String,
      default: '#42b883'
    }
  })

  const barHeight = ref(0)
  const navHeight = ref(0)
  const navPaddingRight = ref(0)

  onLoad(() => {
    const { width, height, top } = uni.getMenuButtonBoundingClientRect()
    barHeight.value = top
    navHeight.value = height
    navPaddingRight.value = width + 10
	})

  const styles = computed(() => {
    return {
      height: `${navHeight.value}px`,
      paddingTop: `${barHeight.value}px`,
      paddingRight: `${navPaddingRight.value}px`,
      paddingLeft: '20rpx',
      paddingBottom: '6rpx',
      // background: `${props.background}`,
    }
  })
</script>

<style lang="scss" scoped>
.custom-nav {
  box-sizing: content-box;
  display: flex;
  align-items: center;

  &__title {
    font-size: 32rpx;
    color: #fff;
  }
}
</style>