<template>
    <div>
      <el-dialog
        title=""
        :visible.sync="isVisible"
        width="600px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="cancel">
            <el-upload
                class="upload-demo"
                ref="upload"
                drag
                multiple
                :accept="fileType"
                :headers="isHasToken ? myHeaders : {}"
                :action="uploadActionUrl"
                :data="pojo ? uploadData : {}"
                :file-list="fileList"
                :auto-upload="false"
                :show-file-list="true"
                :limit='limitNum'
                :on-change="onChange"
                :on-exceed="handleExceed"
                :before-upload="onBeforeUpload"
                :on-remove="onRemove"
                :on-success="onSuccess"
                :on-error="uploadError"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">容量支持:{{fileSize}}MB( {{fileSize * 1024}}KB ), 文件格式:{{fileType}}, 一次最多可上传:{{limitNum}}个</div>
            </el-upload>
            <h3 slot="title">
              <i class="el-icon-upload"></i>文件上传管理器
            </h3>
            <span slot="footer" class="dialog-footer">
              <el-row>
                <el-col :span="14" v-show="isShowDown">
                   <el-alert title="请先下载需要填写的模板" type="success" show-icon :closable="false"></el-alert>
                </el-col>
                <el-col :span="10" :offset="isShowDown ? 0 : 14">
                    <el-button type="success" @click="downFile" :disabled="this.isDown" v-show="isShowDown">下载</el-button>
                    <el-button type="primary" @click="submitUpload" :disabled="!this.fileList.length">上传</el-button>
                    <el-button @click="complete" :disabled="this.isSuccess">完成</el-button>
                </el-col>
              </el-row>
            </span>
      </el-dialog>
    </div>
</template>
<script>
/**
* Upload Management Module
* ----------------------
* Author: dengshijun
* Date: 2018.05.24
*/
// 获取上传路径
// import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth.js'
import { BASE_PER_FIX_URL } from '@/utils/baseUrlPerFix.js'
// api
import { downloadFile } from '@/api/common'
const token = getToken()
export default {
  name: 'UploadFile',
  props: {
    showUpload: { // 是否显示upload模块
      type: Boolean,
      default: false
    },
    uploadFileUrl: { // 上传文件的地址
      type: String
    },
    limit: { // 上传文件的数量
      type: Number,
      default: 1
    },
    size: { // 上传文件总的大小
      type: Number,
      default: 0.5
    },
    acceptType: { // 上传文件的类型
      type: String,
      default: '.xls'
    },
    pojo: { // 上传文件的额外参数（非必传）
      type: [String, Number, Object]
    },
    isShowDown: { // 是否显示下载模板的btn（非必传）
      type: Boolean,
      default: false
    },
    isHasToken: { // 是否需要上传token
      type: Boolean,
      default: false
    }
  },
  watch: {
    showUpload (isShow) {
      this.isVisible = isShow
    }
  },
  data () {
    return {
      isVisible: false, // 打开Dialog 对话框开关 false：关
      isonChange: true, // 解决文件上传再次触发on-change事件 true:执行onChange方法
      isSuccess: true, // 完成可点击 true:不可点击
      isDown: false, // 下载按钮开关 false:可点击
      myHeaders: {Authorization: token}, // 添加认证码
      uploadActionUrl: BASE_PER_FIX_URL + this.uploadFileUrl, // 上传url
      fileList: [], // 上传的文件列表
      uploadData: {pojo: this.pojo}, // 上传的额外参数
      limitNum: this.limit, // 可上传的最大文件数
      fileSize: this.size, // 上传文件的总大小
      fileType: this.acceptType, // 上传文件的类型
      exportsParams: {} // 完成事件传给表格的数据

    }
  },
  computed: {
    // ...mapGetters(['token'])
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    cancel () {
      this.$emit('update:showUpload', false)
      this.isVisible = false
      this.fileList = []
      this.isDown = false
      this.isSuccess = true
    },
    // 完成操作
    complete () {
      this.$emit('complete', Object.assign({}, this.exportsParams))
      this.cancel()
    },
    // 下载文件
    downFile () {
      downloadFile({pojo: this.pojo}).then(res => {
        if (res.url) {
          window.location.href = res.url
        }
      })
    },
    // 数组去重
    distinct (arr) {
      for (let i = 0, len = arr.length; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          if (arr[i].name === arr[j].name) {
            arr.splice(j, 1)
            len--
            j--
          }
        }
      }
      return arr
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange (file, fileList) {
      if (this.isonChange) {
        // 完成可点击 true:不可点击
        this.isSuccess = true
        // 判断此文件是否存在 存在返回true
        const isexist = this.fileList.find((item, index, arr) => {
          return item.name === file.name
        })
        if (isexist) {
          this.$message({
            message: '此文件已存在！',
            type: 'warning'
          })
          this.fileList = this.distinct(fileList)
        }
        // 判断上传文件类型 存在就返回true
        const types = this.fileType.split(',')
        const extension = types.some(function (value) {
          return '.' + file.name.split('.')[1] === value
        })
        if (!extension) {
          this.$message({
            message: `上传模板必须是${this.fileType}格式中的一类!`,
            type: 'error'
          })
          this.fileList = fileList.filter((item, index, arr) => {
            return types.some(function (value) {
              return '.' + item.name.split('.')[1] === value
            })
          })
        } else {
          this.fileList = fileList.filter((item, index, arr) => {
            return types.some(function (value) {
              return '.' + item.name.split('.')[1] === value
            })
          })
          // 判断上传文件总大小
          let fileSizes = null
          for (var i = 0; i < this.fileList.length; i++) {
            fileSizes += this.fileList[i].size
          }
          const isLt1M = fileSizes / 1024 / 1024 < this.fileSize
          if (!isLt1M) {
            this.$message({
              message: `上传文件大小不能超过 ${this.fileSize}MB!,请分批上传`,
              type: 'error'
            })
          }
        }
        // 下载按钮开关 false:可点击
        this.isDown = true
      } else {
        // console.log('Skip again test')
      }
    },
    // 上传文件之前的钩子
    onBeforeUpload (file) {

    },
    // 文件超出个数限制时的钩子
    handleExceed (files, fileList) {
      if (fileList.length) {
        this.$message({
          message: `最多可上传${this.limitNum}个文件`,
          type: 'warning'
        })
      }
    },
    // 文件列表移除文件时的钩子
    onRemove (file, fileList) {
      this.fileList = fileList
      this.isDown = false
      // 判断上传文件总大小
      let fileSizes = null
      for (var i = 0; i < this.fileList.length; i++) {
        fileSizes += this.fileList[i].size
      }
      const isLt1M = fileSizes / 1024 / 1024 < this.fileSize
      if (!isLt1M) {
        this.$message({
          message: `上传文件大小不能超过 ${this.fileSize}MB!,请分批上传`,
          type: 'error'
        })
      }
    },
    // 文件上传成功时的钩子
    onSuccess (response, file, fileList) {
      this.isonChange = false
      this.isSuccess = false
      // console.log(response, file, fileList)
      this.exportsParams = response
      setTimeout(() => {
        this.isonChange = true
      }, 1000)
    },
    // 文件上传失败时的钩子
    uploadError (err, file, fileList) {
      this.isonChange = false
      this.isSuccess = false
      this.$message.error(err)
      setTimeout(() => {
        this.isonChange = true
      }, 1000)
    }

  }
}
</script>
<style lang="scss" scoped>
.upload-demo{
    margin: 0 auto;
}
</style>
