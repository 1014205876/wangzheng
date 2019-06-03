import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //导入router服务
// import map from '../../../../src/assets/js/map';
declare var AMap

@Component({
    selector: 'app-echart',
    templateUrl: './echart.component.html',
    styleUrls: ['./echart.component.less']
})
export class EchartComponent implements OnInit {

    constructor(
        private router: Router,
    ) {
    }

    amap: any;
    leaveArr = ['A', 'B', 'C', 'D', 'E']
    leaveColorObj = {
        A: 'red',
        B: 'orange',
        C: 'yellow',
        D: 'green',
        E: 'blue'
    }

    mapEtpData = function () {
        let arr = [];
        for (let i = 0; i < 20; i++) {
            arr.push(
                {
                    top: (Math.random() * 3 + 114),
                    left: (Math.random() * 3 + 25),
                    leave: this.leaveArr[parseInt(Math.random() * 5 + '')],
                    id: Math.random() + ''
                }
            )
        }
        return arr
    };//地图中的公司定位

    todayChange;//今日变化表格数据
    allChange;//累积变化表格数据
    riskRadar;//风险数据
    entGrade;//企业评级数据
    busGrade;//业务评级数据

    letterArr = ['', 'E', 'D', 'C', 'B', 'A'];
    colorClassArr = ['bg_none', 'bg_E', 'bg_D', 'bg_C', 'bg_B', 'bg_A'];//控制背景颜色的class名的数组
    /** 
     * echart表格option模板
    */

    res = {
        "business ": {
            "eventLevel": "A",
            "riskRates": [
                {
                    "riskLevel ": "A",
                    "riskScore ": "20",
                    "ruleKey ": " zchj ",
                    "ruleParentKey": "business ",
                    "name": "资产合计"
                },
                {
                    "riskLevel ": "A",
                    "riskScore ": "21",
                    "ruleKey ": " fzl ",
                    "ruleParentKey": "business ",
                    "name": "负债率"
                }
            ],
            "riskEvents": [
                {
                    "eventLevel": "A",
                    "eventSocre": "20",
                    "ruleKey ": " business ",
                    "name": "资产合计",
                    "createTime": "2019-09-09"
                },
                {
                    "riskLevel ": "A",
                    "riskScore ": "21",
                    "ruleKey ": " business ",
                    "name": "负债率",
                    "createTime": "2019-09-09",
                }
            ]
        },
        "major": {
            "eventLevel": "B",
            "riskRates": [
                {
                    "riskLevel ": "A",
                    "riskScore ": "20",
                    "ruleKey ": " zchj ",
                    "ruleParentKey": "business",
                    "name": "资产合计",
                },
                {
                    "riskLevel ": "A",
                    "riskScore ": "21",
                    "ruleKey ": " fzl ",
                    "ruleParentKey": "business ",
                    "name": "负债率"
                }
            ]


        },
        "finance ": "B",
        "credit": "B",
        "assets": "A",
        "commercial": "B",
        "manage": "B",
        "industry": "A",
        "area": "B",
        "relate": "A"
    }



    ringOption = {//圆环option
        color: [//调色盘
            '#FB963C',//橙
            '#FFD324',//黄
            '#46A3FF',//蓝
        ],
        title: {
            text: '主标题',
            textStyle: {
                color: '#15325C',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'ImpactMTStd',
                fontSize: 40,
                lineHeight: 20,
            },
            subtext: '副标题',
            subtextStyle: {
                color: '#6B6B6B',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'MicrosoftYaHeiUI',
                fontSize: 12,
                lineHeight: 15,
            },
            x: 'center',
            y: 'center',
        },
        tooltip: {
            showContent: false,//类似title的效果，hover的时候是否显示
        },
        series: [
            {
                type: 'pie',
                hoverAnimation: false,
                // startAngle:270,//偏转角度（0-360）
                radius: ['59%', '75%'],//圆环边距离圆心的位置，
                avoidLabelOverlap: true,
                silent: true,//是否不触发鼠标事件
                label: {//标注
                    show: true,
                    color: '#8B97A7',
                    position: 'outside'

                },
                labelLine: {//标注线
                    show: true,
                    color: '#D6DCE4',
                    lineStyle: {
                        color: '#D6DCE4',
                    }
                },
                itemStyle: {//内容的样式
                    borderWidth: 4, //设置border的宽度有多大
                    borderColor: '#fff'
                },
                data: [0, 0, 0]
            }
        ]
    }
    radarOption = {//风险雷达option
        title: {
            text: '主标题',
            textStyle: {
                color: '#131313',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'MicrosoftYaHeiUI',
                fontSize: 15,
                lineHeight: 60,
            },
            padding: [0, 22],
            x: 'left',
            y: 'top',
        },
        radar: {
            name: {
                textStyle: {
                    color: '#98A3B1',
                }
            },
            shape: 'polygon',//雷达图的图形模板（多边形图）
            axisLine: {//多边形交叉等分线
                lineStyle: {
                    color: '#D4DDEE'
                }
            },
            splitLine: {//多边形的边
                lineStyle: {
                    color: '#D4DDEE'
                }
            },
            splitArea: {
                show: false,//是否隔行换色
            },
            indicator: [
                { name: '指标1', max: 5 },
                { name: '指标2', max: 5 },
                { name: '指标3', max: 5 },
                { name: '指标4', max: 5 },
                { name: '指标5', max: 5 },
                { name: '指标6', max: 5 },
                { name: '指标7', max: 5 },
                { name: '指标8', max: 5 },
                { name: '指标9', max: 5 },
                { name: '指标10', max: 5 }
            ]
        },
        series: [{
            type: 'radar',
            silent: true,//是否不触发鼠标事件
            itemStyle: {
                color: '#46A3FF'
            },
            lineStyle: {
                color: '#46A3FF'
            },
            areaStyle: {
                color: '#6BB5FF',
                option: 0.6
            },
            data: {
                value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        }]
    }
    lineOption = {//企业评级变化option
        tooltip: {//鼠标移入相关
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                snap: false,
                lineStyle: {
                    color: '#64B2FF',
                    type: 'dooted'
                }
            },
            showContent: false,//是否显示title
        },
        xAxis: {
            type: 'category',
            boundaryGap: false, //坐标轴2端留白
            axisLine: {//坐标轴轴线相关
                show: true, //是否显示
                lineStyle: {//轴线样式
                    color: "#C8D1E3"
                }
            },
            axisTick: {//坐标轴刻度相关
                show: false
            },
            axisLabel: {//坐标轴文字相关
                fontStyle: 'italic',//文字样式（斜体）
            },
            data: [
                '2009/6/12',
                '2009/6/13',
                '2009/6/14',
                '2009/6/15',
                '2009/6/16',
                '2009/6/17',
                '2009/6/18',
                '2009/6/19',
                '2009/6/20',
                '2009/6/21',
                '2009/6/22',
                '2009/6/23',
                '2009/6/24',
                '2009/6/25'
            ],
        },
        yAxis: {
            type: 'category',
            boundaryGap: false, //坐标轴2端留白
            min: 0,
            max: 5,
            splitNumber: 5,
            axisLine: {//坐标轴轴线相关
                show: true, //是否显示
                lineStyle: {//轴线样式
                    color: "#C8D1E3"
                }
            },
            axisTick: {//坐标轴刻度相关
                show: false
            },
            axisLabel: {//坐标轴文字相关
                fontStyle: 'italic',//文字样式（斜体）
            },
            splitLine: {//网格线
                show: true,
                lineStyle: {//线条样式
                    color: '#D4E1F2',
                    type: 'dotted'
                },
            },
            data: ['', 'E', 'D', 'C', 'B', 'A'],
        },
        series: [{
            type: 'line',
            // symbol: 'emptyCircle',//拐点图形
            symbol: 'image://../../../../assets/images/icon/open.png',//拐点图形
            symbolSize: 10,
            showSymbol: false,//是否在平常状态下显示拐点
            hoverAnimation: true,//是否开启拐点动画
            lineStyle: {//折线样式
                color: '#46A3FF'
            },
            itemStyle: {//折线拐点样式
                normal: {
                    color: '#46A3FF',
                    borderWidth: 2,
                }
            },
            areaStyle: {//填充区样式
                color: '#EDF6FF',
                option: 0.6,
            },
            data: [0, 0, 0]
        }]
    }
    barOption = {//业务评级变化option
        title: {
            text: '主标题',
            textStyle: {
                color: '#15325C',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                fontSize: 60,
                lineHeight: 40,
            },
            x: 'left',
            y: 'top',
        },
        xAxis: {
            type: 'category',
            boundaryGap: true, //坐标轴2端留白
            axisLine: {//坐标轴轴线相关
                show: true, //是否显示
                lineStyle: {//轴线样式
                    color: "#C8D1E3"
                }
            },
            axisTick: {//坐标轴刻度相关
                show: false
            },
            axisLabel: {//坐标轴文字相关
                fontStyle: 'italic',//文字样式（斜体）
            },
            data: [
                '2009/6/12',
                '2009/6/13',
                '2009/6/14',
                '2009/6/15',
                '2009/6/16',
                '2009/6/17',
                '2009/6/18',
                '2009/6/19',
                '2009/6/20',
                '2009/6/21',
                '2009/6/22',
                '2009/6/23',
                '2009/6/24',
                '2009/6/25'
            ],
        },
        yAxis: {
            type: 'category',
            boundaryGap: false, //坐标轴2端留白
            min: 0,
            max: 5,
            splitNumber: 5,
            axisLine: {//坐标轴轴线相关
                show: true, //是否显示
                lineStyle: {//轴线样式
                    color: "#C8D1E3"
                }
            },
            axisTick: {//坐标轴刻度相关
                show: false
            },
            axisLabel: {//坐标轴文字相关
                fontStyle: 'italic',//文字样式（斜体）
            },
            splitLine: {//网格线
                show: true,
                lineStyle: {//线条样式
                    color: '#D4E1F2',
                    type: 'dotted'
                },
            },
            data: ['', 'E', 'D', 'C', 'B', 'A'],
        },
        series: [{
            type: 'bar',
            itemStyle: {//柱状条样式
                normal: {
                    color: '#46A3FF',
                    borderWidth: 2,
                }
            },
            data: [0, 0, 0]
        }]
    }
    riskChangeHistory = {
        page: 1,
        total: 50,
        table: [
            { name: '1', newGread: '2', oldGread: '3', date: '4' }
        ]
    }

    riskArr = [
        { name: '业务状况', value: 1, href: 'one' },
        { name: '业务状况', value: 3, href: 'two' },
        { name: '业务状况', value: 3, href: 'three' },
        { name: '业务状况', value: 0, href: 'four' },
        { name: '业务状况', value: 5, href: 'five' },
        { name: '业务状况', value: 1, href: 'six' },
        { name: '业务状况', value: 3, href: 'seven' },
        { name: '业务状况', value: 3, href: 'eight' },
        { name: '业务状况', value: 0, href: 'nine' },
        { name: '业务状况', value: 5, href: 'ten' },
    ]
    navShow = false;
    link(href) {
        document.getElementById(href).scrollIntoView();
    }
    con($event) {
        console.log($event.pageY)
        let scrollTop = document.documentElement.scrollTop;
        console.log(scrollTop)
    }



    ngOnInit() {
        document.onscroll = function Reference() {
            // console.log(document.documentElement.scrollTop)
        }

        this.todayChange = JSON.parse(JSON.stringify(this.ringOption));//今日变化图表样式
        this.todayChange.title.text = '9';//今日变化主标题
        this.todayChange.title.subtext = '今日变更事件';//今日变化副标题
        this.todayChange.series[0].data = [//今日变化图表数据
            { value: 0, name: '正向变更' + 0 + '件' },
            { value: 0, name: '平向变更' + 0 + '件' },
            { value: 0, name: '负向变更' + 0 + '件' },
        ];

        this.allChange = JSON.parse(JSON.stringify(this.ringOption));//累积变化图表样式
        this.allChange.title.text = '25';//累积变更主标题
        this.allChange.title.subtext = '累积变更事件';//累计变更副标题
        this.allChange.series[0].data = [//累积变化图表数据
            { value: 25, name: '正向变更' + 22 + '件' },
            { value: 23, name: '平向变更' + 24 + '件' },
            { value: 47, name: '负向变更' + 28 + '件' },
        ];

        this.riskRadar = JSON.parse(JSON.stringify(this.radarOption));//风险雷达图表样式
        this.riskRadar.title.text = '2018年8月';
        this.riskRadar.radar.indicator = [//雷达指标
            { name: '盈利指标1', max: 5 },
            { name: '盈利指标2', max: 5 },
            { name: '盈利指标3', max: 5 },
            { name: '盈利指标4', max: 5 },
            { name: '盈利指标5', max: 5 },
            { name: '盈利指标6', max: 5 },
            { name: '盈利指标7', max: 5 },
            { name: '盈利指标8', max: 5 },
            { name: '盈利指标9', max: 5 },
            { name: '盈利指标10', max: 5 }
        ];
        this.riskRadar.series[0].data = [//风险雷达图表数据
            { value: [1, 2, 3, 4, 2, 1, 3, 4, 5, 1] }
        ]

        this.entGrade = JSON.parse(JSON.stringify(this.lineOption));//企业评级图表样式
        this.entGrade.xAxis.data = [//企业评级图表横坐标数值
            '2009/6/12',
            '2009/6/13',
            '2009/6/14',
            '2009/6/15',
            '2009/6/16',
            '2009/6/17',
            '2009/6/18',
            '2009/6/19',
            '2009/6/20',
            '2009/6/21',
            '2009/6/22',
            '2009/6/23',
            '2009/6/24',
            '2009/6/25'
        ];
        this.entGrade.yAxis.data = ['', 'E', 'D', 'C', 'B', 'A'];//企业评级图表纵坐标数值
        this.entGrade.series[0].data = ['A', 2, 3, 1, 1, 1, 2, 2, 2, 3, 1, 1, 1, 1];//企业评级图表数据

        this.busGrade = JSON.parse(JSON.stringify(this.barOption));//业务状况图表样式
        this.entGrade.xAxis.data = [//业务状况图表横坐标数值
            '2009/6/12',
            '2009/6/13',
            '2009/6/14',
            '2009/6/15',
            '2009/6/16',
            '2009/6/17',
            '2009/6/18',
            '2009/6/19',
            '2009/6/20',
            '2009/6/21',
            '2009/6/22',
            '2009/6/23',
            '2009/6/24',
            '2009/6/25'
        ];
        this.entGrade.yAxis.data = ['', 'E', 'D', 'C', 'B', 'A'];//业务状况图表纵坐标数值
        this.busGrade.series[0].data = [2, 2, 3, 1, 1, 1, 2, 2, 2, 3, 1, 1, 1, 1];//业务状况图表数据

        this.amap = new AMap.Map('map', {//绘制地图（第一个参数为标签id）
            resizeEnable: true,
            center: [115.7689, 27.4822],//中心点坐标
            zoom: 8,//缩放
            mapStyle: 'amap://styles/whitesmoke',//地图样式
        })
        this.amap.on('click', function (ev) {
            // console.log(ev)
        })
        this.setMapBorder()
        this.setMapMaker()
    }

    setMapBorder() {//绘制地图边线
        let that = this
        AMap.plugin('AMap.DistrictLayer', function () {
            let adCode = '360000';//绘制省市区地图对应的编码（类似邮箱）
            let disProvince = new AMap.DistrictLayer.Province({
                zIndex: 10000000,
                adcode: ['360000'],
                // citycode:['0791',],
                strokeWeight: 30, //线宽
                depth: 0,
                styles: {
                    'province-stroke': 'blue',//边线条颜色
                    'fill': 'rgba(255,255,255,0.5)',//填充颜色
                }
            });
            disProvince.setMap(that.amap);
        })
    }
    setMapMaker() {//绘制地图上的点
        let that = this;
        console.log(that.mapEtpData)
        that.mapEtpData().forEach((item) => {
            console.log(item.top, item.left, that.leaveColorObj[item.leave])
            let circleMarker = new AMap.CircleMarker({
                center: new AMap.LngLat(item.top, item.left),  // 圆心位置
                bubble: true,
                radius: 6, // 圆半径，单位：米
                fillColor: that.leaveColorObj[item.leave],//圆形填充颜色
                fillOpacity: 1,//圆形透明度
                strokeColor: '#fff',	//线条颜色，使用16进制颜色代码赋值。默认值为#006600
                strokeOpacity: 0.1,//轮廓线透明度
                strokeWeight: 1,//轮廓线宽度
                strokeStyle: 'solid',//轮库线样式
                extData: item,
                cursor: 'pointer',
            });
            circleMarker.on('click', function (ev) {
                console.log(circleMarker.getExtData())
                that.router.navigateByUrl("module/form")
            })
            that.amap.add(circleMarker);
        })

    }
}
