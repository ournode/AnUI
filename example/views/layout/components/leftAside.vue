<template>
  <div class="aside_iner">
            <p v-for="(item,index) in titleList" :key="index" class="introduce_title">
              <router-link :to="{'name': item.path}">{{item.title}}</router-link>
            </p>
            <p class="components_title">组件</p>
            <ul class="components_container" v-for="item in menuList" :key="item.title">
              <span class="classification" href="javascript:;">{{item.title}}</span>
              <li v-for="(list,index2) in item.list" :key="index2">
                <ul>
                  <li>
                    <router-link :to="{'path': list.path}">{{list.title}}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
</template>

<script>
export default {
  name:'AsideLayout',
  data(){
    return {
      titleList:[
        {
          title:'关于',
          path:'introduce'
        },
        {
          title:'快速开始',
          path:'start'
        },
        {
          title:'更新日志',
          path:'log'
        }
      ],
      menuList:[{
        title:'基础',
        list:[{
          title:'权限按钮',
          path:'authBtn'
        }]
      },{
        title:'布局',
        list:[{
          title:'canvas背景特效',
          path:'canvas'
        },{
          title:'分割tabs',
          path:'divideTabs'
        },{
          title:'分割线',
          path:'transfer'
        }]
      },{
        title:'模块',
        list:[{
          title:'分页',
          path:'pagination'
        },{
          title:'时间轴',
          path:'timeline'
        },{
          title:'树形UI',
          path:'svgTree'
        },{
          title:'高德地图',
          path:'gMap'
        }]
      },{
        title:'工具',
        list:[{
          title:'eventBus',
          path:'eventBus'
        },{
          title:'防抖',
          path:'debounce'
        },{
          title:'节流',
          path:'throttl'
        }]
      }]
    }
  }
}
</script>

<style scoped>
.aside_iner{
  padding-top: 2rem;
}
.introduce_title{
  font-size:16px;
  padding:0.2rem 0;
}
.introduce_title a{
  color:#ef5279;
}
.components_title{
  padding:0.5rem 0 0.2rem 0;
  color: #ef5279;
  font-weight: bold;
}
ul{
  list-style: none;
}
.components_container{
  margin-left:2rem;
  margin-top:0.5rem;
}
.components_container .classification{
  font-size:14px;
  color:#ef5279;
  cursor: text;
  user-select:none;
}
.components_container li{
  padding:0.2rem 0;
}
.components_container{
  margin-bottom: 0.5rem;
}
.components_container li a{
  text-shadow: 5px 5px 5px #80808087;
  color:#ef5279;
  font-size:16px;
  padding:0.4rem 0;
}
.components_container li a:hover{
        color: #ef858c;
        font-weight: bold;
        text-decoration: none;
        text-shadow: 5px 5px 5px #f5d5daee;
}

.components_container li >ul{
  margin-left:2rem;
}
</style>

