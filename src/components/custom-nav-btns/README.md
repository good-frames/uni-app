# Custom Navigation Buttons 组件

一个简洁的导航按钮组件，提供返回上一页和返回首页的功能，常用于页面右上角或浮动按钮。

## 功能特性

- 🔙 返回上一页功能
- 🏠 返回首页功能
- 📱 适配 uni-app 多端使用
- 🎨 简洁的图标设计
- 🔧 易于集成和使用

## 基本用法

```vue
<template>
  <custom-nav-btns />
</template>
```

## 功能说明

组件包含两个按钮：

### 返回按钮 (icon-back)
- **功能**：返回上一页
- **实现**：使用 `uni.navigateBack(-1)`
- **图标**：iconfont icon-back

### 首页按钮 (icon-home)
- **功能**：返回应用首页
- **实现**：使用 `uni.reLaunch()` 跳转到首页
- **图标**：iconfont icon-home
- **默认首页路径**：`'/models/main/pages/home'`

## 样式说明

### 容器样式
- 显示方式：flex
- 对齐方式：居中对齐
- 高度：64rpx
- 圆角：64rpx（圆形按钮）
- 边框：1rpx solid #eee
- 背景：透明

### 按钮样式
- 显示方式：flex
- 对齐方式：居中对齐
- 高度：容器的 80%
- 内边距：0 20rpx
- 分割线：右侧按钮左侧有 1rpx solid #eee 分割线

## 高级用法

### 浮动导航按钮

```vue
<template>
  <view class="page-container">
    <!-- 页面内容 -->
    <view class="page-content">
      <!-- 你的页面内容 -->
    </view>

    <!-- 浮动导航按钮 -->
    <view class="floating-nav">
      <custom-nav-btns />
    </view>
  </view>
</template>

<style scoped>
.page-container {
  position: relative;
  height: 100vh;
}

.page-content {
  padding: 20rpx;
  padding-bottom: 100rpx; /* 为浮动按钮留出空间 */
}

.floating-nav {
  position: fixed;
  top: 100rpx;
  right: 20rpx;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 64rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}
</style>
```

### 自定义首页路径

如果需要修改默认的首页路径，可以通过扩展组件或修改源码来实现：

```vue
<template>
  <view class="nav-btns">
    <view class="nav-btn iconfont icon-back" @click="handleBack">
    </view>
    <view class="nav-btn iconfont icon-home" @click="handleCustomHome">
    </view>
  </view>
</template>

<script setup>
const handleBack = () => {
  uni.navigateBack(-1)
}

const handleCustomHome = () => {
  // 自定义首页路径
  uni.reLaunch({
    url: '/pages/index/index'  // 你的首页路径
  })
}
</script>
```

### 不同样式的导航按钮

```vue
<template>
  <view class="page-container">
    <!-- 页面内容 -->

    <!-- 透明背景版本 -->
    <view class="transparent-nav">
      <custom-nav-btns />
    </view>

    <!-- 深色背景版本 -->
    <view class="dark-nav">
      <custom-nav-btns />
    </view>
  </view>
</template>

<style scoped>
.transparent-nav {
  position: fixed;
  top: 100rpx;
  right: 20rpx;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 64rpx;
  backdrop-filter: blur(10px);
}

.dark-nav {
  position: fixed;
  top: 180rpx;
  right: 20rpx;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 64rpx;
}

.dark-nav .nav-btns {
  border-color: rgba(255, 255, 255, 0.2);
}

.dark-nav .nav-btn {
  color: #fff;
}

.dark-nav .nav-btn:last-child {
  border-left-color: rgba(255, 255, 255, 0.2);
}
</style>
```

## 使用场景

### 1. 页面右上角导航
适用于需要在页面右上角提供快速导航功能的场景。

### 2. 浮动导航按钮
作为浮动按钮固定在页面某个位置，方便用户随时使用。

### 3. 内容页面的辅助导航
在内容较多的页面中，提供快速返回的导航选项。

### 4. 深层级页面的导航
在多层级页面结构中，帮助用户快速返回首页。

## 注意事项

1. **首页路径**：
   - 默认首页路径为 `'/models/main/pages/home'`
   - 根据实际项目结构调整首页路径
   - 确保首页路径在应用中存在且可访问

2. **返回逻辑**：
   - 使用 `uni.navigateBack(-1)` 返回上一页
   - 如果页面历史记录为空，navigateBack 可能不会有效果
   - 考虑添加额外的逻辑处理无历史记录的情况

3. **样式适配**：
   - 组件使用 iconfont 图标，确保项目中已引入相应的图标库
   - 可以根据项目需求自定义按钮样式和布局

4. **位置摆放**：
   - 建议将组件放置在页面的固定位置
   - 避免遮挡重要内容
   - 考虑不同屏幕尺寸的适配

## 兼容性

- ✅ 微信小程序
- ✅ H5
- ✅ App
- ✅ 支付宝小程序
- ✅ 百度小程序

该组件基于 uni-app 框架开发，支持所有 uni-app 支持的平台。

## 性能优化建议

1. **合理使用**：不要在每個页面都使用，避免过度导航
2. **位置固定**：建议固定在页面的某个位置，避免频繁重排
3. **图标优化**：确保使用的 iconfont 图标库大小合理
4. **点击反馈**：可以添加点击动效提升用户体验