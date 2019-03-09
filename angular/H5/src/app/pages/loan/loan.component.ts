import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import global from '../../shared/global';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.less']
})
export class LoanComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onpopstate(e) {
    global.loan = {
      productId: "",
      productName: "",
      etpCer: {
        id: '',
        etpName: '',
        infoAuthNum: ''
      },
      amount: null,
      term: null,
      infoAuth: {
        id: '',
        infoAuthNum: '',
        authUrl: '',
        bodyUrl: '',
        controllerUrl: ''
      },
      repayMethod:"",
      stepSwitch: false
    }
  }
  loading = false;
  data = {
    etpCer: {
      id: '',
      etpName: '',
      infoAuthNum: ''
    },
    amount: null,
    term: null,
    infoAuth: {
      id: '',
      infoAuthNum: '',
      authUrl: '',
      bodyUrl: '',
      controllerUrl: ''
    },
    repayMethod:"",
    stepSwitch: false
  }
  timeValue;
  product;
  productName;
  productId;
  config = [];
  cansubmit = true;//为真时发起提交请求，为假不发起提交请求
  methodOptions=[];
  picUrl=[];
  tempUrl;
  constructor(private router: Router, private http: HttpService, private activeRoute: ActivatedRoute) {
    
    this.activeRoute.queryParams.subscribe(params => {
      if (params['reloan']) {
        this.productId = params['productId'];
        
        this.http.get('/v2/app/pre/loans/' + params['orderId']).subscribe(res => {
          let data = res.result;
          this.productName = data.loanApply.productName;
          if(!global.reload){
            this.reloan(data);
            global.reload=true;
          }
        })
      }
      if (params.id) {
        this.productName = params.name;
        this.productId = params.id;
        global.loan.productName = params.name;
        global.loan.productId = params.id;
      }
      this.data = global.loan;
    });
    this.getForm();
    this.clearinfoAuth();
    this.getRepayMethod();
    this.getProduct();
    this.getUser();
  }

  ngOnInit() {
    if (sessionStorage.dataInit == '1') {
      sessionStorage.dataInit == '0'
      this.dataInit();
    }
    
  }

  // 如果改变公司，清除之前做的信息采集数据
  clearinfoAuth(){
    // (global.etpNameTemp && global.loan.infoAuth.id && (global.etpNameTemp != global.loan.etpCer.etpName))
    if (global.etpNameTemp && (global.etpNameTemp != global.loan.etpCer.etpName)) {
      let idTemp = global.loan.productId;
      let etpCerTemp = global.loan.etpCer;
      this.resetGlobal();
      sessionStorage.dataInit = '1';
      this.dataInit();
      global.loan.productId = idTemp;
      global.loan.etpCer = etpCerTemp;
      global.etpNameTemp = global.loan.etpCer.etpName;
      this.data = global.loan;
    } else {
      global.etpNameTemp = global.loan.etpCer.etpName;
    }
  }

  // 重新申请贷款
  reloan(value){
    if(value.dataList.length>0){
      value.dataList.forEach(item=>{
        if(item.controlList.length>0){
          item.controlList.forEach(control=>{
            if(control.value){
              sessionStorage[control.controlKey]=control.value;
            }
          })
        }
      })
      this.getForm();
    }
    setTimeout(() => {
      sessionStorage.dataInit = '0';
    }, 2000);
    global.loan = {
      productId: value.loanApply.productId,
      productName: value.loanApply.productName,
      etpCer: {
        id: value.loanApply.etpCerId,
        etpName: value.loanApply.etpName,
        infoAuthNum: value.loanApply.infoAuthNum,
      },
      amount: value.loanApply.amount,
      term: value.loanApply.term,
      infoAuth: {
        id: value.loanApply.infoAuthId,
        infoAuthNum: value.loanApply.infoAuthNum,
        authUrl: value.loanApply.authUrl,
        bodyUrl: value.loanApply.bodyUrl,
        controllerUrl: value.loanApply.controllerUrl
      },
      repayMethod:value.loanApply.repayMethod,
      stepSwitch: false
    }
    this.data = global.loan;
  }
  getUser() {
    this.http.get('/v2/app/pre/users')
      .subscribe(res => {
        global.userInfo.id = res.result.id;
      })
  }
  getRepayMethod(){
    this.http.get("/v2/app/pre/repayMethod/"+this.productId).subscribe(res=>{
      this.methodOptions=res.result;
    })
  }
  getForm(){
    this.http.get("/v2/app/pre/applyForm/"+this.productId).subscribe(res=> {
      this.config=res.result;

      if (sessionStorage.dataInit == '1') {
        this.dataInit();
      }
      setTimeout(() => {
        sessionStorage.dataInit = '1';
      }, 1000);

    })
  }
  getProduct() {
    this.http.get('/v2/app/pre/products').subscribe(res => {
      this.product = res.result;
    })
  }

  resetGlobal() {
    global.loan = {
      productId: "",
      productName: "",
      etpCer: {
        id: '',
        etpName: '',
        infoAuthNum: ''
      },
      amount: null,
      term: null,
      infoAuth: {
        id: '',
        infoAuthNum: '',
        authUrl: '',
        bodyUrl: '',
        controllerUrl: ''
      },
      repayMethod:"",
      stepSwitch: false
    }
  }
  getInfo() {
    if (!this.data.etpCer.id) {
      alert('请选择需要贷款的企业！');
      return;
    }
    if (global.loan.infoAuth) {
      this.router.navigate(['/get-information'], { queryParams: { 'etpCer': JSON.stringify(global.loan.etpCer), 'infoAuth': JSON.stringify(global.loan.infoAuth) } })
    } else {
      this.router.navigate(['/get-information'], { queryParams: { 'etpCer': JSON.stringify(global.loan.etpCer) } })
    }
  }

  dataInit() {
    sessionStorage.clear();
    for(var i=0; i<sessionStorage.length; i++){
      let key=sessionStorage.key[i];
      sessionStorage[key]=""
    }
  }
  dataValid(form, data) {
    this.cansubmit = true;
    if (!this.data.etpCer.id) {
      this.cansubmit = false;
      alert('请选择需要贷款的企业！')
      return;
    }
    if (!this.data.amount) {
      this.cansubmit = false;
      alert('请填写贷款金额！')
      return;
    }
    if (this.data.amount < 10) {
      this.cansubmit = false;
      alert('贷款金额不得小于10万！')
      return;
    }
    if (!this.data.repayMethod) {
      this.cansubmit = false;
      alert('请填写还款方式！')
      return;
    }
    if (!this.data.term) {
      this.cansubmit = false;
      alert('请选择贷款期限！')
      return;
    }
    if (!this.data.infoAuth.authUrl) {
      this.cansubmit = false;
      alert('请进行信息采集授权！')
      return;
    }
    for (let i = 0; i < data.dataList.length; i++) {//判定子页面信息是否全部填写
      if (data.dataList[i].require == '1') {
        if (data.dataList[i].value) {
        } else {
          this.cansubmit = false;
          if (data.dataList[i].groupShow == '1') {
            alert(`${data.dataList[i].groupName}中的${data.dataList[i].label}不得为空`)
            return;
          } else {
            alert(`${data.dataList[i].label}不得为空`)
            return;
          }
        }
      }
    }
    let config = this.config;
    for (let key in form.controls) {
      if (form.controls[key].errors) {
        if (form.controls[key].errors.hasOwnProperty('required') || form.controls[key].errors.hasOwnProperty('hasValue')) {
          config.forEach(item => {
            if (item.controlList && item.controlList.length > 0) {
              for (var i = 0; i < item.controlList.length; i++) {
                if (item.controlList[i].id == key) {
                  // console.log(item.label+' 中的 '+item.controlList[i].label+' 不得为空')
                  alert(item.label + ' 中的 ' + item.controlList[i].label + ' 不得为空')
                  return;
                }
              }
            }
          })
        }
      }
    }
  }
  dataSet(form) {
    let loanApply = {
      productId: global.loan.productId,
      userId: global.userInfo.id,
      etpCerId: global.loan.etpCer.id,
      etpName: global.loan.etpCer.etpName,
      amount: global.loan.amount,
      term: global.loan.term,
      infoAuthId: global.loan.infoAuth.id,
      infoAuthNum: global.loan.infoAuth.infoAuthNum,
      authUrl: global.loan.infoAuth.authUrl,
      bodyUrl: global.loan.infoAuth.bodyUrl,
      controllerUrl: global.loan.infoAuth.controllerUrl,
      repayMethod: global.loan.repayMethod
    };
    var dataList = [];
    if(this.config.length>0){
      this.config.forEach(item => {
        if (item.controlList && item.controlList.length > 0) {
          item.controlList.forEach(control => {
            if (sessionStorage[control.controlKey]) {
              control.value = sessionStorage[control.controlKey];
            }
            if (form.value[control.controlKey]) {
              control.value = form.value[control.controlKey]
            }
            dataList.push(control);
          })
        }
      })
    }
    
    return {
      "loanApply": loanApply,
      "dataList": dataList
    }
  }

  submitted(form) {
    if(!global.loan.stepSwitch){
      let data = this.dataSet(form);
      this.dataValid(form, data);
      if (this.cansubmit) {
        this.loading = true;
        this.http.post('/v2/app/pre/loan', data).subscribe(res => {
          if ((res.code != '200')&&res.reason) {
            alert(res.reason);
            this.loading = false;
            return;
          }
          this.loading = false;
          this.dataInit();
          this.resetGlobal();
          this.router.navigate(['/loan-suc'], { queryParams: { 'orderId': res.result.id, 'etpName': this.data.etpCer.etpName } })
        })
      }
    }
    global.loan.stepSwitch=false;
  }
  transformTime(e) {
    return e ? (e.match(/14:00:00/) ? e.replace(/14:00:00/, '下午') : e.replace(/08:00:00/, '上午')) : '';
  }

}
