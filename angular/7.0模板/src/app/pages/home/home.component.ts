import { Component, OnInit } from '@angular/core';

import { UploadFile, NzMessageService } from 'ng-zorro-antd';

import { ApiService } from '../../shared/service/api.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    public open = false;
    public queryParams = new searchItems();;
    public etpArr = [];

    constructor(
        private api: ApiService,
        private message: NzMessageService
    ) {
    }

    ngOnInit() {
        this.reset();
        this.search(1);
    }

    async search(pageNum: number) {
        this.queryParams._page = pageNum;
        for (let key in this.queryParams) {
            if (!this.queryParams[key]) {
                delete this.queryParams[key]
            }
        }
        let res = await this.api.getComments(this.queryParams);
        if (res.length > 0) {
            this.etpArr = res;
        }
    }

    reset() {
        this.queryParams = new searchItems();
    }

    changePage(e: number) {//切换分页器
        this.search(e);
    }
}

class searchItems {
    constructor(
        public postId?,
        public id?,
        public _page = 1,
        public _limit = 10
    ) { }
}
