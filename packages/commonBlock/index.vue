<template>
  <div class="common-block" :class="this.isHead ? 'common-head' : ''">
    <div class="title" :style="{'justify-content':extra_position}">
      <a href="javascript:;" class="title__header">
        <img v-if="imgUrl" :src="imgUrl" alt>
        <i class="iconfont" v-if="iconTitle && icon" :class="icon"/>
        <span>{{title}}</span>
      </a>
      <div class="title__extra">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="content" :class="contentStyle ? 'content_flex' : ''" :style="styleObj">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommonBlock",
  data() {
    return {};
  },
  props: {
    isHead: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    imgUrl: {
      type: String
    },
    extra_position: {
      type: String,
      default: "space-between"
    },
    iconTitle: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    contentStyle: {
      type: Boolean
    },
    flex_container: {
      type: Boolean,
      default: true
    },
    styleObj: {
      type: Object
    }
  }
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #777;
  padding-left: 10px;
  padding-right: 2rem;
  border-left: 4px solid #58c2ef;
  display: flex;
  align-items: center;
  height: 14px;
}
.common-block {
  width: 100%;
  border-radius: 7px;
  margin-bottom: 15px;
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
  .title {
    font-size: 14px;
    color: #777;
    display: flex;
    align-items: center;
    img {
      width: 24px;
      padding-right: 15px;
    }
  }
  .iconfont {
    color: $base-lightBlue-color;
    font-size: 25px;
    padding: 0 5px;
  }
  .title__extra {
    height: 100%;
  }
}
.common-head {
  height: 40px;
  display: flex;
  align-items: center;
  .title {
    color: #777777;
    width: 100%;
    align-items: center;
    a {
      font-size: 16px;
      line-height: 16px;
      border-left: none;
    }
    .title__extra {
      display: flex;
      button,
      div {
        margin-left: 1rem;
      }
    }
  }
}
.content {
  // width: calc(100% - 260px);
  // display: flex;
  // align-items: center;
  // justify-content: flex-end;
  margin-top: 1.5rem;
}
.content_flex {
  display: flex;
}
</style>
