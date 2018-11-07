<template>
  <div class="drag" @mousemove='mousemove' @mouseup='mouseup'>
    <button @click='totree'>模板页面</button>
    <div class="left">
      <button class='candrag' @mousedown='mousedown("component",$event,false)'>布局框</button>
      <button class='candrag' @mousedown='mousedown("input",$event,false)'>输入框</button>
    </div>
    <div class="component" @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>
      <div class='place' v-show='show&&mouse&&placeindex==0' @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>生成位置</div>
      <div class="main">
        <div class='com' v-for='(list,index) in form' :key='list.id'>
          <components :form='list' :index='index' :mouse='mouse' :type='type' :data='data' :placeindex='placeindex' @changemouse='mouseup'
            @index='remove' @look='look' @typechange='mousedown'></components>
          <div class='place' v-show='show&&mouse&&placeindex==index-0+1' @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>生成位置</div>
        </div>
      </div>
    </div>
    <div class="mouse" v-show='mouse' :style='absolute'>拖拽中</div>
  </div>
</template>

<script>
  // 引入jq
  import $ from "jquery";
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
        placeindex: 0,
        data: {},
        form: [
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
        this.form.splice(index, 1);
      },
      look(index) {
        console.log(this.form);
        console.log(index);
      },
      mousedown(type, e, list) {
        let that = this;
        console.log(e);
        that.absolute.top = e.clientY - 10 + "px";
        that.absolute.left = e.clientX - 30 + "px";
        that.mouse = true;
        that.show = false;
        console.log("鼠标按下");
        that.type = type;
        console.log(type);
        if (list) {
          that.data = list;
        } else {
          if (type == "component") {
            that.data = {
              type: "component",
              show: false,
              name: "生成的组件",
              list: []
            };
          }
          if (type == "input") {
            that.data = {
              type: "input",
              show: false
            };
          }
        }
        console.log("修改data");
        console.log(that.data);
      },
      mouseover() {
        this.show = true;
      },
      mousemove(e) {
        let that = this;
        if (that.mouse) {
          that.absolute.top = e.clientY - 10 + "px";
          that.absolute.left = e.clientX - 30 + "px";
          let topY = e.offsetY;
          if ($(e.path[0]).hasClass("place")) {
            topY = e.offsetY + $(e.path[0]).offset().top;
          } else {
            that.find($(e.path[0]).closest(".component"), topY, that);
          }
        }
      },
      find(div, topY, that) {
        let childs = div.children(".main").children(".com");
        let index = 0;
        for (let i = 0; i < childs.length; i++) {
          if (topY > $(childs[i]).offset().top - 20) {
            index++;
          }
        }
        console.log(index);
        that.placeindex=index;
      },
      mouseout() {
        this.show = false;
      },
      mouseup() {
        this.mouse = false;
      },
      add() {
        // this.form.push(this.data);
        this.form.splice(placeindex,0,this.data);
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

      .candrag {}
    }

    .component {
      padding: 10px 10px;
      flex: 2;
      margin: 20px 0px;
      border: 1px solid #000;
      border-radius: 5px;


      /* .component {
        margin: 5px;
        border: 1px solid #000;
        border-radius: 5px; */

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

      /* } */
    }

    .mouse {
      position: absolute;
      pointer-events: none;
    }
  }
</style>