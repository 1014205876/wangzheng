import { DateTransformService } from './../../../shared/service/date-transform.service';
import { HttpService } from './../../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.less', './form.less']
})
export class PublishComponent implements OnInit {

  type = [];//类型数组
  dataSource = [];//数据源数组
  data = {
    url: ['业务管理', '产品发布管理', '发布产品'],//导航路径
    account: '',//操作员
    id: "new",//编辑使用，保存产品ID。
    index: 0,//新建使用，产品名称对应的下标。
    infor: [//新建使用，公司信息数组。
      {
        id: "new",
        name: "",//产品名称
        number: "",//产品编号
        minTerm: '',//贷款期限
        maxTerm: '',
        minAmount: '',//贷款金额
        maxAmount: '',
        minRate: '',//贷款利率
        maxRate: '',
        status: '',
        createDate: "",
        updateDate: "",
        remark: "'",
        productIntroduction: "",
        servicePaymentMethod: "",
        interestStartTime: "",
        productType: '',
        repayMethod: ""
      },
    ],
    product: {//编辑使用，公司信息数据
      name: "",
      number: "",
      minTerm: '',
      maxTerm: '',
      minAmount: '',
      maxAmount: '',
      minRate: '',
      maxRate: '',
      status: '',
      comments: ''
    },
    group: [//表单配置
      {
        groupSeq: 1,
        groupName: "",//分组名称
        groupShow: 0,//是否分页显示此分组
        formControlList: [
          {
            id: "",
            createDate: "",
            updateDate: "",
            formId: "",
            groupName: "",
            groupSeq: 1,
            groupShow: 0,
            controlName: "",//字段名称
            controlKey: "",//业务主键
            controlSeq: 1,
            type: "",//字段类型
            dataSource: "",//数据源
            placeInfo: "",//提示信息
            require: 1,//是否必填
            dataSourceName: "",
            typeName: ""
          }
        ]
      },
    ],
    // applyCondition: [//申请条件
    //   {
    //     code: "whiteListCheck",
    //     name: "是否仅白名单用户可申请",
    //     checked: 0
    //   },
    //   {
    //     code: "unsettledContinueApply",
    //     name: "允许有未结清贷款时继续申请",
    //     checked: 0
    //   },
    //   {
    //     code: "amountCheck",
    //     name: "校验企业平台贷款金额是否超过100万",
    //     checked: 0
    //   }
    // ]
  }
  toast = {
    "position": 'center-center',
    "title": '提示',
    "msg": '',
    "showClose": true,
    "theme": 'material',
    "type": 'success',
    "closeOther": false
  };
  constructor(
    private http: HttpService,
    private dateTransform: DateTransformService,
    private router: Router,
    private route: ActivatedRoute,
    private toastyService: ToastyService,
  ) { }
  checkchange(list, key, e) {//复选框输出修改
    if (e.target.checked) {
      list[key] = 1
    } else {
      list[key] = 0
    }
  }
  getinfor() {//查询公司信息
    this.http.getCustomHeaders(
      '/v1/app/back/products'
    ).subscribe(res => {
      this.data.infor = res.result;
    })
  }
  addone(type, list) {//添加一项
    let item = {}
    if (type == 'group') {
      item = {
        groupName: "",
        groupShow: 0,
        formControlList: [
          {
            controlName: '',
            controlKey: '',
            type: '',
            dataSource: '',
            placeInfo: '',
            require: 1
          },
        ]
      }
    } else {
      item = {
        controlName: '',
        controlKey: '',
        type: '',
        dataSource: '',
        placeInfo: '',
        require: 1
      }
    }
    list.push(item)
  }
  remove(index, list) {//删除一项
    list.splice(index, 1);
  }
  moveup(index, list) {//上移
    if (index <= 0) {
      console.log('已经是第一项，无法上移')
    } else {
      list.splice(index - 1, 0, list[index]);
      this.remove(index + 1, list);//删除掉原来那项
    }
  }
  movedown(index, list) {//下移
    if (index >= list.length) {
      console.log('已经是最后一项，无法下移')
    } else {
      list.splice(index + 2, 0, list[index]);
      this.remove(index, list);//删除掉原来那项
    }
  }
  back() {
    history.back();
  }
  checkrequired() {//必填校验
    let notfill = false;
    for (let i = 0; i < this.data.group.length; i++) {
      if(this.data.infor.length<=0){
        this.toast.msg = `请绑定产品`;
        this.toast.type = "error";
        this.addToast(this.toast);
        notfill = true;
      }
      if (this.data.group[i].groupName) {
      } else {
        this.toast.msg = `第${i + 1}组未填写分组名称`;
        this.toast.type = "error";
        this.addToast(this.toast);
        notfill = true;
      }
      for (let j = 0; j < this.data.group[i].formControlList.length; j++) {
        if (this.data.group[i].formControlList[j].controlName) {
        } else {
          this.toast.msg = `第${i + 1}组第${j + 1}项未填写字段名称`;
          this.toast.type = "error";
          this.addToast(this.toast);
          notfill = true;
        }
        if (this.data.group[i].formControlList[j].controlKey) {
        } else {
          this.toast.msg = `第${i + 1}组第${j + 1}项未填写业务主键`;
          this.toast.type = "error";
          this.addToast(this.toast);
          notfill = true;
        }
        if (this.data.group[i].formControlList[j].type) {
        } else {
          this.toast.msg = `第${i + 1}组第${j + 1}项未选择字段类型`;
          this.toast.type = "error";
          this.addToast(this.toast);
          notfill = true;
        }
        if (this.data.group[i].formControlList[j].type == 'select' || this.data.group[i].formControlList[j].type == 'multipleSelect') {
          if (this.data.group[i].formControlList[j].dataSource) {
          } else {
            this.toast.msg = `第${i + 1}组第${j + 1}项未选择数据源`;
            this.toast.type = "error";
            this.addToast(this.toast);
            notfill = true;
          }
        }
      }
    }
    return notfill
  }
  submit() {//将数组格式转化
    let form = {
      productId: '',//产品id
      number: '',
      operator: this.data.account,//操作人
      formControlList: [],
      // applyCondition: [],
    }
    if (this.data.id == 'new') {//新建使用，页面选择的产品数据
      form.productId = this.data.infor[this.data.index].id;
      form.number = this.data.infor[this.data.index].number;
    } else {//编辑使用，后台传入的产品数据
      form.productId = this.data.id;
      form.number = this.data.product.number;
    }
    // for (let i = 0; i < this.data.applyCondition.length; i++) {//applyCondition的数据修改
    //   if (this.data.applyCondition[i].checked == 1) {
    //     form.applyCondition.push(this.data.applyCondition[i].code)
    //   }
    // }
    for (let i = 0; i < this.data.group.length; i++) {//formControlList的数据修改
      for (let j = 0; j < this.data.group[i].formControlList.length; j++) {
        let data = {
          groupName: this.data.group[i]['groupName'],
          groupSeq: i,
          groupShow: this.data.group[i]['groupShow'],
          controlKey: this.data.group[i].formControlList[j]['controlKey'],
          controlName: this.data.group[i].formControlList[j]['controlName'],
          controlSeq: j,
          require: this.data.group[i].formControlList[j]['require'],
          type: this.data.group[i].formControlList[j]['type'],
          dataSource: this.data.group[i].formControlList[j]['dataSource'],
          placeInfo: this.data.group[i].formControlList[j]['placeInfo'],
        }
        form.formControlList.push(data);
      }
    }
    // console.log(form)
    return form
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
  submitnew() {//点击发布产品的提交按钮
    // console.log('新建')
    let notfill = this.checkrequired()
    if (notfill) {//输出为真则无法提交
      console.log('部分必填项未填写无法提交')
    } else {//所有必填项已填写。向后台提交请求
      let data = this.submit();
      this.http.postCustomHeaders(
        '/v1/app/back/product',
        data
      ).subscribe(res => {
        if (res.code == '200') {
          this.toast.msg = "发布成功";
          this.toast.type = "success";
          this.addToast(this.toast);
          this.router.navigate(['/app/business/publishproduct']);
        } else {
          this.toast.msg = '发布失败，' + res.reason;
          this.toast.type = "error";
          this.addToast(this.toast);
        }
      })
    }

  }
  submitid() {//点击编辑产品的提交按钮
    // console.log('编辑')
    let notfill = this.checkrequired()
    if (notfill) {//输出为真则无法提交
    } else {//所有必填项已填写。向后台提交请求
      let data = this.submit();
      this.http.putCustomHeaders(
        '/v1/app/back/products/' + this.data.id,
        data
      ).subscribe(res => {
        if (res.code == '200') {
          this.toast.msg = "编辑成功";
          this.toast.type = "success";
          this.addToast(this.toast);
          this.router.navigate(['/app/business/publishproduct']);
        } else {
          this.toast.msg = '编辑失败，' + res.reason;
          this.toast.type = "error";
          this.addToast(this.toast);
        }
      })
    }
  }
  //生命周期函数
  ngOnInit() {
    let that = this;
    that.data.account = localStorage.getItem("accountw");//获取操作员账号
    that.route.params.subscribe(function (data) {
      that.data.id = data.id
      if (data.id == 'new') {
        console.log('新建产品')
        that.data.url = ['业务管理', '产品发布管理', '发布产品'],
          that.getinfor()
      } else {
        console.log('编辑产品')
        that.data.url = ['业务管理', '产品发布管理', '编辑产品'],
          that.http.getCustomHeaders(
            '/v1/app/back/products/' + that.data.id
          ).subscribe(res => {
            that.data.product = res.result.product;
            // that.data.infor=res.result.product;
            that.data.group = res.result.group;
            // that.data.applyCondition = res.result.applyCondition
          })
      }
    })
    that.http.getCustomHeaders3(
      'peak-resource/v1/resource/dictionaryItem/guestApplyControlType'
    ).subscribe(res => {
      that.type = res
    })
    that.http.getCustomHeaders3(
      'peak-resource/v1/resource/dictionaries'
    ).subscribe(res => {
      that.dataSource = res
    })
  }

}
