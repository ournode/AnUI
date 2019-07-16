<template>
			<div class="anchor" :id="title">
        <span > {{title}} <a  :href="'#'+title">#</a></span>
      </div>
</template>

<script>

	export default {
    name:'transferHeader',
		data() {
			return {
			}
    },
    props: {
      title: {
        type: String
      },
    },
		mounted() {
    },
    methods:{

    }
	}
</script>

<style scoped>
.anchor{
      display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
        background-color: #dcdfe6;
    position: relative;
}
.anchor span{
  display:block;
      left: 20px;
    transform: translateY(-50%);
        position: absolute;
    background-color: #fff;
    padding: 0 20px;
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}
.anchor span a{
  opacity: 0 ;
  transition: all 0.3 linear;
  color:pink !important;
}
.anchor span:hover a{
  opacity: 1 ;
}
</style>
