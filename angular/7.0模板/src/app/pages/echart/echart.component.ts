import { Component, OnInit } from '@angular/core';
import './../../../assets/js/china.js'

@Component({
    selector: 'app-echart',
    templateUrl: './echart.component.html',
    styleUrls: ['./echart.component.less']
})
export class EchartComponent implements OnInit {

    constructor() {
    }

    todayChange;//今日变化表格数据
    riskRadar;//风险数据
    entGrade;//企业评级数据
    busGrade;//业务评级数据


    ringOption = {//圆环option
        title: {
            text: 9,
            textStyle: {
                color: '#15325C',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                fontSize: 60,
                lineHeight: 40,
            },
            subtext: '今日变更事件',
            subtextStyle: {
                color: '#868686',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'Arial',
                fontSize: 16,
                lineHeight: 20,
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
                radius: ['50%', '70%'],//圆环边距离圆心的位置，
                avoidLabelOverlap: true,
                silent: true,//是否不触发鼠标事件
                label: {//标注
                    show: true,
                    color: '#D6DCE4',
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
                    borderWidth: 5, //设置border的宽度有多大
                    borderColor: '#fff',
                    color: function (params) {//定义一个输出颜色的函数
                        let colorList = [
                            '#46A3FF',//蓝
                            '#FB963C',//橙
                            '#FFD324'//黄
                        ];
                        return colorList[params.dataIndex]
                    },
                },
            }
        ]
    }
    radarOption = {//风险雷达option
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
                    type: 'dashed'
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
            type: 'value',
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
                formatter: function (value, index) {
                    let letterArr = [' ', 'E', 'D', 'C', 'B', 'A'];//字母数字，用于把拿到的数字转换成字母
                    return letterArr[value]
                },
                fontStyle: 'italic',//文字样式（斜体）
            },
            splitLine: {//网格线
                show: true,
                lineStyle: {//线条样式
                    color: '#D4E1F2',
                    type: 'dotted'
                },
            },
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
            itemStyle: {
                normal: {
                    color: '#46A3FF',
                    borderWidth: 2,
                }
            },
            areaStyle: {
                color: '#EDF6FF',
                option: 0.6,
            },
        }]
    }
    barOption = {//业务评级变化option
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
            type: 'value',
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
                formatter: function (value, index) {
                    let letterArr = [' ', 'E', 'D', 'C', 'B', 'A'];//字母数字，用于把拿到的数字转换成字母
                    return letterArr[value]
                },
                fontStyle: 'italic',//文字样式（斜体）
            },
            splitLine: {//网格线
                show: true,
                lineStyle: {//线条样式
                    color: '#D4E1F2',
                    type: 'dotted'
                },
            },
        },
        series: [{
            type: 'bar',
            symbolSize: 10,
            showSymbol: false,//是否在平常状态下显示拐点
            hoverAnimation: true,//是否开启拐点动画
            lineStyle: {//折线样式
                color: '#46A3FF'
            },
            itemStyle: {
                normal: {
                    color: '#46A3FF',
                    borderWidth: 2,
                }
            },
            areaStyle: {
                color: '#EDF6FF',
                option: 0.6,
            },
        }]
    }

    ngOnInit() {
        this.todayChange = this.ringOption
        this.todayChange.series[0].data = [
            { value: 2, name: '正向变更' + 2 + '件' },
            { value: 3, name: '平向变更' + 2 + '件' },
            { value: 5, name: '负向变更' + 2 + '件' },
        ];
        this.riskRadar = this.radarOption
        this.riskRadar.series[0].data = [
            {
                value: [1, 2, 3, 4, 2, 1, 3, 4, 5, 1],
                name: '各项指标'
            }
        ]
        this.entGrade = this.lineOption;
        this.entGrade.series[0].data = [2, 2, 3, 1, 1, 1, 2, 2, 2, 3, 1, 1, 1, 1];
        this.busGrade = this.barOption;
        this.busGrade.series[0].data = [2, 2, 3, 1, 1, 1, 2, 2, 2, 3, 1, 1, 1, 1];
    }
}
