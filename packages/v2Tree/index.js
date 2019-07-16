/**
 * @author calamus
 * Date: 19/4/30
 */
import SvgTree from './src/index.vue';

SvgTree.install = function (Vue) {
  Vue.component(SvgTree.name, SvgTree);
};

export default SvgTree;
