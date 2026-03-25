# Custom Interval Input 组件

一个数字区间输入组件，提供增加和减少按钮来调整数值，支持最大值和最小值限制。

## 功能特性

- ➕ 增加按钮
- ➖ 减少按钮
- 📏 支持最大值和最小值限制
- 🔒 按钮状态自动管理
- 📱 适配 uni-app 多端使用
- 🎯 支持 v-model 双向绑定
- 🔧 简洁的 UI 设计

## 基本用法

```vue
<template>
  <!-- 基本使用 -->
  <custom-interval-input v-model="count" />

  <!-- 自定义最大值和最小值 -->
  <custom-interval-input
    v-model="quantity"
    :max="10"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const count = ref(1)
const quantity = ref(1)

const handleChange = (value) => {
  console.log('数量改变:', value)
}
</script>
```

## 属性 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `modelValue` | String/Number | `1` | 当前值，支持 v-model 双向绑定 |
| `max` | String/Number | `99` | 最大值限制 |

> **注意**：组件内部固定最小值为 1，如需自定义最小值需要修改组件源码。

## 事件 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `update:modelValue` | 值改变时触发（v-model） | 新的数值 |

## 按钮状态管理

### 减少按钮状态
- **禁用条件**：当前值 ≤ 1
- **样式**：添加 `disabled` 类，文字颜色变为 `#ccc`

### 增加按钮状态
- **禁用条件**：当前值 ≥ max
- **样式**：添加 `disabled` 类，文字颜色变为 `#ccc`

## 样式说明

### 容器样式
- 显示方式：flex
- 对齐方式：居中对齐

### 按钮样式
- 显示方式：flex
- 对齐方式：居中对齐
- 尺寸：60rpx × 60rpx
- 背景色：#F2F3F5
- 禁用状态：文字颜色 #ccc

#### 减少按钮
- 圆角：8rpx 0 0 8rpx（左侧圆角）
- 图标：iconfont icon-move

#### 增加按钮
- 圆角：0 8rpx 8rpx 0（右侧圆角）
- 图标：iconfont icon-add1

### 输入框样式
- 盒模型：border-box
- 尺寸：60rpx × 60rpx
- 边距：0 4rpx（左右间距）
- 内边距：0 10rpx
- 背景色：#F2F3F5
- 文本对齐：居中
- 字体大小：28rpx

## 高级用法

### 商品数量选择器

```vue
<template>
  <view class="product-item">
    <image :src="product.image" class="product-image" />
    <view class="product-info">
      <text class="product-name">{{ product.name }}</text>
      <text class="product-price">¥{{ product.price }}</text>
      <view class="quantity-selector">
        <text class="label">数量：</text>
        <custom-interval-input
          v-model="product.quantity"
          :max="product.stock"
          @update:modelValue="updateQuantity"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const product = ref({
  name: '商品名称',
  price: 99.99,
  image: '/static/product.jpg',
  stock: 50,
  quantity: 1
})

const updateQuantity = (value) => {
  console.log('更新商品数量:', value)
  // 可以在这里更新购物车或发送 API 请求
}
</script>

<style scoped>
.product-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.product-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.product-price {
  color: #ff4757;
  font-size: 24rpx;
  margin-bottom: 12rpx;
}

.quantity-selector {
  display: flex;
  align-items: center;
}

.label {
  font-size: 24rpx;
  margin-right: 12rpx;
}
</style>
```

### 购物车数量调整

```vue
<template>
  <view class="cart-item">
    <view class="item-info">
      <text>{{ cartItem.name }}</text>
    </view>
    <view class="item-actions">
      <custom-interval-input
        v-model="cartItem.quantity"
        :max="99"
        class="cart-quantity"
        @update:modelValue="updateCart"
      />
      <text class="item-total">¥{{ cartItem.price * cartItem.quantity }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const cartItem = ref({
  id: 1,
  name: '购物车商品',
  price: 29.99,
  quantity: 1
})

const updateCart = (quantity) => {
  // 更新购物车数据
  console.log('更新购物车:', cartItem.value.id, quantity)
}
</script>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.item-actions {
  display: flex;
  align-items: center;
}

.cart-quantity {
  margin-right: 20rpx;
}

.item-total {
  font-weight: bold;
  color: #ff4757;
  min-width: 80rpx;
  text-align: right;
}
</style>
```

### 自定义样式主题

```vue
<template>
  <view class="theme-demo">
    <!-- 默认主题 -->
    <custom-interval-input v-model="count1" />

    <!-- 深色主题 -->
    <custom-interval-input
      v-model="count2"
      class="dark-theme"
    />

    <!-- 紧凑主题 -->
    <custom-interval-input
      v-model="count3"
      class="compact-theme"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const count1 = ref(1)
const count2 = ref(1)
const count3 = ref(1)
</script>

<style scoped>
/* 深色主题 */
.dark-theme :deep(.custom-interval-input__btn) {
  background: #333;
  color: #fff;
}

.dark-theme :deep(.custom-interval-input__input) {
  background: #333;
  color: #fff;
}

/* 紧凑主题 */
.compact-theme :deep(.custom-interval-input__btn),
.compact-theme :deep(.custom-interval-input__input) {
  width: 40rpx;
  height: 40rpx;
  font-size: 20rpx;
}

.compact-theme :deep(.custom-interval-input__input) {
  margin: 0 2rpx;
  padding: 0 5rpx;
}
</style>
```

## 表单集成

### 在表单中使用

```vue
<template>
  <form @submit="handleSubmit">
    <view class="form-item">
      <text class="label">选择数量：</text>
      <custom-interval-input
        v-model="formData.quantity"
        :max="100"
        name="quantity"
      />
    </view>

    <button form-type="submit">提交</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  quantity: 1
})

const handleSubmit = (event) => {
  console.log('表单数据:', formData.value)
  // 处理表单提交
}
</script>
```

## 性能优化建议

1. **避免频繁更新**：组件使用 watchEffect 监听 modelValue 变化，避免不必要的更新
2. **合理使用**：在列表中大量使用时考虑性能影响
3. **样式优化**：使用 CSS 变量或主题类统一管理样式

## 注意事项

1. **最小值限制**：组件固定最小值为 1，无法自定义
2. **输入限制**：用户无法直接输入数值，只能通过按钮调整
3. **图标依赖**：组件使用 iconfont 图标，确保项目中已引入相应图标库
4. **双向绑定**：使用 v-model 时确保父组件正确处理 update:modelValue 事件
5. **样式覆盖**：自定义样式时注意使用 `:deep()` 选择器穿透组件样式

## 兼容性

- ✅ 微信小程序
- ✅ H5
- ✅ App
- ✅ 支付宝小程序
- ✅ 百度小程序

该组件基于 uni-app 框架开发，支持所有 uni-app 支持的平台。

## 常见问题

### Q: 如何修改最小值限制？
A: 当前组件固定最小值为 1。如需自定义最小值，需要修改组件源码中的 `hasReduce` 计算属性：
```javascript
const hasReduce = computed(() => {
  return !(value.value > yourMinValue)
})
```

### Q: 如何添加输入框直接编辑功能？
A: 当前组件不支持直接输入。如需此功能，需要扩展组件，添加 input 事件的处理逻辑。

### Q: 为什么按钮点击没有反应？
A: 检查以下几点：
- 确认 v-model 绑定的值是否正确
- 检查是否达到了最大值或最小值限制
- 确认没有其他元素阻止事件冒泡

### Q: 如何自定义按钮图标？
A: 通过 CSS 覆盖图标字体或修改组件模板中的图标类名。

### Q: 如何在列表中正确使用？
A: 确保每个组件实例都有唯一的 key，并且 v-model 绑定到正确的数据源：
```vue
<custom-interval-input
  v-for="item in items"
  :key="item.id"
  v-model="item.quantity"
  :max="item.maxQuantity"
/>
```