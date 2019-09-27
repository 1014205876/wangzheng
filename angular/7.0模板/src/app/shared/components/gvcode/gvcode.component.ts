import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'app-gvcode',
    templateUrl: './gvcode.component.html',
    styleUrls: ['./gvcode.component.less']
})
export class GvcodeComponent implements OnInit {

    canvas;
    @Input() public width;
    @Input() public height;
    @Input() public line;
    @Input() public spot;
    ctx;

    constructor(
        public el: ElementRef,
    ) {

    }

    ngOnInit() {
        this.canvas = this.el.nativeElement.querySelectorAll(".verCanvas")[0];
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textBaseline = 'bottom';
    }

    randomNum(min, max) {//生成随机数
        return Math.floor(Math.random() * (max - min) + min);
    }

    randomColor(min, max, a) {//生成随机色 rgb
        var r = this.randomNum(min, max);
        var g = this.randomNum(min, max);
        var b = this.randomNum(min, max);
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }

    drawPic(returnTxt) {//绘制验证码图片

        /**绘制背景色**/
        this.ctx.fillStyle = this.randomColor(255, 255, 1); //颜色若太深可能导致看不清
        this.ctx.fillRect(0, 0, this.width, this.height);

        /**绘制干扰线**/
        for (var i = 0; i < this.line; i++) {
            this.ctx.strokeStyle = this.randomColor(40, 180, 0.6);
            this.ctx.beginPath();
            this.ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
            this.ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
            this.ctx.stroke();
        }

        /**绘制干扰点**/
        for (var i = 0; i < this.spot; i++) {
            this.ctx.fillStyle = this.randomColor(0, 255, 0.6);
            this.ctx.beginPath();
            this.ctx.arc(this.randomNum(0, this.width), this.randomNum(0, this.height), 1, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        /**绘制文字**/
        for (var i = 0; i < returnTxt.length; i++) {
            var txt = returnTxt[i];
            var fontSize = this.randomNum(this.height / 2, this.height); //随机生成字体大小
            var fontColor = this.randomColor(50, 160, 1);  //随机生成字体颜色
            var x = 5 + i * (this.width - 10) / returnTxt.length;
            var y = this.randomNum(fontSize, this.height);
            var deg = this.randomNum(-30, 30);

            //修改坐标原点和旋转角度
            this.ctx.fillStyle = fontColor;
            this.ctx.font = fontSize + 'px SimHei';
            this.ctx.translate(x, y);
            this.ctx.rotate(deg * Math.PI / 180);
            // 写入文字
            this.ctx.fillText(txt, 0, 0);
            //恢复坐标原点和旋转角度
            this.ctx.rotate(-deg * Math.PI / 180);
            this.ctx.translate(-x, -y);
        }
    }
}
