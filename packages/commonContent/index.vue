<template>
    <div class="common-content" :style="{height: flexHeight }">
        <slot></slot>
    </div>
</template>

<script>
import CommonWrapper from '@/components/commonWrapper'

export default {
  name: 'CommonContent',
  props: {
    size: {
      type: String,
      default: 'small'
    },
    minHeight: {
      type: Number,
      default: 200
    },
    flex: {
      type: Number,
      default: 0
    }
  },
  data () {
    const mh = document.documentElement.clientHeight - this.flex > this.minHeight
      ? document.documentElement.clientHeight - this.flex
      : this.minHeight
    return {
      flexHeight: mh + 'px'
    }
  },
  mounted () {
    // 如果配置了flex属性, 则在组件加载完成后配置一个reisze监听,保证表格的高度为动态计算
    if (this.flex !== 0) {
      window.addEventListener('resize', this._initTableSize)
    } else {
      this.flexHeight = 'auto'
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this._initTableSize)
  },
  methods: {
    _initTableSize () {
      console.log("height",document.documentElement.clientHeight)
      const vm = this
      let timer = null
      // 这里增加一个延迟保证不会触发频次不会太高,减少开销
      if (timer) return
      timer = setTimeout(() => {
        const mh = document.documentElement.clientHeight - vm.flex > this.minHeight
          ? document.documentElement.clientHeight - vm.flex
          : this.minHeight
        vm.flexHeight = mh + 'px'
        timer = null
      }, 300)
    }
  },
  components: { CommonWrapper }
}
</script>

<style lang="scss">
.common-content {
    overflow-y: scroll
}
</style>
