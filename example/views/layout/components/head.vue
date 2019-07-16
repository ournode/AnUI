<template>
  <div class="header">
    <router-link :to="{path: '/'}">
      <img class="logo" src="https://cdn.calamus.xyz/meowui/logo.jpeg" alt="">
    </router-link>
    <p>
      <router-link :to="{path: '/'}">MeowUI</router-link>
    </p>
    <div class="links">
      <div class="link_items">
        <a href="https://github.com/calamus0427/MeowMeowUI" target="_blank">github</a>
        <a class="aboutMe"  href="javascript:;">
          <span @mouseleave="onMouseleave" @mouseenter="onMouseenter">更多</span>
          <div  :style="{'top':top,'left':left,'width':'400px'}">
            <img src="https://cdn.calamus.xyz/meowui/logo.jpeg" alt="">
            <div ref="poper" class="des">
              <p><span>author:</span><a href="//www.calamus.xyz" target="_blank">calamus</a></p>
              <p><span>github:</span><a href="https://github.com/calamus0427" target="_blank">https://github.com/calamus0427</a></p>
              <p><span>email:</span><a href="kiz.calamus@gmail.com" target="_blank" >kiz.calamus@gmail.com</a></p>
              <p><span>cnblog:</span><a href="https://www.cnblogs.com/calamus" target="_blank">https://www.cnblogs.com/calamus</a> </p>
              <p><span>每日前端:</span><a href="http://calamus.wiki/daily-FE/" target="_blank">http://calamus.wiki/daily-FE/</a></p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'headerLayout',
  data(){
    return{
      top:'60px',
      left:'0px'
    }
  },
  methods: {
    onMouseleave(e){
      console.log('onMouseleave',window)
    },
    onMouseenter(e){
      console.log("e",e.clientY)
      this.top = e.clientY + 30 + 'px'
      this.left = e.clientX - 400  + 'px'
      console.log("refs",e.clientX - this.$refs.poper.clientWidth  + 'px',this.left)


    }
  }
}
</script>

<style scoped>
@keyframes rubberBand {
    from {
        transform: scale3d(1, 1, 1);
    }

    30% {
        transform: scale3d(1.25, 0.75, 1);
    }

    40% {
        transform: scale3d(0.75, 1.25, 1);
    }

    50% {
        transform: scale3d(1.15, 0.85, 1);
    }

    65% {
        transform: scale3d(0.95, 1.05, 1);
    }

    75% {
        transform: scale3d(1.05, 0.95, 1);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}

@keyframes headShake {
    0% {
        transform: translateX(0);
    }

    6.5% {
        transform: translateX(-6px) rotateY(-9deg);
    }

    18.5% {
        transform: translateX(5px) rotateY(7deg);
    }

    31.5% {
        transform: translateX(-3px) rotateY(-5deg);
    }

    43.5% {
        transform: translateX(2px) rotateY(3deg);
    }

    50% {
        transform: translateX(0);
    }
}
.header{
  display: flex;
  align-items: center;
  width:100%;
  height:100%;
  z-index:9999;
}
.header .logo{
  width:50px;
  border-radius:50%;
  margin-left:1rem;
}
.header>p a{
  margin-left:1rem;
  font-size:18px;
  font-weight: bold;
  color: #ef858c; /* 文字色 */
	text-shadow: 0px 0px 1px yello, 0px 0px 3px yello, 0px 0px 4px yello, 0 0 0.5px yello; /* 文字の影 */
}
.header .logo:hover{
  animation: headShake 1000ms both;
}
.header .links{
  width:100%
}
.header .links .link_items{
  float:right
}
.header .links .link_items a{
  color:#ef858c;
  padding:0 1.5rem;
}
.header .aboutMe{
  display:inline-block;
  /* position: relative; */
}
.header .aboutMe span:hover+div{
   opacity: 1;
}
.header .aboutMe span+div:hover{
   opacity: 1;
}
.header .aboutMe>div{
  opacity: 0;
  position: absolute;
  /* top: 35px;
  right: 20px; */
  padding:1rem;
  border:1px solid pink;
  background: white;
  display:flex;
  transition: all 0.3s linear 0.2s;
  z-index:1000000;
}
.header .aboutMe>div img{
  border-radius:100%;
  width:55px;
  height:55px;
}
.header .aboutMe>div img:hover{
  animation: rubberBand 1000ms both
}
.header .aboutMe>div .des p{
  display:inline-block;
  white-space:nowrap;
}
.header .aboutMe>div .des{
  position: relative ;
  filter: drop-shadow(0 0 5px #eee);
}
.header .aboutMe>div .des:after,.header .aboutMe>div .des:before{
  top: -22px;
  border: 8px solid transparent;
  border-top: 0;
  border-bottom-color: #fff;
  content: "";
  display: block;
  width: 0;
  height: 0;
  right: 0px;
  overflow: hidden;
  position: absolute;
  z-index: 101;
}
.header .aboutMe>div .des:before {
  border-bottom-color: red;
  z-index: 99;
}
.header .aboutMe>div .des p span{
  display:inline-block;
  width:60px;
  text-align: end;
}
</style>


