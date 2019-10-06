import { Component, OnInit } from '@angular/core';

import { UploadFile } from 'ng-zorro-antd/upload';
import { WebSocketService } from '../../shared/service/webSocket/websocket.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {
    form;//表单对象
    fileList = [];//上传组件数组
    imgArr = [];
    src = '';
    str='localhost:3301'
    constructor(
        public wsService: WebSocketService
    ) { }

    ngOnInit() {
        this.initSocket()
    }

    handlePreview(file: UploadFile) {
        this.imgArr = [
            { url: file.url || file.thumbUrl }
        ];
    }

    fileChange(e) {
        if (e.type == 'success') {
            this.imgArr = this.getImgUrl(this.fileList);
        }
    }

    getImgUrl(urlList) {//将得到的数组转化成字符串
        let url = urlList.map(item => {
            return item.response.location
        }).join(',');
        this.src = urlList
        return url
    }

    initSocket() {
        this.wsService.createObservableSocket("ws://" + this.str + "/ws").subscribe(
            (data) => {
                console.log('成功', data)
            },
            (err) => {
                console.log('失败', err)
            },
            () => {
                console.log("流已经结束")
            } //  最后结束后，会执行到这的
        );
    }


    // click事件后执行发送消息：
    sendSocket() {
        this.wsService.sendMessage({
            key1: "key111", // 参数
            key2: "key222",
        });

    }
}
