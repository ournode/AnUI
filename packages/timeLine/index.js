/**
 * @author calamus
 * Date: 19/4/30
 */
import TimeLine from './src/index.vue';
// Vue.component(TimeLine.name, TimeLine);

TimeLine.install = function (Vue) {
  Vue.component(TimeLine.name, TimeLine);
};

export default TimeLine;
