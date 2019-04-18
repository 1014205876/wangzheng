<template>
    <!-- 首页 -->
    <div class="firstPage">
        <!-- 左边 -->
        <div class="leftDiv">
            <!-- 左边上面第一块内容 -->
            <div class="dataStatisticsBox" style="height: 273px;">
                <div class="dataStatistics">接入数据统计</div>
                <div class="borderLine flexs" style="height: 258px;">
                    <div class="angle" />
                    <div class="ThePark">
                        <!-- 接入园区 -->
                        <div v-for="(items,index) in Access" class="accessPark">
                            <div class="title">
                                <i class="icon iconfont">&#xe630;</i>
                                {{ items.type }}
                            </div>
                            <div class="dataBox">
                                <div class="dataLine">
                                    <el-progress :width="68" :percentage="items.account" type="circle"
                                        color="#3087C3" />
                                </div>
                                <div class="proportion">在线占比</div>
                                <div class="onlineData">
                                    <span class="online">在线数</span>
                                    <span>{{ items.online }}</span>
                                </div>
                                <div class="onlineData">
                                    <span class="online">总数</span>
                                    <span>{{ items.total }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 结束 -->
                </div>
            </div>
            <!-- 左边中间内容 -->
            <div class="dataStatisticsBox" style="height: 344px;">
                <div class="dataStatistics">销量数据统计</div>
                <div class="borderLine" style="padding: 31px 11.5px 11px">
                    <!-- 销量总数 -->
                    <div class="salesBoxDiv">
                        <div class="sales">
                            <!-- <div class="title">销售总数</div> -->
                            <div class="numberBg">
                                <div class="angleSmall" />
                                <div class="titleBox">
                                    <div class="title">生产总数:</div>
                                    <div>
                                        <span class="numbers">{{ salesStatistics.saleCount }}</span>
                                        <span>吨</span>
                                    </div>
                                </div>

                                <!-- <span class="numbers">200.258.23</span><span>顿</span> -->
                            </div>
                        </div>
                        <div class="sales">
                            <!-- <div class="title">生产总数</div> -->
                            <div class="numberBg">
                                <div class="angleSmall" />
                                <div class="titleBox">
                                    <div class="title">销售总数:</div>
                                    <div>
                                        <span class="numbers">{{ salesStatistics.produceCount }}</span>
                                        <span>吨</span>
                                    </div>
                                </div>
                                <!-- <span class="numbers">200.258.23</span><span>吨</span> -->
                            </div>
                        </div>
                    </div>
                    <div class="salesBoxDiv">
                        <!-- 1 -->
                        <div class="salesRankingBox">
                            <div class="salesRanking">
                                <span>销售排行</span>
                                <span>TOP
                                    <span>5</span>
                                </span>
                            </div>
                            <div class="plantingBigBox">
                                <div v-for="(produceDatas,index) in salesStatistics.produceData" class="plantingBox">
                                    <div class="planting">
                                        <span>{{ produceDatas.speciess }}</span>
                                        <span class="colors">{{ produceDatas.numbers }}</span>
                                    </div>
                                    <el-progress :stroke-width="10" :percentage="produceDatas.numbers" />
                                </div>
                            </div>
                        </div>

                        <!-- 2 -->
                        <div class="salesRankingBox">
                            <div class="salesRanking">
                                <span>销售排行</span>
                                <span>TOP
                                    <span>5</span>
                                </span>
                            </div>
                            <div class="plantingBigBox">
                                <div v-for="(saleDatas,index) in salesStatistics.saleData" class="plantingBox">
                                    <div class="planting">
                                        <span>{{ saleDatas.species }}</span>
                                        <span class="colors">{{ saleDatas.number }}</span>
                                    </div>
                                    <el-progress :percentage="saleDatas.number" type="line" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 左边下边内容 -->
            <div class="dataStatisticsBox" style="height: 302px;">
                <div class="dataStatistics">设备异常状态</div>
                <div class="borderLine" style="height: 287px;">
                    <div class="listBox">
                        <div class="listDiv">
                            <span class="name">设备名</span>
                            <span class="time">中端时间</span>
                            <span class="type">异常类型</span>
                            <span class="state">是否报警</span>
                        </div>
                        <ul class="listUls">
                            <li v-for="(stateItem,index) in states">
                                <div class="name" :title="stateItem.deviceName">{{ stateItem.deviceName }}</div>
                                <div class="time">{{ stateItem.breakTime }}</div>
                                <div class="type">{{ stateItem.abnormalType }}</div>
                                <div class="state">
                                    <span :class="[{'line':stateItem.id == 0},{'notLine':stateItem.id == 1}]" />
                                    <span
                                        :class="[{'has':stateItem.id == 0},{'not':stateItem.id == 1}]">{{ stateItem.abnormalState }}</span>
                                </div>
                            </li>
                            <!-- 结束 -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- 中间 -->
        <div class="InTheMiddle">
            <!-- 地图 -->
            <div class="mapBox">
                <ul class="mapUls">
                    <li v-show="numSpan==0">
                        <div id="mapDiv" class="mapDiv" />
                    </li>
                    <li v-show="numSpan==1">
                        <div id="myEchartsDiv"></div>
                    </li>
                </ul>
                <div class="sideDiv">
                    <span class="sideSpan" :class="{ activSpan:numSpan == 0}" @click="numSpan=0"></span>
                    <span class="sideSpan" :class="{ activSpan:numSpan == 1}" @click="numSpan=1"></span>
                </div>
            </div>

            <!-- 趋势 -->
            <div class="trendDiv">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="每日趋势" name="first">
                        <div id="dailyDiv" />
                    </el-tab-pane>
                    <el-tab-pane label="每月趋势" name="second">
                        <div id="Amonth" />
                    </el-tab-pane>
                    <el-tab-pane label="每年趋势" name="third">
                        <div id="everyYear" />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

        <!-- 右边 -->
        <div class="rightDiv">
            <!-- 右边第一块内容 -->
            <div class="dataStatisticsBox" style="height: 259px;">
                <div class="dataStatistics">实时采集数据</div>
                <div class="borderLine flexs" style="height: 245px;">
                    <div id="figure" />
                    <div class="DataListBox">
                        <div class="DataListDiv">
                            <div>采集数据源</div>
                            <div>日增长量(条)</div>
                        </div>
                        <ul class="DataList">
                            <li v-for="(item, index) in collect">
                                <div>{{ item.text }}</div>
                                <div class="growth">{{ item.value }}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 中间内容 -->
            <div class="dataStatisticsBox" style="height: 357px;">
                <div class="dataStatistics">园区数量统计</div>
                <div class="borderLine" style="height: 341px;">
                    <!-- <div class="aStatistical">(个)<span>近8月园区数量统计表</span></div> -->
                    <div id="borderLines" />
                </div>
            </div>
            <!-- 下边内容 -->
            <div class="dataStatisticsBox" style="height: 302px;">
                <div class="dataStatistics">实时监控视频</div>
                <div class="borderLine" style="height: 287px;">
                    <!--  <ul class="imgUls">
            <li>
              <img src="" alt="">
            </li>
          </ul>-->
                    <img src="../../../../assets/IotMonitoring/base/videoImg.png" alt>
                </div>
            </div>
        </div>
        <!-- 结束 -->
    </div>
</template>

<script>
    import "echarts/map/js/china.js";
    // import EChart from 'vue-echarts/components/Echarts'
    import "echarts/lib/component/title";
    import "echarts/lib/component/legend";
    import "echarts/lib/chart/heatmap";
    import "echarts/lib/component/toolbox";
    import "echarts/lib/component/tooltip";

    import "echarts/map/js/province/jiangxi.js";

    import {
        joinDate,
        sales,
        abnormal,
        collectList,
        statisticalList,
        daySaleDatas,
        monthSaleDatas,
        yearSaleDatas
    } from "@/api/IotMonitoring/base/firstPage";
    import {
        getMap
    } from '@/assets/dateJS/index'
    export default {
        name: "FirstPage",
        props: ["mapJect", "mapName"],
        data() {
            return {
                activeName: "first",
                Access: Object, // 接入数据统计
                collect: Object, // 实时采集
                statistical: Object, // 园区数量统计
                salesStatistics: Object, // 销量数据统计
                states: Object, // 设备异常状态
                daily: Object, // 每日
                dailyX: [], // 每日x轴
                dailyY: [], // 每日y轴
                Amonth: Object, // 每月
                AmonthX: [], // 每月x轴
                AmonthY: [], // 每月y轴
                everyYear: Object, // 每年
                everyYearX: [], // 每年x轴
                everyYearY: [], // 每年y轴
                months: [], // 园区数量统计月
                growths: [], // 数据
                years: [],
                val: [],
                names: [],
                chart: null,
                numSpan: 0
            };
        },
        mounted() {
            joinDate().then(res => {
                // 接入数据统计
                this.Access = res.data;
            });
            sales().then(res => {
                // 销量数据统计
                this.salesStatistics = res.data[0];
            });
            abnormal().then(res => {
                // 设备异常状态
                this.states = res.data;
            });
            collectList().then(res => {
                // 实时采集数据
                this.collect = res.data;
                this.names = this.collect.map(item => {
                    let obj = $.extend(true, {}, item);
                    obj.text = obj.text.split("大数据")[0];
                    return obj;
                });
                this.val = this.collect.map(item => item.value);
                setInterval(() => {
                    for (var i = 0; i < this.collect.length; i++) {
                        this.collect[i].value += Math.floor(Math.random() * 10);
                    }
                }, 5000);
                this.figure();
            });
            statisticalList().then(res => {
                // 园区数量统计
                this.statistical = res.data;
                for (var i = 0; i < this.statistical.length; i++) {
                    this.months.push(this.statistical[i].month);
                    this.growths.push(this.statistical[i].growth);
                }
                this.charts();
            });
            daySaleDatas().then(res => {
                // 每日销售量数据
                this.daily = res.data.data;
                for (var i = 0; i < this.daily.length; i++) {
                    this.dailyX.push(this.daily[i].x);
                    this.dailyY.push(this.daily[i].y);
                }
                this.dailys();
            });
            monthSaleDatas().then(res => {
                // 每月销售量数据
                this.Amonth = res.data.data;
                for (var i = 0; i < this.Amonth.length; i++) {
                    this.AmonthX.push(this.Amonth[i].x);
                    this.AmonthY.push(this.Amonth[i].y);
                }
                this.Amonths();
            });
            yearSaleDatas().then(res => {
                // 每年销售量数据
                this.everyYear = res.data.data;
                for (var i = 0; i < this.everyYear.length; i++) {
                    this.everyYearX.push(this.everyYear[i].x);
                    this.everyYearX.push(this.everyYear[i].y);
                }
                this.everyYears();
                this.mapFun();
            });
            getMap(this.$echarts, 1);
        },
        methods: {
            handleClick(tab, event) {
            },
            figure() {
                // 实时采集数据
                this.chartFigure = this.$echarts.init(document.getElementById("figure"));
                this.chartFigure.setOption({
                    tooltip: {
                        trigger: "axis"
                    },
                    calculable: true,
                    radar: [
                        {
                            name: {
                                show: true,
                                textStyle: {
                                    fontSize: 12,
                                    color: "#5c9deb"
                                }
                            },
                            indicator: this.names,
                            nameGap: 5,
                            shape: "circle",
                            center: ["50%", "50%"],
                            splitNumber: 4,
                            splitArea: {
                                areaStyle: {
                                    color: [
                                        "rgba(23, 48, 94, 0.2)",
                                        "rgba(21, 44, 84, 0.4)",
                                        "rgba(17, 38, 72, 0.6)",
                                        "rgba(14, 31, 59, 0.8)"
                                    ],
                                    shadowColor: "rgba(0, 0, 0, 0.3)",
                                    shadowBlur: 10
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(238, 197, 102, 0)"
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(255, 255, 255, 0)"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: "",
                            type: "radar", //图表类型 radar为雷达图
                            lineStyle: {
                                normal: {
                                    width: 1,
                                    opacity: 0.5
                                }
                            },
                            symbol: "none",
                            itemStyle: {
                                normal: {
                                    color: "#f9713c"
                                }
                            },
                            areaStyle: {
                                normal: {
                                    opacity: 0.1
                                }
                            },
                            symbolSize: 6,
                            data: [
                                {
                                    value: this.val
                                }
                            ]
                        }
                    ]
                });
            },
            charts() {
                // 园区数量统计
                this.chart = this.$echarts.init(document.getElementById("borderLines"));
                var xstrData = [];
                for (var i = 0; i < this.months.length; i++) {
                    var str = "2018-" + this.months[i];
                    xstrData.push(str);
                }
                this.chart.setOption({
                    color: ["#195079"],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: "6%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: xstrData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#a3c9f7"
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#a3c9f7"
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            name: "        (个)近8月园区数量统计图",
                            axisLabel: {
                                textStyle: {
                                    color: "#a3c9f7"
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#a3c9f7"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: "增加数量",
                            type: "bar",
                            barWidth: 21, // 最大宽度
                            data: this.growths
                        }
                    ]
                });
            },
            dailys() {
                // 每日趋势
                // this.chartBar = this.$echarts.init(document.getElementById('dailyDiv'));
                const myChart1 = document.getElementById("dailyDiv");
                /* myChart1.style.width = window.innerWidth / 2 - 230 + 'px' */
                const chartObj = this.$echarts.init(myChart1);
                chartObj.setOption({
                    color: ["#0775af"],
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: this.dailyX,
                        axisLabel: {
                            interval: 0,
                            rotate: 50,
                            textStyle: {
                                color: "#a3c9f7"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    yAxis: {
                        name: "销售量(吨)",
                        type: "value",
                        axisLabel: {
                            formatter: "{value}",
                            textStyle: {
                                color: "#a3c9f7"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    series: [
                        {
                            data: this.dailyY,
                            type: "line",
                            areaStyle: {}
                        }
                    ]
                });
            },
            Amonths() {
                // 每月趋势
                const myChart2 = document.getElementById("Amonth");
                myChart2.style.width = window.innerWidth / 2 - 230 + "px";
                const chartObj = this.$echarts.init(myChart2);

                chartObj.setOption({
                    color: ["#0775af"],
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: this.AmonthX,
                        axisLabel: {
                            textStyle: {
                                color: "#a3c9f7"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    yAxis: {
                        name: "销售量(吨)",
                        type: "value",
                        axisLabel: {
                            textStyle: {
                                color: "#a3c9f7"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    series: [
                        {
                            data: this.AmonthY,
                            type: "line",
                            areaStyle: {}
                        }
                    ]
                });
            },
            everyYears() {
                // 每年趋势
                const myChart3 = document.getElementById("everyYear");
                myChart3.style.width = window.innerWidth / 2 - 230 + "px";
                const chartObj = this.$echarts.init(myChart3);

                chartObj.setOption({
                    color: ["#0775af"],
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: this.everyYearX,
                        axisLabel: {
                            textStyle: {
                                color: "#a3c9f7"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    yAxis: {
                        name: "销售量(吨)",
                        type: "value",
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#a3c9f7"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    series: [
                        {
                            data: this.everyYearX,
                            type: "line",
                            areaStyle: {}
                        }
                    ]
                });
            },
            jumpBase(id, type) {
                this.$router.push({
                    name: "enterpriseShow",
                    params: { id: id, type: type }
                });
            },
            mapFun() {
                var that = this;
                var map;
                var administrative;
                var zoom = 10;

                function onLoad() {
                    var locationData = [
                        {
                            lng: 117.22119,
                            lat: 29.365601,
                            id: 8,
                            name: "浮梁仙芝茶叶有限公司",
                            type: "1"
                        },
                        {
                            lng: 117.561254,
                            lat: 29.297238,
                            id: 9,
                            name: "婺源林生实业有限公司",
                            type: "1"
                        },
                        {
                            lng: 118.353685,
                            lat: 28.638091,
                            id: 10,
                            name: "玉山县柳林现代农业示范园",
                            type: "1"
                        },
                        {
                            lng: 117.190259,
                            lat: 29.003489,
                            id: 11,
                            name: "绿乐集团种植基地",
                            type: "1"
                        },
                        {
                            lng: 117.315886,
                            lat: 28.900874,
                            id: 12,
                            name: "乐平市凤凰山生态农业",
                            type: "1"
                        },
                        {
                            lng: 115.554649,
                            lat: 28.850797,
                            id: 6,
                            name: "安义县斐然农业示范园",
                            type: "1"
                        },
                        {
                            lng: 116.176713,
                            lat: 28.368012,
                            id: 7,
                            name: "南昌绿谷栖霞国家现代农业示范园",
                            type: "1"
                        },
                        {
                            lng: 117.251615,
                            lat: 28.298798,
                            id: 13,
                            name: "贵溪市省级现代农业示范区",
                            type: "1"
                        },
                        {
                            lng: 116.562228,
                            lat: 29.9019,
                            id: 14,
                            name: "彭泽县安泰农机专业合作社",
                            type: "1"
                        },
                        {
                            lng: 116.642716,
                            lat: 29.328086,
                            id: 15,
                            name: "鄱湖米业鸦鹊湖基地",
                            type: "1"
                        },
                        {
                            lng: 116.908294,
                            lat: 28.987819,
                            id: 16,
                            name: "鄱阳湖屠宰场",
                            type: "1"
                        },
                        {
                            lng: 116.695569,
                            lat: 29.019989,
                            id: 17,
                            name: "鄱阳湖壹号渔业集团",
                            type: "1"
                        },
                        {
                            lng: 116.819001,
                            lat: 28.95887,
                            id: 18,
                            name: "江西盛态粮食股份有限公司",
                            type: "1"
                        },
                        {
                            lng: 116.790069,
                            lat: 28.868312,
                            id: 19,
                            name: "乐丰茨山水稻基地",
                            type: "1"
                        },
                        {
                            lng: 116.720679,
                            lat: 28.716552,
                            id: 20,
                            name: "余干县省级现代农业示范区",
                            type: "1"
                        },
                        {
                            lng: 116.849524,
                            lat: 28.220426,
                            id: 21,
                            name: "邓家埠水稻原种场农科所",
                            type: "1"
                        },
                        {
                            lng: 116.821045,
                            lat: 28.220819,
                            id: 22,
                            name: "余江县省级现代农业示范区",
                            type: "1"
                        },
                        {
                            lng: 116.913876,
                            lat: 27.28568,
                            id: 23,
                            name: "船屋农业开发有限公司",
                            type: "1"
                        },
                        {
                            lng: 116.931899,
                            lat: 27.300526,
                            id: 24,
                            name: "江西聚龙湾现代渔业发展有限公司",
                            type: "1"
                        },
                        {
                            lng: 116.34287,
                            lat: 29.590065,
                            id: 25,
                            name: "湖口县武山镇年丰百果园",
                            type: "1"
                        },
                        {
                            lng: 116.294541,
                            lat: 29.53843,
                            id: 26,
                            name: "都昌县鄱湖晨晖农场",
                            type: "1"
                        },
                        {
                            lng: 116.248885,
                            lat: 29.636148,
                            id: 27,
                            name: "湖口县南北港渔业",
                            type: "1"
                        },
                        {
                            lng: 116.0063,
                            lat: 29.674493,
                            id: 28,
                            name: "樟树现代农业示范园",
                            type: "1"
                        },
                        {
                            lng: 115.697588,
                            lat: 29.681083,
                            id: 29,
                            name: "瑞昌市粮油芦笋基地",
                            type: "1"
                        },
                        {
                            lng: 115.658967,
                            lat: 29.672089,
                            id: 30,
                            name: "赛湖农场",
                            type: "1"
                        },
                        {
                            lng: 115.897459,
                            lat: 29.517513,
                            id: 31,
                            name: "庐山市茶叶科学研究所",
                            type: "1"
                        },
                        {
                            lng: 115.703842,
                            lat: 29.176583,
                            id: 32,
                            name: "宏康（九江）农业开发公司",
                            type: "1"
                        },
                        /* {
                          lng: 115.572061,
                          lat: 28.850259,
                          id: 1,
                          name: "安义县省级现代农业示范区",
                          type: "1"
                        }, */
                        {
                            lng: 115.978163,
                            lat: 28.522552,
                            id: 33,
                            name: "新建水稻高产示范基地",
                            type: "1"
                        },
                        {
                            lng: 116.013366,
                            lat: 28.374606,
                            id: 34,
                            name: "凤凰沟现代农业示范园",
                            type: "1"
                        },
                        /* {
                          lng: 116.17816,
                          lat: 28.35455,
                          id: 1,
                          name: "江西省红壤研究所",
                          type: "1"
                        }, */
                        {
                            lng: 115.536308,
                            lat: 28.276905,
                            id: 35,
                            name: "奉新县猕猴桃物联网示范基地",
                            type: "1"
                        },
                        {
                            lng: 116.375219,
                            lat: 28.012266,
                            id: 36,
                            name: "抚州市水产科学研究所实验基地",
                            type: "1"
                        },
                        {
                            lng: 116.452204,
                            lat: 27.986685,
                            id: 37,
                            name: "抚州农科所现代农业科技示范基地",
                            type: "1"
                        },
                        {
                            lng: 116.322391,
                            lat: 27.945011,
                            id: 38,
                            name: "新干县省级现代农业示范区",
                            type: "1"
                        },
                        {
                            lng: 116.136184,
                            lat: 27.708542,
                            id: 39,
                            name: "崇仁县麻鸡产业示范园",
                            type: "1"
                        },
                        {
                            lng: 115.603774,
                            lat: 27.787505,
                            id: 40,
                            name: "新干县农技推广中心水稻示范基地",
                            type: "1"
                        },
                        {
                            lng: 115.723788,
                            lat: 27.554534,
                            id: 41,
                            name: "乐安现代农业示范园",
                            type: "1"
                        },
                        {
                            lng: 116.107595,
                            lat: 26.809625,
                            id: 42,
                            name: "宁都县现代农业示范园",
                            type: "1"
                        },
                        {
                            lng: 116.064709,
                            lat: 25.933932,
                            id: 43,
                            name: "曾屋村专业农民合作社",
                            type: "1"
                        },
                        {
                            lng: 114.560341,
                            lat: 29.010464,
                            id: 44,
                            name: "江西省宁红集团有限公司",
                            type: "1"
                        },
                        {
                            lng: 114.549418,
                            lat: 29.020572,
                            id: 45,
                            name: "江西省六叶茶叶有限公司",
                            type: "1"
                        },
                        {
                            lng: 114.865213,
                            lat: 28.262771,
                            id: 46,
                            name: "上高县农业局水稻示范基地",
                            type: "1"
                        },
                        {
                            lng: 114.492067,
                            lat: 28.236241,
                            id: 47,
                            name: "万载县恒晖大农业景区",
                            type: "1"
                        },
                        {
                            lng: 114.95967,
                            lat: 27.810965,
                            id: 48,
                            name: "渝水区现代农业示范园",
                            type: "1"
                        },
                        {
                            lng: 114.045857,
                            lat: 27.641294,
                            id: 49,
                            name: "芦溪县省级现代农业示范区",
                            type: "1"
                        },
                        {
                            lng: 115.292553,
                            lat: 27.437099,
                            id: 50,
                            name: "中节能蔬菜基地",
                            type: "1"
                        },
                        {
                            lng: 115.093403,
                            lat: 27.002737,
                            id: 51,
                            name: "青原区现代农业展示馆",
                            type: "1"
                        },
                        {
                            lng: 114.679709,
                            lat: 25.832937,
                            id: 52,
                            name: "南康区四季童话现代农业观光园",
                            type: "1"
                        },
                        {
                            lng: 115.0844,
                            lat: 25.214268,
                            id: 53,
                            name: "信丰脐橙种植基地",
                            type: "1"
                        }
                    ];
                    // 初始化地图对象
                    map = new T.Map("mapDiv", { datasourcesControl: true });
                    // 设置显示地图的中心点和级别
                    // map.centerAndZoom(new T.LngLat(116.40969,39.89945), zoom);
                    const lo = new T.Geolocation();
                    var ctrl = new T.Control.MapType();
                    var scale = new T.Control.Scale();
                    // 添加控件
                    map.addControl(ctrl);
                    map.addControl(scale);
                    // 创建对象
                    administrative = new T.AdministrativeDivision();

                    var config = {
                        needSubInfo: true,
                        needAll: false,
                        needPolygon: true,
                        needPre: true,
                        searchType: 1,
                        searchWord: "江西省"
                    };
                    for (var i = 0; i < locationData.length; i++) {
                        var id = locationData[i].id;
                        var type = locationData[i].type;
                        var point = new T.LngLat(locationData[i].lng, locationData[i].lat);
                        var marker = new T.Marker(point); // 创建标注

                        var sContent =
                            "<div style='margin:0px;'>" +
                            "<div '>" +
                            "<img  src='./src/assets/IotMonitoring/base/mapImages.jpg' width='100%' height='70' title=''/>" +
                            "<div style=''> <br>基地名称：" +
                            locationData[i].name +
                            "" +
                            "</div>" +
                            "</div>" +
                            "</div>";
                        map.addOverLay(marker);
                        addClickHandler(sContent, marker, id);
                    }
                    // 坐标添加事件
                    function addClickHandler(content, marker, id) {
                        marker.addEventListener("mouseover", function (e) {
                            addOpenInfo(content, marker);
                        });
                        marker.addEventListener("mouseout", function (e) {
                            closeOpenInfo(content, marker);
                        });
                        marker.addEventListener("click", e => {
                            that.jumpBase(id, type);
                            // jumpBase(content,marker)
                        });
                    }

                    function addOpenInfo(content, marker) {
                        var infoWin1 = new T.InfoWindow();
                        infoWin1.setContent(content);

                        marker.openInfoWindow(infoWin1);
                    }
                    function closeOpenInfo(content, marker) {
                        var infoWin1 = new T.InfoWindow();
                        infoWin1.setContent(content);
                        marker.closeInfoWindow();
                    }
                    administrative.search(config, searchResult);
                }
                onLoad();

                function searchResult(result) {
                    if (result.getStatus() == 100) {
                        var data = result.getData();
                        showMsg(data);
                    } else {
                        result.getMsg();
                    }
                }
                function showMsg(data) {
                    var dataChild = data[0].child;
                    for (var i = 0; i < dataChild.length; i++) {
                        if (dataChild[0].adminType == "city") {
                            if (dataChild[i].points) {
                                // 绘制行政区划
                                polygon(dataChild[i].points);
                            }

                            // 解释下级行政区划
                            if (dataChild[i].child) {
                                showMsg(dataChild[i].child);
                                if (dataChild[i].child.points) {
                                    // 绘制行政区划
                                    polygon(dataChild[i].child.points);
                                }
                            }
                        }
                    }

                    map.centerAndZoom(new T.LngLat(115.7, 27.3), 7);
                }

                function polygon(points) {
                    var pointsArr = [];
                    for (var i = 0; i < points.length; i++) {
                        var regionLngLats = [];
                        var regionArr = points[i].region.split(",");

                        for (var m = 0; m < regionArr.length; m++) {
                            var lnglatArr = regionArr[m].split(" ");
                            var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
                            regionLngLats.push(lnglat);
                            pointsArr.push(lnglat);
                        }
                        // 创建面对象
                        var polygon = new T.Polygon(regionLngLats, {
                            color: "#9d96ad",
                            weight: 2,
                            opacity: 1,
                            fillColor: "#c1ece5",
                            fillOpacity: 0.3
                        });
                        // 向地图上添加行政区划面
                        map.addOverLay(polygon);
                    }

                    // 显示最佳比例尺
                    map.setViewport(pointsArr);
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    .firstPage {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;

        /* 左边 */
        .leftDiv {
            /* width: 545px; */
            width: 29.1%;

            /* 左边上面第一块内容 */
            .ThePark {
                width: 100%;
                position: relative;
                z-index: 1;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;

                .accessPark {
                    width: 24%;

                    &:last-child .dataBox {
                        border-right: 0px;
                    }

                    .title {
                        color: #95c1f7;
                        text-align: center;
                        margin-bottom: 23px;

                        i {
                            margin-right: 6px;
                        }
                    }

                    .dataLine {
                        width: 68px;
                        height: 68px;
                        margin: 0 auto;
                        margin-bottom: 16px;
                    }

                    .proportion {
                        text-align: center;
                        color: #5c9deb;
                        font-size: 12px;
                        margin-bottom: 27px;
                    }

                    .onlineData {
                        font-size: 14px;
                        display: flex;
                        display: -webkit-flex;
                        justify-content: space-between;
                        width: 95%;
                        line-height: 24px;

                        .online {
                            color: #a3c9f7;
                            text-align: left;
                        }
                    }
                }
            }

            /* 第二块内容 */
            .salesBoxDiv {
                width: 100%;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;

                .sales {
                    width: 49%;

                    .numberBg {
                        width: 100%;
                        height: 43px;
                        background: url(../../../../assets/IotMonitoring/base/numberBg.png) no-repeat center/100% 100%;
                        text-align: center;
                        line-height: 43px;
                        color: #33629c;
                        font-size: 14px;
                        position: relative;
                        margin-bottom: 7px;

                        .angleSmall {
                            width: 100%;
                            height: 100%;
                            background: url(../../../../assets/IotMonitoring/base/angleSmall.png) no-repeat center/100% 100%;
                            position: absolute;
                            top: 0%;
                            left: 0%;
                            animation: breath 3s ease-in-out infinite;
                            -webkit-animation: breath 3s ease-in-out infinite;
                        }

                        .titleBox {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            z-index: 1;
                            display: flex;
                            display: -webkit-flex;
                            justify-content: flex-start;
                            padding: 0 10px;

                            .title {
                                font-size: 16px;
                                margin-right: 10px;
                            }

                            .numbers {
                                font-size: 20px;
                                color: #51e1ec;
                                margin-right: 10px;
                            }
                        }
                    }
                }

                .salesRankingBox {
                    width: 49%;
                    font-size: 14px;

                    .salesRanking {
                        padding: 0 5px;
                        height: 33px;
                        display: flex;
                        display: -webkit-flex;
                        justify-content: space-between;
                        align-items: center;
                        background: -webkit-linear-gradient(to left,
                            #1c2946,
                            #244d91,
                            #509dcd);
                        background: -o-linear-gradient(to left, #1c2946, #244d91, #509dcd);
                        background: -moz-linear-gradient(to left, #1c2946, #244d91, #509dcd);
                        background: linear-gradient(to left, #1c2946, #244d91, #509dcd);
                    }

                    .plantingBigBox {
                        padding: 5px 5px 0;
                        background-color: #132139;
                        padding-bottom: 3px;

                        .plantingBox {
                            margin-bottom: 3px;

                            .planting {
                                height: 22px;
                                display: flex;
                                display: -webkit-flex;
                                justify-content: space-between;
                                align-items: center;

                                .colors {
                                    color: #3399de;
                                }
                            }
                        }
                    }
                }
            }

            /* 第三块内容 */
            .listBox {
                width: 100%;

                .listDiv {
                    color: #5c9deb;
                    font-size: 14px;
                    width: 100%;
                    height: 35px;

                    span {
                        display: inline-block;
                        line-height: 35px;
                        text-align: center;
                    }
                }

                .listUls {
                    li {
                        width: 100%;
                        height: 35px;
                        font-size: 15px;

                        &:nth-child(even) {
                            background-color: #0c1a35;
                        }

                        div {
                            line-height: 35px;
                        }

                        .name {
                            float: left;
                            text-align: center;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .time {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .time,
                        .type {
                            float: left;
                            text-align: center;
                            color: #0a73b1;
                        }

                        .type,
                        .state {
                            width: 20%;
                        }

                        .state {
                            float: left;
                            text-align: center;

                            .line {
                                display: inline-block;
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                background: -webkit-radial-gradient(#9ef4ee,
                                    #51cebb,
                                    #28b39b);
                                /* Safari 5.1 - 6.0 */
                                background: -o-radial-gradient(#9ef4ee,
                                    #51cebb,
                                    #28b39b);
                                /* Opera 11.6 - 12.0 */
                                background: -moz-radial-gradient(#9ef4ee,
                                    #51cebb,
                                    #28b39b);
                                /* Firefox 3.6 - 15 */
                                background: radial-gradient(#9ef4ee,
                                    #51cebb,
                                    #28b39b);
                                /* 标准的语法（必须放在最后） */
                                margin-right: 6px;
                                animation: breath 3s ease-in-out infinite;
                                -webkit-animation: breath 3s ease-in-out infinite;
                            }

                            .has {
                                color: #0a73b1;
                            }

                            .notLine {
                                display: inline-block;
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                background: -webkit-radial-gradient(#9ef4ee,
                                    #d07357,
                                    #b54726);
                                /* Safari 5.1 - 6.0 */
                                background: -o-radial-gradient(#9ef4ee,
                                    #d07357,
                                    #b54726);
                                /* Opera 11.6 - 12.0 */
                                background: -moz-radial-gradient(#9ef4ee,
                                    #d07357,
                                    #b54726);
                                /* Firefox 3.6 - 15 */
                                background: radial-gradient(#9ef4ee,
                                    #d07357,
                                    #b54726);
                                /* 标准的语法（必须放在最后） */
                                margin-right: 6px;
                                animation: breath 3s ease-in-out infinite;
                                -webkit-animation: breath 3s ease-in-out infinite;
                            }

                            .not {
                                color: #c55939;
                            }
                        }
                    }
                }
            }
        }

        /* 中间 */
        .InTheMiddle {
            /* width: 722px; */
            width: 38.55%;

            .mapBox {
                width: 100%;
                height: 640px;
                margin-bottom: 37px;
                position: relative;

                .mapUls {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: flex-start;

                    li {
                        width: 100%;
                        height: 100%;

                        .mapDiv {
                            width: 100%;
                            height: 100%;
                        }

                        #myEchartsDiv {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                .sideDiv {
                    position: absolute;
                    top: 94%;
                    left: 86%;
                    z-index: 999;

                    .sideSpan {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        background-color: #51e1ec;
                        border-radius: 5px;
                        cursor: pointer;

                        &:first-child {
                            margin-right: 10px;
                        }
                    }

                    .activSpan {
                        background-color: #2b6aad;
                        box-shadow: 0px 0px 20px #2b6aad;
                    }
                }
            }

            .trendDiv {
                width: 100%;
                height: 287px;
                background: url(../../../../assets/IotMonitoring/base/borderLine.png) no-repeat center/100% 100%;

                #dailyDiv,
                #Amonth,
                #everyYear {
                    width: 100%;
                    height: 220px;
                }
            }
        }

        /* 右边 */
        .rightDiv {
            // width: 546px;
            width: 29.152%;

            /* 第一块 */
            #figure {
                width: 200px;
                height: 178px;
                // border-radius: 50%;
                margin: auto 0;
            }

            .DataListBox {
                width: 285px;

                .DataListDiv {
                    width: 100%;
                    height: 39px;
                    color: #5c9deb;
                    font-size: 14px;

                    div {
                        width: 50%;
                        line-height: 39px;
                        float: left;
                        text-align: center;
                    }
                }

                .DataList {
                    li {
                        width: 100%;
                        height: 39px;
                        font-size: 16px;

                        div {
                            width: 50%;
                            line-height: 39px;
                            float: left;
                            text-align: center;
                        }

                        .growth {
                            color: #0a73b1;
                        }
                    }
                }
            }

            /* 中间 */
            /* .aStatistical {
      font-size: 14px;
      span {
        color: #5c9deb;
        margin-left: 3px;
      }
    } */
            #borderLines {
                width: 100%;
                height: 90%;
            }

            /* 第三块 */
            .borderLine {
                padding: 31px 14px 14px;
                cursor: pointer;

                /* .imgUls {
        width: 100%;
        height: 100%;
        li {
          height: 124px;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          div {
            width: 49%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      } */
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        /* 结束 */
        @media screen and (max-width: 1367px) {
            .leftDiv {
                .ThePark {
                    .accessPark {
                        .title {
                            font-size: 15px;
                        }

                        .onlineData {
                            font-size: 13px;
                        }
                    }
                }

                .salesBoxDiv {
                    .numberBg {
                        font-size: 12px !important;

                        .title {
                            font-size: 14px !important;
                            margin-right: 3px !important;
                        }

                        .numbers {
                            font-size: 16px !important;
                        }
                    }
                }

                .listBox {
                    .listUls {
                        li {
                            font-size: 13px;
                        }
                    }
                }
            }

            .rightDiv {
                .DataListBox {
                    .DataList {
                        li {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
</style>