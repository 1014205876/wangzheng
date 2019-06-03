import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { DateTransformService } from '../../../shared/service/date-transform.service'
import { HttpService } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
    startTime: Date = null;
    endTime: Date = null;
    //查找变量
    findNo = '';
    findPhone = '';
    findStartTime  = '';
    findEndTime = '';

    disabledStartTime = (startTime: Date): boolean => {
      if (!startTime || !this.endTime) {
          return false;
      }
      return startTime.getTime() > this.endTime.getTime();
    };
  
    disabledEndTime = (endTime: Date): boolean => {
      if (!endTime || !this.startTime) {
          return false;
      }
      return endTime.getTime() <= this.startTime.getTime();
    };

    //按钮组状态
    groupStatus = '&states=0&states=1&states=2';
    groupText = [
      {
        label:'全部',
        value: '&states=0&states=1&states=2'
      },
      {
        label:'待审核',
        value: '&states=0'
      },
      {
        label:'审核通过',
        value: '&states=1'
      },
      {
        label:'审核不通过',
        value: '&states=2'
      }
    ]
    //分页
    pageNum = 1;
    total = 0;

    //表格
    data: any[] = [];

    //表格复选狂
    allChecked = false;
    indeterminate = false;
    mapOfCheckedId: { [key: string]: boolean } = {};
    mapOfDisableId: { [key: string]: boolean } = {};
    confirmModal: NzModalRef; // For testing by now

   constructor(private modal: NzModalService,
    private http: HttpService,
    private message: NzMessageService,
    private dateTransform: DateTransformService) { };

  ngOnInit() {
    this.getData();
  }

  
  onStartTimeChange(date: Date): void {
    this.findStartTime = date ? this.dateTransform.timeFormat("yyyy-MM-dd 00:00:00", date) : '';
  }

  onEndTimeChange(date: Date): void {
    this.findEndTime = date ? this.dateTransform.timeFormat("yyyy-MM-dd 23:59:59", date) : '';
  }

  getData(){
    this.http.getCustomHeaders(     
      'kalanchoe-manager/v1/back/app/cashs?pageNum=' + this.pageNum +
      '&pageSize=' + 10 +
      '&applyNo=' + this.findNo +
      '&mobile=' + this.findPhone +    
      '&auditStartTime=' + this.findStartTime +
      '&auditEndTime=' + this.findEndTime +  
      this.groupStatus 
    ).subscribe(res => {
      if(res.code==='200'){
        this.total = res.data.total;
        this.pageNum = res.data.pageNum;
        this.data = res.data.list;
        this.mapOfCheckedId = {};
        this.mapOfDisableId ={};
        this.allChecked = false;
        this.indeterminate = false;  
        this.data.forEach( item => this.mapOfDisableId[item.id] = (item.state!== 0 ) )
      }
    })
  }
  search() {
    this.pageNum = 1;
    this.getData();
  }

  reset() {
    this.findNo = ''
    this.findPhone = ''
    this.findStartTime = ''
    this.findEndTime = ''
    this.startTime = null
    this.endTime = null
    this.pageNum = 1
  }

  pageSearch($event) {
    this.pageNum = $event;
    this.getData();
  }

  changeState(){
    this.pageNum = 1;
    this.getData();
  }

  apply(isOne:boolean, status: string, id: string): void{
    let ids = [] ;
    if(isOne){
        ids = [id]
    }else{
      let obj = this.mapOfCheckedId;
      Object.getOwnPropertyNames(obj).forEach(function(val) {
        if(obj[val]) ids.push(val);
      });
    }

    if( ids.length === 0 && !isOne){
      this.message.error('请至少选择一项');
      return;
    }
    let text = status==='pass' ? '通过' : '拒绝'
    this.confirmModal = this.modal.confirm({
      nzTitle: '系统提示',
      nzContent: `你确定要将选中的申请全部${ text }吗?`,
      nzOnOk: () => this.submitApply(status,text,ids)
    });
  }

  submitApply(status: string, text: string,ids){
    this.http.patchCustomHeaders(`kalanchoe-manager/v1/back/app/cashApply/${status}`,ids).subscribe(res => {
      if(res.code==='200'){
        this.message.success(`${text}申请操作成功`);
        this.groupStatus = '&states=0&states=1&states=2';
        this.getData();
      }
    })
  }

  checkAll(value: boolean): void {
    this.data.filter(item => item.state===0).forEach(
        item => (this.mapOfCheckedId[item.id] = value)
    )
      this.refreshStatus();
  }

  checked(e:boolean,dataNo:string): void {
    this.mapOfCheckedId[dataNo] = e;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.allChecked = this.data
      .filter(item => item.state === 0)
      .every(item => this.mapOfCheckedId[item.id]);
    this.indeterminate =
      this.data.filter(item => item.state ===0).some(item => this.mapOfCheckedId[item.id]) &&
      !this.allChecked;
  }
}
