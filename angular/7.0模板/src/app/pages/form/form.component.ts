import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

    constructor(
        private el: ElementRef,
    ) { }

    configForm;//.config_form对应的标签
    moveCom;//#move_com对应的标签
    absolute = {
        top: '0px',
        left: '0px',
        display: 'none'
    }

    formData = {
        type: 'component',
        children: [
            {
                type: 'table',
                tr: [
                    {
                        td: [
                            {
                                type: 'component',
                                children: [
                                    {
                                        type: 'input',
                                        value:''
                                    },
                                    {
                                        type: 'input',
                                        value:''
                                    },
                                ]
                            },
                            {
                                type: 'component',
                                children: [
                                    {
                                        type: 'component',
                                        children: [
                                            {
                                                type: 'input',
                                                value:''
                                            },
                                        ]
                                    },
                                    {
                                        type: 'input',
                                        value:''
                                    },
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    }

    mousedown(event) {
        let top = event.pageY - this.configForm.offsetTop;//拖拽框距离
        this.absolute.top = top + 'px'
        this.absolute.left = event.pageX - this.configForm.offsetLeft + 'px'
        this.absolute.display = 'block'
    }
    mousemove(event) {
        this.absolute.top = event.pageY - this.configForm.offsetTop + 'px'
        this.absolute.left = event.pageX - this.configForm.offsetLeft + 'px'
    }
    mouseup(event) {
        this.absolute.display = 'none'
    }
    mouseout(event) {
        this.absolute.display = 'none'
    }

    /**
     * 获取某个标签对应属性的函数
     * @param div 需要获取的元素标签
     * @param offset 需要获取的属性
     */
    offset(div, offset) {
        var realNum = div[offset];//获取得到的初始offset坐标（用于和后面求到的数字累加）
        var positionParent = div.offsetParent;  //获取上一级定位元素对象
        while (positionParent != null) {//当元素找不到父级的positionParent时停止
            realNum += positionParent[offset];//将元素父级的offset添加到数字中
            positionParent = positionParent.offsetParent;
        }
        return realNum;//得到这个元素相对于页面的坐标
    }

    ngOnInit() {
        let that = this;
        that.configForm = this.el.nativeElement.querySelector("#config_form");
        that.moveCom = this.el.nativeElement.querySelector("#move_com");
    }

}
