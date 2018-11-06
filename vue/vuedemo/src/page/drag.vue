<template>
  <div class="drag" @mousemove='mousemove' @mouseup='mouseup'>
    <button @click='totree'>模板页面</button>
    <div class="left">
      <button class='candrag' @mousedown='mousedown("component",$event,false)'>布局框</button>
      <button class='candrag' @mousedown='mousedown("input",$event,false)'>输入框</button>
    </div>
    <div class="right" @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>
      <!-- <div class="right" @mouseover.self='mouseover'>
        <div v-show='show' style='background:blue'>拖拽位置</div> -->
      <div v-for='(list,index) in list' :key='list.id'>
        <components :list='list' :index='index' :mouse='mouse' :type='type' :data='data' @changemouse='mouseup' @index='remove' @look='look' @typechange='mousedown'></components>
      </div>
      <!-- <div v-show='show&&mouse' style='background:blue' @mouseover='mouseover' @mouseout='mouseout'>拖拽位置</div> -->
      <div v-show='show&&mouse'>生成位置</div>
    </div>
    <div class="mouse" v-show='mouse' :style='absolute'>拖拽中</div>
  </div>

</template>

<script>
// 引入布局组件
import components from "@/components/component";
export default {
  name: "Drag",
  components: {
    components
  },
  data() {
    return {
      type: "",
      mouse: false,
      show: false,
      absolute: {
        top: "0px",
        left: "0px"
      },
      data: {
      },
      list: [
        {
          list: [],
          show: false,
          type: "component",
          name: "原始数组"
        },
        {
          list: [],
          show: false,
          type: "component",
          name: "原始数组"
        },
        {
          list: [],
          show: false,
          type: "component",
          name: "原始数组"
        },
        {
          list: [],
          show: false,
          type: "component",
          name: "原始数组"
        },
        {
          list: [],
          show: false,
          type: "component",
          name: "原始数组"
        },
        {
          list: [],
          show: false,
          type: "component",
          name: "原始数组"
        }
      ]
    };
  },
  methods: {
    totree() {
      this.$router.push({
        path: "/tree"
      });
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    look(index) {
      console.log(this.list);
      console.log(index);
    },
    mousedown(type, e, list) {
      console.log(e);
      this.absolute.top = e.clientY - 10 + "px";
      this.absolute.left = e.clientX - 30 + "px";
      this.mouse = true;
      this.show = false;
      console.log("鼠标按下");
      this.type = type;
      console.log(type);
      if (list) {
        this.data = list;
      } else {
        if (type == "component") {
          this.data = {
            type: "component",
            show: false,
            name: "生成的组件",
            list: []
          };
        }
        if (type == "input") {
          this.data = {
            type: "input",
            show: false
          };
        }
      }
      console.log('修改data')
      console.log(this.data)
    },
    mouseover() {
      this.show = true;
    },
    mousemove(e) {
      if (this.mouse) {
        this.absolute.top = e.clientY - 10 + "px";
        this.absolute.left = e.clientX - 30 + "px";
      }
    },
    mouseout() {
      this.show = false;
    },
    mouseup() {
      this.mouse = false;
    },
    add() {
      this.list.push(this.data);
    }
  }
};
</script>

<style lang="less" scoped>
.drag {
  position: relative;
  display: flex;

  .left {
    flex: 1;
    border: 1px solid #000;

    .candrag {
    }
  }

  .right {
    padding: 10px 30px;
    flex: 2;
    border: 1px solid #000;

    .component {
      margin: 5px;
      border: 1px solid #000;
      border-radius: 5px;

      .box {
        float: right;

        .btn {
          float: left;
          padding: 5px;
          background: skyblue;
          color: #fff;
        }
      }

      .main {
        margin: 5px;
      }
    }
  }

  .mouse {
    position: absolute;
    pointer-events: none;
  }
}
</style>