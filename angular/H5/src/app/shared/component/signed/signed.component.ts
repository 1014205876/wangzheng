import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpService } from '../../service/http-serve.service';

@Component({
    selector: 'app-signed',
    templateUrl: './signed.component.html',
    styleUrls: ['./signed.component.less']
})
export class SignedComponent implements OnInit {

    constructor(
        private http: HttpService,
        private el: ElementRef,
        private rederer2: Renderer2
    ) { }

    canImg;
    show = false;
    oCanvas;//canvas标签
    cxt;//canvas画布
    canvasX = 0;//canvas标签相对屏幕的坐标
    canvasY = 0;
    touchX = 0;//鼠标（手指）相对屏幕的坐标
    touchY = 0;
    moveX = 0;//鼠标（手指）相对canvas标签的坐标
    moveY = 0;

    /**
     * 获取当前元素相对页面左上角坐标
     * 接受2个参数
     * 第一个为获取的元素，第二个为获取的坐标
     * 
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

    onClick(event) {//阻止手指滑动时触发父级点击事件
        event.stopPropagation();
    }

    touchstart(event) {
        let that = this;
        console.log('开始')
        that.canvasX = that.offset(that.oCanvas, 'offsetLeft');
        that.canvasY = that.offset(that.oCanvas, 'offsetTop');
        that.touchX = event.touches[0].pageX;
        that.touchY = event.touches[0].pageY;
        that.moveX = that.touchX - that.canvasX;
        that.moveY = that.touchY - that.canvasY;
        that.cxt.beginPath();
        that.cxt.moveTo(that.moveX, that.moveY);
        // event.stopPropagation();
    };

    touchmove(event) {
        let that = this;
        console.log('移动')
        that.canvasX = that.offset(that.oCanvas, 'offsetLeft');
        that.canvasY = that.offset(that.oCanvas, 'offsetTop');
        that.touchX = event.touches[0].pageX;
        that.touchY = event.touches[0].pageY;
        that.moveX = that.touchX - that.canvasX;
        that.moveY = that.touchY - that.canvasY;
        that.cxt.lineTo(that.moveX, that.moveY);
        that.cxt.stroke();
        event.preventDefault();
    };

    clearCanvas() {
        let that = this;
        that.cxt.clearRect(0, 0, that.oCanvas.width, that.oCanvas.height);
    };

    saveCanvas() {
        let that = this;
        var image = that.oCanvas.toDataURL("image/png");
        that.canImg = image
        var b64 = image.substring(22);
        console.log(image)
        console.log(b64)
        // that.http.post("/v2/app/pre/upload", { file: image }).subscribe(res => {
        //     console.log(res)
        // })
    }

    ngOnInit() {
        let that = this;
        that.oCanvas = this.el.nativeElement.querySelector("#canvas");
        that.oCanvas.width = 300;
        that.oCanvas.height = 200;
        that.cxt = that.oCanvas.getContext("2d");
        that.cxt.lineWidth = 1;
        // saveImg.onclick = function () {
        //     var image = oCanvas.toDataURL("image/png");
        //     that.canImg = image
        //     var b64 = image.substring(22);
        //     console.log(image)
        //     console.log(b64)
        //     // that.http.post("/v2/app/pre/upload", { file: image }).subscribe(res => {
        //     //     console.log(res)
        //     // })
        // }
        // clearCanvas.onclick = function () {
        //     cxt.clearRect(0, 0, oCanvas.width, oCanvas.height);
        // }
    }

}
