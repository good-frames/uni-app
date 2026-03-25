# Custom Scroll 组件

一个功能强大的滚动加载组件，支持上拉加载更多功能，内置分页逻辑和加载状态管理。

## 功能特性

- 📜 垂直滚动支持
- ⬆️ 上拉加载更多
- 📄 内置分页逻辑
- 🔄 自动加载状态管理
- 📱 适配 uni-app 多端使用
- 🎯 支持自定义 API 接口
- 📊 智能数据合并

## 基本用法

```vue
<template>
  <custom-scroll :getApi="fetchData">
    <template #default="{ list }">
      <view v-for="item in list" :key="item.id" class="item">
        {{ item.title }}
      </view>
    </template>
  </custom-scroll>
</template>

<script setup>
const fetchData = async (params) => {
  // 模拟 API 调用
  const response = await uni.request({
    url: '/api/list',
    method: 'GET',
    data: params
  })

  // 返回 [数据数组, 总数量]
  return [response.data.list, response.data.total]
}
</script>
```

## 属性 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `getApi` | Function | `() => {}` | 获取数据的 API 函数，必须返回 [数组, 总数] 的格式 |

### getApi 函数要求

getApi 函数应该：
1. 接收一个包含分页参数的对象：`{ pageNum, pageSize }`
2. 返回一个 Promise
3. Promise resolve 的结果必须是数组：`[数据数组, 总数量]`

```javascript
const getApi = async ({ pageNum, pageSize }) => {
  const res = await fetch(`/api/data?page=${pageNum}&size=${pageSize}`)
  const data = await res.json()
  return [data.items, data.total] // 必须返回这种格式
}
```

## 插槽 Slots

| 插槽名 | 说明 | 作用域 |
|--------|------|--------|
| `default` | 列表内容模板 | `{ list: 当前所有数据的数组 }` |

## 内置状态

组件内部管理以下状态：

### loading
- **类型**：Boolean
- **说明**：是否正在加载数据
- **用途**：防止重复请求，显示加载提示

### list
- **类型**：Array
- **说明**：当前已加载的所有数据
- **用途**：通过插槽传递给外部使用

### pagination
- **类型**：Object
- **说明**：分页信息
- **结构**：
  ```javascript
  {
    pageNum: 1,    // 当前页码
    pageSize: 10,  // 每页数量
    total: 1000    // 总数量
  }
  ```

## 计算属性

### hasData
- **说明**：判断是否还有更多数据可以加载
- **计算逻辑**：`Math.ceil(total / pageSize) >= pageNum`
- **用途**：控制是否继续加载更多数据

## 方法说明

### handleScrolltolower()
- **触发时机**：滚动到底部时触发
- **功能**：加载下一页数据
- **条件**：不在加载状态且有更多数据时执行

### getList(refrsh = true)
- **功能**：获取数据的主要方法
- **参数**：
  - `refrsh`: Boolean - 是否刷新数据（重置分页）
- **流程**：
  1. 如果是刷新模式，重置分页信息
  2. 检查是否还有数据
  3. 设置加载状态
  4. 调用 API 获取数据
  5. 合并或替换数据
  6. 更新分页信息
  7. 清除加载状态

## 高级用法

### 自定义加载提示

```vue
<template>
  <custom-scroll :getApi="fetchData">
    <template #default="{ list }">
      <view v-for="item in list" :key="item.id" class="item">
        <image :src="item.image" mode="aspectFill"></image>
        <text>{{ item.title }}</text>
      </view>
    </template>
  </custom-scroll>
</template>

<style scoped>
.item {
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.item image {
  width: 100%;
  height: 200rpx;
  border-radius: 8rpx;
}
</style>
```

### 搜索功能集成

```vue
<template>
  <view class="search-container">
    <input v-model="keyword" placeholder="搜索..." @confirm="handleSearch" />
    <button @click="handleSearch">搜索</button>
  </view>

  <custom-scroll :getApi="fetchData" ref="scrollRef">
    <template #default="{ list }">
      <view v-for="item in list" :key="item.id">
        {{ item.title }}
      </view>
    </template>
  </custom-scroll>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('')
const scrollRef = ref(null)

const fetchData = async ({ pageNum, pageSize }) => {
  const res = await uni.request({
    url: '/api/search',
    method: 'GET',
    data: {
      pageNum,
      pageSize,
      keyword: keyword.value
    }
  })
  return [res.data.list, res.data.total]
}

const handleSearch = () => {
  // 触发重新加载
  if (scrollRef.value) {
    scrollRef.value.getList(true)
  }
}
</script>
```

### 下拉刷新配合使用

```vue
<template>
  <scroll-view
    scroll-y
    refresher-enabled
    :refresher-triggered="refreshing"
    @refresherrefresh="handleRefresh"
  >
    <custom-scroll :getApi="fetchData" ref="scrollRef">
      <template #default="{ list }">
        <!-- 列表内容 -->
      </template>
    </custom-scroll>
  </scroll-view>
</template>

<script setup>
import { ref } from 'vue'

const refreshing = ref(false)
const scrollRef = ref(null)

const fetchData = async (params) => {
  // API 调用逻辑
}

const handleRefresh = async () => {
  refreshing.value = true
  // 触发自定义滚动组件的刷新
  if (scrollRef.value) {
    await scrollRef.value.getList(true)
  }
  refreshing.value = false
}
</script>
```

## 样式定制

### 自定义加载和空状态样式

```vue
<template>
  <custom-scroll :getApi="fetchData" class="custom-scroll">
    <template #default="{ list }">
      <!-- 列表内容 -->
    </template>
  </custom-scroll>
</template>

<style scoped>
.custom-scroll {
  height: 100vh;
}

/* 自定义加载提示样式 */
.custom-scroll .no-data {
  padding: 40rpx 0;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}

/* 加载中样式 */
.custom-scroll .no-data:first-of-type {
  color: #42b883;
}

/* 没有更多样式 */
.custom-scroll .no-data:last-of-type {
  color: #ccc;
}
</style>
```

## 性能优化建议

1. **分页大小**：
   - 根据数据项大小调整 pageSize
   - 建议每页 10-20 条数据

2. **API 优化**：
   - 确保 API 支持分页查询
   - 减少不必要的数据传输

3. **列表渲染**：
   - 使用 v-for 时务必添加 :key
   - 避免在列表项中使用复杂的计算属性

4. **内存管理**：
   - 大量数据时考虑虚拟滚动
   - 及时清理不需要的数据

## 注意事项

1. **API 格式**：确保 getApi 返回 `[数组, 总数]` 的格式
2. **错误处理**：在 getApi 中添加适当的错误处理
3. **数据合并**：组件自动处理数据合并，无需手动管理
4. **滚动容器**：确保组件有确定的高度，否则滚动可能不生效
5. **生命周期**：组件在 onMounted 时自动加载第一页数据

## 兼容性

- ✅ 微信小程序
- ✅ H5
- ✅ App
- ✅ 支付宝小程序
- ✅ 百度小程序

该组件基于 uni-app 框架开发，支持所有 uni-app 支持的平台。

## 常见问题

### Q: 为什么滚动到底部没有触发加载？
A: 检查以下几点：
- 是否正在加载中（loading 为 true）
- 是否还有更多数据（hasData 为 false）
- getApi 是否正确返回数据格式

### Q: 如何手动触发刷新？
A: 可以通过 ref 调用组件的 getList 方法：
```javascript
this.$refs.scrollComponent.getList(true)
```

### Q: 如何修改每页数据量？
A: 组件内部固定为 10，如需修改需要在组件源码中调整 pagination 的默认值。