<template>
  <div>
    <div class="component" @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>
      <div class="box">
        <button class="btn" @mousedown='move(list.type,$event,list);fatherremove()'>移动</button>
        <button class="btn" @click='chakan'>查看</button>
        <button class="btn" @click='fatherremove'>删除</button>
        <!-- <div class="btn" @click='add(list,index)'>添加</div> -->
        <div style='clear:both'></div>
      </div>
      <div style='clear:both'></div>
      <div class='main' v-if='list.type=="component"'>
        <components v-for='(list,index) in list.list' :key='list.id' :list='list' :index='index' :mouse='mouse' :type='type' :data='data' @index='remove' @look='look' @typechange='move'></components>
        <div v-show='list.show&&mouse'>生成位置</div>
      </div>
      <input v-if='list.type=="input"' type="text">
    </div>
  </div>
</template>

<script>
export default {
  name: "components",
  props: ["list", "index", "mouse", "type",'data'],
  data() {
    return {};
  },

  methods: {
    move(type,e,list) {
      console.log('移动事件')
      console.log(list);
      this.$emit("typechange", type,e,list);
    },
    chakan() {
      this.$emit("look", this.index);
    },
    fatherremove() {
      this.$emit("index", this.index);
      console.log('删除')
    },
    remove(index) {
      console.log(this.list);
      this.list.list.splice(index, 1);
    },
    look(index) {
      console.log(this.list);
      console.log(index);
    },
    mouseover() {
      this.list.show = true;
    },
    mouseout() {
      this.list.show = false;
    },
    add() {
      if (this.mouse) {
        console.log(this.data)
        console.log(this.type);
        // if(this.data.type){

        // }
        // let data = {};
        // if (this.type == "component") {
        //   data = {
        //     type: "component",
        //     show: false,
        //     name: "一级组件01",
        //     list: []
        //   };
        // }
        // if (this.type == "input") {
        //   data = {
        //     type: "input",
        //     show: false
        //   };
        // }
        console.log(this.list.list);
        if (this.list.list) {
          this.list.list.push(this.data);
        }
      }
    }
  },
  created() {
    // this.list["show"] = false;
    console.log(this.data)
  }
};
</script>

<style lang="less" scoped>
.component {
  margin: 5px;
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
    margin: 5px;
  }

  input {
    background: red;
  }
}
</style>