import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  //声明变量的类型(data)
  type = ""
  mouse = false
  show = false
  absolute = {
    top: "0px",
    left: "0px"
  }
  placeindex = 0
  data = {};
  form = [
    // {
    //   show: false,
    //   width: 12,
    //   type: "input"
    // },
    // {
    //   width: 12,
    //   type: "component",
    //   show: false,
    //   name: "生成的组件",
    //   list: []
    // },
    // {
    //   width: 12,
    //   type: "component",
    //   show: false,
    //   name: "生成的组件",
    //   list: []
    // },
    // {
    //   list: [
    //     {
    //       width: 6,
    //       type: "component",
    //       show: false,
    //       name: "生成的组件",
    //       list: []
    //     },
    //     {
    //       width: 6,
    //       type: "component",
    //       show: false,
    //       name: "生成的组件",
    //       list: []
    //     }
    //   ],
    //   show: false,
    //   width: 12,
    //   type: "component",
    //   name: "原始数组"
    // },
    // {
    //   width: 12,
    //   type: "component",
    //   show: false,
    //   name: "生成的组件",
    //   list: []
    // },
    // {
    //   width: 12,
    //   type: "component",
    //   show: false,
    //   name: "生成的组件",
    //   list: []
    // }
  ]
  right = {}
  constructor(
  ) {
    console.log('constructor')
  }
  ngOnInit() {
    console.log('ngOnInit')
  }
  addli() {
    let one = {
      name: "",
      type: "",
      value: ""
    };
    this.right.form.options.push(one);
  }
  removeli(index) {
    this.right.form.options.splice(index, 1);
  }
  setup(obj) {
    this.right = obj.list;
  }
  remove(index) {
    this.form.splice(index, 1);
  }
  look(index) {
    console.log(this.form);
    console.log(index);
  }
  mousedown(obj) {
    let that = this;
    that.absolute.top = obj.e.clientY - 10 + "px";
    that.absolute.left = obj.e.clientX - 30 + "px";
    that.mouse = true;
    that.show = false;
    that.type = obj.type;
    if (obj.list) {
      that.data = obj.list;
    } else {
      if (obj.type == "component") {
        that.data = {
          width: 12,
          type: "component",
          show: false,
          name: "生成的组件",
          list: []
        };
      }
      if (obj.type == "input") {
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
      if (obj.type == "radio") {
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
      if (obj.type == "checkbox") {
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
      // if (flex == "6,6") {
      //   that.data = {
      //     width: 12,
      //     type: "component",
      //     show: false,
      //     name: "生成的组件",
      //     list: [
      //       {
      //     width: 6,
      //     type: "component",
      //     show: false,
      //     name: "生成的组件",
      //     list: [
            
      //     ]
      //   },{
      //     width: 6,
      //     type: "component",
      //     show: false,
      //     name: "生成的组件",
      //     list: [
            
      //     ]
      //   },
      //     ]
      //   };
      // }
    }
  }
  mouseover() {
    this.show = true;
  }
  stop(e){
    e.stopPropagation()
  }
  mousemove(e) {
    let that = this;
    if (that.mouse) {
      that.absolute.top = e.clientY - 10 + "px";
      that.absolute.left = e.clientX - 30 + "px";
      let topY = e.pageY;
      that.find($(e.path[0]).closest(".component"), topY, that);
    }
  }
  find(div, topY, that) {
    let childs = div.children(".main").children(".com");
    let index = 0;
    for (let i = 0; i < childs.length; i++) {
      if (topY > $(childs[i]).offset().top - 0) {
        index++;
      }
    }
    that.placeindex = index;
  }
  mouseout() {
    this.show = false;
  }
  mouseup() {
    this.mouse = false;
  }
  add(e) {
    if (this.mouse) {
      this.form.splice(this.placeindex, 0, this.data);
      $(e.path[e.path.length - 8])
        .find(".component")
        .removeClass("active");
      // $(e.path[0])
      //   .closest(".component")
      //   .addClass("active");
    }
  }
  generatejson() {
    console.log(this.form);
  }
}
