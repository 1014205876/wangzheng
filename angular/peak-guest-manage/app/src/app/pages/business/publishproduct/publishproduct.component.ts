import { DateTransformService } from './../../../shared/service/date-transform.service';
import { HttpService } from './../../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-publishproduct',
  templateUrl: './publishproduct.component.html',
  styleUrls: ['./publishproduct.component.less']
})
export class PublishproductComponent implements OnInit {
  data = {
    id:'',//下架时的id
    mengbanshow: false,//控制弹窗蒙版的显示隐藏
    saleshow: false,//控制form弹窗的显示隐藏
    find: {
      number: '',//产品编号
      status: '',//状态
      pageNum: 1,//当前页码数
      pages: 2,//页码总数
    },
    table: [//表格的数据
      {
        productId: '产品id',
        productName: '产品名称',
        number: '产品编号',
        productType: '类型',
        status: '状态,0禁用，1启用',
        updateDate: '更新时间',
      }
    ],
  }
  constructor(
    private http: HttpService,
    private dateTransform: DateTransformService,
    private route: ActivatedRoute,
    private toastyService: ToastyService,
  ) { }
  toast = {
    "position": 'center-center',
    "title": '提示',
    "msg": '',
    "showClose": true,
    "theme": 'material',
    "type": 'success',
    "closeOther": false
  };

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
  reset() {//重置按钮
    this.data.find.number = '';
    this.data.find.status = '';
  }
  changePage(e) {//切换页码
    this.gettable(e, this.data.find);
  }
  gettable(pageNum, find) {//查询配置项
    this.http.getCustomHeaders(
      '/v1/app/back/productsDataGrid?number=' + find.number +
      '&status=' + find.status +
      '&pageNum=' + pageNum +
      '&pageSize=' + 10
    ).subscribe(res => {
      this.data.table = res.data.list
      this.data.find.pageNum = res.data.pageNum
      this.data.find.pages = res.data.pages
    })
  }
  saleshow(list){
    this.data.mengbanshow = true;
    this.data.saleshow = true;
    this.data.id = list.productId
  }
  fromsale() {//下架
    let that=this;
    this.hidden()
    this.http.patchCustomHeaders(
      '/v1/app/back/products/' + that.data.id,//调试7300接口
      {
        id: that.data.id,
        status: 3,
        comments: '',
      }
    ).subscribe(res => {
      if (res.code == '200') {
        this.toast.msg = "下架成功";
        this.toast.type = "success";
        this.addToast(this.toast);
      } else {
        this.toast.msg = '下架失败，' + res.reason;
        this.toast.type = "error";
        this.addToast(this.toast);
      }
      this.gettable(this.data.find.pageNum, this.data.find)
    })
  }
  hidden() {//点击取消按钮，关闭所有弹窗
    this.data.mengbanshow = false;
    this.data.saleshow = false;
  }
  //生命周期函数
  ngOnInit() {
    this.gettable(this.data.find.pageNum, this.data.find)
  }

}
