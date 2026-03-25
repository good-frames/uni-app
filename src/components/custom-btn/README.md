# Custom Button 组件

一个可自定义样式和颜色的按钮组件，支持实心按钮和边框按钮两种样式。

## 功能特性

- 🎨 支持自定义按钮颜色
- 🔳 支持实心按钮和边框按钮两种样式
- 📱 适配 uni-app 多端使用
- 🎯 支持点击事件
- 📝 支持插槽内容

## 基本用法

```vue
<template>
  <custom-btn @click="handleClick">默认按钮</custom-btn>
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

## 属性 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `plain` | Boolean | `false` | 是否为边框按钮样式，true 为边框按钮，false 为实心按钮 |
| `color` | String | `'#42b883'` | 按钮的颜色，支持十六进制颜色值 |

## 事件 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `click` | 点击按钮时触发 | 无 |

## 插槽 Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 按钮内容，支持文本或 HTML |

## 样式说明

### 实心按钮 (plain=false)
- 背景色：使用 color 属性指定的颜色
- 文字颜色：白色 (#fff)

### 边框按钮 (plain=true)
- 背景色：透明
- 边框颜色：使用 color 属性指定的颜色
- 文字颜色：使用 color 属性指定的颜色

## 内置样式

组件包含以下内置样式：
- 高度：60rpx
- 内边距：0 20rpx
- 圆角：10rpx
- 字体大小：24rpx
- 布局：flex 居中

## 使用示例

### 不同颜色的按钮

```vue
<template>
  <view>
    <!-- 绿色按钮 -->
    <custom-btn color="#42b883" @click="handleGreenClick">
      绿色按钮
    </custom-btn>

    <!-- 红色按钮 -->
    <custom-btn color="#ff4757" @click="handleRedClick">
      红色按钮
    </custom-btn>

    <!-- 蓝色按钮 -->
    <custom-btn color="#3742fa" @click="handleBlueClick">
      蓝色按钮
    </custom-btn>
  </view>
</template>
```

### 边框按钮样式

```vue
<template>
  <view>
    <!-- 绿色边框按钮 -->
    <custom-btn plain color="#42b883" @click="handleClick">
      绿色边框按钮
    </custom-btn>

    <!-- 红色边框按钮 -->
    <custom-btn plain color="#ff4757" @click="handleClick">
      红色边框按钮
    </custom-btn>
  </view>
</template>
```

### 配合图标使用

```vue
<template>
  <custom-btn color="#42b883" @click="handleSubmit">
    <text class="iconfont icon-submit"></text>
    提交
  </custom-btn>
</template>
```

## 注意事项

1. 组件使用 rpx 单位，适配不同屏幕尺寸
2. 颜色属性支持标准的十六进制颜色值
3. 点击事件通过 `@click` 绑定
4. 组件内部使用 flex 布局确保内容居中
5. 边框按钮的边框宽度固定为 1rpx

## 兼容性

- ✅ 微信小程序
- ✅ H5
- ✅ App
- ✅ 支付宝小程序
- ✅ 百度小程序

该组件基于 uni-app 框架开发，支持所有 uni-app 支持的平台。