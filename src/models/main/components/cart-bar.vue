<template>
  <view class="cart">
    <view class="select-all" @click="handleSelectAll">
      <view :class="['select-all__dot', { selected: selectAll}]">
        <view class="select"></view>
      </view>
      <view>全选</view>
    </view>
  </view>
</template>

<script setup>
const selectAll = ref(false)

// 全选按钮
const handleSelectAll = () => {
  selectAll.value = !selectAll.value
}
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  align-items: center;
  width: 100%;
  height: 90rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eee;

  .select-all {
    display: flex;
    align-items: center;
    &__dot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30rpx;
      height: 30rpx;
      margin-right: 10rpx;
      border-radius: 30rpx;
      box-shadow: 0 0 0 1rpx #ccc;
      // border: 1rpx solid green;
      overflow: hidden;

      &.selected {
        box-shadow: 0 0 0 1rpx #EC3132;
        .select {
          width: 60%;
          height: 60%;
          border-radius: 100%;
          background: #EC3132;
        }
      }

      .select {
        width: 100%;
        height: 100%;
        background: #fff;
        transition: all .3s;
      }
    }
  }
}
</style>
