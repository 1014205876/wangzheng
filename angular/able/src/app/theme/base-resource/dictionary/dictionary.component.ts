
import { Http } from '@angular/http';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: [
    '../../../../assets/icon/menu/iconfont.css',
    '../../../../assets/icon/operate/iconfont.css',
    './dictionary.component.scss'
  ]
})
export class DictionaryComponent implements OnInit {

  public items;
  public modalItems;

  public total;
  public totalPage;
  public pageNum;
  

  public modalTitle: String;
  public modalStatus;

  public addNewStatus: Number;
  addForm: FormGroup;
  submitted: boolean;

  rows = []
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
    this.items = new Items();
    this.modalItems = new Items();

    // 初始化状态
    this.addNewStatus = 1;

    const code = new FormControl();
    const name = new FormControl();
    const parentId = new FormControl();
    const remark = new FormControl();
    const status = new FormControl();
    const sort = new FormControl();

    this.addForm = new FormGroup ({
      code: code,
      name: name,
      parentId: parentId,
      remark: remark,
      sort: sort,
      status: status
    })
  }

  ngOnInit() {
    this.items.status = "";
    this.modalItems.status = 1;
    this.search(1,'');
  }

  search(e,type) {
    if(!type){
      this.items = new Items();
      this.items.status = "";
    }
    this.http.getCustomHeaders(
      "v1/resource/dictionary?name="
      +(this.items.name?encodeURIComponent(this.items.name):'')
      +"&code="+(this.items.code?encodeURIComponent(this.items.code):'')
      +"&status="+(this.items.status?this.items.status:'')
      +"&pageNum="+e+"&pageSize="+10
    ).subscribe(res => {
      this.rows = res.result.list;
      this.pageNum = res.result.pageNum;
      this.total = res.result.total;
      this.totalPage = res.result.pages;
    })
  }

  changeTitle(title, status, row) {
    if (status === 'add') {
      this.addNewStatus = 1;
    } else {
      this.addNewStatus = row.status;
    }
    this.modalTitle = title;
    this.modalStatus = status;
  }
  modify(row) {
    this.modalItems.name = row.name;
    this.modalItems.code = row.code;
    this.modalItems.remark = row.remark;
    this.modalItems.status = row.status;
    this.modalItems.id = row.id;
  }
  itemDetail(row) {
  }

  switchange(row){
    var status = {"status": null};
    if(row.status == 0) {
      status.status=1;
    }else if (row.status == 1) {
      status.status=0;
    }
    this.http.patchCustomHeaders("v1/resource/dictionary/"+row.id, status)
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
    })
  }

  onSubmit() {
    this.submitted = true;
    this.modalItems.status = this.addNewStatus;
    if(this.modalStatus == 'add') {
      this.http.postCustomHeaders("v1/resource/dictionary", this.modalItems)
      .subscribe(res => {
        let code = res.code;
        if(code == '200') {
          this.toast.msg = "成功";
          this.toast.type = "success";
          this.addToast(this.toast);
          this.search(1,'');
        }else {
          this.toast.msg = res.reason;
          this.toast.type = "error";
          this.addToast(this.toast);
        }
      })
    }else if(this.modalStatus == 'edit') {
      this.modalItems.status = this.addNewStatus;
      this.http.putCustomHeaders("v1/resource/dictionary/"+this.modalItems.id, this.modalItems)
      .subscribe(res => {
        let code = res.code;
        if(code == '200') {
          this.toast.msg = "成功";
          this.toast.type = "success";
          this.addToast(this.toast);
          this.search(1,'');
        }else {
          this.toast.msg = res.reason;
          this.toast.type = "error";
          this.addToast(this.toast);
        }
      })
    }
    this.addForm.reset();
    this.modalItems = new Items();
    this.modalItems.status = 1;
  }

  addToast(options) {
    console.log(options)
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

  reset(){
    this.items = new Items();
    this.items.status = '';
  }

  changePage(e) {
    console.log(e)
    this.search(e,'');
  }

}
class Items {
  constructor(
    public name?: String,
    public status?: any,
    public code?: String,
    public parentId?: String,
    public remark?: String,
    public sort?: String,
    public id?: String
  ){}
}
