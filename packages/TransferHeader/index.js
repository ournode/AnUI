/**
 * @author monkeywang
 * Date: 17/11/9
 */
import transferHeader from './src/index.vue';

transferHeader.install = function (Vue) {
  Vue.component(transferHeader.name, transferHeader);
};

export default transferHeader;
