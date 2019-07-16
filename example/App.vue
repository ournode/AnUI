<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body {
    padding:0;
    margin:0;
    height:100%;
    font-size:14px;
    font-family: "Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft Yahei", "STXihei" !important;
}
</style>
