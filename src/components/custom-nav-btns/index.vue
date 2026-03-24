

<template>
  <view class="nav-btns">
    <view class="nav-btn iconfont icon-back" @click="handleBack">
    </view>
    <view class="nav-btn iconfont icon-home" @click="handleHome">
    </view>
  </view>
</template>

<script setup>
// 返回上一页
const handleBack = () => {
  uni.navigateBack(-1)
}

const handleHome = () => {
  uni.reLaunch({
    url: '/models/main/pages/home'
  })
}
</script>

<style lang="scss" scoped>
.nav-btns {
  display: flex;
  align-items: center;
  height: 64rpx;
  border-radius: 64rpx;
  border: 1rpx solid #eee;

  .nav-btn {
    display: flex;
    align-items: center;
    height: 80%;
    padding: 0 20rpx;

    &:last-child {
      border-left: 1rpx solid #eee;
    }
  }
}
</style>
