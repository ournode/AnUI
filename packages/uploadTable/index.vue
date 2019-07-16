<template>
    <el-dialog title="批量导入"
    :visible.sync="isVisible"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel">
      <el-row>
        <el-col :span="24">导入开始行<input v-model="saveParams.startRow" type="number" value="1" style="width:50px;margin-bottom:20px;" >行</el-col>
      </el-row>
      <el-table :data="saveParams.TsysExcelList" border :height="height">
        <el-table-column property="xlsColid" label="导入文件列"></el-table-column>
        <el-table-column property="xlsColname" label="导入文件列名" ></el-table-column>
        <el-table-column property="xlsSysColname"  label="系统对应列">
          <template slot-scope="scope">
            <el-select v-model="scope.row.xlsSysColname"   placeholder="请选择" @change="changeOptions">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetOptions">重置</el-button>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
</template>
<script>
/**
* UploadTable Management Module
* ----------------------
* Author: dengshijun
* Date: 2018.05.24
*/
// api
import { uploadFileSave } from '@/api/common.js'
export default {
  name: 'UploadFileTable',
  props: {
    showUploadTable: {
      type: Boolean,
      default: false
    },
    pojo: {
      type: String
    },
    uploadData: {
      type: Object
    }
  },
  data () {
    return {
      isVisible: false,
      height: 300,
      tableData: [],
      fileName: '',
      options: [],
      saveParams: {
        TsysExcelList: [],
        startRow: 1,
        impPOJO: '', // 司机信息导入:TDriver 线路信息导入：TBusLine 车辆信息导入：TBus 设备信息导入:TDevice
        filename: ''
      }
    }
  },
  watch: {
    showUploadTable (isShow) {
      this.isVisible = isShow
    },
    uploadData (newVal) {
      this.uploadData = newVal
    }
  },
  mounted () {
    this.$nextTick(function () {
      const params = this.uploadData.data.title
      const options = this.uploadData.data.tableColumns
      this.handleData(params, options)
      this.getOptions(options)
      this.changeOptions(this.saveParams.TsysExcelList)
    })
  },
  methods: {
    cancel () {
      this.$emit('update:showUploadTable', false)
      this.isVisible = false
      this.saveParams.filename = ''
    },
    handleData (params, options) {
      const option = Object.values(options)
      for (var i = 0; i < params.length; i++) {
        this.saveParams.TsysExcelList.push({xlsColid: params[i].xlsColid, xlsSysColname: option[i], xlsColname: params[i].xlsColname})
      }
    },
    getOptions (params) {
      const labals = Object.keys(params)
      const values = Object.values(params)
      for (let i = 0; i < labals.length; i++) {
        this.options.push({label: labals[i], value: values[i]})
      }
    },
    changeOptions (newVal) {
      const v1 = this.saveParams.TsysExcelList
      var flag = false
      for (var i = 0; i < v1.length; i++) {
        if (flag) break
        if (v1[i].xlsSysColname === '' || v1[i].xlsSysColname == null) continue
        for (var j = 0; j < v1.length; j++) {
          if (i === j) continue
          if (v1[j].xlsSysColname === '' || v1[j].xlsSysColname == null) continue
          if (v1[i].xlsSysColname === v1[j].xlsSysColname) {
            this.$message({
              message: '请选择唯一的列',
              type: 'warning'
            })
            v1[j].xlsSysColname = ''
            flag = true
            break
          }
        }
      }
    },
    resetOptions () {
      const v1 = this.saveParams.TsysExcelList
      for (var i = 0; i < v1.length; i++) {
        v1[i].xlsSysColname = ''
      }
    },
    save () {
      this.saveParams.impPOJO = this.pojo
      this.saveParams.filename = this.uploadData.data.fileName
      const params = {
        TsysExcelList: this.saveParams.TsysExcelList,
        startRow: this.saveParams.startRow,
        impPOJO: this.saveParams.impPOJO,
        filename: this.saveParams.filename
      }
      uploadFileSave(params).then(res => {
        this.cancel()
        this.$emit('updateList')
        console.log('res', res)
      })
    }
  }
}
</script>
