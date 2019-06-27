import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { ApiService } from '../../../shared/service/api.service';

@Component({
    selector: 'app-partnergrade',
    templateUrl: './partnergrade.component.html',
    styleUrls: ['./partnergrade.component.css']
})
export class PartnergradeComponent implements OnInit {
    rows = []
    checkId

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private message: NzMessageService,

    ) { }

    ngOnInit() {
        this.getMes()
    }
    async getMes() {
        let res = await this.api.getLevel();
        if (res.code == 200) {
            this.rows = res.data
        }
    }
    edit(id) {
        this.checkId = id;
    }
    async delete(num) {
        let levelId = this.rows[num].id;
        let res = await this.api.deleteDelLevelById(levelId);
        if (res.code == 200) {
            this.rows.splice(num, 1)
            this.getMes()
            this.message.success('等级删除成功')
        } else {
            this.message.error(res.reason)
        }
    }
    save(id) {
        this.checkId = null;
        this.update()
    }
    async update() {
        let res = await this.api.postLevel(this.rows);
        if (res.code == 200) {
            this.getMes()
        } else {
            this.message.error(res.reason)
        }
    }
    add() {
        this.checkId = '';
        this.rows.push({
            id: '',
            appUserId: 0,
            levelName: '',
            rebate: 0,
            updateCondition: 0,
            nextLevelId: (this.rows.length + 2),
            isDefault: (this.rows.length + 1)
        })
    }

}

