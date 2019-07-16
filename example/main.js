// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MeowUi from '../packages/index'
// import timeLine from '../packages/timeLine/src/index.vue'
import demoBlock from './components/demo-block.vue'
import 'highlight.js/styles/color-brewer.css';
import './assets/common.css';

Vue.component('demo-block', demoBlock)
// Vue.component(timeLine.name, timeLine)
Vue.use(MeowUi)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
