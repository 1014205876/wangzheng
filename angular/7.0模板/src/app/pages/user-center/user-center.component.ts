import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-center',
    templateUrl: './user-center.component.html',
    styleUrls: ['./user-center.component.less']
})
export class UserCenterComponent implements OnInit {

    headImgList = [];

    constructor() { }

    ngOnInit() {
    }

    headImgChange(e) {
        let arr = e.fileList;
        if (e.type == 'success') {
            if (this.headImgList.length > 1) {
                this.headImgList.shift()
            }
        }
    }
}
