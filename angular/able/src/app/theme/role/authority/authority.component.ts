
import { Component, OnInit } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { ModalBasicComponent } from './../../../shared/modal-basic/modal-basic.component';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: [
    '../../../../assets/icon/menu/iconfont.css',
    '../../../../assets/icon/operate/iconfont.css',
    './authority.component.scss'
  ]
})
export class AuthorityComponent implements OnInit {

  rows = [];
  appLists = []
  appId;
  addForm: FormGroup;
  menuUrlActive=false;

  public items;
  public modalTitle: String;
  public modalStatus: String;

  public total;
  public totalPage;
  public pageNum;

  public parentAuth = [];

  // 权限状态
  public permissionStatus: Number;

  // 权限类型
  public permissionType: Number;

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
    this.permissionStatus = 1;
    this.permissionType = 1;
  }

  ngOnInit() {
    this.getApp();
    this.formInit();
    this.items.status = 1;
    this.items.type = 1;
  }
  formInit() {
    this.addForm = new FormGroup({
      appId: new FormControl(),
      appName: new FormControl(),
      name: new FormControl(),
      sort: new FormControl('', Validators.pattern(/^[1-9]\d{0,1}$/)),
      type: new FormControl(),
      menuUrl: new FormControl(),
      resourceName: new FormControl(),
      status: new FormControl(),
      parentId: new FormControl()
    })
  }
  // typeChange(){
  //   if(this.permissionType==2){
  //     this.addForm.controls.menuUrl.setValidators(Validators.required)
  //   }
  // }
  getApp() {
    this.http.getCustomHeaders("v1/resource/app").subscribe(res => {
      this.appLists = res.result;
      if ((this.appLists.length > 0) && (!this.appId)) {
        // this.appId = '97a78cc5-2e92-42b8-9a7a-de4a6ad5a3b8';
        this.appId = this.appLists[0].appId;
      }
      if (this.appId) {
        this.search(this.appId);
        this.parentAuth = this.rows;
      }
    })
  }
  search(e) {
    this.http.getCustomHeaders("v1/resource/permission?appId=" + e).subscribe(res => {
      this.rows=[];
      this.rows = res.result;
    })
  }

  addPermission(e) {
    this.http.getCustomHeaders("v1/resource/permission/status?appId=" + e).subscribe(res => {
      this.parentAuth = res.result;
    })
  }

  getParent(appId) {
    this.addPermission(appId);
    // this.parentAuth = this.rows;
  }
  changeTitle(title, status) {
    this.items.status = 1;
    this.items.type = 1;
    this.modalTitle = title;
    this.modalStatus = status;
    if (status == 'add') {
      this.items.parentId = ' ';
    }
  }
  add() {
    // 设置状态
    this.permissionStatus = 1;

    // 设置类型
    this.permissionType = 1;
    this.items.appId = this.appId;
    this.getParent(this.appId);
    this.items.parentId = '';
  }
  addChild(value) {
    // 设置状态
    this.permissionStatus = 1;

    // 设置类型
    this.permissionType = 1;
    this.items.appId = value.appId;
    this.items.appName = value.appName;
    this.items.code = value.code;
    this.items.type = 1;
    this.items.status = 1;
    this.items.authId = value.id;
    if (value) {
      if ((value.status == 0) || (value.stauts == '0')) {
        this.toast.msg = "该权限已被禁用，此操作不可用";
        this.toast.type = "warning";
        this.addToast(this.toast);
      } else {
        this.items.parentId = value.id;
        this.items.deep = value.deep;
        this.items.parentName = value.name;
      }
    }
  }
  modify(value) {
    if (value) {
      this.permissionStatus = value.status;
      // 设置类型
      this.permissionType = value.type;
      this.setValue(value);
      this.http.getCustomHeaders("v1/resource/permission/edit?appId=" + this.appId + "&id=" + value.id)
        .subscribe(res => {
          this.parentAuth = res.result;
          if (value.parentId) {
            this.items.parentId = value.parentId;
          } else {
            this.items.parentId = '';
          }
        })
    }
  }
  setValue(value) {
    this.items.appId = value.appId;
    this.items.appName = value.appName;
    this.items.code = value.code;
    this.items.name = value.name;
    this.items.type = value.type;
    this.items.sort = value.sort;
    this.items.status = value.status;
    this.items.menuUrl = value.menuUrl;
    this.items.resourceName = value.resourceName;
    this.items.authId = value.id;
  }
  menuUrlBlur(){
    this.menuUrlActive=true;
  }
  onSubmit() {
    for (var i = 0; i < this.appLists.length; i++) {
      if (this.items.appId == this.appLists[i].appId) {
        this.items.appName = this.appLists[i].appName
      }
    }
    if (!this.items.appId || !this.items.parentId || !this.items.code) {
      this.items.appId = (this.items.appId ? this.items.appId : '');
      this.items.parentId = (this.items.parentId ? this.items.parentId : '');
      this.items.code = (this.items.code ? this.items.code : '');
    }
    if (this.permissionType != 2) {
      this.items.menuUrl = '';
    }
    if (this.modalStatus != 'edit') {
      // console.log(this.permissionType);
      // console.log(this.items);
      // 将状态设置到对象中
      this.items.status = this.permissionStatus;
      this.items.type = this.permissionType;
      this.http.postCustomHeaders("v1/resource/permission", this.items)
        .subscribe(res => {
          this.search(this.items.appId)
          if (res.code == "200") {
            this.toast.msg = "成功";
            this.toast.type = "success";
            this.addToast(this.toast);
          }
          if (res.code != "200") {
            this.toast.msg = res.reason;
            this.toast.type = "error";
            this.addToast(this.toast);
          }
          this.rows = [];
          this.getApp();
          this.items = new Items();
          this.addForm.reset();
          this.items.status = 1;
          this.items.type = 1;
        })
    } else if (this.modalStatus == 'edit') {
      // 将状态设置到对象中
      this.items.status = this.permissionStatus;
      this.items.type = this.permissionType;
      this.http.putCustomHeaders("v1/resource/permission/" + this.items.authId, this.items)
        .subscribe(res => {
          if (res.code == "200") {
            this.toast.msg = "成功";
            this.toast.type = "success";
            this.addToast(this.toast);
          } else {
            this.toast.msg = res.reason;
            this.toast.type = "error";
            this.addToast(this.toast);
          }
          this.search(this.items.appId);
          this.addForm.reset();
          this.items = new Items();
          this.items.status = 1;
          this.items.type = 1;
        });
    }
  }

  switchange(row) {
    // console.log(row.id)
    var status = { "status": null };
    if (row.status == 0) {
      status.status = 1;
    } else if (row.status == 1) {
      status.status = 0;
    }
    this.http.patchCustomHeaders("/v1/resource/permission/" + row.id, status)
      .subscribe(res => {
        // console.log(res)
        if (res.code == '200') {
          this.toast.msg = '状态修改成功';
          this.toast.type = 'success';
          this.addToast(this.toast);
        } else {
          this.toast.msg = res.reason;
          this.toast.type = 'error';
          this.addToast(this.toast);
        }
        this.rows = []
        this.getApp()
      })
  }

  // toast提示
  addToast(options) {
    console.log(options)
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
class Items {
  constructor(
    public appId?: String,
    public appName?: String,
    public name?: String,
    public sort?: Number,
    public type?: Number,
    public menuUrl?: String,
    public resourceName?: String,
    public parentId?: String,
    public code?: String,
    public authId?: String,
    public status?: Number
  ) { }
}