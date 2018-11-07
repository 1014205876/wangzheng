<template>
  <div>
    <div class="component" @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>
      <div class="box" @mouseover='mouseover' @mouseout='mouseout' @mouseup='add'>
        <button class="btn" @mousedown='move(form.type,$event,form);fatherremove()'>移动</button>
        <button class="btn" @click='chakan'>查看</button>
        <button class="btn" @click='fatherremove'>删除</button>
        <div style='clear:both'></div>
      </div>
      <div style='clear:both'></div>
      <div class='place' v-show='form.show&&mouse&&placeindex==0' @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>生成位置</div>
      <div class='main' v-if='form.type=="component"'>
        <div class='com' v-for='(list,index) in form.list' :key='list.id'>
          <components :form='list' :index='index' :mouse='mouse' :type='type' :data='data' :placeindex='placeindex' @index='remove' @look='look' @typechange='move'></components>
          <div class='place' v-show='form.show&&mouse&&placeindex==index-0+1' @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>生成位置</div>
        </div>
      </div>
      <input v-if='form.type=="input"' type="text">
    </div>
  </div>
</template>

<script>
// 引入jq
import $ from "jquery";
export default {
  name: "components",
  props: ["form", "index", "mouse", "type", "data",'placeindex'],
  data() {
    return {};
  },

  methods: {
    move(type, e, list) {
      console.log("移动事件");
      console.log(list);
      this.$emit("typechange", type, e, list);
    },
    chakan() {
      this.$emit("look", this.index);
    },
    fatherremove() {
      this.$emit("index", this.index);
      console.log("删除");
    },
    remove(index) {
      console.log(this.form);
      this.form.list.splice(index, 1);
    },
    look(index) {
      console.log(this.form);
      console.log(index);
    },
    mouseover(e) {
      this.form.show = true;
// console.log('开始打印')
//         // console.log(e.layerX)
//         console.log(e.offsetX)
//         // console.log(e.layerY)
//         console.log(e.offsetY)
// console.log('结束打印')
    },
    mouseout() {
      this.form.show = false;
    },
    add() {
      if (this.mouse) {
        console.log(this.data);
        console.log(this.type);
        console.log(this.form.list);
        if (this.form.list) {
          // this.form.list.push(this.data);
        this.form.list.splice(this.placeindex,0,this.data);
        }
      }
    }
  },
  created() {
    console.log(this.data);
  }
};
</script>

<style lang="less" scoped>
.component {
  margin: 20px 0px;
  padding-bottom:20px;
  border: 1px solid #000;
  border-radius: 5px;

  .box {
    float: right;

    .btn {
      float: left;
      padding: 5px;
      margin: 2px;
      background: skyblue;
      color: #fff;
    }
  }

  .main {
    margin: 10px;
  }

  input {
    background: red;
  }
}
</style>