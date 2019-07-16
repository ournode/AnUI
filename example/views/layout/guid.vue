<template>
  <div class="guid_layout">
    <header>
      <header-layout />
    </header>
    <div class="guid_container">
      <div class="guid_scroll">
        <aside>
          <aside-layout />
        </aside>
        <div class="meow_docs">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideLayout from './components/leftAside'
import HeaderLayout from './components/head'
import {list } from '../../utils/list.js'
export default {
  name: 'GuidLayout',
  components:{
    AsideLayout,HeaderLayout
  },
  data () {
    return {
      treeData:list
    }
  }
}
</script>

<style scoped>


.guid_layout{
  min-height:100vh;
  overflow-y: hidden;
  background-color: #fff;
  /* background-image:
  linear-gradient(90deg, transparent 231px, #f5d5da 231px, #f5d5da 233px, transparent 233px),
  linear-gradient(#eee .1em, transparent .1em);
  background-size: 100% 1.2em; */
}
header{
  position: fixed;
  height:60px;
  width:100%;
  background: white;
  border-bottom:2px solid #f5d5da;
  box-shadow: 0px 0px 1px #f5d5da, 0px 0px 3px #f5d5da, 0px 0px 4px #f5d5da, 0 0 0.5px #f5d5da; /* 文字の影 */
  z-index:9999;
}

.guid_container{
  min-height:calc(100vh - 60px);
  height: 100%;
  width:100%;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: right top;
  background-image: url(https://cdn.calamus.xyz/meowui/scrollBg.jpg);
}
.guid_container .guid_scroll{
    width:80%;
    margin:0 auto;
    max-width:1440px;
    height: calc(100% - 60px);
    margin-top: 60px;
}

  .guid_scroll aside{
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 60px;
    transition: padding-top .3s;
    background-color: #fff;
    border: 1px #f2f2f2 solid;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 3px 20px 3px rgba(0, 64, 128, .2);
    z-index: 2 ;
  }
  .guid_scroll aside>div{
    overflow: auto;
    height: 100%;
    width:233px;
  }
 .guid_scroll .meow_docs{
    margin-left: 240px;
    margin-top: 60px;
    padding-bottom: 100px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px #f2f2f2 solid;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 3px 20px 3px rgba(0, 64, 128, .2);
    height: calc(100vh - 60px);
    overflow: auto;
    z-index:2;
}



</style>
