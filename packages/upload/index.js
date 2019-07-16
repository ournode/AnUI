
import UploadFile from './upload'

const install = function (Vue) {
  Vue.component(UploadFile.name, UploadFile)
}
const upload = { UploadFile, install }

export default upload
export { UploadFile }
