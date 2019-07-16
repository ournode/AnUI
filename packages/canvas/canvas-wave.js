/**
 * @author monkeywang
 * Date: 17/11/9
 */
import CanvasWave from './src/wave.vue';

CanvasWave.install = function (Vue) {
  Vue.component(CanvasWave.name, Button);
};

export default CanvasWave;
