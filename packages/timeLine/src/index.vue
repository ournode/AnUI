<template>
  <div class="time">
    <div class="time-line">
      <div v-for="(item,index) in list" class="time-line-div" :key="index">
        <p>{{item.title}}</p>
        <p ref="circular"></p>
        <p>
          {{item.des}}
        </p>
      </div>
      <div class="img-dotted" ref="dotted"></div>
    </div>
    <div style="margin-top:20px;"></div>
  </div>
</template>

<script>

export default {
  name:'timeLine',
  data() {
    return {};
  },
  props: {
    list: {
      type: Array
    }
  },
  mounted() {
    if (this.list.length > 0) {
      this.$refs.dotted.style.left =
        this.$refs.circular[0].offsetLeft - 12 + "px";
    }
  },
  methods: {

  }
};
</script>

<style>
.text-center {
  text-align: center;
}
.time-line {
  position: relative;
  /* width:300px; */
  /* margin:0 auto; */
}
.time-line:after {
  position: absolute;
  content: "";
  left: 107px;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: #e4e1fe;
}
.time-line-div {
  position: relative;
  min-height: 85px;
}
.time-line-div > p:nth-child(1) {
  position: absolute;
  left: 0;
  width: 100px;
  color: #777777;
  font-size: 12px;
}
.time-line-div > p:nth-child(2) {
  position: absolute;
  left: 100px;
  width: 14px;
  height: 14px;
  top: 10px;
  background: #ddccea;
  border-radius: 50%;
  z-index: 10;
}
.time-line-div > p:nth-child(3) {
  position: absolute;
  left: 130px;
  padding: 10px;
  font-size: 1rem;
  color: #606266;
  border-radius: 10px;
}
.img-dotted {
  position: absolute;
  width: 14px;
  height: 100%;
  top: 0;
  z-index: 1;
}

.color_gray {
  color: #777777;
}
.color_black {
  color: #000000;
}
.font_12 {
  font-size: 12px;
}
.font_14 {
  font-size: 14px;
}
</style>
