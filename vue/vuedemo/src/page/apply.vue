<template>
    <div class="apply">
        <div class="tanimate" style="z-index:21">
            <back>
                <span slot="title">
                    父级传入的title
                </span>
                <span slot="more">
                    父级传入的
                    <span style="color:yellow">
                        更多
                    </span>
                </span>
                <template scope="prop">
                    <p>{{prop.msg}}</p>
                </template>
            </back>



            <div>{{name}}申请页面</div>
            <div>申请额度{{minQuota}}-{{maxQuota}}万</div>
            <div>当前时间{{date|formData}}</div>
            string:<input type="number" v-model.string="num">
            <br>
            number:<input type="number" v-model.number="num">
            <br>
            有空格:<input type="text" v-model="num">
            <br>
            无空格:<input type="text" v-model.trim="num">
            <div>num为{{num}}类型为{{typeof(num)}}</div>
            <div>过滤器{{num|getnum(2)|getnum(3)|getnum(0.2)}}</div>
            <div>
                原始属性number：{{number}}
                <br>
                计算属性prices：{{prices}}
            </div>
            <button @click="number=number+100">number添加100</button>
            <button @click="prices=prices+100">prices添加100</button>
            <span style="font-size:1rem;color:red">
                <numroll :value="number" :time="time"></numroll>
            </span>
            <button v-on:click="reload">刷新</button>
            <el-button v-on:click="tohistory">历史记录</el-button>
            <el-form label-width="100px" :model="form">
                <el-form-item label="年龄" prop="number" :rules="[{ required: true, message: '由于trigger无法触发，所以此处可不写', trigger: '无法触发'}]" :show-message="true">
                    <el-input type="number" v-model="form.number" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <button v-on:click="shenqing">立即申请</button>
            <button v-on:click="changedata(xiala)">修改数据</button>
            <button v-on:click="changesee(xiala)">修改视图</button>
            <ul class="xiala">
                <li v-for="list in xiala" :key="list.id">
                    <div class="xianshi">
                        {{list.xianshi}}
                        <img src="static/img/back.png" alt class="btn">
                    </div>
                    <div class="yincang">
                        <div v-for="item in list.yincang" :key="item.id">{{item}}</div>
                    </div>
                </li>
            </ul>
            <button v-on:click="start" class="start">开启动画</button>
        </div>
        <div class="banimate" v-on:click="stop">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
        </div>
        <div class="head">
            <div class="left">左动画</div>
            <div class="right">右动画</div>
        </div>
    </div>
</template>

<script>
    // 引入jq
    import $ from "jquery";
    // 引入返回组件
    import Back from "@/components/back";
    // 引入数字滚动组件
    import numroll from "@/components/numroll";
    import { dateTime } from "@/shared/componrnt";
    export default {
        name: "Apply",
        data() {
            //页面数据声明
            return {
                date: new Date(),
                num: 3,
                number: 10000,
                form:{
                    number:'',
                },
                time: 2,
                name: "公司名",
                minQuota: "最小",
                maxQuota: "最大",
                xiala: [
                    {
                        xianshi: "显示的东西",
                        yincang: [
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3"
                        ]
                    },
                    {
                        xianshi: "显示的东西",
                        yincang: [
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3"
                        ]
                    },
                    {
                        xianshi: "显示的东西",
                        yincang: [
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3"
                        ]
                    },
                    {
                        xianshi: "显示的东西",
                        yincang: [
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3"
                        ]
                    },
                    {
                        xianshi: "显示的东西",
                        yincang: [
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3"
                        ]
                    },
                    {
                        xianshi: "显示的东西",
                        yincang: [
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3",
                            "隐藏1",
                            "隐藏2",
                            "隐藏3"
                        ]
                    }
                ]
            };
        },
        filters: {
            //过滤器
            formData(value) {
                let date = new Date(value);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hour = date.getHours();
                let m = date.getMinutes();
                let s = date.getSeconds();
                return year + "/" + month + "/" + day + " " + hour + ":" + m + ":" + s;
            },
            getnum(value, num) {
                return value * num;
            }
        },
        // mixins:[timeFormat],
        computed: {
            //计算属性
            prices: {
                get() {
                    let price = this.number;
                    return price;
                },
                set(newValue) {
                    console.log(newValue);
                }
            }
        },
        components: {
            //组件引用
            back: Back,
            numroll
        },
        methods: {
            //自定义函数存放
            back() {
                this.$router.go(-1);
            },
            reload() {
                this.$refs.alert.alertclose();
            },
            tohistory() {
                this.$router.push("/history");
            },
            shenqing() {
                this.$router.push("/shenqing");
            },
            changedata(data) {
                data[3] = {
                    xianshi: "显示",
                    yincang: ["隐藏1", "隐藏2", "隐藏3"]
                };
                console.log(this.xiala);
            },
            changesee(data) {
                data[2].xianshi = "显示";
                console.log(this.xiala);
            },
            open(index) {
                this.xiala[index].kaiguan = !this.xiala[index].kaiguan;
            },
            start() {
                $("html,body").animate({ scrollTop: 0 }, 0);
                $(".apply .tanimate").addClass("active");
                $(".apply .banimate").addClass("active");
                $(".apply .left").addClass("active");
                $(".apply .right").addClass("active");
            },
            stop() {
                console.log(1);
                $(".apply .tanimate").removeClass("active");
                $(".apply .banimate").removeClass("active");
                $(".apply .left").removeClass("active");
                $(".apply .right").removeClass("active");
            }
        },
        created() {
            //页面初始化之后调用在mounted之前
            // this.$http.get('https://fanyi.baidu.com/pcnewcollection?req=check&fanyi_src=w&direction=en2zh&_=1548837982956').then((data) =>{
            //  console.log(date)
            // })
            this.name = this.$route.query.name;
            this.minQuota = this.$route.query.minQuota;
            this.maxQuota = this.$route.query.maxQuota;
        },
        mounted() {
            console.log(
                dateTime("yyyy-MM-dd hh:mm:ss", new Date())
            )
            //页面初始化之后调用在created之后在
            $(".apply .tanimate .xiala li .xianshi").click(function () {
                if (
                    $(this)
                        .find(".btn")
                        .hasClass("active")
                ) {
                    $(this)
                        .parent()
                        .find(".yincang")
                        .slideUp(200);
                    $(this)
                        .find(".btn")
                        .removeClass("active");
                } else {
                    $(this)
                        .parent()
                        .find(".yincang")
                        .slideDown(200);
                    $(this)
                        .find(".btn")
                        .addClass("active");
                }
            });
            // $(".apply").css("min-height", $(window).height());
            // $(".apply .banimate").css("height", $(window).height());
        }
    };
</script>

<style lang="less" scoped>
    .apply {
        width: 100%;
        // overflow: hidden;
        position: relative;

        button {
            display: block;
            width: 6rem;
            height: 1rem;
            margin: 0 auto;
        }

        .tanimate {
            position: fixed;
            top: 0;
            z-index: 10;
            width: 100%;
            height: 100%;
            overflow: auto;
            background: burlywood;
            -moz-box-sizing: border-box;
            /*Firefox3.5+*/
            -webkit-box-sizing: border-box;
            /*Safari3.2+*/
            -o-box-sizing: border-box;
            /*Opera9.6*/
            -ms-box-sizing: border-box;
            /*IE8*/
            padding-bottom: 1rem;
            transform: translateY(0%);
            transition: all 1s;
            -webkit-transition: all 1s;
            /* Safari */
            transition-timing-function: linear;
            -webkit-transition-timing-function: linear;

            /* Safari and Chrome */
            .start {
                position: absolute;
                // bottom: 0rem;
                width: 100%;
                height: 1rem;
                font-size: 0.4rem;
            }

            .xiala {
                li {
                    overflow: hidden;

                    .xianshi {
                        line-height: 1rem;
                        border-bottom: 1px solid #333;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .btn {
                            width: 0.5rem;
                            height: 0.5rem;
                            transform: rotate(180deg);
                            transition: all 0.2s;
                            -webkit-transition: all 0.2s;
                            /* Safari */
                            transition-timing-function: linear;
                            -webkit-transition-timing-function: linear;
                            /* Safari and Chrome */
                        }

                        .btn.active {
                            transform: rotate(270deg);
                        }
                    }

                    .yincang {
                        border-bottom: 1px solid #333;
                        display: none;
                        // position:absolute;
                        background: red;
                        // transform: translateY(-100%);
                        // transition: all 0.2s;
                        // -webkit-transition: all 0.2s; /* Safari */
                        // transition-timing-function: linear;
                        // -webkit-transition-timing-function: linear; /* Safari and Chrome */
                    }

                    .yincang.active {
                        // transform: translateY(0%);
                        display: block;
                    }
                }
            }
        }

        .tanimate.active {
            transform: translateY(-100%);
        }

        .banimate {
            position: relative;
            z-index: -30;
            width: 100%;
            transform: translateY(100%);
            transition: all 2s;
            -webkit-transition: all 2s;
            /* Safari */
            transition-timing-function: ease;
            -webkit-transition-timing-function: ease;

            /* Safari and Chrome */
            .box {
                width: 80%;
                height: 3rem;
                background: skyblue;
                border-radius: 0.5rem;
                margin: 0.5rem auto;
            }
        }

        .banimate.active {
            transform: translateY(0%);
            z-index: 30;
        }

        .head {
            width: 100%;
            height: 1rem;
            z-index: 20;
            position: fixed;
            top: 0;
            overflow: hidden;

            .left {
                position: absolute;
                top: 0;
                left: 0;
                width: 40%;
                background: red;
                line-height: 1rem;
                transform: translateX(-100%);
                overflow: hidden;
                transition: all 2s;
                -webkit-transition: all 2s;
                /* Safari */
            }

            .left.active {
                transform: translateX(0%);
            }

            .right {
                position: absolute;
                top: 0;
                right: 0;
                width: 40%;
                background: red;
                line-height: 1rem;
                transform: translateX(100%);
                overflow: hidden;
                transition: all 2s;
                -webkit-transition: all 2s;
                /* Safari */
            }

            .right.active {
                transform: translateX(0%);
            }
        }
    }
</style>