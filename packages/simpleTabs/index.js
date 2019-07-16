import Vue from 'vue' ;
import simpleTabs from './components/simpleTabs';
import TabItem from './components/items';

const components = [simpleTabs,TabItem]

components.forEach(component => {
  Vue.component(component.name, component);
})

export default components
