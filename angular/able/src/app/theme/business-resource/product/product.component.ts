import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [
    '../../../../assets/icon/menu/iconfont.css',
    '../../../../assets/icon/operate/iconfont.css',
    './product.component.scss'
  ]
})
export class ProductComponent implements OnInit {

  public items={"name": "","number": ""};

  public rows=[];
  public total;
  public totalPage;
  public pageNum;

  public modalTitle: String;
  public modalStatus;

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
    private http: HttpServe,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.search(1,'');
  }

  search(e,type){
    if(!type){
      this.items={"name": "","number": ""};
    }
    this.http.getCustomHeaders("v1/resource/products?name="
      +(this.items.name?encodeURIComponent(this.items.name):'')
      +"&number="+(this.items.number?encodeURIComponent(this.items.number):'')
      +"&pageNum="+e+"&pageSize=10").subscribe(res => {
        this.rows=res.result.list;
        this.total = res.result.total;
        this.totalPage = res.result.pages;
        this.pageNum = res.result.pageNum;
      })
  }
  reset(){
    this.items.name='';
    this.items.number='';
  }

  switchange(row){
    var status = {"status": 0};
    if(row.status == 0) {
      status.status=1;
    }else if (row.status == 1) {
      status.status=0;
    }
    this.http.patchCustomHeaders("v1/resource/products/"+row.id, status)
    .subscribe( res => {
      if(res.code=='200'){
        this.toast.msg = "状态修改成功";
        this.toast.type = "success";
        this.addToast(this.toast);
      }
      this.rows=[];
      this.search(1,'');
    })
  }

  // toast提示
  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.toast.position = options.position ? options.position : this.toast.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: 3000,
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

  changePage(e) {
    this.search(e,'');
  }

}
