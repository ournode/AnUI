<template>
  <div class="amap-container" :style="{height: flexHeight}">
    <div class="svgBtn" v-show="chooseArea">
      <select v-model="svgChoose" placeholder="请选择选择区域" @change="changeSvg">
        <option label="圆" value="1" />
        <option label="折线" value="2" />
        <!-- <option label="椭圆" value="3" /> -->
        <!-- <option label="矩形" value="4" /> -->
        <option label="多边形" value="5" />
        <option label="自定义多边形" value="6" />
      </select>
      <div v-show="svgChoose == 1">
        <button @click="addCircle">添加圆</button>
        <button @click="editCircle">编辑圆</button>
        <button @click="exitCircle">结束编辑圆</button>
        <button @click="removeCircle">del circle</button>
      </div>
      <div v-show="svgChoose == 5">
        <button @click="addPolygon">添加多边形</button>
        <button @click="editPolygon">编辑多边形</button>
        <button @click="exitPolygon">结束编辑多边形</button>
        <button @click="removePolygon">del多边形</button>
      </div>
      <div v-show="svgChoose == 6">
        <button id="addmPolygon">添加自定义多边形</button>
        <button id="clearPolygon">删除多边形</button>
      </div>
      <div v-show="svgChoose == 2">
        <button  id="measureLine">两点测距离</button>
        <button  id="measureLineDel">删除直线</button>
      </div>
    </div>

    <amap-search-box v-show="searchArea" class="search-box" v-model="inputSearch"  :search-option="searchOption" :on-search-result="onSearchResult"></amap-search-box>
    <amap
      ref="amap"
      :vid="vid"
      :center="mapCenter"
      :zoom="zoom"
      :rotateEnable="rotateEnable"
      :resizeEnable="resizeEnable"
      :mapStyle="mapStyle"
      :amap-manager="amapManager"
      :plugin="plugin"
      :events="events"
    >
      <div v-show="false" id="panel"></div>
      <!-- 红色中心点 -->
      <amap-marker v-if="showCenter" zIndex="2000" class="aaaaa" icon="http://calamus-public.oss-cn-beijing.aliyuncs.com/xhe/default_2x-fs.png" @click.stop="markerClick" :clickable="clickable" :position="mapCenter"></amap-marker>
      <amap-info-window
        :position="currentWindow.position"
        :content="currentWindow.content"
        :visible="currentWindow.visible"
        :events="currentWindow.events"
        :autoMove="currentWindow.autoMove">
      </amap-info-window>
      <amap-marker  zIndex="2000" v-for="(marker,index) in firstMarkers" :key="index" :position="marker.poi" :content="setFirstMarkers(marker)" :title="marker.address" :events="marker.events" @click.stop="markerClick"></amap-marker>
      <amap-marker  zIndex="3000" v-for="(marker,index) in secondMarkers" :key="index" :position="marker.poi" :content="setSecondMarkers(marker)" :title="marker.address" @click.stop="markerClick"></amap-marker>

      <!-- <amap-marker  zIndex="3000" v-for="(marker,index) in thirdMarkers" icon="http://calamus-public.oss-cn-beijing.aliyuncs.com/xhe/default_2x-fs.png" :key="index" :position="marker.poi" :content="setSecondMarkers(marker)" :title="marker.address" @click.stop="markerClick"></amap-marker> -->

      <amap-marker cursor="pointer" :bubble="bubble" :clickable="clickable" v-for="(marker,index) in markers" :key="index" :position="marker.poi" @click.stop="markerClick"></amap-marker>
      <!-- circle -->
      <amap-circle :visible="circle.visible" :editable="circle.editable" :center="mapCenter" :radius="circle.radius" :fill-opacity="circle.fillOpacity" :events="circle.events"></amap-circle>
      <amap-polygon  :visible="polygon.visible" :editable="polygon.editable" :vid="polygon.id" :path="polygon.path" :draggable="polygon.draggable" :events="polygon.events"></amap-polygon>
    </amap>
    <div class="input-card" v-if="customMarker">
      <h4>轨迹回放控制</h4>
      <div class="input-item">
        <input type="button" class="btn" value="开始动画" id="start" @click.stop="startAnimation"/>
        <input type="button" class="btn" value="暂停动画" id="pause" @click.stop="pauseAnimation"/>
      </div>
      <div class="input-item">
        <input type="button" class="btn" value="继续动画" id="resume" @click.stop="resumeAnimation"/>
        <input type="button" class="btn" value="停止动画" id="stop" @click.stop="stopAnimation"/>
      </div>
    </div>
  </div>
</template>
<script>
  import VueAMap from 'vue-amap'
  import { lazyAMapApiLoaderInstance, AMapManager } from 'vue-amap'
  const amapManager = new VueAMap.AMapManager()
  /**
   * 高德地图组件
   * ----------------------
   * @Author: Calamus
   * @Date: 2018.09.13
   *
   * @prop {string} [vid= 'amap-demo'] - 地图id，调用多个地图id不能重复
   * @prop {Number} [flex= 0] - 地图高度，默认0为自动填满屏幕
   * @prop {Array}  [center=  [121.59996, 31.197646]] - 中心坐标经纬度
   * @prop {Number} [zoom= 16] - 默认放大比例
   * @prop {Boolean} [rotateEnable= true] - 是否可旋转
   * @prop {Boolean} [resizeEnable= true] - 大小是否根据容器变化自动变化
   * @prop {string} [mapStyle= 'normal'] - 地图风格
   * @prop {Boolean} [chooseArea= true] - 是否展示选择区域范围
   * @event {function} click - 获取点击地图后的坐标和地址中文
   */
  export default {
    name: 'GMap',
    props: {
      // 地图id，调用多个地图id不能重复
      vid: {
        type: String,
        default: 'amap-demo'
      },
      flex: {
        type: Number,
        default: 0
      },
      center: {
        type: Array,
        default: () => { return [121.59996, 31.197646] }
      },
      zoom: {
        type: Number,
        default: 16
      },
      rotateEnable: {
        type: Boolean,
        default: true
      },
      resizeEnable: {
        type: Boolean,
        default: true
      },
      mapStyle: {
        type: String,
        default: 'normal'
      },
      chooseArea: {
        type: Boolean,
        default: true
      },
      searchArea: {
        type: Boolean,
        default: true
      },
      showCenter: {
        type: Boolean,
        default: true
      },
      // 选择轨迹模式 1:推荐火车路线形式 2:自定义marker形式 3:巡航模式
      TruckDrivingFlag: {
        type: Number,
        default: 3
      },
      firstMarkers: {
        type: Array,
        default: () => []
      },
      secondMarkers: {
        type: Array,
        default: () => []
      },
      drivingable: {
        type: Boolean,
        default: false
      },
      // 途经坐标
      lineArr: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 起点
      lineStart: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 终点
      lineEnd: {
        type: Array,
        default: () => {
          return []
        }
      },
      trackStop: {
        type: Boolean,
        default: true
      },
      firstMarkerStyle: {
        // type:Object,
        // default: ()=>{
        //   return {
        //     width:'30px',
        //     color: '#000',
        //     top:'0',
        //     left:'0'
        //   }
        // }
      },
      secondMarkerStyle: {
        type: Object,
        default: () => {
          return {
            width: '30px',
            color: '#000',
            top: '0',
            left: '0'
          }
        }
      },
      heatMapVisible:{
        type:Boolean,
        default:false
      },
      heatmapData:{
        type:Array
      }
    },
    data () {
      let self = this
      return {
        amapManager,
        map: null,
        geocoder: null,
        ruler: null,
        mouseTool: null,
        mPolygon: null,
        flagBit: false, // 绘制围栏标志位
        renderFenceOk: false, // 绘制围栏成功标志位
        driving: null, // 轨迹
        fenceArr: [],
        // mapCenter:[],
        myCenter: this.center,
        svgChoose: '',
        chooseVisible: false,
        bubble: true,
        clickable: true,
        minHeight: 300,
        loaded: false,
        heatmap:null,
        markers: [],
        inputSearch: '',
        ellipse: {},
        rectangle: {},
        searchOption: {

        },
        trackArr: [],
        customMarker: undefined,
        startMarker:undefined,
        endMarker:undefined,
        currentAddress: '',
        currentPosition: [],
        currentWindow: {
          position: [0, 0],
          content: '',
          events: {},
          visible: false,
          autoMove: false
        },
        events: {
          init: (map) => {
            let addPolygonButton = document.getElementById('addmPolygon')
            let clearPolygonButton = document.getElementById('clearPolygon')

            // 绘制自定义多边形
            // 引入绘图插件  全局调用绘图插件
            self.mouseTool = new AMap.MouseTool(map)

            // 绘制围栏
            AMap.event.addDomListener(addPolygonButton, 'click', (resData) => {
              // self.mouseTool.polygon();
              self.mouseTool.measureArea()
              self.flagBit = true
            }, false)
            // 清除围栏
            AMap.event.addDomListener(clearPolygonButton, 'click', () => {
              // 移除计算的围栏
              self.mouseTool.close(true)
              self.flagBit = false
            }, false)
            // 绘制完成触发此事件
            self.mouseTool.on('draw', (resData) => {
              console.log('draw', resData.obj.getPath())
              self.flagBit = false
              self.mouseTool.close(false) // 停止画好的围栏
              // 把坐标点传给连接坐标点插件
              let arr = resData.obj.getPath().map((item) => {
                return [item.lng, item.lat]
              })
            })

            console.log('init', map.getCenter())
            map.getCity(result => {
              console.log('init map', result)
            })

            // 测距直线line
            let measureLine = document.getElementById('measureLine')
            let measureLineDel = document.getElementById('measureLineDel')
            // 引入测量距离插件 全局调用插件
            self.ruler = new AMap.RangingTool(map)
            var sMarker = {
              icon: new AMap.Icon({
                size: new AMap.Size(19, 31), // 图标大小
                image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png'
              })
            }
            var eMarker = {
              icon: new AMap.Icon({
                size: new AMap.Size(19, 31), // 图标大小
                image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b2.png'
              }),
              offset: new AMap.Pixel(-9, -31)
            }
            var lOptions = {
              strokeStyle: 'solid',
              strokeColor: '#FF33FF',
              strokeOpacity: 1,
              strokeWeight: 2
            }
            var rulerOptions = {startMarkerOptions: sMarker, endMarkerOptions: eMarker, lineOptions: lOptions}

            AMap.event.addDomListener(measureLine, 'click', (resData) => {
              self.ruler.turnOn()
              self.flagBit = true
            }, false)
            AMap.event.addListener(self.ruler, 'end', function (e) {
              self.ruler.turnOff(false)
              self.flagBit = false
            })
            // 移除line
            AMap.event.addDomListener(measureLineDel, 'click', () => {
              // self.mouseTool.close(true);
              self.ruler.turnOff(true)
              self.flagBit = false
            }, false)


            //热力图
            if(self.heatMapVisible){
              //初始化heatmap对象
              self.heatmap = new AMap.Heatmap(map, {
                radius: 25, //给定半径
                opacity: [0, 0.8],
                gradient:{
                  0.5: 'blue',
                  0.65: 'rgb(117,211,248)',
                  0.7: 'rgb(0, 255, 0)',
                  0.9: '#ffea00',
                  1.0: 'red'
                }
              })
              self.heatmap.setDataSet({
                data: self.heatmapData
              })
            }else{
              console.log("heatmap")
            }

            // 推荐轨迹
            if (self.drivingable && self.TruckDrivingFlag == 1) {
              this.driving = new AMap.TruckDriving({
                map: map,
                policy: 0,
                size: 1,
                city: 'shanghai',
                panel: 'panel'
              })
              var path = []
              path.push({lnglat: [116.303843, 39.983412]})// 起点
              path.push({lnglat: [116.321354, 39.896436]})// 途径
              path.push({lnglat: [116.407012, 39.992093]})// 终点
              this.driving.search(path, function (status, result) {
                // TODO something
                console.log('guiji')
              })
            }

            // 轨迹巡航
            else if (self.drivingable && self.TruckDrivingFlag == 2) {
              AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {
                if (!PathSimplifier.supportCanvas) {
                  alert('当前环境不支持 Canvas！')
                  return
                }

                var pathSimplifierIns = new PathSimplifier({
                  zIndex: 100,
                  // autoSetFitView:false,
                  map: map, // 所属的地图实例

                  getPath: function (pathData, pathIndex) {
                    return pathData.path
                  },
                  getHoverTitle: function (pathData, pathIndex, pointIndex) {
                    if (pointIndex >= 0) {
                      // point
                      return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length
                    }

                    return pathData.name + '，点数量' + pathData.path.length
                  },
                  renderOptions: {

                    renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
                  }
                })

                window.pathSimplifierIns = pathSimplifierIns

                // 设置数据
                pathSimplifierIns.setData([{
                  name: '路线0',
                  path: [
                    [116.405289, 39.904987],
                    [113.964458, 40.54664],
                    [111.47836, 41.135964],
                    [108.949297, 41.670904],
                    [106.380111, 42.149509],
                    [103.774185, 42.56996],
                    [101.135432, 42.930601],
                    [98.46826, 43.229964],
                    [95.777529, 43.466798],
                    [93.068486, 43.64009],
                    [90.34669, 43.749086],
                    [87.61792, 43.793308]
                  ]
                }])

                // initRoutesContainer(d);

                function onload () {
                  pathSimplifierIns.renderLater()
                }

                function onerror (e) {
                  alert('图片加载失败！')
                }

                // 对第一条线路（即索引 0）创建一个巡航器
                var navg1 = pathSimplifierIns.createPathNavigator(0, {
                  loop: false, // 循环播放
                  speed: 1000000, // 巡航速度，单位千米/小时
                  pathNavigatorStyle: {
                    width: 24,
                    height: 24,
                    // 使用图片
                    content: PathSimplifier.Render.Canvas.getImageContent('https://webapi.amap.com/images/car.png', onload, onerror),
                    strokeStyle: null,
                    fillStyle: null,
                    // 经过路径的样式
                    pathLinePassedStyle: {
                      lineWidth: 6,
                      strokeStyle: 'black',
                      dirArrowStyle: {
                        stepSpace: 15,
                        strokeStyle: 'red'
                      }
                    }
                  }
                })

                navg1.start()
              })
            }
            // 自定义路径轨迹

            else if (self.drivingable && self.TruckDrivingFlag == 3) {
              let len = self.lineArr.length
              var lineStart = self.lineStart
              var lineEnd = self.lineEnd
              // 创建一个 Icon
              var busIcon = new AMap.Icon({
                // 图标尺寸
                size: new AMap.Size(52, 26),
                // 图标的取图地址
                image: './static/bus.png',
                // 图标所用图片大小
                imageSize: new AMap.Size(52, 26)
              });
              if(lineStart.length){
                self.customMarker = new AMap.Marker({
                  map: map,
                  position: lineStart,
                  icon: busIcon,
                  offset: new AMap.Pixel(-26, -13),
                  autoRotation: true
                })
                self.startMarker = new AMap.Marker({
                  map: map,
                  position: lineStart,
                  icon: './static/startMarker.png',
                  offset: new AMap.Pixel(-26, -13)
                })
              }

              if(lineEnd.length){
                self.endMarker = new AMap.Marker({
                  map: map,
                  position: lineEnd,
                  icon: './static/endMarker.png',
                  offset: new AMap.Pixel(-26, -13)
                })
              }
              // let graspRoad
              // if(!graspRoad) {
              //   graspRoad = new AMap.GraspRoad()
              // }
              // self.lineArr.forEach((item,index) => {
              //   item.x = item.lng
              //   item.y = item.lat
              //   item.sp = 10
              //   item.ag = 0
              //   if(index == 0){
              //     item.tm = item.uploadTime
              //   } else {
              //     item.tm = item.uploadTime+index+1
              //   }
              //   delete item.lng
              //   delete item.lat
              //   delete item.uploadTime
              // })
              // console.log(self.lineArr)
              // graspRoad.driving(self.lineArr,function(error,result){
              //   console.log(error,result)
              //   if(!error){
              //     self.lineArr = result.data.points;
              //       console.log("newPath",self.lineArr)
              //     self.lineArr.forEach(item => {
              //       let lnglat = [item.x,item.y]
              //       self.trackArr.push(lnglat)
              //     })
              //     console.log('self.trackArr',self.trackArr)
              console.log(self.lineArr)
              self.lineArr.forEach(item => {
                let point = {lnglat:[item.lng,item.lat]}
                self.trackArr.push(point)
              })
              console.log(self.trackArr)
              var truckPathDriving = new AMap.TruckDriving({
                policy: 0, // 规划策略
                size: 2
              })
              var truckPath = []
              if(self.trackArr.length > 0){
                self.trackArr.forEach((item,index) => {
                  if(index < 300){
                    truckPath.push(item);//途经点
                  }
                })
              }else{
                truckPath.push({lnglat:[lineStart[0], lineStart[1]]});//起点
                truckPath.push({lnglat:[lineEnd[0], lineEnd[1]]});//终点
              }
              console.log(truckPath,self.trackArr)
              truckPathDriving.search(truckPath, function(status, result) {
                // result即是对应的货车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === 'complete') {
                  if (result.routes && result.routes.length) {
                    let planTruckPath = []
                    for (let i = 0, l = result.routes[0].steps.length; i < l; i++) {
                      let step = result.routes[0].steps[i]
                      for (let j = 0, n = step.path.length; j < n; j++) {
                        planTruckPath.push(step.path[j])
                      }
                    }
                    console.log(planTruckPath)
                    // 绘制轨迹
                    if(planTruckPath.length && lineStart.length && lineEnd.length){
                      var polyline = new AMap.Polyline({
                        map: map,
                        path: planTruckPath,
                        isOutline: true,
                        outlineColor: '#ffeeee',
                        borderWeight: 2,
                        strokeWeight: 5,
                        strokeColor: '#868686',
                        lineJoin: 'round',
                        strokeStyle:'dashed'
                      })
                      var passedPolyline = new AMap.Polyline({
                        map: map,
                        isOutline: true,
                        outlineColor: '#ffeeee',
                        borderWeight: 2,
                        strokeWeight: 5,
                        strokeColor: '#3167FF ',
                        lineJoin: 'round',
                      })
                      self.customMarker.on('moving', function (e) {
                        passedPolyline.setPath(e.passedPath)
                        if (e.passedPath.length - 1 >= 0) {
                          var end = e.passedPath[e.passedPath.length - 1]
                          if (Math.abs(end.lng - lineEnd[0]) <= 0.001 && Math.abs(end.lat - lineEnd[1]) <= 0.001) {
                            console.log('stop')
                            self.customMarker.stopMove()
                          }
                        } else {
                          self.customMarker.stopMove()
                        }
                      })
                      // map.setFitView([polyline])
                      // 开始运动
                      if (self.trackStop) {
                        console.log('start')
                        self.customMarker.moveAlong(planTruckPath, 5000)
                        var truckDriving = new AMap.TruckDriving({
                          policy: 0, // 规划策略
                          size: 2
                        })
                        var path = []
                        if(planTruckPath.length > 0){
                          path.push({lnglat:[planTruckPath[planTruckPath.length-1].lng, planTruckPath[planTruckPath.length-1].lat]});//起点
                        }else{
                          path.push({lnglat:[lineStart[0], lineStart[1]]});//起点
                        }
                        path.push({lnglat:[lineEnd[0], lineEnd[1]]});//终点
                        console.log(path)
                        truckDriving.search(path, function(status, result) {
                          // result即是对应的货车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                          if (status === 'complete') {
                            if (result.routes && result.routes.length) {
                              // drawRoute(result.routes[0])
                              // var path = parseRouteToPath(result.routes[0])
                              var path = []

                              for (var i = 0, l = result.routes[0].steps.length; i < l; i++) {
                                var step = result.routes[0].steps[i]
                                for (var j = 0, n = step.path.length; j < n; j++) {
                                  path.push(step.path[j])
                                }
                              }
                              var routeLine = new AMap.Polyline({
                                path: path,
                                isOutline: true,
                                outlineColor: '#ffeeee',
                                borderWeight: 2,
                                strokeWeight: 5,
                                strokeColor: '#868686',
                                lineJoin: 'round',
                                strokeStyle:'dashed'
                              })
                              routeLine.setMap(map)
                              map.setFitView([ polyline, routeLine ])
                            }
                          } else {
                            console.error('获取货车规划数据失败：' + result)
                          }
                        })
                      } else {
                        console.log('resetStop')
                        self.customMarker.stopMove()
                      }
                    }
                    else{
                      map.setFitView()
                    }
                  }
                }
              })
            }
          },
          'moveend': () => {
          },
          'zoomchange': (e) => {
            console.log("zoomChange",e,this.zoom)
          },
          'click': (e) => {
            if (!this.flagBit) {
              this.chooseVisible = true
              let { lng, lat } = e.lnglat
              this.mapCenter = [lng, lat]
              this.getAddress([lng, lat])
              let message = self.getAddress([lng, lat])
              this.$nextTick(() => {
              })
            }
          }
        },
        plugin: [ 'AMap.ToolBar','AMap.Heatmap','AMap.GraspRoad','AMap.TruckDriving', 'AMap.RangingTool', 'AMap.MouseTool', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Autocomplete', 'AMap.EllipseEditor', 'AMap.RectangleEditor', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'Geolocation'],
        circle: {
          editable: false,
          visible: false,
          center: [121.5273285, 31.21515044],
          radius: 1000,
          fillOpacity: 0.5,
          events: {
            click: () => {
              console.log('click')
            }
          }
        },
        polygon: {
          id: '1',
          visible: false,
          editable: false,
          draggable: true,
          path: [],
          events: {
            click: () => {
              console.log('click polygon')
              console.log(amapManager.getComponent(0))
              console.log(this.$refs.map.$$getCenter())
              console.log(this.$refs.polygon_0[0].$$getPath())
            }
          }
        }
      }
    },
    mounted () {
      this.initMap()
    },
    computed: {
      flexHeight () {
        var mh = document.documentElement.clientHeight - this.flex > this.minHeight
          ? document.documentElement.clientHeight - this.flex
          : this.minHeight
        console.log('height', mh)
        return mh + 'px'
      },
      mapCenter: {
        get () {
          return this.myCenter
        },
        set (value) {
          this.myCenter = value
        }
      }
    },
    watch: {
      svgChoose (newVal, oldVal) {
        switch (newVal) {
          case '1':
            break
          case '2':
            break
        }
      },
      center (val) {
        this.myCenter = val
      },
      firstMarkers (val) {
        let self = this
        if (val.length) {
          if(val.length == 1 ){
            this.myCenter = val[0].poi ;
            val[0].events = {
              mouseover: (e) => {
                console.log(e)
                if (val[0].info && val[0].info.length) {
                  console.log(val[0].info)
                  self.currentWindow.position = [e.lnglat.lng, e.lnglat.lat]
                  self.currentWindow.visible = true
                  let contentText = ''
                  val[0].info.forEach(item => {
                    contentText += '<div><span>' + '客户编号:' + item.name + '</span></div><div><span>' + '客户姓名:' + item.title + '</span></div><div><span>' + '客户地址:' + item.address + '</span></div>'
                  })
                  self.currentWindow.content = contentText
                }
              },
              mouseout: (e) => {
                self.currentWindow.visible = false
              }
            }
          }else{
            let latSum = 0
            let lngSum = 0
            val.forEach(poi => {
              let lng = poi.poi[0]
              let lat = poi.poi[1]
              lngSum += lng
              latSum += lat
              poi.events = {
                mouseover: (e)=>{
                  console.log(e)
                  if(poi.info && poi.info.length){
                    console.log(poi.info)
                    self.currentWindow.position = [e.lnglat.lng,e.lnglat.lat]
                    self.currentWindow.visible = true
                    let contentText = ''
                    poi.info.forEach(item => {
                      contentText +='<div><span>'+'客户编号:'+item.name+'</span></div><div><span>'+'客户姓名:'+item.title+'</span></div><div><span>'+'客户地址:'+item.address+'</span></div>'
                    })
                    self.currentWindow.content =contentText
                  }
                },
                mouseout: (e)=>{
                  self.currentWindow.visible = false
                },
              }
            })
            // this.mapCenter = [lngSum / val.length,latSum / val.length];
          }
          setTimeout(function () {
            let map = amapManager.getMap()
            let markers = map.getAllOverlays('marker');
            map.setFitView(markers)
          },100)
        }
      },
      secondMarkers (val) {
        if (val.length) {
          if(val.length == 1 ){
            this.myCenter = val[0].poi ;
          }else{
            let latSum = 0
            let lngSum = 0
            val.forEach(poi => {
              let lng = poi.poi[0]
              let lat = poi.poi[1]
              lngSum += lng
              latSum += lat
            })
            // this.mapCenter = [lngSum / val.length,latSum / val.length];
          }
          setTimeout(function () {
            let map = amapManager.getMap()
            let markers = map.getAllOverlays('marker');
            map.setFitView(markers)
          },100)
        }
      },
      heatmapData(val){
        if(val){
          this.heatmap.setDataSet({
            data: val,
            max: 100
          })
        }
      }
    },
    methods: {
      initMap () {
        let self = this
        // this.mapCenter = this.center ;
        this.geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        this.getAddress(this.mapCenter,true)
        this.getLocation('上海市')
        if (this.firstMarkers.length) {
          let map = amapManager.getMap()
          // setTimeout(() => { map.setFitView() }, 100)
          if(this.firstMarkers.length == 1 ){
            this.myCenter = this.firstMarkers[0].poi
            this.firstMarkers[0].events = {
              mouseover: (e) => {
                console.log(e)
                if (this.firstMarkers[0].info && this.firstMarkers[0].info.length) {
                  console.log(this.firstMarkers[0].info)
                  self.currentWindow.position = [e.lnglat.lng, e.lnglat.lat]
                  self.currentWindow.visible = true
                  let contentText = ''
                  this.firstMarkers[0].info.forEach(item => {
                    contentText += '<div><span>' + '客户编号:' + item.name + '</span></div><div><span>' + '客户姓名:' + item.title + '</span></div><div><span>' + '客户地址:' + item.address + '</span></div>'
                  })
                  self.currentWindow.content = contentText
                }
              },
              mouseout: (e) => {
                self.currentWindow.visible = false
              }
            }
          }else{
            let latSum = 0
            let lngSum = 0
            this.firstMarkers.forEach(poi => {
              let lng = poi.poi[0]
              let lat = poi.poi[1]
              lngSum += lng
              latSum += lat
              poi.events = {
                mouseover: (e)=>{
                  console.log(e)
                  if(poi.info && poi.info.length){
                    console.log(poi.info)
                    self.currentWindow.position = [e.lnglat.lng,e.lnglat.lat]
                    self.currentWindow.visible = true
                    let contentText = ''
                    poi.info.forEach(item => {
                      contentText +='<div><span>'+'客户编号:'+item.name+'</span></div><div><span>'+'客户姓名:'+item.title+'</span></div><div><span>'+'客户地址:'+item.address+'</span></div>'
                    })
                    self.currentWindow.content =contentText
                  }
                },
                mouseout: (e)=>{
                  self.currentWindow.visible = false
                },
              }
            })
            this.mapCenter = [lngSum / this.firstMarkers.length,latSum / this.firstMarkers.length];
          }
          setTimeout( ()=> {
            let map = amapManager.getMap()
            let markers = map.getAllOverlays('marker');
            map.setFitView(markers)
          },100)
        }
        if (this.secondMarkers.length) {
          let map = amapManager.getMap()
          setTimeout(() => { map.setFitView() }, 100)
          if(this.secondMarkers == 1 ){
            this.myCenter = this.secondMarkers[0].poi ;
          }else{
            let latSum = 0
            let lngSum = 0
            this.secondMarkers.forEach(poi => {
              let lng = poi.poi[0]
              let lat = poi.poi[1]
              lngSum += lng
              latSum += lat
            })
            this.mapCenter = [lngSum / this.secondMarkers.length,latSum / this.secondMarkers.length];
          }
        }
        setTimeout( ()=> {
          let map = amapManager.getMap()
          let markers = map.getAllOverlays('marker');
          map.setFitView(markers)
        },100)
      },
      // 经纬度返回地址
      getAddress (location,noClicked) {
        var address
        this.geocoder.getAddress(location, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              this.currentAddress = result.regeocode.formattedAddress
              if(!noClicked){
                this.$emit('click', {'lng': location[0], 'lat': location[1], 'address': this.currentAddress, 'addressComponent': result.regeocode.addressComponent})
              }
              this.$nextTick()
            }
          }
        })
        return this.currentAddress
      },
      // 地址返回经纬度列表
      getLocation (address) {
        this.geocoder.getLocation(address, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            // result中对应详细地理坐标信息
            console.log('result', result.geocodes[0].location)
            let { lng, lat } = result.geocodes[0].location
            this.currentPosition = [lng, lat]
          }
        })
        return this.currentPosition
      },
      addMarker: function () {
        let lng = 121.5 + Math.round(Math.random() * 1000) / 10000
        let lat = 31.197646 + Math.round(Math.random() * 500) / 10000
        this.markers = []
        this.markers.push([lng, lat])
      },
      onSearchResult (pois) {
        console.log('po', this.inputSearch, pois)
        let latSum = 0
        let lngSum = 0
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi
            let address = poi.address
            lngSum += lng
            latSum += lat
            // this.markers = []
            // this.markers.push({'poi': [poi.lng, poi.lat], 'address': address})
          })
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          }
          this.mapCenter = [pois[0].lng,pois[0].lat]
          this.getAddress([pois[0].lng,pois[0].lat])
          // this.$emit('click', {'lat': pois[0].lng, 'lng': pois[0].lat, 'address': pois[0].name})

        }
        console.log('mar', this.markers)
      },
      markerClick (res) {
        console.log('markerClick', res)
      },
      setFirstMarkers (marker) {
        return ('<div style="position: relative"><img src="https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png" width="28px" ><div style=' + '"' + this.firstMarkerStyle.name + '"' + '>' + marker.name + '</div><div style=' + '"' + this.firstMarkerStyle.title + '"' + '>'+marker.title+'</div></div>')
      },
      setSecondMarkers (marker) {
        return ('<div style="position: relative"><img src="./static/busTag.jpg" width="28px" ><div style=' + '"' + this.secondMarkerStyle.name + '"' + '>' + marker.name + '</div><div style=' + '"' + this.secondMarkerStyle.title + '"' + '>'+marker.title+'</div></div>')
      },
      // 高德SDK实践
      // 圆
      changeSvg (res) {
        console.log(res)
      },
      addCircle () {
        this.circle.visible = true
      },
      editCircle () {
        this.circle.editable = true
      },
      exitCircle () {
        this.circle.editable = false
      },
      removeCircle () {
        this.circle.editable = false
        this.circle.visible = false
      },
      // 椭圆
      addEllipse () {
        // this.map = this.amapManager.getMap();
        this.ellipse = new AMap.Ellipse({
          map: this.map,
          center: this.mapCenter,
          radius: [ 4000, 6000 ],
          strokeColor: 'red',
          strokeWeight: 10,
          strokeOpacity: 0.5,
          strokeDasharray: [30, 10],
          strokeStyle: 'dashed',
          fillColor: 'blue',
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          bubble: false
        })
        this.ellipse.setMap(this.map)
      },
      editEllipse () {
        return new AMap.EllipseEditor(this.map, this.ellipse).open()
      },
      exitEllipse () {
        return new AMap.EllipseEditor(this.map, this.ellipse).close()
      },
      // 多边形
      addPolygon () {
        let map1 = this.mapCenter
        let map2 = [this.mapCenter[0], this.mapCenter[1]]
        let map3 = [this.mapCenter[0] + 0.002, this.mapCenter[1]]
        let map4 = [this.mapCenter[0] + 0.002, this.mapCenter[1] + 0.002]
        let map5 = [this.mapCenter[0], this.mapCenter[1] + 0.002]
        this.polygon.path = [map2, map3, map4, map5, map2]
        this.polygon.visible = true
      },
      editPolygon () {
        this.polygon.editable = true
      },
      exitPolygon () {
        this.polygon.editable = false
      },
      removePolygon () {
        this.polygon.editable = false
        this.polygon.visible = false
      },
      startAnimation () {
        this.customMarker.moveAlong(this.trackArr, 5000);
      },
      pauseAnimation () {
        this.customMarker.pauseMove();
      },
      resumeAnimation () {
        this.customMarker.resumeMove();
      },
      stopAnimation () {
        this.customMarker.stopMove();
      }
    }
  }
</script>
<style lang="scss" scoped>
  .amap-container {
    position: relative;
  }
  .amap-demo {
    height: 514px;
  }
  .search-box {
    position: absolute;
    top: 15px;
    left: 70px;
  }
  .market-choose{
    width: 25px;
    height: 34px;
    color: #e90000;
    background: url(https://www.amap.com/assets/img/poi-marker.png) no-repeat;
    cursor: pointer;
    background-size: 437px 267px;
    background-position: -359px -3px;
  }
  .svgBtn{
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 10000;
  }
  #panel{
    position: fixed;
    top:10px;
    right: 10px;
    width: 300px;
  }
  .input-card{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
</style>
