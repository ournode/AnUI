# canvas


- ## canvas 线
<div class="demo-block">
  <canvas-line id="canvasLine" :width="750" :height="300" :styleObject="{}" :is-color="true"></canvas-line>
</div>

  ### 参数

  ####  props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |---|--- |--- |--- |
| id | canvas唯一标识 | String | --  | canvas |
| dotsNum | 圆数量 | Number | --  | 50 |
| isColor| 黑白还是彩色 | Boolean | true | true/false |
| roundColor | 圆点颜色 | String | -- | #999 |
| lineColor | 直线颜色 | String | -- | #ccc |
| styleObject | 自定义style | -- | -- | {'position':'fixed','z-index': 99,'top': 0,'left': 0} |
| width | canvas宽度 | String | -- | window宽度 |
| height | canvas高度 | String | -- | window高度 |

- ## canvas wave
<div class="demo-block">
  <canvas-wave id="canvasWave" :width="750" :height="300" :is-color="true"></canvas-wave>
</div>

  ### 参数

  ####  props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |---|--- |--- |--- |
| id | canvas唯一标识 | String | --  | canvas |
| width | canvas宽度 | String | -- | window宽度 |
| height | canvas高度 | String | -- | window高度 |
