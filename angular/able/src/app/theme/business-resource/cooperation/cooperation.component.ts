import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-cooperation',
  templateUrl: './cooperation.component.html',
  styleUrls: [
    '../../../../assets/icon/menu/iconfont.css',
    '../../../../assets/icon/operate/iconfont.css',
    './cooperation.component.scss'
  ]
})
export class CooperationComponent implements OnInit {

  public searchItems = { "name": "", "code": "", "typeValue": "", "typeName": "" };
  modalItems;
  modal = {
    title: '',
    type: ''
  }

  public rows = [];
  public total;
  public totalPage;
  public pageNum;

  public cooperationStatus: Number;

  // public modalTitle: String;
  // public modalStatus;

  addForm: FormGroup;
  institutions = [];


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

    this.modalItems = new Items();
    this.cooperationStatus = 1;

    this.addForm = new FormGroup({
      name: new FormControl(),
      shortName: new FormControl(),
      code: new FormControl(),
      principal: new FormControl(),
      mobile: new FormControl('', Validators.pattern(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/)),
      status: new FormControl(),
      typeValue: new FormControl(),
      remark: new FormControl()
    })
  }

  ngOnInit() {
    this.search(1, '');
    this.searchItems.typeValue = '';
    this.getInstitutions();
  }

  search(e, type) {
    if (!type) {
      this.modalItems = new Items();
    }
    this.http.getCustomHeaders("v1/resource/institutions/dataGrid?name="
      + (this.searchItems.name ? encodeURIComponent(this.searchItems.name) : '')
      + "&code=" + (this.searchItems.code ? encodeURIComponent(this.searchItems.code) : '')
      + "&typeValue=" + (this.searchItems.typeValue ? this.searchItems.typeValue : '')
      + "&pageNum=" + e + "&pageSize=10").subscribe(res => {
        this.rows = res.result.list;
        this.total = res.result.total;
        this.totalPage = res.result.pages;
        this.pageNum = res.result.pageNum;
      })
  }
  reset() {
    this.searchItems.name = '';
    this.searchItems.code = '';
    this.searchItems.typeValue = '';
  }
  changeTitle(title, type) {
    this.modal.title = title;
    this.modal.type = type;
  }
  add() {
    this.cooperationStatus = 1;
    this.modalItems.status = 1;
    if (!this.modalItems.typeValue) {
      this.modalItems.typeValue = '';
    }
  }
  modify(value) {
    this.setValue(value);
  }
  setValue(value) {
    this.modalItems.name = value.name;
    this.modalItems.shortName = value.shortName;
    this.modalItems.code = value.code;
    this.modalItems.principal = value.principal;
    this.modalItems.mobile = value.mobile;
    this.modalItems.status = value.status;
    this.modalItems.remark = value.remark;
    this.modalItems.id = value.id;
    this.modalItems.typeValue = value.typeValue;
    this.cooperationStatus = value.status;
  }
  clearValue() {
    this.modalItems = new Items();
    this.modalItems.status = 1;
  }
  onSubmit() {
    this.institutions = [{ "typeValue": "SocialOrganization", "typeName": "社会组织" },
    { "typeValue": "StateAgency", "typeName": "国家机关" },
    { "typeValue": "BusinessEnterprise", "typeName": "工商企业" },
    { "typeValue": "PublicInstitution", "typeName": "事业单位" }];
    for (var i = 0; i < this.institutions.length; i++) {
      if (this.institutions[i].typeValue == this.modalItems.typeValue) {
        this.modalItems.typeName = this.institutions[i].typeName;
      }
    }
    this.modalItems.status = this.cooperationStatus;
    if (this.modal.type == 'add') {
      this.http.postCustomHeaders("v1/resource/institution", this.modalItems)
        .subscribe(res => {
          if (res.code == '200') {
            this.toast.msg = '添加成功！';
            this.toast.type = 'success';
            this.addToast(this.toast);
            this.search(1, '')
            this.addForm.reset();
            this.clearValue();
          } else {
            this.toast.msg = res.reason;
            this.toast.type = 'error';
            this.addToast(this.toast);
          }
        })
    }
    else if (this.modal.type == 'edit') {
      this.http.putCustomHeaders("v1/resource/institutions/" + this.modalItems.id, this.modalItems)
        .subscribe(res => {
          // console.log(res)
          if (res.code == '200') {
            this.toast.msg = '修改成功！';
            this.toast.type = 'success';
            this.addToast(this.toast);
            this.search(1, '');
          } else {
            this.toast.msg = res.reason;
            this.toast.type = 'error';
            this.addToast(this.toast);
          }
        })
    }
  }

  getInstitutions() {
    this.http.getCustomHeaders("v1/resource/institutions")
      .subscribe(res => {
        this.institutions = res.result;
        console.log(this.institutions)
      })
  }

  switchange(row) {
    // console.log(row.id)
    var status = { "status": 0 };
    if (row.status == 0) {
      status.status = 1;
    } else if (row.status == 1) {
      status.status = 0;
    }
    this.http.patchCustomHeaders("/v1/resource/institutions/" + row.id, status)
      .subscribe(res => {
        console.log(res)
        if (res.code == '200') {
          this.toast.msg = "状态修改成功";
          this.toast.type = "success";
          this.addToast(this.toast);
        }
        this.rows = [];
        this.search(1, '');
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
    this.search(e, '');
  }
}
class Items {
  constructor(
    public name?: string,
    public shortName?: string,
    public code?: string,
    public principal?: string,
    public mobile?: string,
    public typeValue?: string,
    public typeName?: string,
    public remark?: string,
    public status?: any,
    public id?: string
  ) { }
}