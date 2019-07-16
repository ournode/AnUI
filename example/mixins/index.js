/**
 * Vue Components Global Mixins
 */
import { getModuleButton } from '@/api/common'

export const mixins = {
  mounted () {
    // 后端获取自定义按钮
    const resourceName = this.$route.name
    if (resourceName) {
      getModuleButton({resourceName}).then(res => {
        this.buttonData = res
      })
    }
  }
}
