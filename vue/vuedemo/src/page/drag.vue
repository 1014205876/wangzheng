<template>
  <div class="drag" @mousemove='mousemove' @mouseup='mouseup'>
    <!-- <button @click='totree'>模板页面</button> -->
    <div class="left">
      <button class='candrag' @mousedown='mousedown("component",$event,false)'>布局框</button>
      <button class='candrag' @mousedown='mousedown("input",$event,false)'>输入框</button>
      <button class='candrag' @mousedown='mousedown("radio",$event,false)'>单选框</button>
      <button @click='generatejson'>生成json</button>
    </div>
    <div class="component" @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>
      <div class='place' v-show='show&&mouse&&placeindex==0' @mouseover.self='mouseover' @mouseout.self='mouseout'
        @mouseup.self='add'>生成位置</div>
      <div class="main" @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>
        <div class='com' v-for='(list,index) in form' :key='list.id' @mouseover.self='mouseover' @mouseout.self='mouseout'
          @mouseup.self='add'>
          <components :form='list' :index='index' :mouse='mouse' :type='type' :data='data' :placeindex='placeindex'
            @changemouse='mouseup' @index='remove' @look='look' @copy='copy' @typechange='mousedown' @setup='setup'
            @mouseout.self='mouseout' @mouseup.self='add'></components>
          <div class='place' v-show='show&&mouse&&placeindex==index-0+1' @mouseover.self='mouseover' @mouseout.self='mouseout'
            @mouseup.self='add'>生成位置</div>
        </div>
      </div>
    </div>
    <div class="right">
      表单设置
      <div v-if='right.type'>
        <div v-if='right.type=="input"'>
          <div class='form'>
            <input type="text" v-model='right.key' :disabled='true'>唯一key值
          </div>
          <div class='form'>
            <input type="text" v-model='right.value'>初始值
          </div>
          <div class='form'>
            <input type="text" v-model='right.placeholder'>提示语
          </div>
        </div>
        <div v-if='right.type=="radio"'>
          <div class='form'>
            <input type="text" v-model='right.key' :disabled='true'>唯一key值
          </div>
          <ul class='ul'>
            <button v-on:click='addli'>添加一组</button>
            <li v-for='(list,index) in right.options' :key='list.id'>
              <div class="label">
                选项name<input type="text" v-model='list.name'>
              </div>
              <div class="label">
                选项type<input type="text" v-model='list.type'>
              </div>
              <div class="label">
                选项value<input type="text" v-model='list.value'>
              </div>
              <button v-on:click='removeli(index)'>删除</button>
            </li>
          </ul>
          <!-- <div class='label' v-for='item in right.options' :key='item.id'>
            <input type='radio' :value='item.value' v-model='right.value'>
          </div> -->
        </div>
      </div>
      <div v-else>
        无
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
          // {
          //   show: false,
          //   type: "input"
          // },
          // {
          //   list: [],
          //   show: false,
          //   type: "component",
          //   name: "原始数组"
          // },
          // {
          //   list: [],
          //   show: false,
          //   type: "component",
          //   name: "原始数组"
          // },
          // {
          //   list: [
          //     {
          //       list: [],
          //       show: false,
          //       type: "component",
          //       name: "原始数组"
          //     },
          //     {
          //       list: [],
          //       show: false,
          //       type: "component",
          //       name: "原始数组"
          //     }
          //   ],
          //   show: false,
          //   type: "component",
          //   name: "原始数组"
          // },
          // {
          //   list: [],
          //   show: false,
          //   type: "component",
          //   name: "原始数组"
          // },
          // {
          //   list: [],
          //   show: false,
          //   type: "component",
          //   name: "原始数组"
          // }
        ],
        right: {}
      };
    },
    methods: {
      addli() {
        console.log('添加一组')
        let one = {
          name: "",
          type: "",
          value: ""
        };
        this.right.options.push(one);
      },
      removeli(index) {
        console.log('删除一组')
        this.right.options.splice(index, 1);
      },
      setup(list, e) {
        this.right = list.form;
      },
      totree() {
        this.$router.push({
          path: "/tree"
        });
      },
      remove(index) {
        this.form.splice(index, 1);
      },
      copy(list, index) {
        this.form.splice(index, 0, list);
      },
      look(index) {
        console.log(this.form);
        console.log(index);
      },
      mousedown(type, e, list) {
        let that = this;
        that.absolute.top = e.clientY - 10 + "px";
        that.absolute.left = e.clientX - 30 + "px";
        that.mouse = true;
        that.show = false;
        that.type = type;
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
              show: false,
              form: {
                type: "input",
                key: new Date().getTime(),
                value: "",
                placeholder: ""
              }
            };
          }
          if (type == "radio") {
            that.data = {
              type: "radio",
              show: false,
              form: {
                type: "radio",
                key: new Date().getTime(),
                value: "",
                options: [
                  {
                    name: "",
                    type: "",
                    value: ""
                  },
                  {
                    name: "",
                    type: "",
                    value: ""
                  }
                ]
              }
            };
          }
        }
      },
      mouseover(e) {
        this.show = true;
      },
      mousemove(e) {
        let that = this;
        if (that.mouse) {
          that.absolute.top = e.clientY - 10 + "px";
          that.absolute.left = e.clientX - 30 + "px";
          let topY = e.pageY;
          that.find($(e.path[0]).closest(".component"), topY, that);
        }
      },
      find(div, topY, that) {
        let childs = div.children(".main").children(".com");
        let index = 0;
        for (let i = 0; i < childs.length; i++) {
          if (topY > $(childs[i]).offset().top - 0) {
            index++;
          }
        }
        that.placeindex = index;
      },
      mouseout() {
        this.show = false;
      },
      mouseup() {
        this.mouse = false;
      },
      add() {
        if (this.mouse) {
          this.form.splice(this.placeindex, 0, this.data);
        }
      },
      generatejson() {
        console.log(this.form);
      }
    }
  };
</script>

<style lang="less" scoped>
  .drag {
    position: relative;
    height: 900px;
    min-height: 900px;
    display: flex;

    .left {
      -moz-box-sizing: border-box;
      /*Firefox3.5+*/
      -webkit-box-sizing: border-box;
      /*Safari3.2+*/
      -o-box-sizing: border-box;
      /*Opera9.6*/
      -ms-box-sizing: border-box;
      /*IE8*/
      width: 10%;
      height: 100%;
      border: 1px solid #000;

      .candrag {
        display: block;
        padding: 5px 10px;
        margin: 5px 10px 5px auto;
      }
    }

    .component {
      -moz-box-sizing: border-box;
      /*Firefox3.5+*/
      -webkit-box-sizing: border-box;
      /*Safari3.2+*/
      -o-box-sizing: border-box;
      /*Opera9.6*/
      -ms-box-sizing: border-box;
      /*IE8*/
      width: 50%;
      height: 100%;
      padding: 20px 20px 0;
      border: 1px solid #000;

      .place {
        margin: 10px;
      }

      .box {
        float: right;

        .btn {
          float: left;
          padding: 5px;
          background: skyblue;
          color: #fff;
        }
      }
    }

    .right {
      width: 40%;

      input {
        background-color: violet;
        display: block;
        margin: 10px 0;
      }

      .form {
        display: flex;
      }

      .ul {
        li {
          border: 1px solid #000;
          margin: 5px;

          .label {
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .mouse {
      position: absolute;
      pointer-events: none;
    }
  }
</style>