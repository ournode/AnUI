/**
 * @author monkeywang
 * Date: 17/11/9
 */
import CanvasLine from './src/line.vue';

CanvasLine.install = function (Vue) {
  Vue.component(CanvasLine.name, Button);
};

export default CanvasLine;
