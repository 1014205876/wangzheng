import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from './../../../shared/service/http-serve.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-loan-input',
  templateUrl: './loan-input.component.html',
  styleUrls: ['./loan-input.component.scss']
})
export class LoanInputComponent implements OnInit {
  // search = {
  //   etp: '',
  //   no: '',
  //   cross: '',
  //   recheck: '',
  //   status: ''
  // }
  // data = {
  //   "loanId": "",
  //   "status": 0,
  //   "reason": "",
  //   "approvalAmount": null,
  //   "approvalTerm": null,
  //   "loanRate": "",
  //   "repayMethod": "",
  //   "serviceRate": "",
  //   "no": "",
  //   "loanDate": "",
  //   "cansubmit": true
  // }
  params = {
    etpName: '',
    no: '',
    operator: '',
    checker: '',
    status: '',
    pageNum: 1,
    pageSize: 10
  }
  resultInputParams = {
    signStatus: '1',
    approvalAmount: null,
    approvalTerm: null,
    loanRate: null,
    repayMethod: null,
    no: null,
    id: null,
    identifier: null,
    cansubmit: false,
    noSignReason: null
  }
  resultCheckParams = {
    identifier: null,
    id: null,
    checkStatus: '1',
    checkReason: null,
    cansubmit: false
  }
  rows = []
  selectRow = {
    identifier: null
  }
  input = false
  inputCheck = false
  applyRepayMethod = []
  productId = '259e56c7-6848-43d1-b03d-c6e49ccb8f84'
  mask = false
  totalPage = 1
  toast = {
    "position": 'center-center',
    "title": '',
    "msg": '',
    "showClose": true,
    "theme": 'material',
    "type": 'error',
    "closeOther": false
  }
  submit = false
  load = false
  rejectHover = false
  constructor(private http: HttpService, private route: ActivatedRoute, private toastyService: ToastyService) { }

  ngOnInit() {
    this.load = false
    this.getData()
  }
  searchAct() {
    this.getData()
  }
  rejectMouseover() {
    this.rejectHover = true
  }
  rejectMouseout() {
    this.rejectHover = false
  }
  getRepaymentMethod(productId) {
    return new Promise((resolve, reject) => {
      this.http.getCustomHeaders3("peak-resource/v1/resource/products/" + productId).subscribe(res => {
        let repayMethods = res.data.product.repayMethodShow;
        this.applyRepayMethod = []
        repayMethods.forEach(item => {
          if (item.checked) {
            this.applyRepayMethod.push(item)

          }
        })
        resolve(true)
      })
    })

  }
  changePage(e) {
    this.params.pageNum = e ? e : 1
    this.getData();
  }
  changeRadio() {
    this.submit = false
  }
  getData() {
    // let url = `/v1/app/back/loansInputGrid?etpName=${this.params.etpName}&no=${this.params.no}&operator=${this.params.operator}&checker=${this.params.checker}&status=${this.params.status}&pageNum=${this.params.pageNum}`
    let url = '/v1/app/back/loansInputGrid' + this.getParamsString()
    this.http.getCustomHeaders(url).subscribe(res => {
      this.load = true
      this.rows = res.result.list
      this.totalPage = Math.ceil(res.result.total / this.params.pageSize)
    })
  }
  getParamsString() {
    let str = '?'
    for (let i in this.params) {
      str = str + i + '=' + this.params[i] + '&'
    }
    str = str.substr(0, str.length - 1)
    return str
  }
  reset() {
    this.params.checker = ''
    this.params.etpName = ''
    this.params.no = ''
    this.params.operator = ''
    this.params.status = ''
  }
  resultInputSubmit() {
    this.submit = true
    if (this.resultInputParams.signStatus === '1') {
      if (this.resultInputParams.approvalAmount && this.resultInputParams.approvalTerm && this.resultInputParams.loanRate && this.resultInputParams.repayMethod && this.resultInputParams.no) {
      } else {
        this.toast.msg = '不能为空'
        this.toast.type = 'error'
        this.addToast(this.toast)
        return
      }
    } else {
      if (!this.resultInputParams.noSignReason) {
        this.toast.msg = '不能为空'
        this.toast.type = 'error'
        this.addToast(this.toast)
        return
      }
    }
    this.http.patchCustomHeaders('/v1/app/back/resultInput', this.resultInputParams).subscribe(res => {
      this.submit = false
      if (res.code === '200') {
        this.toast.msg = '录入成功'
        this.toast.type = 'success'
        this.hidden()
        this.addToast(this.toast)
        this.getData()
      } else {
        this.toast.msg = res.reason
        this.toast.type = 'error'
        this.addToast(this.toast)
      }
    })
  }
  resultCheckSubmit() {
    this.submit = true
    if (!this.resultCheckParams.checkReason) {
      this.toast.msg = '不能为空'
      this.toast.type = 'error'
      this.addToast(this.toast)
      return
    }

    this.http.patchCustomHeaders('/v1/app/back/resultCheck', this.resultCheckParams).subscribe(res => {
      this.submit = false
      if (res.code === '200') {
        this.toast.msg = '复核成功'
        this.toast.type = 'success'
        this.addToast(this.toast)
        this.hidden()
        this.getData()
      } else {
        this.toast.msg = res.reason
        this.toast.type = 'error'
        this.addToast(this.toast)
      }
    })
  }
  inputForm(row) {
    this.resultInputParams.signStatus = '1'
    this.getRepaymentMethod(row.productId).then(res => {
      this.resultInputParams.identifier = row.no
      this.resultInputParams.id = row.id
      this.input = !this.input
    })

  }
  inputCheckForm(row) {
    this.resultCheckParams.checkStatus = '1'
    this.resultCheckParams.id = row.id
    this.getResultInput(row)
  }
  checkParams(params) {
    for (let i in params) {
      if (!params[i]) return false
    }
    return true
  }

  getResultInput(row) {
    this.http.getCustomHeaders('/v1/app/back/resultInput/' + row.id).subscribe(res => {
      if (res.code === '200') {
        this.selectRow = res.result
        this.selectRow['identifier'] = row.no

        this.inputCheck = true
      } else {
        this.toast.msg = res.reason
        this.toast.type = 'error'
        this.addToast(this.toast)
      }
    })
  }


  hidden() {
    this.submit = false
    this.input = false
    this.inputCheck = false
    this.mask = false
    this.resultCheckParams.checkReason = null
    this.resultInputParams.approvalAmount = null
    this.resultInputParams.approvalTerm = null
    this.resultInputParams.id = null
    this.resultInputParams.identifier = null
    this.resultInputParams.loanRate = null
    this.resultInputParams.no = null
    this.resultInputParams.repayMethod = null

  }

  addToast(options) {//弹出提示语
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.toast.position = options.position ? options.position : this.toast.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: 5000,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }




}
