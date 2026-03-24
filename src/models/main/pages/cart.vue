<template>
  <view class="page">
    <scroll-view scroll-y="true" class="scroll">
      
    </scroll-view>
    <CartBar class="cartbar"></CartBar>
  </view>
</template>

<script setup>
import CartBar from '../components/cart-bar.vue'
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .scroll {
    flex: 1 1 auto;
    height: 0;
  }

  .cartbar {
    flex: 0 0 auto;
  }
}

</style>
