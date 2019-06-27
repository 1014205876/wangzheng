import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-settlement',
    templateUrl: './settlement.component.html',
    styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {

    //查找变量
    findNo = ''
    findPhone = ''
    findSettleType = ''

    pageNum = '1'
    total = ''
    data = []
    seleted = [];//复选框number数组
    statusList=[];//复选框status数组
    //全选
    indeterminate=false
    allChecked=false
    list=[]
    constructor(
        private http: HttpServe,
        private message: NzMessageService,
    ) { }

    ngOnInit() {
        this.getData()
    }

    getData() {
        // this.http.getCustomHeaders('kalanchoe-manager/v1/settlementApply?'
        //     + 'pageNum=' + this.pageNum
        //     + '&pageSize=10'
        //     + '&mobile=' + this.findPhone
        //     + '&type=' + this.findSettleType
        //     + '&no=' + this.findNo).subscribe(e => {
        //         if(e.code==200){
        //             this.allChecked=false
        //             this.total = e.data.total
        //             this.list = e.data.list
        //             this.addCheckBox()
        //         }
        //     })
    }
    addCheckBox(){
        this.list.map(item=>{
            item.check=false
          return
        })
        this.data=this.list
    }
    submit(type, nos) {
        // this.http.putCustomHeaders('kalanchoe-manager/v1/settlementApply/updateStatus?'
        //     + 'ids=' + nos
        //     + '&status=' + type, {
        //         nos: nos,
        //         status: type
        //     }).subscribe(e => {
        //         if (e.code == 200) {
        //             this.message.success('操作成功')
        //         }
        //         else {
        //             this.message.error(e.reason)
        //         }
        //         this.getData()
        //     })
    }
    apply(type, no, singleOrmany) {
        let index = this.statusList.indexOf(type)
        if (singleOrmany == 'single') {
            let nos = [no]
            let applyType = type
            this.submit(applyType, nos)
        }
        if (singleOrmany == 'many') {
            let nos = this.seleted
            let applyType = type

            if (this.seleted.length == 0) {
                this.message.error('请至少选择一项！')
            }
            if(index>=0){
                this.message.error('存在已结清选项，请重新选择！')
            }
            else {
                this.submit(applyType, nos)
            }
        }
    }
    checked($event, no, data) {
        if ($event === true) {
            this.seleted.push(no)
        }
        if ($event === false) {
            let selected = this.seleted.filter(item => {
                return item != no
            })
            this.seleted = selected
        }
        if(this.seleted.length==this.data.length){
            this.allChecked=true
            this.indeterminate=false
        }
        else if(this.seleted.length==0){
            this.allChecked=false
            this.indeterminate=false
        }
        else{
            this.allChecked=false
            this.indeterminate=true
        }
        this.getNoStatus($event,data)
    }
        //全选
 
    checkAll($event,data) {
        if($event==true){
            this.allChecked=true
            this.indeterminate=false
        }else{
            this.allChecked=false
            this.indeterminate=false
        }
        if(this.allChecked==true){
                this.seleted = this.data.map(item=>{
                item.check=true
                return item.no
            })
            this.getAllNoStatus($event,data)
        }
        if(this.allChecked==false){
            this.seleted = this.data.map(item=>{
                item.check=false
            })
            this.seleted=[]
            this.statusList=[]
        }
    }
    getNoStatus($event,data) {
        if($event === true){
            this.statusList.push(data.status)
        }
        if ($event === false) {
            let deleteStatus = data.status
            let statusList = this.statusList
            let index = statusList.indexOf(deleteStatus)
            statusList.splice(index,1)
            this.statusList=statusList
        }
    }
    getAllNoStatus($event,data){
        if($event==true){
            this.statusList=data.map(item=>{
                return item.status
            })
        }
        if($event==false){
            this.statusList=[]
        }
    }
    search() {
        this.pageNum='1'
        this.getData()
    }
    reset() {
        this.findNo = ''
        this.findPhone = ''
        this.findSettleType = ''
        this.pageNum='1'
    }
    pageSearch($event) {
        this.pageNum = $event
        this.getData()
    }
}