import { Component, OnInit } from '@angular/core';
import { selfHttp } from '../../shared/service/http-service';
import { Level } from './level'

@Component({
    selector: 'app-three',
    templateUrl: './three.component.html',
    styleUrls: ['./three.component.less']
})
export class ThreeComponent implements OnInit {

    constructor(
        private http: selfHttp,
    ) {
    }

    data;

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
            formatter: '{b}',
            showContent: true,//是否显示title
        },
        grid: {
            top: "14%",
            left: "7.4%",
            right: "5.5%",
            bottom: "14%",
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
            data: [],//折线图横坐标
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
            data: ['', 'E', 'D', 'C', 'B', 'A'],//折线图纵坐标
        },
        series: [{
            type: 'line',
            symbol: 'emptyCircle',//拐点图形
            // symbol: 'image://../../../../assets/img/icon_centre_point.png',//拐点图形
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
            data: [],//折线图数据
        }]
    }

    level = [
        {
            name: '业务状况',
            eventLevel: 'B',
            history: [],
            EchartBar: {},
            child: [
                {
                    name: '纳税行为规范和金额波动',
                    eventLevel: 'D',
                    targetArr: [
                        {
                            name: '近六个月增值税税负率平均值偏差或异常变化',
                            id: '3-business.j6gyzzssflpjzpchycbh',
                            status: 0
                        },
                        {
                            name: '新增税务申报情况',
                            id: '3-business.xzswsbqk',
                            status: 0
                        }
                    ],
                    child: [],
                },
                {
                    name: '纳税行为规范和金额波动',
                    eventLevel: 'D',
                    targetArr: [
                        {
                            name: '近六个月增值税税负率平均值偏差或异常变化',
                            id: '3-business.j6gyzzssflpjzpchycbh',
                            status: 0
                        },
                        {
                            name: '新增税务申报情况',
                            id: '3-business.xzswsbqk',
                            status: 0
                        }
                    ],
                    child: [],
                },
            ]
        },
        {
            name: '重特大风险',
            eventLevel: '',
            history: [],
            EchartBar: {},
            child: [
                {
                    name: '股权及无形资产抵质押',
                    eventLevel: '',
                    targetArr: [
                        {
                            name: '新增动产抵质押',
                            id: '3-major.xzdcdzy',
                            status: 0
                        },
                        {
                            name: '股权出质及变化',
                            id: '3-major.xzgqcz',
                            status: 0
                        },
                        {
                            name: '股权冻结及状态',
                            id: '3-major.xzgqdj',
                            status: 0
                        }
                    ],
                    child: [],
                },
                {
                    name: '合规经营指数变化',
                    eventLevel: '',
                    targetArr: [
                        {
                            name: '行政处罚事件变化',
                            id: '3-major.xzxzcf',
                            status: 0
                        }
                    ],
                    child: [],
                },
                {
                    name: '裁判文书',
                    eventLevel: '',
                    targetArr: [
                        {
                            name: '新增裁判文书',
                            id: '3-major.xzcpws',
                            status: 0
                        }
                    ],
                    child: [],
                },
                {
                    name: '被执行人',
                    eventLevel: '',
                    targetArr: [
                        {
                            name: '新增被执行人',
                            id: '3-major.xzbzxr',
                            status: 0
                        }
                    ],
                    child: [],
                },
                {
                    name: '失信被执行人',
                    eventLevel: '',
                    targetArr: [
                        {
                            name: '新增失信被执行人',
                            id: '3-major.xzsxbzxr',
                            status: 0
                        }
                    ],
                    child: [],
                },
                {
                    name: '公告',
                    eventLevel: '',
                    targetArr: [
                        {
                            name: '新增法院公告',
                            id: '3-major.xzfygg',
                            status: 0
                        }
                    ],
                    child: [],
                },
            ]
        }
    ]

    getRiskEchartLine(arr) {
        let echart = JSON.parse(JSON.stringify(this.lineOption));//企业评级图表样式
        echart.xAxis.data = [];
        echart.series[0].data = [];
        arr.forEach((item) => {
            echart.xAxis.data.push(item.createTime)
            echart.series[0].data.push(item.eventLevel)
        })
        return echart
    }

    getLevel2Data(Arr) {
        let businessObj = {};
        Arr.forEach((item) => {
            if (!businessObj[item.ruleKey]) {
                businessObj[item.ruleKey] = []
            }
            item.content = JSON.parse(item.content)
            businessObj[item.ruleKey].push(item)
        })
        console.log(businessObj)

        this.level[1].child[0].targetArr.forEach((item) => {
            if (businessObj[item.id]) {
                item.status = 1
            }
        })
        this.level[1].eventLevel = this.data.major.eventLevel
        this.level[1].history = this.data.major.firstRiskEvents
        this.level[1].EchartBar = this.getRiskEchartLine(this.level[1].history)

        this.data.major.secondRiskEvents.forEach((item) => {
            switch (item.ruleKey) {
                case '2-major.gqjwxzcdzy':
                    this.level[1].child[0].eventLevel = item.eventLevel
                    break;
                case '2-major.hgjyzsbh':
                    this.level[1].child[1].eventLevel = item.eventLevel
                    break;
                case '2-major.cpws':
                    this.level[1].child[2].eventLevel = item.eventLevel
                    break;
                case '2-major.bzxr':
                    this.level[1].child[3].eventLevel = item.eventLevel
                    break;
                case '2-major.sxbzxr':
                    this.level[1].child[4].eventLevel = item.eventLevel
                    break;
                case '2-major.gg':
                    this.level[1].child[5].eventLevel = item.eventLevel
                    break;
                default:
                    break;
            }
        })

        if (businessObj['3-major.xzdcdzy']) {
            this.level[1].child[0].child.push({
                name: '新增动产抵质押',
                history: businessObj['3-major.xzdcdzy'],
                echartLine: this.getRiskEchartLine(businessObj['3-major.xzdcdzy']),
            })
        }
        if (businessObj['3-major.xzgqcz']) {
            this.level[1].child[0].child.push({
                name: '股权出质及变化',
                history: businessObj['3-major.xzgqcz'],
                echartLine: this.getRiskEchartLine(businessObj['3-major.xzgqcz']),
            })
        }
        if (businessObj['3-major.xzgqdj']) {
            this.level[1].child[0].child.push({
                name: '股权冻结及状态',
                history: businessObj['3-major.xzgqdj'],
                echartLine: this.getRiskEchartLine(businessObj['3-major.xzgqdj']),
            })
        }
        if (businessObj['3-major.xzgxzxzcfqcz']) {
            this.level[1].child[1].child.push({
                name: '行政处罚事件变化',
                history: businessObj['3-major.xzxzcf'],
                echartLine: this.getRiskEchartLine(businessObj['3-major.xzxzcf']),
            })
        }
        if (businessObj['3-major.xzcpws']) {
            this.level[1].child[2].child.push({
                name: '新增裁判文书',
                history: businessObj['3-major.xzcpws'],
                echartLine: this.getRiskEchartLine(businessObj['3-major.xzcpws']),
            })
        }
        if (businessObj['3-major.xzbzxr']) {
            this.level[1].child[3].child.push({
                name: '新增被执行人',
                history: businessObj['3-major.xzbzxr'],
                echartLine: this.getRiskEchartLine(businessObj['3-major.xzbzxr']),
            })
        }
        if (businessObj['3-major.xzsxbzxr']) {
            this.level[1].child[4].child.push({
                name: '新增失信被执行人',
                history: businessObj['3-major.xzsxbzxr'],
                echartLine: this.getRiskEchartLine(businessObj['3-major.xzsxbzxr']),
            })
        }
        if (businessObj['3-major.xzfygg']) {
            this.level[1].child[5].child.push({
                name: '新增法院公告',
                history: businessObj['3-major.xzfygg'],
                echartLine: this.getRiskEchartLine(businessObj['3-major.xzfygg']),
            })
        }
    }


    ngOnInit() {
        this.data = Level.data
        console.log(this.data);
        // this.getLevel2Data(this.data.business.thirdRiskEvents)
        this.getLevel2Data(this.data.major.thirdRiskEvents)
        // this.getLevel2Data(this.data.finance.thirdRiskEvents, 2)
        // this.getLevel2Data(this.data.credit.thirdRiskEvents, 3)
        // this.getLevel2Data(this.data.assets.thirdRiskEvents, 4)
        // this.getLevel2Data(this.data.commercial.thirdRiskEvents, 5)
        // this.getLevel2Data(this.data.manage.thirdRiskEvents, 6)
        // this.getLevel2Data(this.data.industry.thirdRiskEvents, 7)
        // this.getLevel2Data(this.data.area.thirdRiskEvents, 8)
        // this.getLevel2Data(this.data.relate.thirdRiskEvents, 9)
    }

}
