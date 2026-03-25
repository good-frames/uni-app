# Custom Checkbox 组件

一个功能强大的复选框组件，支持单选和多选模式，可自定义选项配置。

## 功能特性

- ✅ 支持单选和多选模式
- 🎨 自定义选项配置
- 🔧 灵活的属性映射
- 📱 适配 uni-app 多端使用
- 🎯 支持 v-model 双向绑定
- 📝 支持 change 事件

## 基本用法

### 单选模式

```vue
<template>
  <custom-checkbox
    v-model="selectedValue"
    :options="options"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('')

const options = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
  { value: 'orange', label: '橙子' }
]

const handleChange = (value) => {
  console.log('选中值:', value)
}
</script>
```

### 多选模式

```vue
<template>
  <custom-checkbox
    v-model="selectedValues"
    :options="options"
    multiple
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedValues = ref([])

const options = [
  { value: 'js', label: 'JavaScript' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' }
]

const handleChange = (value) => {
  console.log('选中值:', value)
}
</script>
```

## 属性 Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `modelValue` | String/Object/Number | 无 | 当前选中的值，支持 v-model 双向绑定 |
| `options` | Array | `[]` | 选项数组，每个选项包含 value 和 label 属性 |
| `multiple` | Boolean | `false` | 是否为多选模式，true 为多选，false 为单选 |
| `props` | Object | 见下方 | 选项属性的映射配置 |

### props 配置对象

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `primaryKey` | String | `'value'` | 选项的唯一标识字段 |
| `value` | String | `'value'` | 选项的值字段 |
| `label` | String | `'label'` | 选项的显示文本字段 |

## 事件 Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `update:modelValue` | 选中值改变时触发（v-model） | 当前选中的值 |
| `change` | 选中值改变时触发 | 当前选中的值 |

## 样式说明

组件包含以下样式：
- 选项采用浮动布局，自动换行
- 每个选项宽度：100rpx
- 高度：50rpx
- 右边距：20rpx（最后一个选项无右边距）
- 下边距：20rpx
- 圆角：50rpx
- 字体大小：22rpx

### 默认状态
- 背景色：$uni-bg-color-grey（灰色背景）
- 文字颜色：继承父元素

### 选中状态
- 背景色：#FDE6E9（浅红色背景）
- 文字颜色：#EC3132（深红色文字）

## 高级用法

### 自定义属性映射

当选项的数据结构与默认配置不符时，可以使用 props 属性进行映射：

```vue
<template>
  <custom-checkbox
    v-model="selectedValue"
    :options="fruitList"
    :props="{
      primaryKey: 'id',
      value: 'code',
      label: 'name'
    }"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('')

const fruitList = [
  { id: 1, code: 'apple', name: '苹果' },
  { id: 2, code: 'banana', name: '香蕉' },
  { id: 3, code: 'orange', name: '橙子' }
]
</script>
```

### 复杂对象选项

```vue
<template>
  <custom-checkbox
    v-model="selectedItems"
    :options="productList"
    multiple
    :props="{
      primaryKey: 'id',
      value: 'id',
      label: 'title'
    }"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedItems = ref([])

const productList = [
  { id: 1001, title: 'iPhone 13', price: 5999 },
  { id: 1002, title: 'MacBook Pro', price: 12999 },
  { id: 1003, title: 'iPad Air', price: 4599 }
]
</script>
```

## 注意事项

1. 在单选模式下，modelValue 应该是单个值（字符串、数字或对象）
2. 在多选模式下，modelValue 应该是数组
3. options 数组中的每个对象必须包含 props 配置中指定的字段
4. 组件会自动处理选项的选中状态，无需手动管理
5. 选中状态的样式会自动应用，无需额外配置
6. 选项支持自动换行布局，适合不同屏幕尺寸

## 兼容性

- ✅ 微信小程序
- ✅ H5
- ✅ App
- ✅ 支付宝小程序
- ✅ 百度小程序

该组件基于 uni-app 框架开发，支持所有 uni-app 支持的平台。