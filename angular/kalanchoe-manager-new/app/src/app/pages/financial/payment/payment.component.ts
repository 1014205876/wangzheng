import { Component, OnInit } from '@angular/core';
import { DateTransformService } from '../../../shared/service/date-transform.service'
import { HttpService } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  startTime: Date = null;
  endTime: Date = null;
  //查找变量
  findNo = '';
  findPhone = '';
  findStartTime = '';
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
  groupStatus = '&states=1&states=3&states=4';
  groupText = [
    {
      label:'全部',
      value: '&states=1&states=3&states=4'
    },
    {
      label:'待划付',
      value: '&states=1'
    },
    {
      label:'划付失败',
      value: '&states=4'
    },
    {
      label:'划付成功',
      value: '&states=3'
    }
  ]

  //分页
  pageNum = 1;
  total = 0;

   //表格
  data: any[] = [];

  //模态框
  enterPayModel:boolean = false;
  delailPayModel:boolean = false;
  enterPayForm = {
    id:'',
    applyNo:'',
    amount:'',
    bank:'',
    card:'',
    setPaymentTime:null,
    bankSerialNo:'',
    payResult:'',
    payReason:''
  }
  detailPayForm = {
    applyNo:'',
    mobile:'',
    amount:'',
    bank:'',
    card:'',
    serviceAmount:'',
    state: 0,
    createTime:'',
    auditTime:'',
    payTime:'',
    bankSerialNum:'',
    remark:'',
    updateTime:''
  }


  constructor(  private http: HttpService,
    private message: NzMessageService,
    private dateTransform: DateTransformService,) { }

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
      if(res.code=="200"){
        this.total = res.data.total;
        this.pageNum = res.data.pageNum;
        this.data = res.data.list;
      }
    })
  }

  search() {
    this.pageNum = 1
    this.getData()
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

  showEnterPayModel(data){
    Object.assign(this.enterPayForm,data);
    this.enterPayForm.amount = data.amount.toFixed(2);
    this.enterPayForm.card = data.card.replace(/(\d{4})(?=\d)/g,"$1 ");
    this.enterPayModel = true;
    this.enterPayForm.setPaymentTime = Date();
  }

  handleOkEnter(){
    if(this.enterPayForm.setPaymentTime===null){
      return this.message.error('请选择付款时间')
    }
    if(this.enterPayForm.bankSerialNo===''){
      return this.message.error('请输入银行流水号')
    }
    if(this.enterPayForm.payResult===''){
      return this.message.error('请选择划付结果')
    }
    let payTime = this.dateTransform.timeFormat("yyyy-MM-dd hh:mm:ss",new Date(this.enterPayForm.setPaymentTime));
    let param = {
      id: this.enterPayForm.id,
      payTime: payTime,
      bankSerialNum:this.enterPayForm.bankSerialNo,
      state:this.enterPayForm.payResult,
      remark:this.enterPayForm.payReason
    }

    this.http.postCustomHeaders('kalanchoe-manager/v1/back/app/cash/pay/input',param).subscribe(res => {
      this.handleCancelEnter();
      if (res.code == "200") {
          this.getData();
          this.message.success('录入划付结果成功');
          this.groupStatus = '&states=1&states=3&states=4';
      } else {
         this.message.error('录入划付结果失败');
      }
    })
  }

  handleCancelEnter(){
    this.enterPayModel = false;
    this.enterPayForm = {
      id:'',
      applyNo:'',
      amount:'',
      bank:'',
      card:'',
      setPaymentTime:'',
      bankSerialNo:'',
      payResult:'',
      payReason:''
    }
  }

  showDetailPayModel(data) {
    Object.assign(this.detailPayForm,data);
    this.detailPayForm.amount = data.amount.toFixed(2);
    this.detailPayForm.card = data.card.replace(/(\d{4})(?=\d)/g,"$1 ");
    this.delailPayModel = true;
  }

  handleCancelDetail(){
    this.delailPayModel = false;
  }

  download(){
    window.location.href= window.location.origin + "/api/kalanchoe-manager/v1/back/app/cash/pay/export"
  }
}
