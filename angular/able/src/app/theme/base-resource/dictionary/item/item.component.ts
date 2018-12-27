import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../../layout/service/http-serve.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [
    '../../../../../assets/icon/menu/iconfont.css',
    '../../../../../assets/icon/operate/iconfont.css',
    './item.component.scss'
  ]
})
export class ItemComponent implements OnInit {

  public code;
  public id;
  public items;
  public modalItems;

  public total;
  public totalPage;
  public pageNum;

  public addNewItemStataus;

  public modalTitle: String;
  public modalStatus;
  addForm: FormGroup;
  submitted: boolean;

  rows = [];
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
    public router: Router,
    public route: ActivatedRoute,
    private http: HttpServe,
    private toastyService: ToastyService
  ) {
    this.items = new Items();
    this.modalItems = new Items();
    this.addNewItemStataus = 1;

    this.addForm = new FormGroup ({
      code: new FormControl(),
      name: new FormControl(),
      sort: new FormControl('',Validators.pattern(/^[1-9]\d*$/)),
      status: new FormControl(),
      remark: new FormControl()
    })
  }

  ngOnInit() {
    this.code = this.route.snapshot.queryParams["code"];
    this.id = this.route.snapshot.queryParams["id"];
    this.items.status = "";
    this.modalItems.status = 1;
    this.search(1,'');
  }

  switchange(row){
    var status = {"status": null};
    if(row.status == 0) {
      status.status=1;
    }else if (row.status == 1) {
      status.status=0;
    }
    this.http.patchCustomHeaders("/v1/resource/dictionary/"+row.id, status)
    .subscribe( res => {
      // console.log(res);
      if(res.code=='200'){
        this.toast.msg = '状态修改成功';
        this.toast.type = 'success';
        this.addToast(this.toast);
      }else {
        this.toast.msg = res.reason;
        this.toast.type = 'error';
        this.addToast(this.toast);
      }
      this.rows=[];
      this.search(1,'');
      status.status = null;
    })
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

  changeTitle(title,status,row) {
    if(status === 'add'){
      this.addNewItemStataus = 1;
    } else{
      this.addNewItemStataus = row.status;
    }
    
    this.modalItems.status = 1;
    this.modalTitle = title;
    this.modalStatus = status;
  }

  modify(row) {
    this.modalItems.name = row.name;
    this.modalItems.code = row.code;
    this.modalItems.remark = row.remark;
    this.modalItems.status = row.status;
    this.modalItems.id = row.id;
    this.modalItems.sort = row.sort;
  }

  search(e,type) {
    if(!type){
      this.items = new Items();
      this.items.status = "";
    }
    this.http.getCustomHeaders(
      "v1/resource/dictionary/item/"+this.id
      +"?&name="+(this.items.name?encodeURIComponent(this.items.name):'')
      +"&status="+(this.items.status?this.items.status:'')
      +"&pageNum="+e+"&pageSize="+10
    ).subscribe(res => {
      console.log(res)
      this.rows = res.result.list;
      this.pageNum = res.result.pageNum;
      this.total = res.result.total;
      this.totalPage = res.result.pages;
    })
  }

  reset(){
    this.items = {};
    this.items.status = "";
  }

  onSubmit() {
    this.modalItems.parentId = this.id;
    this.modalItems.status = this.addNewItemStataus;
    if(this.modalStatus == 'add') {
      this.http.postCustomHeaders("v1/resource/dictionary",this.modalItems)
      .subscribe(res => {
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
        this.rows=[]
        this.search(1,'');
        this.addForm.reset();
        this.modalItems = new Items();
        this.modalItems.status = 1;
      })
    }else if (this.modalStatus == 'edit') {
      this.http.putCustomHeaders("v1/resource/dictionary/"+this.modalItems.id,this.modalItems)
      .subscribe(res => {
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
        this.rows=[]
        this.search(1,'');
        this.addForm.reset();
        this.modalItems = new Items();
        this.modalItems.status = 1;
      })
    }
  }
  changePage(e) {
    console.log(e)
    this.search(e,'');
  }

}

class Items {
  constructor(
    public id?: String,
    public name?: String,
    public status?: any,
    public code?: String,
    public parentId?: String,
    public parentName?: String,
    public sort?: String,
    public remark?: String,
    public updateDate?: String
  ){}
}
