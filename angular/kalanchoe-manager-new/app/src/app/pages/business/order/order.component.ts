import { Component, OnInit } from '@angular/core';
import { TransformService } from '../../../shared/service/transform.service';
import { HttpServe } from './../../../shared/service/http-serve.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class businessorderComponent implements OnInit {

    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;

    //查询框数据
    no = ''//订单号
    etpName = ''//企业名称
    regMobile = ''//客户账号
    insStaffName = ''//客户拓展人
    productId = ''//申请产品
    productArr = []//申请的产品数组
    wantStartTime = ''//开始时间选择框时间对象
    wantEndTime = ''//结束时间选择框时间对象
    loanStartDate = ''//放款开始时间
    loanEndDate = ''//放款结束时间
    pageNum = 1//表格页数
    total = 0//表格信息条数

    data = [];//表格数据
    allChecked: boolean = false;//全选按钮是否选中
    indeterminate: boolean = false;//半选按钮是否选中(全选按钮为真时才显示)
    displayData = [];//用于储存选中的订单

    profitModel = {//执行分润的弹窗
        modalShow: false,//控制弹窗的显示隐藏
        modalLoading: false,//控制弹窗提交按钮的loading
    }

    constructor(
        private http: HttpServe,
        private dateTransform: TransformService,
        private route: ActivatedRoute,
        private message: NzMessageService

    ) { }

    checkAll(status): void {//点击全选表格复选框
        this.displayData.length = 0;
        if (status) {
            this.data.forEach(item => {
                if (item.shareStatus == 1) {
                    item['check'] = false;
                } else {
                    item['check'] = true;
                    this.displayData.push(item.id);
                }
            });
        } else {
            this.data.forEach(item => {
                item['check'] = false;
            });
        }
        this.allCheckedShow()
    }

    checkOne(status, data): void {//点击单个表格复选框
        if (status) {
            this.displayData.push(data.id);
        }
        else {
            this.displayData.splice(this.displayData.indexOf(data.id), 1);
        }
        this.allCheckedShow()
    }

    allCheckedShow() {//检查选中的订单（控制全选框的选中状态）
        if (this.displayData.length == 0) {
            this.indeterminate = false;
            this.allChecked = false;
        } else {
            if (this.displayData.length < this.data.length) {
                this.indeterminate = true;
                this.allChecked = false;
            }
            else {
                if (this.displayData.length == this.data.length) {
                    this.indeterminate = false;
                    this.allChecked = true;
                }
            }
        }
    }

    profitModelShow() {//点击弹出确定分润弹窗
        if (this.displayData.length == 0) {
            this.message.error('请选择至少一条数据')
            return
        } else {
            this.profitModel.modalShow = true
        }
    }

    profitModelCancel(): void {//点击删除分组取消按钮
        this.profitModel.modalShow = false;
    }

    shareProfit() {//为选中订单执行分润
        this.profitModel.modalLoading = true;
        // this.http.patchCustomHeaders(
        //     "kalanchoe-manager/v2/app/pre/shareProfit"
        //     , this.displayData)
        //     .subscribe(res => {
        //         if (res.code == '200') {
        //             this.message.success('分润成功')
        //             this.getData()
        //         } else {
        //             this.message.error(res.reason)
        //         }
        //         this.profitModel.modalShow = false;
        //         this.profitModel.modalLoading = false;
        //     })
    }

    change(e) {//导入文件时执行的函数（一直触发，直到上传成功）返回url
        let arr = e.fileList;
        if (e.type == 'success') {
            this.importOrder(arr[arr.length - 1].response.location)
        }
    }

    importOrder(url) {//将得到的URL路径发送给后端完成导入
        // this.http.postCustomHeaders(
        //     'kalanchoe-manager/v2/app/pre/importLoans',
        //     {
        //         fileUrl: url
        //     }
        // ).subscribe(res => {
        //     if (res.code == '200') {
        //         this.message.success('导入成功')
        //         this.getData()
        //     } else {
        //         this.message.error('导入失败')
        //     }
        // })
    }

    ngOnInit() {
        this.regMobile = this.route.snapshot.queryParams.regMobile
        this.etpName = this.route.snapshot.queryParams.etpName
        if (this.regMobile == undefined) {
            this.regMobile = ''
        }
        if (this.etpName == undefined) {
            this.etpName = ''
        }
        this.getProduct()
        this.getData()
    }

    getProduct() {//获取申请产品数组
        // this.http.getCustomHeaders(
        //     'kalanchoe-manager/v2/app/pre/product'
        // ).subscribe(res => {
        //     this.productArr = res.data
        // })
    }

    getData() {//获取表格信息
        // this.http.getCustomHeaders(
        //     'kalanchoe-manager/v2/app/pre/loansGrid'
        //     + "?no=" + this.no
        //     + "&etpName=" + this.etpName
        //     + '&regMobile=' + this.regMobile
        //     + '&insStaffName=' + this.insStaffName
        //     + '&productId=' + this.productId
        //     + "&loanStartDate=" + this.wantStartTime
        //     + "&loanEndDate=" + this.wantEndTime
        //     + '&pageNum=' + this.pageNum
        //     + '&pageSize=' + 10
        // ).subscribe(res => {
        //     this.data = res.data.list;
        //     this.total = res.data.total
        //     this.displayData.length = 0;
        //     this.indeterminate = false;
        //     this.allChecked = false;
        // })
    }

    pageSearch($event) {//点击分页器切换
        this.pageNum = $event
        this.getData()
    }

    reset() {//重置查询框
        this.no = ''
        this.etpName = ''
        this.regMobile = ''
        this.insStaffName = ''
        this.productId = ''
        this.startValue = null
        this.endValue = null
        this.wantStartTime = ''
        this.wantEndTime = ''
    }

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
        }else{
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
