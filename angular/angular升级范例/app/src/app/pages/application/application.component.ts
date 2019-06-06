import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../shared/service/http-serve/api.service'
import { Observable, Observer } from 'rxjs'

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less']
})
export class ApplicationComponent implements OnInit {

  // 查询字段
  public searchItems;
  rows = [];
  page = {
    "total": 1,         //总条数
    "totalPage": 1,     //总页数
    "pageNum": 1,        //当前页码
    "pageSize": 10      //每页展示多少条数据
  }
  loadingDelay = 500;

  // 弹窗展示字段
  show = false;
  spinning = true;
  loading = false
  modalStatus;
  modalTitle;

  // 表单字段
  public modalItems;
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private api: ApiService
  ) { }
  ngOnInit() {
    this.reset();
    this.modalItems.status = String(this.modalItems.status);
    this.spinning = true
    this.searchData(1)

    this.addForm = this.fb.group({
      appId: [this.modalItems.appId],
      appKey: [this.modalItems.appKey],
      appName: [this.modalItems.appName, [Validators.required]],
      appAddress: [this.modalItems.appAddress, [Validators.required], [this.webValidator]],
      remark: [this.modalItems.remark],
      status: [this.modalItems.status, [Validators.required]]
    });
    // this.loaded = false
  }
  reset() {
    this.searchItems = new Items();
    this.searchItems.status = '';
    this.modalItems = new Items();
    this.modalItems.status = '1';
  }
  async searchData(pageNumber) {
    this.searchItems['pageNum'] = pageNumber
    this.searchItems['pageSize'] = this.page.pageSize
    let res = await this.api.getApplication(this.searchItems)
    this.rows = res.list
    this.page.total = res.total
    this.page.totalPage = res.pages
    this.page.pageNum = res.pageNum
    this.spinning = false

  }
  webValidator = (control: FormControl) => new Observable((observer: Observer<any>) => {
    setTimeout(() => {
      if (control.value && (control.value.indexOf('https://') != -1 || control.value.indexOf('http://') != -1)) {
        observer.next(null);
      } else {
        observer.next({ error: true, duplicated: true });
      }
      observer.complete();
    }, 1000);
  })
  modalShow(title, data) {
    this.reset();
    this.show = true;
    this.loading = false;
    this.modalStatus = title;
    if (title == 'add') {
      this.modalTitle = '创建应用';
    }
    if (title == 'edit') {
      this.modalTitle = "编辑应用";
      this.modalItems.id = data.id
      for (let key in this.addForm.value) {
        this.addForm.get(key).setValue(data[key])
        // this.modalItems[key] = data[key] ? data[key] : '';
      }
      this.addForm.get('status').setValue(String(data.status))
      // this.modalItems.status = String(data.status);
    }
  }
  modalCancel() {
    this.loading = false;
    this.show = false;
    this.reset();
    this.addForm.reset();
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addForm.reset();
    for (const key in this.addForm.controls) {
      this.addForm.controls[key].markAsPristine();
      this.addForm.controls[key].updateValueAndValidity();
    }
  }
  submited(e) {
    let valid = this.addForm.valid;
    this.addForm.value.status = parseInt(this.addForm.value.status);
    for (const key in this.addForm.controls) {
      this.addForm.controls[key].markAsDirty();
      this.addForm.controls[key].updateValueAndValidity();
    }
    let data = {
      "appName": this.addForm.value.appName,
      "appAddress": this.addForm.value.appAddress,
      "remark": (this.addForm.value.remark ? this.addForm.value.remark : ''),
      "status": this.addForm.value.status
    }
    if (valid) {
      this.loading = true;
      if (this.modalStatus == 'add') {
        this.add(data, e);
      }
      if (this.modalStatus == 'edit') {
        this.edit(data, e);
      }
    }
  }
  async edit(data, e) {
    let res = await this.api.applicationEdit(this.modalItems.id, data)
    if (res) {
      this.message.create('success', "应用" + " “ " + data.appName + " ” " + ' 编辑成功!', { nzDuration: 3000 })
      setTimeout(() => {
        // this.searchData(this.page.pageNum)
      }, 1000)
      this.modalCancel()
      this.resetForm(e)
    }
  }
  async add(data, e) {
    let res = await this.api.applicationAdd(data)
    if (res) {
      this.message.create('success', "应用" + " “ " + data.appName + " ” " + ' 添加成功!', { nzDuration: 3000 })
      setTimeout(() => {
        this.searchData(this.page.pageNum)
      }, 1000)
      this.modalCancel()
      this.resetForm(e)
    }
  }
  async switchange(row) {
    if (row.status == 0) {
      row.status = 1;
    } else if (row.status == 1) {
      row.status = 0;
    }
    let res = await this.api.applicationSwitch(row)
    if (res) this.message.create('success', row.appName + ' 状态修改成功!', { nzDuration: 3000 })
  }
  changePage(e) {
    this.searchData(e);
  }
}
class Items {
  constructor(
    public id?: String,
    public appName?: String,
    public appId?: String,
    public appKey?: String,
    public status: any = '1',
    public appAddress?: String,
    public remark?: String,
  ) { }
}
