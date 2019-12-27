<template>
    <div>
        <div class="component" @mouseover.stop='mouseover' @mouseout.stop='mouseout' @mouseup.stop='add'
            @click.stop='setup(form,$event)'>
            <div class="box">
                <!-- <button class="btn" v-if='form.type!="component"'>设置</button> -->
                <button class="btn" @mousedown='move(form.type,$event,form);fatherremove()'>移动</button>
                <!-- <button class="btn" @click='fathercopy()'>复制</button> -->
                <button class="btn" @click='chakan'>查看</button>
                <button class="btn" @click='fatherremove'>删除</button>
                <div style='clear:both'></div>
            </div>
            <div style='clear:both'></div>
            <div class='place' v-show='form.show&&mouse&&placeindex==0'>生成位置</div>
            <div class='main' v-if='form.type=="component"'>
                <div class='com' v-for='(list,index) in form.list' :key='list.id'
                    :style='{width:(list.width/12*100+"%")}'>
                    <components :form='list' :index='index' :mouse='mouse' :data='data' :placeindex='placeindex'
                        @index='remove' @copy='copy' @look='look' @typechange='move' @setup='setup' @mouseup='mouseup'>
                    </components>
                    <div class='place' v-show='form.show&&mouse&&placeindex==index-0+1'>生成位置</div>
                </div>
            </div>
            <!-- <div class='place' v-if='form.type=="table"' v-show='form.show&&mouse&&placeindex==0'>生成位置</div> -->
            <div v-if='form.type=="table"'>
                显示的组件
                <div class='form' v-for='(item,index) in form.list' :key='item.id'>
                    <label class='radio'>
                        <input type='radio' :value='index' v-model='form.index'>第{{index}}个
                        <div class="after"></div>
                    </label>
                </div>
            </div>
            <div class='main' v-if='form.type=="table"'>
                <div class='com' v-for='(list,index) in form.list' :key='list.id'
                    :style='{width:(list.width/12*100+"%")}' v-show='index==form.index'>
                    <components :form='list' :index='index' :mouse='mouse' :data='data' :placeindex='placeindex'
                        @index='remove' @copy='copy' @look='look' @typechange='move' @setup='setup' @mouseup='mouseup'>
                    </components>
                    <div class='place' v-show='form.show&&mouse&&placeindex==index-0+1'>生成位置</div>
                </div>
            </div>
            <div v-if='form.type=="input"'>
                <div class='form'>
                    唯一key值
                    <input type="text" v-model='form.form.key' :disabled='true'>
                </div>
                {{form.form.name}}<br>
                输入框 {{form.form.readOnly}}
                <input type="text" :placeholder='form.form.placeholder' :readonly="form.form.readOnly"
                    v-model='form.form.value'>
                <button @click='test(form.form.value,form.form.test)'>校验</button>
            </div>
            <div v-if='form.type=="file"'>
                <div class='form'>
                    唯一key值
                    <input type="text" v-model='form.form.key' :disabled='true'>
                </div>
                <img :src="form.form.url" alt="">
            </div>
            <div v-if='form.type=="number"'>
                <div class='form'>
                    唯一key值
                    <input type="text" v-model='form.form.key' :disabled='true'>
                </div>
                {{form.form.name}}<br>
                数字框
                <input type="number" :min='form.form.min' :max='form.form.max' :placeholder='form.form.placeholder'
                    :readonly="form.form.readOnly" v-model='form.form.value'>
            </div>
            <div v-if='form.type=="date"'>
                <div class='form'>
                    唯一key值
                    <input type="text" v-model='form.form.key' :disabled='true'>
                </div>
                {{form.form.name}}<br>
                时间框
                <input type="date" :min='form.form.min' :max='form.form.max' :placeholder='form.form.placeholder'
                    v-model='form.form.value'>
            </div>
            <div v-if='form.type=="radio"'>
                <div class='form'>
                    唯一key值
                    <input type="text" v-model='form.form.key' :disabled='true'>
                </div>
                {{form.form.name}}<br>
                单选框
                <div class='form' v-for='item in form.form.options' :key='item.id'>
                    <label class='radio'>
                        <input type='radio' :value='item.value' v-model='form.form.value'>{{item.name}}
                        <div class="after"></div>
                    </label>
                </div>
            </div>
            <div v-if='form.type=="checkbox"'>
                <div class='form'>
                    唯一key值
                    <input type="text" v-model='form.form.key' :disabled='true'>
                </div>
                {{form.form.name}}<br>
                多选框
                <div class='form' v-for='item in form.form.options' :key='item.id'>
                    <label class='checkbox'>
                        <input type='checkbox' :value='item.value' v-model='form.form.value'>{{item.name}}
                        <div class="after"></div>
                    </label>
                </div>
            </div>
            <div v-if='form.type=="title"'>
                <!-- <div class='form'>
          <input type="text" v-model='form.form.key' :disabled='true'>唯一key值
        </div> -->
                <div :style='form.form.style' style='white-space:pre-wrap'>{{form.form.value}}</div>
            </div>
            <div v-if='form.type=="editor"'>
                <!-- <div v-html='form.form.div'></div> -->
                <editor @changeeditor='editor'></editor>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入jq
    import $ from "jquery";
    // 引入富文本组件
    import editor from "@/components/editor";
    export default {
        name: "components",
        props: ["form", "index", "mouse", "data", "placeindex"],
        components: {
            editor
        },
        data() {
            return {};
        },
        methods: {
            editor(value) {
                this.form.form.div = value;
            },
            test(val, re) {
                if (re) {
                    let res = new RegExp(re);
                    console.log(re);
                    console.log(res);
                    console.log(res.test(val));
                    console.log(
                        /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
                            "1014205876@qq.com"
                        )
                    );
                    if (res.test(val)) {
                        console.log("校验成功");
                    } else {
                        console.log("校验失败");
                    }
                } else {
                    console.log("无需校验");
                }
            },
            setup(list, e) {
                $(e.path[e.path.length - 7])
                    .find(".component")
                    .removeClass("active");
                $(e.path[0])
                    .closest(".component")
                    .addClass("active");
                this.$emit("setup", list, e);
            },
            move(type, e, list) {
                this.$emit("typechange", type, e, list);
            },
            fathercopy() {
                this.$emit("copy", this.form, this.index);
            },
            copy(list, index) {
                this.form.list.splice(index, 0, list);
            },
            chakan() {
                this.$emit("look", this.index);
            },
            fatherremove() {
                this.$emit("index", this.index);
            },
            remove(index) {
                this.form.list.splice(index, 1);
            },
            look(index) {
                console.log(this.form);
                console.log(index);
            },
            mouseover(e) {
                this.form.show = true;
            },
            mouseout() {
                this.form.show = false;
            },
            mouseup() {
                this.$emit("mouseup");
            },
            add(e) {
                if (this.mouse) {
                    if (this.form.list) {
                        this.form.list.splice(this.placeindex, 0, this.data);
                        $(e.path[e.path.length - 7])
                            .find(".component")
                            .removeClass("active");
                        // $(e.path[0])
                        //   .closest(".component")
                        //   .addClass("active");
                    }
                    this.mouseup();
                }
            }
        },
        created() { }
    };
</script>

<style lang="less" scoped>
    .component {
        padding: 0px 10px;
        border: 1px solid #000;
        border-radius: 5px;

        .place {
            margin: 10px;
        }

        .box {
            float: right;

            .btn {
                cursor: pointer;
                float: left;
                padding: 5px;
                margin: 2px;
                background: skyblue;
                color: #fff;
            }
        }

        .main {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
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

        input {
            width: 100%;
            background-color: violet;
            display: block;
        }

        label {
            display: flex;
            align-items: center;
            // justify-content: space-around;

            .after {
                display: flex;
                align-items: center;
                justify-content: space-around;
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

        .radio {
            .after:before {
                content: "";
                width: 20px;
                height: 20px;
                border-radius: 20px;
                border: 1px solid red;
            }
        }

        .checkbox {
            .after:before {
                content: "";
                width: 20px;
                height: 20px;
                border-radius: 5px;
                border: 1px solid red;
            }
        }
    }

    .component.active {
        border: 1px dashed yellow;
        background: #c7c7c7;
    }
</style>