<template>
  <div ref="progressbar" ></div>
</template>
<script>

const Progressbar = require('progressbar.js')

export default {
  name: 'Progressbar',
  data () {
    return {
      progressbar: null
    }
  },
  props: {
    // 是否倒转展示, 表示进度是从0至1还是从1至0
    reverse: {
      type: Boolean
    },
    // 展示什么类型的进度条
    // Circle / SemiCircle /  Line /
    type: {
      type: String,
      required: true
    },
    // Progress Options
    // 参考: http://progressbarjs.readthedocs.io/en/latest/
    options: {
      type: Object,
      required: true
    }
  },
  beforeMount () {
  },
  mounted () {
    this.create()
  },
  activated () {
    const progressRemainTime = this.progressbar.value()
    this.set(progressRemainTime)
    this.animate(this.reverse ? 0 : 1, {
      duration: parseInt(this.options.duration * progressRemainTime)
    })
  },
  deactivated () {
    this.progressbar.stop()
  },
  methods: {
    create () {
      if (this.progressbar) this.destroy()
      this.progressbar = new Progressbar[this.type](this.$refs.progressbar, this.options)
      this.set(this.reverse ? 1 : 0)
      this.animate(this.reverse ? 0 : 1, this.options)
    },
    restart () {
      this.set(this.reverse ? 1 : 0)
      this.animate(this.reverse ? 0 : 1, this.options)
    },
    animate (progress, options, callback) {
      this.progressbar.animate(progress, Object.assign({}, this.options, options), callback)
    },
    set (progress) {
      this.progressbar.set(progress)
    },
    stop () {
      this.progressbar.stop()
    },
    value () {
      return this.progressbar.value()
    },
    setText (text) {
      this.progressbar.setText(text)
    },
    destroy () {
      this.progressbar.destroy()
    }
  }
}
</script>
