<template>
    <div class="news">
        消息页面页面
        <ul class="nav">
            <li v-for='(list,index) in news' :key='list.id' v-on:click='switcher(index)'>
                {{list.type}}
            </li>
        </ul>
        <ul class="main">
            <li v-for='list in main' :key=list.id>
                <ul class="order">
                    <li v-for='list in list' :key=list.id>
                        <div class="tips">
                            您在{{list.name}}公司的的贷款【订单号{{list.orderNum}}】的第【{{list.nowTimes}}/{{list.allTimes}}】期还有{{list.days}}天就要划扣了
                            您在{{list.name}}公司的的贷款【订单号{{list.orderNum}}】的第【{{list.nowTimes}}/{{list.allTimes}}】期还有{{list.days}}天就要划扣了
                        </div>
                        <span></span>
                        <div class="time">
                            {{list.time}}
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        <div id="myChart" class='mychart'></div>

        <button v-on:click='toform' style='display:block;width:70%;margin:0 auto;padding:0.15rem 0'>创建表单</button>
        <button v-on:click='tomap' style='display:block;width:70%;margin:0 auto;padding:0.15rem 0'>地图页面</button>
    </div>
</template>

<script>
    // 引入jq
    import $ from "jquery";
    import Navfootr from "@/components/Nav";
    export default {
        name: "News",
        data() {
            return {
                news: [
                    {
                        type: "系统消息"
                    },
                    {
                        type: "借款消息"
                    },
                    {
                        type: "还款消息"
                    }
                ],
                main: [
                    [
                        {
                            name: "征信贷",
                            orderNum: 123,
                            nowTimes: 3,
                            allTimes: 10,
                            days: 1,
                            time: "18/03/01"
                        },
                        {
                            name: "企业信用卡",
                            orderNum: 1321,
                            nowTimes: 1,
                            allTimes: 12,
                            days: 2,
                            time: "18/03/01"
                        },
                        {
                            name: "房抵债",
                            orderNum: 123,
                            nowTimes: 6,
                            allTimes: 11,
                            days: 3,
                            time: "18/03/01"
                        }
                    ],
                    [
                        {
                            name: "企业信用卡",
                            orderNum: 1321,
                            nowTimes: 1,
                            allTimes: 12,
                            days: 2,
                            time: "18/03/01"
                        },
                        {
                            name: "房抵债",
                            orderNum: 123,
                            nowTimes: 6,
                            allTimes: 11,
                            days: 3,
                            time: "18/03/01"
                        },
                        {
                            name: "征信贷",
                            orderNum: 123,
                            nowTimes: 3,
                            allTimes: 10,
                            days: 1,
                            time: "18/03/01"
                        }
                    ],
                    [
                        {
                            name: "征信贷",
                            orderNum: 123,
                            nowTimes: 3,
                            allTimes: 10,
                            days: 1,
                            time: "18/03/01"
                        },
                        {
                            name: "企业信用卡",
                            orderNum: 1321,
                            nowTimes: 1,
                            allTimes: 12,
                            days: 2,
                            time: "18/03/01"
                        },
                        {
                            name: "房抵债",
                            orderNum: 123,
                            nowTimes: 6,
                            allTimes: 11,
                            days: 3,
                            time: "18/03/01"
                        }
                    ]
                ]
            };
        },
        components: {
            navFootr: Navfootr
        },
        methods: {
            switcher(index) {
                $(".news .nav>li").removeClass("active");
                $(".news .nav>li")
                    .eq(index)
                    .addClass("active");
                $(".news .main>li").removeClass("active");
                $(".news .main>li")
                    .eq(index)
                    .addClass("active");
                // myChart.setOption(option[index]);
            },
            infoJq() {
                $(".news .nav li")
                    .eq(0)
                    .addClass("active");
                $(".news .main>li")
                    .eq(0)
                    .addClass("active");
                $(".news").css("min-height", $(window).height());
            },
            infoEchart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("myChart"));
                // 绘制图表
                let option = [
                    {
                        xAxis: [
                            {
                                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                            }
                        ],
                        yAxis: {},
                        series: [
                            {
                                name: "销量",
                                type: "bar",
                                data: [5, 15, 10, 20, 10, 10, 20]
                            },
                            {
                                name: "销量",
                                type: "line",
                                data: [5, 15, 10, 20, 10, 10, 20]
                            },
                        ]
                    },
                    {
                        xAxis: [
                            {
                                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                            }
                        ],
                        yAxis: {},
                        series: [
                            {
                                name: "销量",
                                type: "bar",
                                data: [5, 20, 36, 30, 10, 10, 20]
                            }
                        ]
                    },
                    {
                        xAxis: [
                            {
                                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                            }
                        ],
                        yAxis: [],
                        series: [
                            {
                                data: [10, 52, 200, 334, 390, 330, 220]
                            }
                        ]
                    }
                ];
                myChart.setOption(option[0]);
                $(".news .nav li").click(function () {
                    myChart.setOption(option[$(this).index()]);
                });
            },
            toform() {
                this.$router.push({ path: "/form" });
            },
            tomap() {
                this.$router.push({ path: "/mapPage" });
            }
        },
        mounted() {
            this.infoJq();
            this.infoEchart();
        }
    };
</script>

<style lang="less" scoped>
    .news {
        padding-bottom: 1rem;
        background: #f2f2f2;
        -moz-box-sizing: border-box;
        /*Firefox3.5+*/
        -webkit-box-sizing: border-box;
        /*Safari3.2+*/
        -o-box-sizing: border-box;
        /*Opera9.6*/
        -ms-box-sizing: border-box;

        /*IE8*/
        .nav {
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: space-around;

            li {
                padding: 5px 0px;
                position: relative;
            }

            .active {
                color: red;
            }

            .active:after {
                content: "";
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: red;
            }
        }

        .main {
            >li {
                display: none;

                .order {
                    padding-top: 0.4rem;

                    >li {
                        background: #fff;
                        border-top: 1px solid #f2f2f2;
                        padding: 0.2rem 0.3rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .tips {
                            width: 50%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }

                        span {
                            width: 8px;
                            height: 8px;
                            border-radius: 8px;
                            border: 1px solid #333;
                            background: red;
                        }
                    }
                }
            }

            >.active {
                display: block;
            }
        }

        .mychart {
            width: 7rem;
            height: 6rem;
            margin: 0 auto;
        }
    }
</style>