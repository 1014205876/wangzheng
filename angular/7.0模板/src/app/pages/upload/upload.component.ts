import { Component, OnInit } from '@angular/core';

import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {
    form;//表单对象
    fileList = [];//上传组件数组
    imgArr = [];
    constructor() { }

    ngOnInit() {
    }

    handlePreview(file: UploadFile) {
        this.imgArr = [
            { url: file.url || file.thumbUrl }
        ];
    }

    fileChange(e) {
        if (e.type == 'success') {
            this.form.value = this.getImgUrl(this.fileList)
        }
    }

    getImgUrl(urlList) {//将得到的数组转化成字符串
        let url = urlList.map(item => {
            return item.response.location
        }).join(',');
        console.log(url)
        return url
    }

}
