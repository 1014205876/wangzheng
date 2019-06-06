import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../shared/service/http-serve/api.service';
import { RegularService } from '../../../../shared/service/regular/regular.service';

@Component({
  selector: 'app-employee-modify',
  templateUrl: './employee-modify.component.html',
  styleUrls: ['./employee-modify.component.less']
})
export class EmployeeModifyComponent implements OnInit {

  public id;
  public department;
  public occupationOptions = [];

  // 表单字段
  public items;
  addForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private regular: RegularService,
    private api: ApiService
  ) {
    this.id = this.route.snapshot.queryParams.id;
    this.items = new Items();

    this.getDepartment();
    this.getUserInfo();
    this.getOccupation();
  }
  ngOnInit() {
    this.addForm = this.fb.group({
      id: [],
      account: [this.items.account, [Validators.required]],
      name: [this.items.name, [Validators.required]],
      mobile: [this.items.mobile, [Validators.required], [this.mobileValidator]],
      departmentId: [this.items.departmentId, [Validators.required]],
      departmentName: [this.items.departmentName],
      jobName: [this.items.jobName, [Validators.required]],
      occupationClass: [this.items.occupationClass, [Validators.required]],
      status: [this.items.status, [Validators.required]],
      sex: [this.items.sex, [Validators.required]],
      remark: [this.items.remark]
    });
    this.reset();
  }
  /** 手机号校验 */
  mobileValidator = (control: FormControl) => Observable.create((observer: Observer<any>) => {
    setTimeout(() => {
      if (control.value && !(this.regular.mobileRegular(control.value))) {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  })

  reset() {
    this.addForm.reset()
    this.addForm.get('status').setValue(1)
    this.addForm.get('sex').setValue(1)
    // this.items.name = "";
    // this.items.mobile = "";
    // this.items.departmentName = "";
    // this.items.departmentId = "";
    // this.items.jobName = "";
    // this.items.occupationClass = '员工';
    // this.items.status = '1';
    // this.items.sex = '1';
    // this.items.remark = "";
  }
  async getUserInfo() {
    let res = await this.api.getUserInfo(this.id)
    if (res) {
      var data = res
      this.items = data;
      for (let key in this.addForm.value) {
        this.addForm.get(key).setValue(data[key])
      }
      this.addForm.get('sex').setValue(parseInt(this.items.sex))
      // this.addForm.setValue(data)
      // if (this.items.status === 1) {
      //   this.items.status = '1'
      // }
      // if (this.items.status === 0) {
      //   this.items.status = '0'
      // }
    }
  }
  getOccupation() {
    this.occupationOptions = [
      {
        "occupationClass": "总经理",
        "label": "总经理"
      },
      {
        "occupationClass": "中心总经理",
        "label": "中心总经理"
      },
      {
        "occupationClass": "中心副总经理",
        "label": "中心副总经理"
      },
      {
        "occupationClass": "部长",
        "label": "部长"
      },
      {
        "occupationClass": "副部长",
        "label": "副部长"
      },
      {
        "occupationClass": "组长",
        "label": "组长"
      },
      {
        "occupationClass": "员工",
        "label": "员工"
      }
    ]
  }
  async getDepartment() {
    let res = await this.api.getDepartment()
    this.department = res
  }
  goBack() {
    history.go(-1)
  }
  async onSubmit() {
    for (var i = 0; i < this.department.length; i++) {
      if (this.addForm.value.departmentId == this.department[i].id) {
        this.addForm.get('departmentName').setValue(this.department[i].fullName)
      }
    }
    let form = this.addForm.value
    form.sex = String(form.sex)
    for (const key in this.addForm.controls) {
      this.addForm.controls[key].markAsDirty();
      this.addForm.controls[key].updateValueAndValidity();
    }
    let res = await this.api.editUser(this.id, form)
    if (res) this.goBack()
  }

}
class Items {
  constructor(
    public account?: String,
    public name?: String,
    public mobile?: String,
    public departmentId?: String,
    public departmentName?: String,
    public jobName?: String,
    public occupationClass?: String,
    public status = 1,
    public sex = '1',
    public remark?: String
  ) { }
}
