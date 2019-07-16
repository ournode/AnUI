<template>
  <chart :options="option" ref="charts"/>
</template>

<script>
  import CommonWrapper from '@/components/commonWrapper'
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/graph'
  import 'echarts/lib/component/polar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'

  export default {
    name: 'contractcharts',
    data () {
      return {
        option : {
          backgroundColor: "#fff",
          title: {
            text: "员工关系图",
            subtext: '1.线条粗细程度反应彼此亲密度\n2.圆圈大小反映同他人的协作总量',
          },
          top:'10%',
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}",
            enterable:true,
            confine:true
          },
          animationDurationUpdate: 500,
          animationEasingUpdate: "quinticInOut",
          color:  ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
          legend: {
            show: true,
            data: [
              { name: "Stark", textStyle: { color: "#999" } },
              { name: "异鬼", textStyle: { color: "#999" } },
              { name: "守夜人", textStyle: { color: "#999" } }
            ]
          },
          series: [
            {
              name:'员工协作关系图',
              type: "graph",
              layout: "force",
              force: {
                initLayout:'circular',
                // gravity:1000,
                repulsion: 500,
                edgeLength: [50, 100]
              },
              symbolSize: 40,
              roam: true,
              label: {
                normal: {
                  show: true
                }
              },
              draggable:true,
              focusNodeAdjacency:true,
              edgeSymbolSize: [4, 10],
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 10
                  },
                  formatter: "{c}"
                }
              },
              lineStyle: {
                normal: {
                  opacity: 0.9,
                  width: 1,
                  curveness: 0.3
                }
              },
              data: [
                {
                  name: "龙妈",
                  //圆圈大小
                  symbolSize: 50,
                  category: 1,
                  //自定义特殊的样式展示
                  itemStyle: {
                    // normal: {
                    //   borderColor: "#04f2a7",
                    //   borderWidth: 10,
                    //   shadowBlur: 20,
                    //   shadowColor: "#04f2a7",
                      // color: "\#001c43"
                    // }
                  }
                },
                {
                  name: "龙",
                  symbolSize: 30,
                  category: 1
                },
                {
                  name: "小恶魔",
                  symbolSize: 30,
                  category: 1
                },
                {
                  name: "二丫",
                  symbolSize: 30,
                  category: 0,
                },
                {
                  name: "琼恩·雪诺",
                  symbolSize: 30,
                  category: 0
                },
                {
                  name: "瑞肯",
                  category: 0
                },
                {
                  name: "异鬼",
                  category: 2
                },
                {
                  name: "狼",
                  category: 0
                },
                {
                  name: "三莎",
                  category: 0
                },
                {
                  name: "史塔克",
                  category: 0
                }
              ],
              links: [
                {
                  source: "龙妈",
                  target: "龙",
                  value: "业务合作",
                  lineStyle: {
                    normal: {
                      width:3,
                      //渐变色自定义线条颜色
                      // color: {
                      //   type: "linear",
                      //   x: 0,
                      //   y: 0,
                      //   x2: 0,
                      //   y2: 1,
                      //   colorStops: [
                      //     {
                      //       offset: 0,
                      //       color: "#e0f55a" // 0% 处的颜色
                      //     },
                      //     {
                      //       offset: 1,
                      //       color: "#639564" // 100% 处的颜色
                      //     }
                      //   ],
                      //   globalCoord: false // 缺省为 false
                      // }
                    }
                  }
                },
                {
                  source: "龙妈",
                  target: "小恶魔",
                  value: "业务合作",
                  lineStyle: {
                    normal: {
                      width:5
                    }
                  }
                },
                {
                  source: "龙妈",
                  target: "二丫",
                  value: "业务合作",
                  lineStyle: {
                    normal: {
                      width:2
                    }
                  }
                },
                {
                  source: "龙妈",
                  target: "琼恩·雪诺",
                  value: "业务合作",
                  lineStyle: {
                    normal: {
                      width:2,
                      curveness: -0.4
                    }
                  }
                },
                {
                  source: "龙妈",
                  target: "二丫"
                },
                {
                  source: "龙",
                  target: "瑞肯",
                  value: "业务合作",
                  lineStyle: {
                    normal: {
                      width:2
                    }
                  }
                },
                {
                  source: "龙",
                  target: "异鬼",
                  value: "业务合作",
                  lineStyle: {
                    normal: {
                      width:2
                    }
                  }
                },
                {
                  source: "二丫",
                  target: "狼",
                  value: "业务合作"
                },
                {
                  source: "琼恩·雪诺",
                  target: "狼",
                  value: "业务合作",
                  lineStyle: {
                    normal: {
                      width:2
                    }
                  }
                },
                {
                  source: "琼恩·雪诺",
                  target: "三莎",
                  value: "业务合作",
                  lineStyle: {
                    normal: {
                      width:3
                    }
                  }
                },
                {
                  source: "三莎",
                  target: "史塔克",
                  value: "业务合作",
                  lineStyle: {
                    normal: {
                      width:3
                    }
                  }
                }
              ],
              categories: [{ name: "Stark" }, { name: "异鬼" }, { name: "守夜人" }]
            }
          ]
}
      }
    },
    props: {
      // topFiveBrandData: {
      //   type: Array
      // },
      // topFiveBrandName: {
      //   type: Array
      // }
    },
    watch: {
      // topFiveBrandData(newVal) {
      //   this.option.series = newVal
      // },
      // topFiveBrandName(newVal) {
      //   this.option.xAxis.data = newVal
      // }
    },
    mounted () {
          this.selfAdaption ()
    },
    components: { chart: ECharts },
    methods:{
      selfAdaption ()  {
        let _this = this ;
        setTimeout(() => {
            window.addEventListener('resize', function () {
                _this.$refs.charts.resize();
            })
          }, 10)
      }
    }
  }
</script>

<style scoped>
.charts{
  height:100%;
  width: 100%;
}
</style>
