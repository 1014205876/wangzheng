import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../../shared/service/api.service';

@Component({
    selector: 'app-customer-info',
    templateUrl: './customer-info.component.html',
    styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

    public id;
    public row;

    constructor(
        public activeRoute: ActivatedRoute, 
        private api: ApiService,
        ) {
    }

    ngOnInit() {
        this.id = this.activeRoute.snapshot.queryParams.userid
        this.getData()
    }

    
    async getData() {
        let res = await this.api.getUsers(this.id);
        if (res.code == 200) {
            this.row = res.data;
        }
    }
}
