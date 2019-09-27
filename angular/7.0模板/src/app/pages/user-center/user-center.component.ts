import { Component, OnInit, ViewChild } from '@angular/core';

import { UploadFile, NzMessageService } from 'ng-zorro-antd';

import { ApiService } from '../../shared/service/api.service';
import resource from '../../shared/resource';

@Component({
    selector: 'app-user-center',
    templateUrl: './user-center.component.html',
    styleUrls: ['./user-center.component.less']
})
export class UserCenterComponent implements OnInit {

    userInfo = {
        name: '',
        headImg: ''
    }
    headImgList = [];

    @ViewChild("viewPicture") viewPicture;//查看图片组件
    bannerImgArr = [];//查看图片组件数组

    constructor(
        private message: NzMessageService,
        private api: ApiService,
    ) { }

    ngOnInit() {
        this.userInfo = resource.userInfo;
        this.headImgList.push({
            uid: 0,
            url: resource.userInfo.headImg,
            thumbUrl: resource.userInfo.headImg,
            response: {
                location: resource.userInfo.headImg,
            }
        })
    }

    headImgChange(e) {
        let arr = e.fileList;
        if (e.type == 'success') {
            if (this.headImgList.length > 1) {
                this.headImgList.shift()
            }
            this.userInfo.headImg=arr[0].response.location;
        }
        if (e.type == 'error') {
            this.message.error('图片读取失败!');
            this.headImgList.pop()
        }
    }

    headImgPreview = (file: UploadFile) => {
        this.bannerImgArr.length = 0;
        [1, 2, 3].forEach((item) => {
            this.bannerImgArr.push(
                { url: this.headImgList[0].thumbUrl }
            )
        })
        this.viewPicture.getBanner();
    }

    async changeUserInfo() {
        let res = await this.api.postUser({
            name: this.userInfo.name,
            userName: resource.userInfo.userName,
            password: resource.userInfo.password,
            headImg: this.userInfo.headImg
        });
        if (res.code == 200) {
            this.message.success('保存成功');
            resource.userInfo.name = this.userInfo.name;
            resource.userInfo.headImg = this.userInfo.headImg;
        } else {
            this.message.error('保存失败');
        }
    }

}
