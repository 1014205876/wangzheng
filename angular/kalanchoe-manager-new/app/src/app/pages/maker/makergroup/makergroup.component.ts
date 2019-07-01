import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';

import { ApiService } from '../../../shared/service/api.service';

@Component({
    selector: 'app-makergroup',
    templateUrl: './makergroup.component.html',
    styleUrls: ['./makergroup.component.less']
})
export class MakergroupComponent implements OnInit {
    //查询变量
    findStatus = ''
    pageNum = 1
    findGroupName = ''

    //数据总数
    total

    data = []
    list = []
    //状态变量
    switchValue: boolean
    status
    groupId
    showSingleSwitch = false

    //批量操作变量
    selected = []
    showManyDisableMoadl = false
    showManyAbleMoadl = false
    showAddMoadl = false

    //添加分组变量
    groupName = ''
    commissionRate: number
    remark = ''

    //修改分组变量
    showChangeMoadl = false
    oldGroupName
    oldCommissionRate
    oldRemark

    //全选
    indeterminate = false
    allChecked = false
    constructor(
        private api: ApiService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.getGroupData()
    }

    async getGroupData() {
        let res = await this.api.getGroupDataGrid({
            groupName: this.findGroupName,
            status: this.findStatus,
            pageNum: this.pageNum,
            pageSize: 10
        })
        if (res.code == 200) {
            this.total = res.data.total;
            this.list = res.data.list;
            this.pushSwitchValue();
            //复选框相关参数重置
            this.selected = [];
            this.indeterminate = false;
            this.allChecked = false;
        }
    }

    pushSwitchValue() {
        this.list.map(item => {
            if (item.status === 1) {
                item.switchValue = true
            }
            if (item.status === 0) {
                item.switchValue = false
            }
            item.check = false
            return
        })
        this.data = this.list
    }
    search() {
        this.pageNum = 1
        this.getGroupData()
    }
    reset() {
        this.findGroupName = ''
        this.findStatus = ''
    }
    pageSearch($event) {
        this.pageNum = $event
        this.getGroupData()
    }
    switchChange($event, id) {
        this.groupId = id
        this.switchValue = $event
        this.showSingleSwitch = true
    }
    singleHandleCancel() {
        this.showSingleSwitch = false
        this.getGroupData()
    }
    singleHandleOk() {
        this.showSingleSwitch = false
        if (this.switchValue === false) {
            this.status = 0
        }
        if (this.switchValue === true) {
            this.status = 1
        }
        this.changeStatusData()
    }
    async changeStatusData() {
        let id = this.groupId
        let selected = []
        selected.push(id)
        let status = this.status

        let res = await this.api.patchGroup({
            'status': status,
            'list': selected
        });
        if (res.code == '200') {
            this.getGroupData();
            this.message.success('状态修改成功', { nzDuration: 1500 })
        } else {
            this.getGroupData()
            this.message.error(res.reason);
        }
    }

    checked(status: boolean, id) {
        if (status) {
            this.selected.push(id)
        } else {
            let selected = this.selected.filter(item => {
                return item != id
            })
            this.selected = selected
        }
        this.allCheckedShow();
    }

    checkAll(status: boolean) {//点击全选按钮，将需要选中的对象的check改变并生成一个对应的selected数组存放id
        this.selected = [];
        if (status) {
            this.data.forEach((item) => {
                if (item.id != '1') {
                    item.check = true
                    this.selected.push(item.id)
                }
            })
        } else {
            this.data.forEach((item) => {
                item.check = false
            })
        }
        this.allCheckedShow();
    }

    allCheckedShow() {//检查选中的订单（控制全选框的选中状态）
        if (this.selected.length == 0) {
            this.indeterminate = false;
            this.allChecked = false;
        } else {
            if (this.selected.length < this.data.length) {
                this.indeterminate = true;
                this.allChecked = false;
            }
            else {
                if (this.selected.length == this.data.length) {
                    this.indeterminate = false;
                    this.allChecked = true;
                }
            }
        }
    }

    clickedDisAble() {
        if (this.selected.length == 0) {
            this.message.error('请至少选择一个分组！')
        } else {
            this.showManyDisableMoadl = true
        }
    }

    async manyDisabled() {//点击禁用按钮批量禁用
        let res = await this.api.patchGroup({
            'status': '0',
            'list': this.selected
        });
        if (res.code == '200') {
            this.message.success('禁用成功', { nzDuration: 1500 })
        } else {
            this.message.error(res.reason);
        }
        this.getGroupData()
    }

    DisableMoadleCancel() {
        this.showManyDisableMoadl = false
    }

    DisableMoadleOk() {
        this.showManyDisableMoadl = false
        this.manyDisabled()
    }

    clickedAble() {
        if (this.selected.length == 0) {
            this.message.error('请至少选择一个分组！')
        } else {
            this.showManyAbleMoadl = true
        }
    }

    async manyAble() {//点击启用按钮批量启用
        let res = await this.api.patchGroup({
            'status': 1,
            'list': this.selected
        });
        if (res.code == '200') {
            this.message.success('启用成功', { nzDuration: 1500 })
        } else {
            this.message.error(res.reason);
        }
        this.getGroupData()
    }

    AbleMoadleOk() {
        this.showManyAbleMoadl = false
        this.manyAble()
    }

    AbleMoadleCancel() {
        this.showManyAbleMoadl = false
    }

    clickedAddGroup() {
        this.showAddMoadl = true
        this.groupName = ''
        this.commissionRate = null
        this.remark = ''
    }
    AddMoadleOk() {
        if (this.groupName == '') {
            this.message.error('分组名称不能为空')
        }
        if (this.commissionRate == null || this.commissionRate <= 0) {
            this.message.error('佣金比例不得为空且必须大于0')
        }
        if (this.commissionRate != null && this.commissionRate > 0 && this.groupName != '') {
            this.showAddMoadl = false
            this.addGroup()
        }
    }
    async addGroup() {
        let res = await this.api.postGroup({
            groupName: this.groupName,
            commissionRate: this.commissionRate,
            remark: this.remark
        });
        if (res.code == '200') {
            this.getGroupData()
            this.message.success('添加分组成功')
        } else {
            this.message.error(res.reason)
        }
    }
    AddMoadleCancel() {
        this.showAddMoadl = false
    }
    clickedChangeGroup(groupName, commissionRate, remark, id) {
        this.oldGroupName = groupName
        this.oldCommissionRate = commissionRate
        this.oldRemark = remark
        this.showChangeMoadl = true
        this.groupId = id
    }
    ChangeMoadleCancel() {
        this.showChangeMoadl = false
    }
    ChengeMoadleOk() {
        if (this.oldGroupName == '') {
            this.message.error('分组名称不能为空')
        }
        if (this.oldCommissionRate == null || this.oldCommissionRate <= 0) {
            this.message.error('佣金比例必须大于0')
        }
        if (this.oldCommissionRate != null && this.oldCommissionRate > 0 && this.oldGroupName != '') {
            this.showAddMoadl = false
            this.showChangeMoadl = false
            this.changeGroup()
        }
    }
    async changeGroup() {
        let res = await this.api.putGroup({
            id: this.groupId,
            groupName: this.oldGroupName,
            commissionRate: this.oldCommissionRate,
            remark: this.oldRemark
        });
        if (res.code == '200') {
            this.getGroupData()
            this.message.success('修改分组成功')
        }else {
            this.message.error(res.reason)
        }
    }
}
