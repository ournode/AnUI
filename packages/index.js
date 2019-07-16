/**
 * @author calamus0427
 * Date: 19/4/30
 */

import Button from './button/index'
import TimeLine from './timeLine/index'
import SvgTree from './v2Tree/index'
import transferHeader from './transferHeader/index'
import CanvasLine from './canvas/canvas-line.js'
import CanvasWave from './canvas/canvas-wave.js'


const components = [
  Button,
  TimeLine,
  SvgTree,
  transferHeader,
  CanvasLine,
  CanvasWave
]

const install = (Vue) => {
  // if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


export default {
  install, //！！！导出的组件库必须有install才可以被vue.use调用
  /**组件列表 */
  Button,
  TimeLine,
  SvgTree,
  transferHeader,
  CanvasLine,
  CanvasWave
}
