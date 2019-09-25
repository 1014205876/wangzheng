import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.less']
})
export class CodeComponent implements OnInit {
  canvas;
  width;
  height;
  ctx;

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementsByClassName('verCanvas')[0];
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    // this.width = 400;
    // this.height = 130;
    console.log(this.width)
    console.log(this.height)
    this.ctx = this.canvas.getContext('2d');
    this.ctx.textBaseline = 'bottom';
  }

  randomNum(min, max) {//生成随机数
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomColor(min, max) {//生成随机色 rgb
    var r = this.randomNum(min, max);
    var g = this.randomNum(min, max);
    var b = this.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  drawPic(returnTxt) {//绘制验证码图片

    /**绘制背景色**/
    this.ctx.fillStyle = this.randomColor(180, 240); //颜色若太深可能导致看不清
    this.ctx.fillRect(0, 0, this.width,this.height);

    /**绘制干扰线**/
    // for (var i = 0; i < 5; i++) {
    //   this.ctx.strokeStyle = this.randomColor(40, 180);
    //   this.ctx.beginPath();
    //   this.ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
    //   this.ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height));
    //   this.ctx.stroke();
    // }

    /**绘制干扰点**/
    // for (var i = 0; i < 10; i++) {
    //   this.ctx.fillStyle = this.randomColor(0, 255);
    //   this.ctx.beginPath();
    //   this.ctx.arc(this.randomNum(0, this.width), this.randomNum(0, this.height), 1, 0, 2 * Math.PI);
    //   this.ctx.fill();
    // }

    /**绘制文字**/
    for (var i = 0; i < returnTxt.length; i++) {
      var txt = returnTxt[i];
      var fontColor = this.randomColor(50, 160);  //随机生成字体颜色

      var fontSize = this.randomNum(this.height / 4, this.height / 2); //随机生成字体大小
      var x = this.height / 2 + i * (this.width - this.height) / returnTxt.length;
      var y = this.randomNum(fontSize, this.height);
      var deg = this.randomNum(-30, 30);

      var fontSize = 150; //随机生成字体大小
      var x = i*fontSize;
      var y = fontSize;
      var deg = 0;

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
