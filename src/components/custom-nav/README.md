# Custom Navigation 组件

一个自定义的导航栏组件，适配微信小程序的胶囊按钮，提供统一的导航栏高度和样式。

## 功能特性

- 📱 自动适配微信小程序胶囊按钮
- 🎨 支持自定义背景色
- 📝 支持标题显示和插槽内容
- 📐 自动计算安全区域高度
- 🔧 响应式布局

## 基本用法

```vue
<template>
  <!-- 使用默认标题 -->
  <custom-nav title="页面标题" />

  <!-- 自定义背景色 -->
  <custom-nav title="设置页面" background="#67c23a" />

  <!-- 使用插槽自定义内容 -->
  <custom-nav>
    <view class="custom-content">
      <text>自定义导航栏内容</text>
    </view>
  </custom-nav>
</template>
```

## 属性 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `title` | String | `''` | 导航栏标题，当没有使用插槽时显示 |
| `background` | String | `'#42b883'` | 导航栏背景颜色 |

## 插槽 Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义导航栏内容，当存在时优先显示插槽内容 |

## 高度计算说明

组件会自动计算并设置合适的高度：

1. **获取胶囊按钮信息**：
   - 使用 `uni.getMenuButtonBoundingClientRect()` 获取胶囊按钮的位置和尺寸
   - 获取状态栏高度和胶囊按钮的上边距

2. **计算导航栏高度**：
   - 导航栏高度 = 胶囊按钮高度
   - 顶部内边距 = 胶囊按钮上边距
   - 右侧内边距 = 胶囊按钮宽度 + 10px（留出间距）

3. **最终高度**：
   - 总高度 = 状态栏高度 + 导航栏高度
   - 左侧内边距：20rpx
   - 底部内边距：6rpx

## 样式说明

### 默认样式
- 显示方式：flex
- 对齐方式：居中对齐
- 盒模型：content-box（内容盒模型）
- 标题字体大小：32rpx
- 标题颜色：白色 (#fff)
- 默认背景色：#42b883（绿色）

### 布局特点
- 使用弹性布局确保内容垂直居中
- 自动计算的安全区域避免与状态栏和胶囊按钮重叠
- 支持自定义背景色
- 响应式设计适配不同屏幕尺寸

## 高级用法

### 结合返回按钮使用

```vue
<template>
  <custom-nav background="#333">
    <view class="nav-content">
      <view class="nav-back" @click="goBack">
        <text class="iconfont icon-arrow-left"></text>
      </view>
      <view class="nav-title">页面标题</view>
      <view class="nav-action" @click="handleAction">
        <text>操作</text>
      </view>
    </view>
  </custom-nav>
</template>

<script setup>
const goBack = () => {
  uni.navigateBack()
}

const handleAction = () => {
  console.log('执行操作')
}
</script>

<style scoped>
.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.nav-back,
.nav-action {
  padding: 0 20rpx;
}

.nav-title {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
  color: #fff;
}
</style>
```

### 渐变背景效果

```vue
<template>
  <custom-nav title="渐变背景" background="transparent">
    <view class="gradient-bg"></view>
  </custom-nav>
</template>

<style scoped>
.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -1;
}
</style>
```

### 多行内容导航栏

```vue
<template>
  <custom-nav background="#fff">
    <view class="multi-line-nav">
      <view class="main-title">主标题</view>
      <view class="sub-title">副标题信息</view>
    </view>
  </custom-nav>
</template>

<style scoped>
.custom-nav {
  align-items: flex-start !important;
  padding-top: calc(var(--status-bar-height) + 10px) !important;
}

.multi-line-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.main-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.sub-title {
  font-size: 24rpx;
  color: #666;
  margin-top: 4rpx;
}
</style>
```

## 注意事项

1. **微信小程序适配**：
   - 组件会自动获取胶囊按钮信息来计算合适的高度
   - 确保在不同设备和微信版本上都能正确显示

2. **背景色设置**：
   - 建议设置与页面整体风格协调的背景色
   - 可以使用透明背景配合自定义背景内容

3. **内容布局**：
   - 使用插槽时注意内容的高度不要超出导航栏范围
   - 建议使用 flex 布局来组织导航栏内容

4. **性能优化**：
   - 组件在 onLoad 生命周期获取胶囊按钮信息
   - 避免在导航栏中放置过多复杂内容

## 兼容性

- ✅ 微信小程序（主要优化平台）
- ✅ H5
- ✅ App
- ✅ 支付宝小程序
- ✅ 百度小程序

> **注意**：在非微信小程序平台上，胶囊按钮相关的高度计算可能不适用，组件会使用合理的默认值。

该组件基于 uni-app 框架开发，专门为微信小程序的胶囊按钮设计，同时也兼容其他平台。