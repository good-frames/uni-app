# Custom Image 组件

一个功能完善的图片组件，支持加载状态、错误处理、懒加载等特性，提供更好的用户体验。

## 功能特性

- 🖼️ 支持 uni-image 所有属性
- ⏳ 加载状态显示
- ❌ 错误状态处理
- 🎞️ 加载完成动画
- 📱 支持懒加载
- 🎯 支持长按菜单
- 🔄 支持 WebP 格式
- 📝 支持自定义插槽

## 基本用法

```vue
<template>
  <custom-img
    src="https://example.com/image.jpg"
    mode="aspectFill"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<script setup>
const handleLoad = (event) => {
  console.log('图片加载成功', event)
}

const handleError = (event) => {
  console.log('图片加载失败', event)
}
</script>
```

## 属性 Props

### uni-image 原生属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `src` | String | `''` | 图片源地址 |
| `mode` | String | `'scaleToFill'` | 图片裁剪、缩放的模式 |
| `lazyLoad` | Boolean | `false` | 是否懒加载 |
| `fadeShow` | Boolean | `true` | 是否使用淡入效果 |
| `webp` | Boolean | `false` | 是否支持 webp 格式 |
| `showMenuByLongpress` | Boolean | `false` | 是否开启长按图片显示识别码菜单 |
| `draggable` | Boolean | `true` | 是否允许图片拖拽 |

### 自定义属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `completeTransition` | Boolean | `true` | 加载成功后是否显示过渡动画 |
| `errorImg` | String | 内置错误图 | 加载失败时显示的图片路径 |
| `loadingImg` | String | 内置加载图 | 加载中显示的图片路径 |

## 事件 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `load` | 图片加载成功时触发 | 原生事件对象 |
| `error` | 图片加载失败时触发 | 原生事件对象 |

## 插槽 Slots

| 插槽名 | 说明 |
|--------|------|
| `loading` | 自定义加载中状态的显示内容 |
| `error` | 自定义错误状态的显示内容 |

## 状态说明

组件包含三种状态：

### 1. 加载中状态 (loading)
- 显示 loadingImg 或通过 loading 插槽自定义的内容
- 默认显示内置的 loading.gif

### 2. 加载成功状态 (ok)
- 显示实际图片
- 如果 completeTransition 为 true，会显示 1.2 秒的淡出过渡动画

### 3. 加载失败状态 (error)
- 显示 errorImg 或通过 error 插槽自定义的内容
- 默认显示内置的错误提示图

## 高级用法

### 自定义加载和错误状态

```vue
<template>
  <custom-img
    src="https://example.com/image.jpg"
    :completeTransition="false"
  >
    <template #loading>
      <view class="custom-loading">
        <text>正在加载...</text>
      </view>
    </template>

    <template #error>
      <view class="custom-error">
        <text>图片加载失败</text>
        <button @click="retry">重试</button>
      </view>
    </template>
  </custom-img>
</template>

<script setup>
const retry = () => {
  // 重试逻辑
}
</script>

<style scoped>
.custom-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  background-color: #f5f5f5;
}

.custom-error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200rpx;
  background-color: #fee;
}
</style>
```

### 配合懒加载使用

```vue
<template>
  <view class="image-list">
    <custom-img
      v-for="(item, index) in imageList"
      :key="index"
      :src="item.url"
      mode="aspectFill"
      lazyLoad
      @load="handleImageLoad(index)"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const imageList = ref([
  { url: 'https://example.com/image1.jpg' },
  { url: 'https://example.com/image2.jpg' },
  { url: 'https://example.com/image3.jpg' }
])

const handleImageLoad = (index) => {
  console.log(`第 ${index + 1} 张图片加载完成`)
}
</script>
```

### 自定义错误和加载图片

```vue
<template>
  <custom-img
    src="https://example.com/image.jpg"
    :errorImg="require('@/static/error.png')"
    :loadingImg="require('@/static/loading.png')"
  />
</template>
```

## 样式说明

组件包含以下内置样式：
- 容器使用相对定位，占满父容器
- 所有状态（源图片、加载中、错误）都使用绝对定位
- 图片默认宽度高度都为 100%
- 加载完成过渡动画：1.2 秒淡出效果

### 过渡动画效果

当 completeTransition 为 true 时，图片加载完成后会显示一个白色遮罩，然后逐渐淡出，营造平滑的加载体验。

```css
@keyframes loading__transition {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

## 性能优化建议

1. **使用懒加载**：对于长列表中的图片，建议开启 lazyLoad
2. **合适的图片模式**：根据实际需求选择合适的 mode，避免不必要的图片处理
3. **错误处理**：提供合适的错误图片或自定义错误状态，提升用户体验
4. **过渡动画**：适当使用过渡动画，但不要过度影响性能

## 注意事项

1. src 为空时会直接显示错误状态
2. 组件会自动监听 src 变化并重置状态
3. 错误和加载中状态的图片路径支持相对路径和绝对路径
4. 过渡动画只在新图片加载完成后触发
5. 组件内部使用 ref 管理状态，确保状态切换的准确性

## 兼容性

- ✅ 微信小程序
- ✅ H5
- ✅ App
- ✅ 支付宝小程序
- ✅ 百度小程序

该组件基于 uni-app 框架开发，支持所有 uni-app 支持的平台。