import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-saolei',
    templateUrl: './saolei.component.html',
    styleUrls: ['./saolei.component.less']
})
export class SaoleiComponent implements OnInit {

    trNum: number = 20;
    tdNum: number = 30;
    leiNum: number = 10;

    leiArr = []

    constructor(
        private message: NzMessageService
    ) { }

    ngOnInit() {
    }

    getLeiArr() {//生成雷的数组
        let leiArr = [];
        for (let i = 0; i < this.trNum; i++) {
            leiArr[i] = [];
            for (let j = 0; j < this.tdNum; j++) {
                leiArr[i].push({
                    tr: i,
                    td: j,
                    open: false,
                    has: false,
                    num: 0,
                    flag: false,
                });
            }
        }
        this.leiArr = leiArr;

        for (let i = 0; i < this.leiNum; i++) {
            this.giveLei();
        }
    }

    openOther(item) {//点击标签（将该标签周围所有数字为0的标签都显示出来
        item.open = true;

        if(item.has){
            this.message.error('扫雷失败');
            return 
        }
        let closeNum = 0;
        this.leiArr.forEach((item) => {
            item.forEach((list) => {
                if (!list.open) {
                    closeNum++;
                }
            })
        })
        if (closeNum <= this.leiNum) {
            this.message.success('扫雷成功');
            return
        }


        let lastTr = item.tr > 0;//判断该标签是否在最上边
        let nextTr = (item.tr + 1) < this.trNum;//判断该标签是否在最下边
        let lastTd = item.td > 0;//判断该标签是否在最左边
        let nextTd = (item.td + 1) < this.tdNum;//判断该标签是否在最右边

        if (item.num == 0) {
            if (lastTr) {
                if (lastTd) {
                    if (!this.leiArr[item.tr - 1][item.td - 1].open) {
                        this.openOther(this.leiArr[item.tr - 1][item.td - 1])
                    }
                }
                if (!this.leiArr[item.tr - 1][item.td].open) {
                    this.openOther(this.leiArr[item.tr - 1][item.td])
                }
                if (nextTd) {
                    if (!this.leiArr[item.tr - 1][item.td + 1].open) {
                        this.openOther(this.leiArr[item.tr - 1][item.td + 1])
                    }
                }
            }
            if (lastTd) {
                if (!this.leiArr[item.tr][item.td - 1].open) {
                    this.openOther(this.leiArr[item.tr][item.td - 1])
                }
            }
            if (nextTd) {
                if (!this.leiArr[item.tr][item.td + 1].open) {
                    this.openOther(this.leiArr[item.tr][item.td + 1])
                }
            }
            if (nextTr) {
                if (lastTd) {
                    if (!this.leiArr[item.tr + 1][item.td - 1].open) {
                        this.openOther(this.leiArr[item.tr + 1][item.td - 1])
                    }
                }
                if (!this.leiArr[item.tr + 1][item.td].open) {
                    this.openOther(this.leiArr[item.tr + 1][item.td])

                }
                if (nextTd) {
                    if (!this.leiArr[item.tr + 1][item.td + 1].open) {
                        this.openOther(this.leiArr[item.tr + 1][item.td + 1])
                    }
                }
            }
        } else {
            if (lastTr) {
                if (lastTd) {
                    if (!this.leiArr[item.tr - 1][item.td - 1].open) {
                        if (this.leiArr[item.tr - 1][item.td - 1].num == 0) {
                            this.openOther(this.leiArr[item.tr - 1][item.td - 1])
                        }
                    }
                }
                if (!this.leiArr[item.tr - 1][item.td].open) {
                    if (this.leiArr[item.tr - 1][item.td].num == 0) {
                        this.openOther(this.leiArr[item.tr - 1][item.td])
                    }
                }
                if (nextTd) {
                    if (!this.leiArr[item.tr - 1][item.td + 1].open) {
                        if (this.leiArr[item.tr - 1][item.td + 1].num == 0) {
                            this.openOther(this.leiArr[item.tr - 1][item.td + 1])
                        }
                    }
                }
            }
            if (lastTd) {
                if (!this.leiArr[item.tr][item.td - 1].open) {
                    if (this.leiArr[item.tr][item.td - 1].num == 0) {
                        this.openOther(this.leiArr[item.tr][item.td - 1])
                    }
                }
            }
            if (nextTd) {
                if (!this.leiArr[item.tr][item.td + 1].open) {
                    if (this.leiArr[item.tr][item.td + 1].num == 0) {
                        this.openOther(this.leiArr[item.tr][item.td + 1])
                    }
                }
            }
            if (nextTr) {
                if (lastTd) {
                    if (!this.leiArr[item.tr + 1][item.td - 1].open) {
                        if (this.leiArr[item.tr + 1][item.td - 1].num == 0) {
                            this.openOther(this.leiArr[item.tr + 1][item.td - 1])
                        }
                    }
                }
                if (!this.leiArr[item.tr + 1][item.td].open) {
                    if (this.leiArr[item.tr + 1][item.td].num == 0) {
                        this.openOther(this.leiArr[item.tr + 1][item.td])
                    }
                }
                if (nextTd) {
                    if (!this.leiArr[item.tr + 1][item.td + 1].open) {
                        if (this.leiArr[item.tr + 1][item.td + 1].num == 0) {
                            this.openOther(this.leiArr[item.tr + 1][item.td + 1])
                        }
                    }
                }
            }
        }
    }
    giveFlag(e,item){//右键插旗
        item.flag=!item.flag;
        e.preventDefault();
    }
    getRandom(min, max) {//取随机整数
        let num = Math.round(Math.random() * (max - min) + min);
        return num
    }

    giveLei() {//将雷复制到指定标签中
        let trIndex = this.getRandom(0, this.trNum - 1);//获取雷在哪行
        let tdIndex = this.getRandom(0, this.tdNum - 1);//获取雷在哪列
        if (!this.leiArr[trIndex][tdIndex].has) {
            this.leiArr[trIndex][tdIndex].has = true
            this.leiArr[trIndex][tdIndex].num = 1
            this.addNum(this.leiArr[trIndex][tdIndex])
        } else {
            this.giveLei();
        }
    }

    addNum(item) {//该对象有雷 给目标周围的格子添加数字1
        let lastTr = item.tr > 0;//判断该标签是否在最上边
        let nextTr = (item.tr + 1) < this.trNum;//判断该标签是否在最下边
        let lastTd = item.td > 0;//判断该标签是否在最左边
        let nextTd = (item.td + 1) < this.tdNum;//判断该标签是否在最右边
        if (lastTr) {
            if (lastTd) {
                this.leiArr[item.tr - 1][item.td - 1].num++;
            }
            this.leiArr[item.tr - 1][item.td].num++;
            if (nextTd) {
                this.leiArr[item.tr - 1][item.td + 1].num++;
            }
        }
        if (lastTd) {
            this.leiArr[item.tr][item.td - 1].num++;
        }
        if (nextTd) {
            this.leiArr[item.tr][item.td + 1].num++;
        }
        if (nextTr) {
            if (lastTd) {
                this.leiArr[item.tr + 1][item.td - 1].num++;
            }
            this.leiArr[item.tr + 1][item.td].num++;
            if (nextTd) {
                this.leiArr[item.tr + 1][item.td + 1].num++;
            }
        }
    }
}
