import { Component, OnInit } from '@angular/core';
import { HttpServe } from 'src/app/shared/service/http-serve.service'

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

    constructor(
        private http: HttpServe
    ) { }

    toTop = false;//控制回到顶部按钮的显示隐藏
    modelShow = false;//控制弹窗的显示隐藏
    time1;//控制页面滚动的定时器
    specialArr = [//平台特点
        {
            url: '../../../assets/image/special_img_1.png',
            title: '能学习',
            main: '精选金融资讯、海量金融学习文库'
        },
        {
            url: '../../../assets/image/special_img_2.png',
            title: '任务佣金高',
            main: '产品营销任务、客户服务任务、现场巡查任务，能力越强赚的越多'
        },
        {
            url: '../../../assets/image/special_img_3.png',
            title: '合伙人',
            main: '成为合伙人享受更多奖励，等级越高奖励越多'
        },
        {
            url: '../../../assets/image/special_img_4.png',
            title: '二级人脉奖励',
            main: '社会化营销，别人做单我拿钱，最高可以向下二级人脉奖励'
        },
        {
            url: '../../../assets/image/special_img_5.png',
            title: '提现快',
            main: '业务成交、佣金即到账，提现最快当天到账'
        },
        {
            url: '../../../assets/image/special_img_6.png',
            title: '营销工具多',
            main: '工商、法律信息免费查；信用评级工具，提高通风过率，不做无用功；批量营销工具，多快好省、客户轻松找'
        },
    ];
    method1 = [//方法1
        {
            url: '../../../assets/image/method1_icon1.png',
            main: '关注资产多公众号'
        },
        {
            url: '../../../assets/image/method1_icon2.png',
            main: '点击公众号资产多菜单进入资产多平台'
        },
        {
            url: '../../../assets/image/method1_icon3.png',
            main: '点击底部悬浮菜单选择个人中心-进入页面点击注册按钮'
        },
        {
            url: '../../../assets/image/method1_icon4.png',
            main: '输入您的手机号码、短信验证码、密码、推荐码完成注册'
        },
        {
            url: '../../../assets/image/method1_icon5.png',
            main: '开启学习赚钱之旅'
        },
    ]
    method2 = [//方法2
        {
            url: '../../../assets/image/method2_icon1.png',
            main: '识别朋友分享的海报中的二维码'
        },
        {
            url: '../../../assets/image/method2_icon2.png',
            main: '点击朋友分享的链接'
        },
        {
            url: '../../../assets/image/method2_icon3.png',
            main: '当面扫朋友的二维码'
        },
        {
            url: '../../../assets/image/method2_icon4.png',
            main: '进入快速注册页面,填写手机号码。手机验证码注册'
        },
        {
            url: '../../../assets/image/method2_icon5.png',
            main: '识别二维码关注资产多公众号'
        },
        {
            url: '../../../assets/image/method2_icon6.png',
            main: '进入资产多平台'
        },
    ]
    service = [
        {
            url: '../../../assets/image/serve_img1.png',
            title: '01',
            main: '金融大数据提供、数据挖掘分析产品建模设、计咨询，县域金融风险、产经分析等服务'
        },
        {
            url: '../../../assets/image/serve_img2.png',
            title: '02',
            main: '打造智能推广营销管理平台，为行业从业者提供高效开拓、管理及运营线上、线下客户资源与渠道的工具。'
        },
        {
            url: '../../../assets/image/serve_img3.png',
            title: '03',
            main: '致力于为合作的金融及其他商业机构提供更精准、优质的客源推荐服务。基于智能科技的链接，资产多平台将帮助有融资需求的个人消费者和中小微企业高效便捷地找到适合自己的产品。'
        },
        {
            url: '../../../assets/image/serve_img4.png',
            title: '04',
            main: '为金融机构客户和商业合作伙伴输出包括在线风险评估、金融产品营销以及数据系统分析等科技赋能服务。'
        },
    ]
    advantage = [//我们的优势
        {
            url: '../../../assets/image/aviantage_img1.png',
            hoverUrl: '../../../assets/image/aviantage_img1_hover.png',
            title: '快',
            main: '相较传统营销方式获客成费用本低，扩散速度快'
        },
        {
            url: '../../../assets/image/aviantage_img2.png',
            hoverUrl: '../../../assets/image/aviantage_img2_hover.png',
            title: '细致服务',
            main: '线上+线下全流程的细致服务从服务到平台产品多样化'
        },
        {
            url: '../../../assets/image/aviantage_img3.png',
            hoverUrl: '../../../assets/image/aviantage_img3_hover.png',
            title: '全面的数据',
            main: '拥有全量的金融相关数据，可构建复合客户产品特色的用户画像，精准定位客户群体'
        },
        {
            url: '../../../assets/image/aviantage_img4.png',
            hoverUrl: '../../../assets/image/aviantage_img4_hover.png',
            title: '监控能力',
            main: '拥有基于区域、行业、企业等属性构建产品准入、决策、贷后模型及分析监控的能力'
        }
    ]
    businessTel = '136 7065 3210';//商务电话

    link(href) {//锚点跳转点击跳转到指定id
        let startTop = document.documentElement.scrollTop || document.body.scrollTop
        let getTop = document.getElementById(href).offsetTop
        let times = 0;
        clearInterval(this.time1)
        this.time1 = setInterval(() => {
            let nowTop = document.documentElement.scrollTop || document.body.scrollTop
            nowTop = nowTop - (startTop - getTop) / 50
            document.documentElement.scrollTop = nowTop
            document.body.scrollTop = nowTop
            times++
            if (times > 50) {//滚动50次后停止
                nowTop = getTop
                document.documentElement.scrollTop = nowTop
                document.body.scrollTop = nowTop
                clearInterval(this.time1)
            }
        }, 10);
    }

    stopPropagation(e) {
        e.stopPropagation()
    }


    getLeftMenu() { // 获取左导航
        this.http.post('api/login', { id: 123 }, true).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
        this.http.get('api/get', {
            name: 1,
            id: 2,
            age: 3
        }, true).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }



    ngOnInit() {
        this.getLeftMenu();

        document.onscroll = () => {//滚动监听，控制nav栏的显示隐藏
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (!!document.getElementById('msg')) {
                if (scrollTop > document.getElementById('msg').offsetTop) {
                    this.toTop = true
                } else {
                    this.toTop = false
                }
            }
        }
    }

    ngOnDestroy() {

        document.onscroll = null;
        clearInterval(this.time1);
    }

}
