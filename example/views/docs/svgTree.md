# svgTree

<div class="demo-block">
    <svg-tree
        :treeData="[
            {id: 100, name: 'Calamus',  des:'www.calamus.xyz',color:'#E1244E',content:'冬天从这里夺走的,春天会交还与你', value: 123, delay: 120, fatherId: 0,tlevel:1},
  {id: 101, name: 'Calamus1', des:'www.calamus.xyz',color:'#E1244E',content:'冬天从这里夺走的,春天会交还与你',value: 0, fatherId: 100,tlevel:1},
  {id: 102, name: 'Calamus2', des:'www.calamus.xyz',color:'#aaa',content:'冬天从这里夺走的,春天会交还与你',value: 100, fatherId: 100,tlevel:0},
        ]"
        svgId='svg'
        ref="svgTree"
      ></svg-tree>
</div>

:::demo
```vue

<svg-tree
        :treeData="treeData"
        svgId='svg'
        ref="svgTree"
      >
</svg-tree>

<script>
export default {
  data(){
    return {
      treeData:[
        {id: 100, name: 'Calamus',  des:'www.calamus.xyz',color:'#E1244E',content:'冬天从这里夺走的,春天会交还与你', value: 123, delay: 120, fatherId: 0,tlevel:1},
        {id: 101, name: 'Calamus1', des:'www.calamus.xyz',color:'#E1244E',content:'冬天从这里夺走的,春天会交还与你',value: 0, fatherId: 100,tlevel:1},
        {id: 102, name: 'Calamus2', des:'www.calamus.xyz',color:'#aaa',content:'冬天从这里夺走的,春天会交还与你',value: 100, fatherId: 100,tlevel:0}
      ]
    }
  }
}
</script>

```vue
:::demo
