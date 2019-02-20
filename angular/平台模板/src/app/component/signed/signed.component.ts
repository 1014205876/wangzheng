import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-signed',
    templateUrl: './signed.component.html',
    styleUrls: ['./signed.component.css']
})
export class SignedComponent implements OnInit {
    constructor() { }
    canImg;
    ngOnInit() {
        let that = this;
        var oCanvas: HTMLCanvasElement = document.querySelector("#signed");
        var clearCanvas: HTMLImageElement = document.querySelector("#clear");
        var saveImg: HTMLImageElement = document.querySelector("#save");
        oCanvas.width = 800;
        oCanvas.height = 200;
        var cxt = oCanvas.getContext("2d");
        cxt.lineWidth = 1;
        var canX = 0;
        var canY = 0;
        var posX = 0;//x坐标
        var posY = 0;//y坐标
        var moveX = 0;
        var moveY = 0;
        // 手指触摸屏幕可记录此时的位置作为起点
        oCanvas.addEventListener("touchstart", function (event) {
            console.log(event)
            canX = event.srcElement.offsetLeft;
            canY = event.srcElement.offsetTop;
            posX = event.touches[0].pageX;
            posY = event.touches[0].pageY;
            moveX = posX - canX;
            moveY = posY - canY;
            cxt.beginPath();
            cxt.moveTo(moveX, moveY);
        });

        //手指屏滑动画线
        oCanvas.addEventListener("touchmove", function (event) {
            // console.log(event)
            // cxt.beginPath();
            // cxt.moveTo(moveX, moveY);
            canX = event.touches[0].target.offsetLeft;
            canY = event.touches[0].target.offsetTop;
            posX = event.touches[0].pageX;
            posY = event.touches[0].pageY;
            moveX = posX - canX;
            moveY = posY - canY;
            cxt.lineTo(moveX, moveY);
            cxt.stroke();
        });

        saveImg.onclick = function () {
            var image = oCanvas.toDataURL("image/png");
            that.canImg = image
            var b64 = image.substring(22);
            console.log(image)
            console.log(b64)
        }
        clearCanvas.onclick = function () {
            cxt = oCanvas.getContext("2d");
            
        }
    }

}
