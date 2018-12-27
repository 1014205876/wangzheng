

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
// import resource from './../../shared/menu-items/resource';
import { HttpServe } from './../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: [
    './../../../assets/icon/menu/iconfont.css',
    './../../../assets/icon/operate/iconfont.css',
    './application.component.scss'
  ]
})
export class ApplicationComponent implements OnInit {

  public searchItems;
  public modalItems;
  public modalStatus: String;

  public total;
  public totalPage;
  public pageNum;

  addForm: FormGroup;
  public modalTitle: String;
  public authActive: boolean;

  rows = [];
  // public resourceSearch = false;
  // public resourceAdd = false;

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
  ) {
    this.searchItems = new Items();
    this.modalItems = new Items();
    this.searchItems.status = '';

    this.addForm = new FormGroup ({
      appName: new FormControl(),
      appAddress: new FormControl('', Validators.pattern(/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/)),
      remark: new FormControl(),
      status: new FormControl()
    })

  }

  ngOnInit() {
    this.search(1,'');
  }

  search(e,type){
    if(!type){
      this.searchItems = new Items();
      this.searchItems.status = '';
    }
    this.http.getCustomHeaders(
      "v1/resource/appGrid?appName="
      +(this.searchItems.appName?encodeURIComponent(this.searchItems.appName):'')
      +"&appId="+(this.searchItems.appId?encodeURIComponent(this.searchItems.appId):'')
      +"&status="+(this.searchItems.status?this.searchItems.status:'')
      +"&pageNum="+e
      +"&pageSize="+10
    ).subscribe(res => {
      this.rows = res.result.list;
      this.total = res.result.total;
      this.totalPage = res.result.pages;
      this.pageNum = res.result.pageNum;
    })
  }

  reset(){
    this.searchItems.appName = '';
    this.searchItems.appId = '';
    this.searchItems.status = '';
  }

  changeTitle(title,status) {
    this.modalTitle = title;
    this.modalStatus = status;
  }
  setValue(value) {
    console.log(value)
    this.modalItems.id = value.id;
    this.modalItems.appId = value.appId;
    this.modalItems.appKey = value.appKey;
    this.modalItems.appName = value.appName;
    this.modalItems.status = value.status;
    this.modalItems.appAddress = value.appAddress;
    this.modalItems.remark = value.remark;
  }
  modify(row){
    this.setValue(row);
  }
  add(){
    this.modalItems.status = 1;
  }

  switchange(row){
    var status = {"status": null};
    if(row.status == 0) {
      status.status = 1;
    }else if (row.status == 1) {
      status.status = 0;
    }
    this.http.patchCustomHeaders("v1/resource/app/"+row.id, status)
    .subscribe( res => {
      if(res.code=='200'){
        this.toast.msg = '状态修改成功';
        this.toast.type = 'success';
        this.addToast(this.toast);
      }else {
        this.toast.msg = res.reason;
        this.toast.type = 'error';
        this.addToast(this.toast);
      }
      this.rows=[]
      this.search(1,'');
    })
    
  }

  onSubmit() {
    if(this.modalStatus == "add") {
      this.http.postCustomHeaders("v1/resource/app",this.addForm.value)
      .subscribe( res => {
        let code = res.code;
        if(code == '200') {
          this.toast.msg = "成功";
          this.toast.type = "success";
          this.addToast(this.toast);
        }else {
          this.toast.msg = res.reason;
          this.toast.type = "error";
          this.addToast(this.toast);
        }
        this.rows=[];
        this.search(1,'');
        this.addForm.reset();
      })
    }else if(this.modalStatus == 'edit') {
      this.http.putCustomHeaders("v1/resource/app/"+this.modalItems.id,this.addForm.value)
      .subscribe( res => {
        let code = res.code;
        if(code == '200') {
          this.toast.msg = "成功";
          this.toast.type = "success";
          this.addToast(this.toast);
        }else {
          this.toast.msg = res.reason;
          this.toast.type = "error";
          this.addToast(this.toast);
        }
        this.rows=[];
        this.search(1,'');
      })
    }
  }

  changePage(e) {
    this.search(e,'');
  }

  addToast(options) {
    if(options.closeOther) {
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
class Items {
  constructor(
    public id?: String,
    public appName?: String,
    public appId?: String,
    public status?: any,
    public appAddress?: String,
    public remark?: String
  ){}
}
