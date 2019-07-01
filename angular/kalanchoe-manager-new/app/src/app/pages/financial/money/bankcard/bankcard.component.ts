import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../../shared/service/api.service';

@Component({
    selector: 'app-bankcard',
    templateUrl: './bankcard.component.html',
    styleUrls: ['./bankcard.component.css']
})
export class BankcardComponent implements OnInit {

    pageNum = 1
    total = 0
    mobile = ''
    data = []
    constructor(
        private api: ApiService,
        private route: ActivatedRoute,

    ) { }

    ngOnInit() {
        this.mobile = this.route.snapshot.queryParams.mobile
        this.getData()
    }
    async getData() {
        let res = await this.api.getUserCards({
            mobile:this.mobile,
            pageNum: this.pageNum,
            pageSize: 10
        });
        if (res.code == '200') {
            this.total = res.data.list.total
            this.data = res.data.list.list
        }
    }
    pageSearch($event) {
        this.pageNum = $event;
        this.getData()
    }
}
