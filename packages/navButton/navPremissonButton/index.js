import Vue from 'vue'

export default Vue.component('NavPremissonButton', {
  props: {
    comp: {
      type: Object,
      required: true
    },
    buttonData: Array
  },
  render (createElement) {
    if (!this.comp) throw Error('必须传递父组件的this至comp属性上')
    if (!this.buttonData.length) {
      return (
        <el-button loading>加载中</el-button>
      )
    }
    return (
      <el-button-group>
        {
          this.buttonData.map(button => {
            // 没找到父对象上的方法的话则不生成按钮
            if (typeof (this.comp[button.resourceUrl]) !== 'function') {
              throw Error(`父组件中缺少按钮的事件方法: ${button.resourceUrl}`)
            } else if (button.isDisabled !== '' && typeof (this.comp[button.isDisabled]) !== 'function') {
              throw Error('定义了禁用方法名称，但在组件中找不到对应的方法体.')
            }
            return (
              <el-button
                icon={button.resourceImage}
                disabled={button.isDisabled === '' ? false : !this.comp[button.isDisabled]()}
                onClick={this.comp[button.resourceUrl]}>
                {button.resourceTitle}
              </el-button>
            )
          })
        }
      </el-button-group>
    )
  }
})
