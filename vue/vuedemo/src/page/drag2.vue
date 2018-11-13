<template>
  <div class="drag" @mousemove='mousemove' @mouseup='mouseup'>
    <!-- <button @click='totree'>模板页面</button> -->
    <div class="left">
      组件选择
      <!-- <button class='candrag' @mousedown='mousedown("component",$event,false,"6,6")'>6,6布局框</button> -->
      <button class='candrag' @mousedown='mousedown("component",$event,false)'>布局框</button>
      <button class='candrag' @mousedown='mousedown("input",$event,false)'>输入框</button>
      <button class='candrag' @mousedown='mousedown("radio",$event,false)'>单选框</button>
      <button class='candrag' @mousedown='mousedown("checkbox",$event,false)'>多选框</button>
      <button class='candrag' @click='generatejson'>生成json</button>
    </div>
    <div class="component" @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>
      <div class='place' v-show='show&&mouse&&placeindex==0' @mouseover.self='mouseover' @mouseout.self='mouseout'
        @mouseup.self='add'>生成位置</div>
      <div class="main" @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>
        <div class='com' v-for='(list,index) in form' :key='list.id' :style='{width:(list.width/12*100+"%")}'
          @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add'>
          <components :form='list' :index='index' :mouse='mouse' :data='data' :placeindex='placeindex'
            @changemouse='mouseup' @index='remove' @look='look' @copy='copy' @typechange='mousedown' @setup='setup'
            @mouseout.self='mouseout' @mouseup.self='add'></components>
          <div class='place' v-show='show&&mouse&&placeindex==index-0+1' @mouseover.self='mouseover' @mouseout.self='mouseout'
            @mouseup.self='add'>生成位置</div>
        </div>
      </div>
    </div>
    <div class="right">
      表单定制<br>
      宽度(1-12)<input type="text" v-model='right.width'>
      <div v-if='right.form'>
        <div class='form'>
          <input type="text" v-model='right.form.key' :disabled='true'>唯一key值
        </div>
        <div class='form'>
          required是否必填
          <label>
            是
            <input type="radio" name='required' :value='true' v-model='right.form.required'>
            <div class="after"></div>
          </label>
          <label>
            否
            <input type="radio" name='required' :value='false' v-model='right.form.required'>
            <div class="after"></div>
          </label>
        </div>
        <div class='form'>
          readOnly是否只读
          <label>
            是
            <input type="radio" name='readOnly' :value='true' v-model='right.form.readOnly'>
            <div class="after"></div>
          </label>
          <label>
            否
            <input type="radio" name='readOnly' :value='false' v-model='right.form.readOnly'>
            <div class="after"></div>
          </label>
        </div>
        <div v-if='right.form.type=="input"'>
          <div class='form'>
            <input type="text" v-model='right.form.value'>初始值
          </div>
          <div class='form'>
            <input type="text" v-model='right.form.placeholder'>提示语
          </div>
        </div>
        <div v-if='right.form.type=="radio"'>
          <ul class='ul'>
            <button v-on:click='addli'>添加一组</button>
            <li v-for='(list,index) in right.form.options' :key='list.id'>
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
        </div>
        <div v-if='right.form.type=="checkbox"'>
          <ul class='ul'>
            <button v-on:click='addli'>添加一组</button>
            <li v-for='(list,index) in right.form.options' :key='list.id'>
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
        </div>
      </div>
      <div v-else>
        <!-- 布局设置 -->
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
      // console.log("添加一组");
      let one = {
        name: "",
        type: "",
        value: ""
      };
      this.right.form.options.push(one);
    },
    removeli(index) {
      this.right.form.options.splice(index, 1);
    },
    setup(list, e) {
      this.right = list;
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
    mousedown(type, e, list,flex) {
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
            width: 12,
            type: "component",
            show: false,
            name: "生成的组件",
            list: []
          };
        }
        if (type == "input") {
          that.data = {
            width: 12,
            type: "input",
            show: false,
            form: {
              type: "input",
              key: new Date().getTime(),
              // key: parseInt(new Date().getTime()).toString(36),
              readOnly: false, //只读
              required: true, //必填
              value: "",
              placeholder: ""
            }
          };
        }
        if (type == "radio") {
          that.data = {
            width: 12,
            type: "radio",
            show: false,
            form: {
              type: "radio",
              key: new Date().getTime(),
              // key: parseInt(new Date().getTime()).toString(36),
              readOnly: false, //只读
              required: true, //必填
              value: "",
              options: [
                {
                  name: "选项名01",
                  type: "",
                  value: "value01"
                },
                {
                  name: "选项名02",
                  type: "",
                  value: "value02"
                }
              ]
            }
          };
        }
        if (type == "checkbox") {
          that.data = {
            width: 12,
            type: "checkbox",
            show: false,
            form: {
              type: "checkbox",
              key: new Date().getTime(),
              // key: parseInt(new Date().getTime()).toString(36),
              readOnly: false, //只读
              required: true, //必填
              value: [],
              options: [
                {
                  name: "选项名01",
                  type: "",
                  value: "value01"
                },
                {
                  name: "选项名02",
                  type: "",
                  value: "value02"
                }
              ]
            }
          };
        }
        if (flex == "6,6") {
          that.data = {
            width: 12,
            type: "component",
            show: false,
            name: "生成的组件",
            list: [
              {
            width: 6,
            type: "component",
            show: false,
            name: "生成的组件",
            list: [
              
            ]
          },{
            width: 6,
            type: "component",
            show: false,
            name: "生成的组件",
            list: [
              
            ]
          },
            ]
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
    add(e) {
      if (this.mouse) {
        this.form.splice(this.placeindex, 0, this.data);
        $(e.path[e.path.length - 7])
          .find(".component")
          .removeClass("active");
        // $(e.path[0])
        //   .closest(".component")
        //   .addClass("active");
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
  font-size: 16px;

  .left {
    -moz-box-sizing: border-box;
    /*Firefox3.5+*/
    -webkit-box-sizing: border-box;
    /*Safari3.2+*/
    -o-box-sizing: border-box;
    /*Opera9.6*/
    -ms-box-sizing: border-box;
    /*IE8*/
    width: 8%;
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
    width: 77%;
    height: 100%;
    padding: 20px 10px 0;
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

    .main {
      display: flex;
      flex-wrap: wrap;
      // align-items: center;
      justify-content: space-around;

      .com {
        -moz-box-sizing: border-box;
        /*Firefox3.5+*/
        -webkit-box-sizing: border-box;
        /*Safari3.2+*/
        -o-box-sizing: border-box;
        /*Opera9.6*/
        -ms-box-sizing: border-box;
        /*IE8*/
        padding: 0 10px;
      }
    }
  }

  .right {
    -moz-box-sizing: border-box;
    /*Firefox3.5+*/
    -webkit-box-sizing: border-box;
    /*Safari3.2+*/
    -o-box-sizing: border-box;
    /*Opera9.6*/
    -ms-box-sizing: border-box;
    /*IE8*/
    width: 15%;
      height: 100%;
      border: 1px solid #000;

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