<template>
    <div class="drag" @mousemove='mousemove' @mouseup='mouseup'>
        <!-- <button @click='totree'>模板页面</button> -->
        <div class="left">
            组件选择
            <input type="number" v-model='num'>
            <button class='candrag' @mousedown='mousedown("table",$event,false,num)'>选项卡布局框</button>
            <button class='candrag' @mousedown='mousedown("component",$event,false)'>布局框</button>
            <button class='candrag' @mousedown='mousedown("title",$event,false)'>文本栏</button>
            <button class='candrag' @mousedown='mousedown("editor",$event,false)'>富文本栏</button>
            <button class='candrag' @mousedown='mousedown("input",$event,false)'>输入框</button>
            <button class='candrag' @mousedown='mousedown("file",$event,false)'>上传</button>
            <button class='candrag' @mousedown='mousedown("number",$event,false)'>数字框</button>
            <button class='candrag' @mousedown='mousedown("date",$event,false)'>日期框</button>
            <button class='candrag' @mousedown='mousedown("radio",$event,false)'>单选框</button>
            <button class='candrag' @mousedown='mousedown("checkbox",$event,false)'>多选框</button>
            <button class='candrag' @click='generatejson'>生成json</button>
        </div>
        <div class="component" @mouseover='mouseover' @mouseout='mouseout' @mouseup='add'>
            操作布局
            <div class='place' v-show='show&&mouse&&placeindex==0'>生成位置</div>
            <div class="main">
                <div class='com' v-for='(list,index) in form' :key='list.id' :style='{width:(list.width/12*100+"%")}'>
                    <components :form='list' :index='index' :mouse='mouse' :data='data' :placeindex='placeindex'
                        @index='remove' @look='look' @copy='copy' @typechange='mousedown' @setup='setup'
                        @mouseup='mouseup'></components>
                    <div class='place' v-show='show&&mouse&&placeindex==index-0+1'>生成位置</div>
                </div>
            </div>
        </div>
        <div class='look'>
            最终显示
            <div class='components'>
                <div v-for='(list,index) in form' :key='list.id' :style='{width:(list.width/12*100+"%")}'>
                    <comlook :form='list' :index='index' :mouse='mouse' :data='data' :placeindex='placeindex'></comlook>
                </div>
            </div>
        </div>
        <div class="right">
            表单定制<br>
            宽度(1-12)<input type="number" min='1' max='12' v-model='right.width'>
            <div v-if='right.form'>
                <div v-if='right.form.type!="title"'>
                    <div class='form blo'>
                        唯一key值
                        <input type="text" v-model='right.form.key'>
                    </div>
                    <div class='form blo'>
                        是否必填
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
                    <div class='form blo'>
                        是否只读
                        <label>
                            是
                            <input type="radio" name='readOnly' :value='true' v-model='right.form.readOnly'>
                            <div class="after"></div>
                        </label>
                        <label>
                            否
                            <input type="radio" name='readOnly' :value='false' v-model='right.form.readOnly'>
                            <div class="after"></div>
                        </label></div>
                </div>
                <div v-if='right.form.type=="title"'>
                    <div class='form blo'>
                        内容
                        <textarea style='width:100%;height:40px;background:violet'
                            v-model='right.form.value'></textarea>
                    </div>
                    <div class='form blo'>
                        字体像素
                        <input type="text" v-model='right.form.style["font-size"]'>
                    </div>
                    <div class='form blo'>
                        字体颜色
                        <input type="color" v-model='right.form.style.color'>
                        <input type="text" v-model='right.form.style.color'>
                    </div>
                    <div class='form blo'>
                        背景颜色
                        <input type="color" v-model='right.form.style["background-color"]'>
                        <input type="text" v-model='right.form.style["background-color"]'>
                    </div>
                    <div class='form'>
                        对齐方式
                        <label v-for='list in ["left","center","right"]' :key='list.id'>
                            <input type="radio" :value='list' v-model='right.form.style["text-align"]'>{{list.name}}
                            <div class="after"></div>
                        </label>
                    </div>
                    <div class='form'>
                        字体粗细
                        <label v-for='list in ["lighter","normal","bold","bolder"]' :key='list.id'>
                            <input type="radio" :value='list' v-model='right.form.style["font-weight"]'>{{list.name}}
                            <div class="after"></div>
                        </label>
                    </div>
                </div>
                <div v-if='right.form.type=="editor"'>
                    富文本框无法定制
                    <!-- <editor :div='right.form.div' @changeeditor='editor'></editor> -->
                </div>
                <div v-if='right.form.type=="input"'>
                    <div class='form blo'>
                        表单名字
                        <input type="text" v-model='right.form.name'>
                    </div>
                    <div class='form blo'>
                        初始值
                        <input type="text" v-model='right.form.value'>
                    </div>
                    <div class='form blo'>
                        提示语
                        <input type="text" v-model='right.form.placeholder'>
                    </div>
                    <div class='form blo'>
                        校验方式
                        <label v-for='list in test' :key='list.id'>
                            <input type="radio" :value='list.value' v-model='right.form.test'>{{list.name}}
                            <div class="after"></div>
                        </label><br>
                        ^[A-Z]+$<br>
                        <input type="text" v-model='right.form.test'>
                    </div>
                </div>
                <div v-if='right.form.type=="file"'>
                    <div class='form blo'>
                        初始值
                        <input type="file" accept="image/*" @change="file">
                    </div>
                </div>
                <div v-if='right.form.type=="number"'>
                    <div class='form blo'>
                        表单名字
                        <input type="text" v-model='right.form.name'>
                    </div>
                    <div class='form blo'>
                        初始值
                        <input type="number" v-model='right.form.value'>
                    </div>
                    <div class='form blo'>
                        提示语
                        <input type="text" v-model='right.form.placeholder'>
                    </div>
                    <div class='form blo'>
                        最大值
                        <input type="number" v-model='right.form.max'>
                    </div>
                    <div class='form blo'>
                        最小值
                        <input type="number" v-model='right.form.min'>
                    </div>
                </div>
                <div v-if='right.form.type=="date"'>
                    <div class='form blo'>
                        表单名字
                        <input type="text" v-model='right.form.name'>
                    </div>
                    <div class='form blo'>
                        初始值
                        <!-- <input type="date" v-model='right.form.value'> -->
                        <input type="date" :min='right.form.min' :max='right.form.max' v-model='right.form.value'>
                    </div>
                    <div class='form blo'>
                        提示语
                        <input type="text" v-model='right.form.placeholder'>
                    </div>
                    <div class='form blo'>
                        最大值
                        <input type="date" v-model='right.form.max'>
                    </div>
                    <div class='form blo'>
                        最小值
                        <input type="date" v-model='right.form.min'>
                    </div>
                </div>
                <div v-if='right.form.type=="radio"'>
                    <div class='form blo'>
                        表单名字
                        <input type="text" v-model='right.form.name'>
                    </div>
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
                    <div class='form blo'>
                        表单名字
                        <input type="text" v-model='right.form.name'>
                    </div>
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
                <!-- 显示的组件下标
          <input type="number" v-model='right.index'>
          
        <div class='form' v-for='(item,index) in right.list' :key='item.id'>
          <label class='radio'>
            <input type='radio' :value='index' v-model='right.index'>第{{index}}个
            <div class="after"></div>
          </label>
        </div> -->
            </div>
        </div>
        <div class='look' style='flex:10'>
            最终显示
            <div class='components'>
                <div v-for='(list,index) in form' :key='list.id' :style='{width:(list.width/12*100+"%")}'>
                    <comlook :form='list' :index='index' :mouse='mouse' :data='data' :placeindex='placeindex'></comlook>
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
    // 引入富文本组件
    import editor from "@/components/editor";
    // 引入显示布局组件
    import comlook from "@/components/comlook";
    export default {
        name: "Drag",
        components: {
            components,
            editor,
            comlook
        },
        data() {
            return {
                type: "",
                num: 3,
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
                    // },
                    // {
                    //   list: [],
                    //   show: false,
                    //   type: "component",
                    // },
                    // {
                    //   list: [
                    //     {
                    //       list: [],
                    //       show: false,
                    //       type: "component",
                    //     },
                    //     {
                    //       list: [],
                    //       show: false,
                    //       type: "component",
                    //     }
                    //   ],
                    //   show: false,
                    //   type: "component",
                    // },
                    // {
                    //   list: [],
                    //   show: false,
                    //   type: "component",
                    // },
                    // {
                    //   list: [],
                    //   show: false,
                    //   type: "component",
                    // }
                ],
                right: {},
                test: [
                    {
                        name: "无",
                        value: ""
                    },
                    {
                        name: "电话号码",
                        value: "^1[0-9]{10}$"
                    },
                    {
                        name: "邮箱地址",
                        value:
                            "^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,4}$"
                    },
                    {
                        name: "身份证号",
                        value: "(^d{15}$)|(^d{18}$)|(^d{17}(d|X|x)$)"
                    }
                ]
            };
        },
        methods: {
            file(e) {
                console.log(e.target);
            },
            editor(value) {
                console.log(value);
            },
            totree() {
                this.$router.push({
                    path: "/tree"
                });
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
            mouseup() {
                this.mouse = false;
            },
            mousedown(type, e, list, num) {
                let that = this;
                that.absolute.top = e.clientY - 10 + "px";
                that.absolute.left = e.clientX - 30 + "px";
                that.mouse = true;
                that.show = false;
                that.type = type;
                if (list) {
                    that.data = list;
                } else {
                    if (type == "table") {
                        that.data = {
                            width: 12,
                            index: 0,
                            type: "table",
                            show: false,
                            list: []
                        };
                        for (let i = 0; i < num; i++) {
                            let form = {
                                width: 12,
                                type: "component",
                                show: false,
                                list: []
                            };
                            that.data.list.push(form);
                        }
                    }
                    if (type == "component") {
                        that.data = {
                            width: 12,
                            type: "component",
                            flex: "12",
                            show: false,
                            list: []
                        };
                    }
                    if (type == "title") {
                        that.data = {
                            width: 12,
                            type: "title",
                            form: {
                                type: "title",
                                key: new Date().getTime(),
                                // key: parseInt(new Date().getTime()).toString(36),
                                value: "标题",
                                style: {
                                    "font-size": "16px",
                                    color: "",
                                    "text-align": "left",
                                    "font-weight": "normal",
                                    "background-color": ""
                                }
                            }
                        };
                    }
                    if (type == "editor") {
                        that.data = {
                            width: 12,
                            type: "editor",
                            form: {
                                type: "editor",
                                div: ""
                            }
                        };
                    }
                    if (type == "input") {
                        that.data = {
                            width: 12,
                            type: "input",
                            form: {
                                type: "input",
                                name: "",
                                key: new Date().getTime(),
                                // key: parseInt(new Date().getTime()).toString(36),
                                readOnly: false, //只读
                                required: true, //必填
                                test: "", //校验
                                value: "",
                                placeholder: ""
                            }
                        };
                    }
                    if (type == "file") {
                        that.data = {
                            width: 12,
                            type: "file",
                            form: {
                                type: "file",
                                name: "",
                                key: new Date().getTime(),
                                // key: parseInt(new Date().getTime()).toString(36),
                                // readOnly: false, //只读
                                // required: true, //必填
                                // test: "", //校验
                                // value: "",
                                // placeholder: ""
                                url: ""
                            }
                        };
                    }
                    if (type == "number") {
                        that.data = {
                            width: 12,
                            type: "number",
                            form: {
                                type: "number",
                                name: "",
                                key: new Date().getTime(),
                                // key: parseInt(new Date().getTime()).toString(36),
                                readOnly: false, //只读
                                required: true, //必填
                                // test: "", //校验
                                value: "",
                                max: "",
                                min: "",
                                placeholder: ""
                            }
                        };
                    }
                    if (type == "date") {
                        that.data = {
                            width: 12,
                            type: "date",
                            form: {
                                type: "date",
                                name: "",
                                key: new Date().getTime(),
                                // key: parseInt(new Date().getTime()).toString(36),
                                readOnly: false, //只读
                                required: true, //必填
                                // test: "", //校验
                                value: "",
                                max: "",
                                min: "",
                                placeholder: ""
                            }
                        };
                    }
                    if (type == "radio") {
                        that.data = {
                            width: 12,
                            type: "radio",
                            form: {
                                type: "radio",
                                name: "",
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
                            form: {
                                type: "checkbox",
                                name: "",
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
                }
            },
            generatejson() {
                console.log(this.form);
                let form = [];
                this.form.forEach(function (list, index) {
                    if (list.form) {
                        form.push(list.form);
                    }
                });
                console.log(form);
            },
            mouseover(e) {
                this.show = true;
            },
            mouseout() {
                this.show = false;
            },
            setup(list, e) {
                this.right = list;
            },
            copy(list, index) {
                this.form.splice(index, 0, list);
            },
            look(index) {
                console.log(this.form);
                console.log(index);
            },
            remove(index) {
                this.form.splice(index, 1);
            },
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
            add(e) {
                if (this.mouse) {
                    this.form.splice(this.placeindex, 0, this.data);
                    $(e.path[e.path.length - 7])
                        .find(".component")
                        .removeClass("active");
                    $(e.path[0])
                        .closest(".component")
                        .addClass("active");
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .drag {
        position: relative;
        width: 200%;
        height: 900px;
        min-height: 900px;
        display: flex;
        font-size: 16px;

        /*设置文字不能被选中     以下为css样式*/
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .left {
            -moz-box-sizing: border-box;
            /*Firefox3.5+*/
            -webkit-box-sizing: border-box;
            /*Safari3.2+*/
            -o-box-sizing: border-box;
            /*Opera9.6*/
            -ms-box-sizing: border-box;
            /*IE8*/
            flex: 1;
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
            flex: 4;
            height: 100%;
            overflow: auto;
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
                    margin: 20px 0px 20px;
                }
            }
        }

        .look {
            -moz-box-sizing: border-box;
            /*Firefox3.5+*/
            -webkit-box-sizing: border-box;
            /*Safari3.2+*/
            -o-box-sizing: border-box;
            /*Opera9.6*/
            -ms-box-sizing: border-box;
            /*IE8*/
            flex: 3;
            height: 100%;
            overflow: auto;
            border: 1px solid #000;

            .components {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
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
            flex: 2;
            height: 100%;
            border: 1px solid #000;

            input {
                background-color: violet;
                display: block;
            }

            .form {
                display: flex;
                margin-top: 10px;

                label {
                    display: flex;
                    align-items: center;
                    // justify-content: space-around;

                    .after {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                    }

                    .after:before {
                        content: "";
                        width: 20px;
                        height: 20px;
                        border-radius: 20px;
                        border: 1px solid red;
                    }

                    input {
                        display: none;
                    }

                    input:checked+.after:before {
                        background: red;
                    }

                    input:disabled+.after:before {
                        background: blue;
                    }

                    input:disabled:checked+.after:before {
                        background: green;
                    }
                }
            }

            .form.blo {
                display: block;
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