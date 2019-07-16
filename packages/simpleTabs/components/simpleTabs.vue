<template>
  <div class="xhe__simple__tabs">
    <slot  />
  </div>
</template>

<script>
import EventBus from '@/components/eventBus'
import Emitter from '@/mixins/emitter.js';

export default {
  name:'simpleTabs',
  componentName:'simpleTabs',
  mixins: [Emitter],
  data(){
    return {
      childVal:null
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
      value: {}
  },
  created(){
      this.$on('handleChange', value => {
        this.$emit('change', value);
      })
  },
  watch:{
    childVal(newVal,oldVal){
      if(newVal){
        this.$emit('change',newVal)
        this.$emit('change',this.value)
      }
    },
    value(value) {
        this.dispatch('simpleTabs', 'handleChange', [this.value]);
    }
  },
  mounted(){
    this.$emit('change',this.value)
  },
  methods:{

  }
}
</script>

<style lang="scss" >
.xhe__simple__tabs{
  display:flex;
  align-items: center;
  height:100%;
  .tab__item{
    display:inline-block;
    cursor:pointer;
    text-align:center;
    border-left:1px solid #777777 ;
    padding: 0 1rem;
    line-height: .8rem;
    text-decoration: none;
    color:#777;
  }
  .tab__item:first-child{
    border:none !important;
  }
}
</style>



