# Custom Multiline Text 组件

一个智能的多行文本组件，支持行数限制、自动截断和展开提示功能。

## 功能特性

- 📏 支持自定义显示行数
- 📐 可配置行高
- 🔍 自动检测文本溢出
- 📝 支持自定义展开提示文案
- 🎨 渐变遮罩效果
- 📱 适配 uni-app 多端使用
- 🎯 支持插槽自定义内容

## 基本用法

```vue
<template>
  <!-- 基本使用 -->
  <custom-multiline-text
    text="这是一段很长的文本内容，当超过指定行数时会自动截断并显示省略号。"
    :line="2"
  />

  <!-- 自定义行高和提示文案 -->
  <custom-multiline-text
    text="这是一段很长的文本内容..."
    :line="3"
    :lineHeight="20"
    moreText="展开"
  />
</template>
```

## 属性 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `text` | String | `''` | 文本内容，当没有使用插槽时显示 |
| `line` | Number/String | `2` | 显示的行数 |
| `lineHeight` | Number/String | `18` | 行高（单位：px） |
| `moreText` | String | `'...'` | 更多提示文案 |

## 插槽 Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义文本内容，当存在时优先显示插槽内容 |
| `more` | 自定义展开提示内容 |

## 工作原理

组件通过以下步骤实现文本截断功能：

1. **容器设置**：使用固定高度和 overflow: hidden 限制显示区域
2. **高度计算**：容器高度 = 行高 × 行数 × 2（rpx 转换）
3. **文本测量**：通过 uni.createSelectorQuery 获取实际文本高度
4. **溢出检测**：比较实际文本高度与容器高度判断是否需要截断
5. **遮罩效果**：使用渐变背景创建平滑的截断效果

## 样式说明

### 容器样式
- 定位：相对定位
- 溢出：隐藏
- 宽度：100%

### 文本样式
- 宽度：100%
- 换行：normal
- 词换行：break-word
- 词断开：normal

### 更多提示样式
- 定位：绝对定位（右下角）
- 宽度：80rpx
- 文本对齐：右对齐
- 背景：线性渐变（从透明到白色）

### 渐变背景效果
```css
background: linear-gradient(90deg, transparent 10%, #fff 60%, #fff)
```

## 高级用法

### 自定义更多按钮

```vue
<template>
  <custom-multiline-text
    :line="2"
    :lineHeight="22"
  >
    这是一段很长很长的文本内容，超过了指定的行数限制，需要显示展开按钮。

    <template #more>
      <view class="custom-more">
        <text class="more-text">展开</text>
        <text class="iconfont icon-arrow-down"></text>
      </view>
    </template>
  </custom-multiline-text>
</template>

<style scoped>
.custom-more {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: linear-gradient(90deg, transparent 20%, #f5f5f5 80%, #f5f5f5);
  padding-left: 20rpx;
}

.more-text {
  color: #42b883;
  font-size: 24rpx;
  margin-right: 4rpx;
}
</style>
```

### 动态文本内容

```vue
<template>
  <view class="article-item">
    <view class="title">{{ article.title }}</view>
    <custom-multiline-text
      :text="article.content"
      :line="3"
      :lineHeight="20"
      class="content"
    />
    <view class="actions">
      <button @click="readMore">阅读全文</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const article = ref({
  title: '文章标题',
  content: '这是一篇很长的文章内容，包含了丰富的信息和详细的描述。文章的内容可能很长，需要在列表页面进行截断显示，点击阅读全文可以查看完整内容。'
})

const readMore = () => {
  // 跳转到文章详情页
  uni.navigateTo({
    url: '/pages/article/detail?id=' + article.value.id
  })
}
</script>

<style scoped>
.article-item {
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.content {
  margin: 10rpx 0;
}

.actions {
  text-align: right;
}
</style>
```

### 不同主题样式

```vue
<template>
  <view class="theme-demo">
    <!-- 浅色主题 -->
    <custom-multiline-text
      text="浅色主题下的文本截断效果"
      :line="2"
      class="light-theme"
    />

    <!-- 深色主题 -->
    <custom-multiline-text
      text="深色主题下的文本截断效果"
      :line="2"
      class="dark-theme"
    />
  </view>
</template>

<style scoped>
.light-theme {
  color: #333;
}

.light-theme .multiline-text-box__more--default {
  background: linear-gradient(90deg, transparent 10%, #fff 60%, #fff);
}

.dark-theme {
  color: #fff;
  background: #333;
}

.dark-theme .multiline-text-box__more--default {
  background: linear-gradient(90deg, transparent 10%, #333 60%, #333);
  color: #fff;
}
</style>
```

### 配合展开/收起功能

```vue
<template>
  <view class="expandable-text">
    <custom-multiline-text
      ref="textRef"
      :text="content"
      :line="isExpanded ? 0 : 2"
      :lineHeight="20"
      moreText="展开"
    />
    <button @click="toggleExpand" class="toggle-btn">
      {{ isExpanded ? '收起' : '展开' }}
    </button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('这是一段很长的文本内容，点击展开按钮可以查看完整内容，点击收起按钮可以隐藏多余内容。')
const isExpanded = ref(false)
const textRef = ref(null)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.expandable-text {
  position: relative;
}

.toggle-btn {
  position: absolute;
  bottom: -40rpx;
  right: 0;
  font-size: 24rpx;
  color: #42b883;
  background: none;
  border: none;
  padding: 0;
}
</style>
```

## 性能优化建议

1. **避免频繁更新**：文本内容变化时会重新计算高度，避免频繁更新文本
2. **合理使用插槽**：复杂的插槽内容可能影响性能
3. **批量操作**：大量使用该组件时考虑虚拟滚动
4. **行高设置**：使用合适的行高值，避免过小或过大

## 注意事项

1. **文本测量**：组件在 onMounted 生命周期测量文本高度，确保 DOM 已渲染完成
2. **异步计算**：文本高度计算是异步的，showMore 状态可能会有延迟
3. **样式继承**：组件内部文本样式会继承父元素的部分样式
4. **背景色依赖**：渐变遮罩默认使用白色背景，需要根据实际背景色调整
5. **rpx 转换**：组件内部将行高乘以 2 转换为 rpx 单位

## 兼容性

- ✅ 微信小程序
- ✅ H5
- ✅ App
- ✅ 支付宝小程序
- ✅ 百度小程序

该组件基于 uni-app 框架开发，支持所有 uni-app 支持的平台。

## 常见问题

### Q: 为什么文本截断效果不生效？
A: 检查以下几点：
- 确保文本内容足够长，超过指定的行数限制
- 检查父容器是否有合适的宽度
- 确认行高设置是否合理

### Q: 如何自定义截断背景色？
A: 通过 CSS 覆盖 `.multiline-text-box__more--default` 的 background 属性：
```css
.multiline-text-box__more--default {
  background: linear-gradient(90deg, transparent 10%, your-color 60%, your-color) !important;
}
```

### Q: 为什么在某些平台上效果不一致？
A: 不同平台对 CSS 的支持程度不同，建议在各平台测试确认效果。

### Q: 如何完全隐藏更多提示？
A: 设置 `moreText` 为空字符串，或者通过 CSS 隐藏：
```css
.multiline-text-box__more {
  display: none;
}
```