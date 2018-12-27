import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: [
    '../../../../assets/icon/menu/iconfont.css',
    '../../../../assets/icon/operate/iconfont.css',
    './department.component.scss'
  ]
})
export class DepartmentComponent implements OnInit {

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

  public total;

  public items;
  public modalTitle: String;
  public modalStatus: String;
  public department;
  public departmentEdit;
  public dbDepartment;

  addForm: FormGroup;
  submitted: boolean;
  public mask: boolean;

  constructor(
    private http: HttpServe,
    private toastyService: ToastyService
  ) {

    this.items = new Items();

    const parentId = new FormControl();
    const fullName = new FormControl();
    const shortName = new FormControl();
    const sort = new FormControl('', Validators.pattern(/^[1-9]\d{0,1}$/));
    const remark = new FormControl();
    const status = new FormControl();
    const code = new FormControl();

    this.addForm = new FormGroup({
      parentId: parentId,
      fullName: fullName,
      shortName: shortName,
      sort: sort,
      remark: remark,
      status: status,
      code: code
    })
  }

  ngOnInit() {
    this.items.parentId = "";
    this.mask = true;
    this.load();
  }

  load() {
    this.http.getCustomHeaders('v1/resource/department')
      .subscribe(res => {
        this.rows = res.result;
        this.total = res.result.length;
      })
  }

  getDepartment() {
    this.http.getCustomHeaders('v1/resource/department/status')
      .subscribe(res => {
        this.department = res.result;
      })
  }

  getDepartmentEdit(id) {
    this.http.getCustomHeaders('v1/resource/department/edit?id=' + id)
      .subscribe(res => {
        this.departmentEdit = res.result;
      })
  }

  changeTitle(title, status) {
    this.modalTitle = title;
    this.modalStatus = status;
  }

  setValue(value) {
    this.items.id = value.id;
    this.items.parentId = value.parentId;
    this.items.fullName = value.fullName;
    this.items.shortName = value.shortName;
    this.items.sort = value.sort;
    this.items.remark = value.remark;
    this.items.status = value.status;
    this.items.code = value.code;
  }

  add(row) {
    this.items.status = 1;
    if (row) {
      if (row.status == 0) {
        this.mask = false;
        this.toast.msg = "该部门已被禁用，此操作不可用";
        this.toast.type = "warning";
        this.addToast(this.toast);
      } else {
        this.mask = true;
        this.items.parentId = row.id;
        this.items.parentName = row.fullName;
        this.items.level = row.level;
      }
    } else {
      this.items.parentId = '';
    }
  }

  modify(row) {

    if (row.parentId == null) {
      row.parentId = '';
    }
    this.mask = true;
    this.setValue(row);
  }

  switchange(row) {
    // console.log(row.id)
    var status = { "status": null };
    if (row.status == 0) {
      status.status = 1;
    } else if (row.status == 1) {
      status.status = 0;
    }
    this.http.patchCustomHeaders("/v1/resource/department/" + row.id, status)
      .subscribe(res => {
        if (res.code == '200') {
          this.toast.msg = '状态修改成功';
          this.toast.type = 'success';
          this.addToast(this.toast);
        } else {
          this.toast.msg = res.reason;
          this.toast.type = 'error';
          this.addToast(this.toast);
        }
        this.rows = [];
        this.load();
      })

  }

  onSubmit() {
    this.submitted = true;
    if (this.modalStatus == 'edit') {
      this.dbDepartment = this.departmentEdit;
    } else {
      this.dbDepartment = this.department;
    }
    for (let i = 0; i < this.dbDepartment.length; i++) {
      if (this.dbDepartment[i].id == this.items.parentId) {
        this.items.code = (this.dbDepartment[i].code);
      }
    }
    if (this.modalStatus == 'edit') {
      this.http.putCustomHeaders("v1/resource/department/" + this.items.id, this.items)
        .subscribe(res => {
          let code = res.code;
          if (code == '200') {
            this.toast.msg = "成功";
            this.toast.type = "success";
            this.addToast(this.toast);
          } else {
            this.toast.msg = res.reason;
            this.toast.type = "error";
            this.addToast(this.toast);
          }
          this.rows = [];
          this.load();
          this.addForm.reset();
        })
    } else {
      this.http.postCustomHeaders("v1/resource/department", this.items)
        .subscribe(res => {
          let code = res.code;
          if (code == '200') {
            this.toast.msg = "成功";
            this.toast.type = "success";
            this.addForm.reset();
            this.addToast(this.toast);
          } else {
            this.toast.msg = res.reason;
            this.toast.type = "error";
            this.addToast(this.toast);
          }
          this.rows = [];
          this.load();
        })
    }
  }

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
    public id?: String,
    public parentId?: String,
    public parentName?: String,
    public fullName?: String,
    public shortName?: String,
    public sort?: Number,
    public remark?: String,
    public status?: any,
    public code?: String,
    public level?: String
  ) { }
}