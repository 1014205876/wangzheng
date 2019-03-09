import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpServe } from '../../layout/service/http-serve.service';

@Component({
    selector: 'app-signed',
    templateUrl: './signed.component.html',
    styleUrls: ['./signed.component.css']
})
export class SignedComponent implements OnInit {
    constructor(
        private http: HttpServe,
        private el: ElementRef,
        private rederer2: Renderer2
    ) { }
    canImg;
    ngOnInit() {
        let that = this;
        var oCanvas = this.el.nativeElement.querySelector("#signed");
        var clearCanvas = this.el.nativeElement.querySelector("#clear");
        var saveImg = this.el.nativeElement.querySelector("#save");
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
            // that.http.upload(
            //     '/upload',
            //     { file: image }
            // ).subscribe(res => {
            //     console.log(res)
            // })
        }
        clearCanvas.onclick = function () {
            cxt.clearRect(0, 0, oCanvas.width, oCanvas.height);
        }
    }

}
