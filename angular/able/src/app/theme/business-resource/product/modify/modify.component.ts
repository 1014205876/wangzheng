import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  config = {
    toolbar: [
      ['Paste'],
      ["Bold", "Italic", "Underline"],
      ["NumberedLisst", "BulletedList", "-", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustfyBlock"],
      ["Image"],
      ["Styles", "Format", "Font", "FontSize"],
      ["TextColor", "BGColor"],
      ["Maximize"]
    ]
  };
  productForm: FormGroup;
  isProductFormValid = false;
  isInterestFormValid = false;
  isServiceFormValid = false;
  bondConfigFormValid = false;
  materialFormValid = false;//申请资料数组是否填写完整
  items = {
    "product":
    {
      "name": "",
      "number": "",
      "minTerm": null,
      "maxTerm": null,
      "minAmount": null,
      "maxAmount": null,
      "minRate": null,
      "maxRate": null, productIntroduction: '',
      "repayMethod": '',//支持还款方式数组
      // "applyCondition": null,//产品申请条件
      repayMethodShow: [//用来遍历生成支持还款方式数组
        { code: "monthlyInterestPayment", name: "按月付息，到期还本", checked: 0 },
        { code: "equalInteres ", name: "等本等息（按月还款)", checked: 0 },
        { code: "averageCapitalPlusInterest", name: "等额本息（按月还款）", checked: 0 },
        { code: "averageCapital", name: "等额本金（按月还款）", checked: 0 },
        { code: "interestFirstThenCost", name: "先息后本", checked: 0 }
      ],
      "productType": 'guaranteeClass',//产品类型
      'interestStartTime': '',//计息开始时间
      'servicePaymentMethod': '',//服务费支取方式
      // "contractModel": null,//借款合同
      "remark": "",
      "status": 1,
    },
    "interestConfig": [
      {
        "spel": "",
        "rate": null
      },
    ],
    "serviceConfig": [{
      "spel": "",
      "rate": null,
      "type": 0
    }],
    "bondConfig": [
      {
        "spel": "",
        "rate": null,
        "type": 0
      }
    ],
    'material': [//上传合同数组
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' }
    ]
  };
  times=1;//点击添加的次数,防止富文本id重复
  toast = {
    "position": 'center-center',
    "title": '提示',
    "msg": '',
    "showClose": true,
    "theme": 'material',
    "type": 'success',
    "closeOther": false
  };

  servicePaymentMethod = [];//服务费支持方式数据
  interestStartTime = [];//计息开始时间数据
  productType = [];//产品类型数据
  applyRepayMethod = [];//支持还款方式数据
  repayMethodTrue = [];//支持还款方式复选框暂存数组（将true转化为名字）

  keyupHandler1(e, list) {
    console.log(e)
    console.log(list)
    list.productIntroduction = e
  }
  keyupHandler2(e, list) {
    console.log(e)
    console.log(list)
    list.value = e
  }

  change(list, e) {//上传合同函数
    list.file = e.target.files[0];
  }
  addfile() {//添加一行资料函数
    this.times=this.times+1//删除或添加时+1，防止富文本id重复
    this.items.material.push({ name: '', value: '' })
  }
  removefile(index) {//删除一行资料
    this.times=this.times+1//删除或添加时+1，防止富文本id重复
    this.items.material.splice(index, 1);
  }
  lookfile(file) {//查看所有文件
    console.log(file)
  }
  look() {//查看按钮
    console.log(this.repayMethodTrue)
    console.log(this.items)
  }
  checkchange(list, index, e) {//复选框输出修改
    if (e.target.checked) {
      list[index] = 1
    } else {
      list[index] = 0
    }
    console.log(list)
  }

  public id;

  constructor(
    private http: HttpServe,
    private toastyService: ToastyService,
    private route: ActivatedRoute
  ) {
    this.getProductItems();
  }

  ngOnInit() {
    this.http.getCustomHeaders(//服务费支付方式数据
      "v1/resource/productItem"
    ).subscribe(res => {
      console.log(res)
      this.servicePaymentMethod = res.result.servicePaymentMethod
      this.interestStartTime = res.result.interestStartTime
      this.productType = res.result.productType
      // this.applyRepayMethod = res.result.applyRepayMethod
    })
    this.id = this.route.snapshot.queryParams.id;
    this.getProduct();
  }

  getProductItems() {
    this.productForm = new FormGroup({
      name: new FormControl(),
      number: new FormControl(),
      minTerm: new FormControl(),
      maxTerm: new FormControl(),
      minAmount: new FormControl(),
      maxAmount: new FormControl(),
      minRate: new FormControl(),
      maxRate: new FormControl(),
      remark: new FormControl(),
      status: new FormControl(),
      applyRepayMethod: new FormControl(),
      productType: new FormControl(),
    })
  }

  getProduct() {
    let that=this;
    that.http.getCustomHeaders("v1/resource/products/" + that.id).subscribe(res => {
      that.items = res.result;
      that.items.material.unshift({ name: '123', value: '123' })//在富文本数组前方添加一组数据
      setTimeout(() => {//用延时定时器删除掉添加的那组数据（此富文本组件必须如此操作才可复显）
        that.items.material.splice(0, 1);
      }, 0);
      that.applyRepayMethod = that.items.product.repayMethodShow
      // console.log(this.applyRepayMethod)
      // console.log(this.repayMethodTrue)
      // this.repayMethodTrue.length=0;
      for (let i = 0; i < that.applyRepayMethod.length; i++) {
        if (that.applyRepayMethod[i].checked == 1) {
          that.repayMethodTrue[i] = true;
        } else {
          that.repayMethodTrue[i] = false;
        }
      }
      // console.log(this.repayMethodTrue)
      // console.log(this.items)
    })
  }

  addRow(e) {
    if (e == 'interest') {
      this.items.interestConfig = this.add(e, this.items.interestConfig);
    } else if (e == 'service') {
      this.items.serviceConfig = this.add(e, this.items.serviceConfig);
    } else if (e == 'bondConfig') {
      this.items.bondConfig = this.add('service', this.items.bondConfig);
    }
  }
  deleteRow(e, value) {
    if (e == 'interest') {
      this.items.interestConfig = this.items.interestConfig.filter(e => e != value)
    }
    else if (e == 'service') {
      this.items.serviceConfig = this.items.serviceConfig.filter(e => e != value)
    }
    else if (e == 'bondConfig') {
      this.items.bondConfig = this.items.bondConfig.filter(e => e != value)
    }
  }
  add(e, value) {
    var temp;
    if (e == 'interest') {
      temp = {
        "spel": "",
        "rate": ""
      }
      value.push(temp);
      return value;
    } else if (e == 'service') {
      temp = {
        "spel": "",
        "rate": "",
        "type": 0
      }
      value.push(temp);
      return value;
    }
  }
  addProduct() {
    console.log(this.items)
    this.isProductFormValid = true;
    this.isInterestFormValid = true;
    this.isServiceFormValid = true;
    this.bondConfigFormValid = true;
    this.materialFormValid = true;
    let interestConfig = this.items.interestConfig;
    let serviceConfig = this.items.serviceConfig;
    let bondConfig = this.items.bondConfig;
    for (var i = 0; i < interestConfig.length; i++) {
      if ((!interestConfig[i].spel) || (!interestConfig[i].rate)) {
        this.isInterestFormValid = false;
        this.toast.msg = '贷款利率配置为必填，不能有空值！';
        this.toast.type = 'warning';
        this.addToast(this.toast);
      }
    }
    for (var i = 0; i < serviceConfig.length; i++) {
      if ((!serviceConfig[i].spel) || (!serviceConfig[i].rate)) {
        this.isServiceFormValid = false;
        this.toast.msg = '居间服务费配置为必填，不能有空值！';
        this.toast.type = 'warning';
        this.addToast(this.toast);
      }
    }
    for (var i = 0; i < bondConfig.length; i++) {
      if ((!bondConfig[i].spel) || (!bondConfig[i].rate)) {
        this.bondConfigFormValid = false;
        this.toast.msg = '保证金配置为必填，不能有空值！';
        this.toast.type = 'warning';
        this.addToast(this.toast);
      }
    }
    if (this.items.product.minTerm > this.items.product.maxTerm) {
      this.isProductFormValid = false;
      this.toast.msg = '贷款期限最小范围不可大于最大范围！';
      this.toast.type = 'warning';
      this.addToast(this.toast);
    } else if (this.items.product.minAmount > this.items.product.maxAmount) {
      this.isProductFormValid = false;
      this.toast.msg = '贷款金额最小范围不可大于最大范围！';
      this.toast.type = 'warning';
      this.addToast(this.toast);
    } else if (this.items.product.minRate > this.items.product.maxRate) {
      this.isProductFormValid = false;
      this.toast.msg = '综合费率最小范围不可大于最大范围！';
      this.toast.type = 'warning';
      this.addToast(this.toast);
    }
    this.items.product.repayMethod = '';//支持还款方式复选框转字符串
    for (let i = 0; i < this.applyRepayMethod.length; i++) {
      if (this.repayMethodTrue[i]) {
        this.items.product.repayMethod = this.items.product.repayMethod+ this.applyRepayMethod[i].code + "," 
      }
    }
    //得到的字符串末尾逗号去除
    // console.log(this.items.product.repayMethod)
    this.items.product.repayMethod=this.items.product.repayMethod.substr(0,this.items.product.repayMethod.length-1)
    // console.log(this.items.product.repayMethod)
    let namenum = 0;
    let valuenum = 0;
    for (let i = 0; i < this.items.material.length; i++) {
      if (this.items.material[i].name) {
        namenum = namenum + 1
      }
      if (this.items.material[i].value) {
        valuenum = valuenum + 1
      }
    }
    if (namenum < this.items.material.length) {
      this.materialFormValid = false;
      this.toast.msg = '申请资料名称为必填，不能为空';
      this.toast.type = 'warning';
      this.addToast(this.toast);
    }
    if (valuenum < this.items.material.length) {
      this.materialFormValid = false;
      this.toast.msg = '申请资料内容为必填，不能为空';
      this.toast.type = 'warning';
      this.addToast(this.toast);
    }
    if (this.isInterestFormValid && this.isServiceFormValid && this.isProductFormValid && this.materialFormValid) {
      this.http.putCustomHeaders("v1/resource/products/" + this.id, this.items)
        .subscribe(res => {
          if (res.code == '200') {
            this.toast.msg = "成功";
            this.toast.type = "success";
            this.addToast(this.toast);
            this.goBack();
          } else {
            this.toast.msg = res.reason;
            this.toast.type = "error";
            this.addToast(this.toast);
          }
        })
    }
  }

  addToast(options) {
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

  goBack() {
    history.go(-1);
  }

}