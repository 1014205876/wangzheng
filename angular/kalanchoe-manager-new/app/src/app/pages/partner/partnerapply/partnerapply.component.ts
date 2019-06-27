import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';

import { TransformService } from '../../../shared/service/transform.service';
import { ApiService } from '../../../shared/service/api.service';

@Component({
    selector: 'app-partnerapply',
    templateUrl: './partnerapply.component.html',
    styleUrls: ['./partnerapply.component.css']
})
export class PartnerapplyComponent implements OnInit {
    open = false;//控制多余查询框的展开收起
    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;
    total = 0
    pageNum = 1
    list = []
    data = []
    statusList = []
    // 查询变量
    findPhone = ''
    wantStartTime = ''
    wantEndTime = ''
    findStatus = ''
    statusText = ''
    findMode = ''

    // modal
    showPassModal = false
    showRejectModal = false

    // 批量通过、拒绝变量
    selected = []
    type
    //全选
    indeterminate = false
    allChecked = false
    constructor(
        private api: ApiService,
        private dateTransform: TransformService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.getData()
    }

    async getData() {
        let res = await this.api.getPartnerDataGrid({
            phone: this.findPhone,
            applyTimeStart: this.wantStartTime,
            applyTimeEnd: this.wantEndTime,
            status: this.findStatus,
            mode: this.findMode,
            pageNum: this.pageNum,
            pageSize: 10
        });
        if (res.code == 200) {
            this.list = res.data.list
            this.total = res.data.total
            this.addStatusText()
        }
    }

    addStatusText() {
        let list = this.list
        list.map(item => {
            if (item.status == 0) {
                item.statusText = '待审核'
            }
            if (item.status == 1) {
                item.statusText = '已通过'
            }
            if (item.status == 2) {
                item.statusText = '不通过'
            }
            item.check = false
            return
        })
        this.data = list
    }

    search() {
        this.getData()
        this.pageNum = 1
    }
    reset() {
        this.findPhone = ''
        this.findStatus = ''
        this.findMode = ''
        this.startValue = null
        this.endValue = null
        this.wantStartTime = ''
        this.wantEndTime = ''
    }
    pageSearch($event) {
        this.pageNum = $event
        this.getData()
    }
    // 通过与拒绝的方法
    partner(type) {
        if (this.selected.length == 0) {
            return false;
        }
        let param = this.selected.map(item => {
            return {
                id: item.id,
                appUserId: item.appUserId,
                status: type,
                remark: ''
            }
        })
        this.patchPartner(param);
    }

    async patchPartner(param) {
        let res = await this.api.patchPartner(param);
        if (res.code == "200") {
            this.message.success('成功')
            this.getData()
        } else {
            this.message.error(res.reason)
        }
    }

    //判断是否存在已通过/拒绝的选项
    checkType(type) {
        let index = this.statusList.indexOf(type)
        if (index >= 0) {
            this.message.error('请勿重复通过或拒绝同一申请！')
        }
        else if (index < 0) {
            if (type == 1) {
                this.showPassModal = true
            }
            if (type == 2) {
                this.showRejectModal = true
            }
        }
    }
    // 申请通过
    clickedPass(type) {
        if (this.selected.length == 0) {
            this.message.error('请至少选择一个分组！')
        } else {
            this.checkType(type)
        }
    }
    PassMoadleOk() {
        this.showPassModal = false
        this.partner(1)
        this.selected = []
        this.statusList = []
    }
    PassMoadleCancel() {
        this.showPassModal = false
    }

    //申请拒绝
    clickedReject(type) {
        if (this.selected.length == 0) {
            this.message.error('请至少选择一个分组！')
        } else {
            this.checkType(type)
        }
    }
    RejectMoadleCancel() {
        this.showRejectModal = false
    }
    RejectMoadleOk() {
        this.showRejectModal = false
        this.partner(2)
        this.selected = []
        this.statusList = []
    }

    //批量选择
    checked($event, data) {
        if ($event === true) {
            this.selected.push(data)
            this.statusList.push(data.status)
        }
        if ($event === false) {
            let selected = this.selected.filter(item => {
                return item != data
            })
            this.selected = selected
            let index = this.statusList.indexOf(data.status)
            if (index >= 0) {
                this.statusList.splice(index, 1)
            } else {
                return false
            }
        }
        if (this.selected.length == this.data.length) {
            this.allChecked = true
            this.indeterminate = false
        } else {
            if (this.selected.length == 0) {
                this.allChecked = false
                this.indeterminate = false
            }else {
                this.allChecked = false
                this.indeterminate = true
            }
        }
    }

    //全选

    checkAll($event) {
        if ($event == true) {
            this.allChecked = true
            this.indeterminate = false
        } else {
            this.allChecked = false
            this.indeterminate = false
        }
        if (this.allChecked == true) {
            this.selected = this.data.map(item => {
                item.check = true
                return item.id
            })
        }
        if (this.allChecked == false) {
            this.selected = this.data.map(item => {
                item.check = false
            })
            this.selected = []
        }
    }

    //card one
    disabledStartDate = (startValue: Date): boolean => {
        if (!startValue || !this.endValue) {
            return false;
        }
        return startValue.getTime() > this.endValue.getTime();
    };

    disabledEndDate = (endValue: Date): boolean => {
        if (!endValue || !this.startValue) {
            return false;
        }
        return endValue.getTime() <= this.startValue.getTime();
    };

    onStartChange(date: Date): void {
        this.startValue = date
        this.wantStartTime = this.dateTransform.timeFormat("yyyy-MM-dd 00:00:00", date)
    }

    onEndChange(date: Date): void {
        this.endValue = date
        this.wantEndTime = this.dateTransform.timeFormat("yyyy-MM-dd 23:59:59", date)
    }

    handleStartOpenChange(open: boolean): void {
        this.startOpen = open;
        if (open) {
            this.endOpen = false;
        } else {
            this.endOpen = true;
        }
    }

    handleEndOpenChange(open: boolean): void {
        this.endOpen = open;
        if (open) {
            this.startOpen = false;
        }
    }
}