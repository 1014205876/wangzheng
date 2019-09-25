import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-form-pic',
    templateUrl: './form-pic.component.html',
    styleUrls: ['./form-pic.component.less']
})
export class FormPicComponent implements OnInit {

    @Input() public form;//表单对象
    fileList=[];//上传组件数组
    imgArr = [];

    @ViewChild("viewPicture") viewPicture;

    constructor() { }

    ngOnInit() { }

    handlePreview(file: UploadFile) {
        this.imgArr = [
            { url: file.url || file.thumbUrl }
        ];
        this.viewPicture.getBanner();
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
        return url
    }
}
