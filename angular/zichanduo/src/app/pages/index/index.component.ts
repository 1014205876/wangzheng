import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

    constructor() { }

    toTop=false;//控制回到顶部按钮的显示隐藏
    modelShow=false;//控制弹窗的显示隐藏
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
            url: '../../../assets/image/logo.png',
            main: '关注公众号'
        },
        {
            url: '../../../assets/image/logo.png',
            main: '关注公众号'
        },
        {
            url: '../../../assets/image/logo.png',
            main: '关注公众号'
        },
        {
            url: '../../../assets/image/logo.png',
            main: '关注公众号'
        },
        {
            url: '../../../assets/image/logo.png',
            main: '关注公众号'
        },
        {
            url: '../../../assets/image/logo.png',
            main: '关注公众号'
        },
    ]
    method2 = [//方法2
        {
            url: '../../../assets/image/logo.png',
            main: '关注公众号'
        }
    ]
    our_advantage=[//我们的优势
        {
            url: '../../../assets/image/logo.png',
            title: '快',
            main: '金轩金融好靓'
        },
    ]

    link(href) {//锚点跳转点击跳转到指定id
        let startTop=document.documentElement.scrollTop||document.body.scrollTop
        let getTop=document.getElementById(href).offsetTop
        let times=0;
        this.time1=setInterval(() => {
        let nowTop=document.documentElement.scrollTop||document.body.scrollTop
            if(times>50){//滚动50次后停止
                clearInterval(this.time1)
            }
            nowTop=document.documentElement.scrollTop-(startTop-getTop)/50
            document.documentElement.scrollTop=nowTop
            document.body.scrollTop=nowTop
            times++
        }, 10);
    }

    ngOnInit() {
        document.onscroll = () => {//滚动监听，控制nav栏的显示隐藏
            let scrollTop = document.documentElement.scrollTop
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
