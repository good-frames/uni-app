<template>
  <view class="page">
    <custom-nav title="首页" class="nav"></custom-nav>
    <custom-scroll :getApi="getList" class="scroll">
      <template v-slot:default="{list}">
        <view class="list">
          <view v-for="(item, itemIndex) in list" :key="itemIndex"
            class="headline-item" @click="handleT">
            {{ item }}
          </view>
        </view>
      </template>
    </custom-scroll>
  </view>
</template>

<script setup>
const title = ref('home')

// 获取推荐数据
const getList = async ({
    pageNum,
    pageSize,
    params
  }) => {
    const list = [1,2,3,4,5,6,7,8]
    return [list, 10]
  }

const handleT = () => {
  uni.navigateTo({
    url: '/models/goods/pages/detail'
  })
}
</script>

<style lang="scss" scoped>
.page {

  display: flex;
  flex-direction: column;
  height: 100vh;

  .nav {
    flex: 0 0 auto;
  }

  .scroll {
    flex: 1 1 auto;
  }
}
</style>
