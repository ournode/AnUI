# timeline
时间轴组件

## 示例
<div class="demo-block">
    <time-line :list="[{title:'1',des:'1'},{title:'2',des:'2'}]">
    </time-line>
</div>

::: demo  一些描述
```vue

<template>
  <time-line :list="list"/>
</template>

<script>
export default {
  data() {
    return {
      list:[{title:'1',des:'1'},{title:'2',des:'2'}]
    };
  },
}
</script>


```
:::

## 参数

### props
| 参数名称      | 描述       | 类型   | 可选值（默认值）|
|------------- |----------- |---------  |---------  |
|list         |时间轴的列表 | Array  | - |
