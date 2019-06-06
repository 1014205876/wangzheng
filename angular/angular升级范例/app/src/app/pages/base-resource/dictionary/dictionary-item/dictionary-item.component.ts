import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../shared/service/http-serve/api.service';

@Component({
  selector: 'app-dictionary-item',
  templateUrl: './dictionary-item.component.html',
  styleUrls: ['./dictionary-item.component.less']
})
export class DictionaryItemComponent implements OnInit {

  id;
  /** 查询字段 */
  public searchItems;

  /** 表格数据 */
  rows = [];
  page = {
    "total": 1,         /** 总条数 */
    "totalPage": 1,     /** 总页数 */
    "pageNum": 1,        /** 当前页码 */
    "pageSize": 10      /** 每页展示多少条数据 */
  }
  loadingDelay = 500;

  /** 弹窗展示字段 */
  show = false;
  loading = true;
  modalStatus;
  modalTitle;

  /** 表单字段 */
  public modalItems;
  addForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.id = this.route.snapshot.queryParams["id"];
    this.reset();
    this.search(this.page.pageNum);
  }
  ngOnInit() {
    this.addForm = this.fb.group({
      id: [],
      name: [this.modalItems.name, [Validators.required]],
      code: [this.modalItems.code, [Validators.required]],
      sort: [this.modalItems.sort, [Validators.required, this.numberValidator]],
      remark: [this.modalItems.remark],
      status: [1, [Validators.required]],
    })
  }
  /** 整数校验 */
  numberValidator = (control: FormControl): { [s: string]: boolean } => {
    var reg = /^[1-9]\d{0,1}$/;
    if (!control.value) {
      return { required: true };
    } else if (control.value && (!reg.test(control.value))) {
      return { confirm: true, error: true };
    }
  }
  /** 查询 */
  async search(e) {
    this.page.pageNum = e
    let params = {
      name: this.searchItems.name,
      status: this.searchItems.status,
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize
    }
    let res = await this.api.getDictionaryItem(this.id, params)
    this.rows = []
    this.rows = res.list;
    this.page.total = res.total;
    this.page.totalPage = res.pages;
    this.page.pageNum = res.pageNum;
    this.loading = false
  }
  /** 翻页 */
  changePage(e) {
    this.search(e);
  }
  /** 初始化查询和弹窗变量 */
  reset() {
    this.searchItems = new Items();
    this.searchItems.status = '';
    this.modalItems = new Items();
    this.modalItems.status = 1;
  }
  /** 弹窗展示 */
  modalShow(title, status, data) {
    // this.reset();
    this.show = true;
    this.modalTitle = title;
    this.modalStatus = status;
    this.addForm.get('status').setValue(1)
    if (status === 'edit') {
      for (let key in this.addForm.value) {
        if (data[key]) {
          this.addForm.get(key).setValue(data[key])
          // this.modalItems.status = String(data.status);
        }
      }
    }
    
  }
  /** 弹窗隐藏 */
  modalCancel() {
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
  /** 弹窗表单提交 */
  async submited(e) {
    for (const key in this.addForm.controls) {
      this.addForm.controls[key].markAsDirty();
      this.addForm.controls[key].updateValueAndValidity();
    }
    let form = { ...this.addForm.value, parentId: this.id }
    if (this.modalStatus == 'add') {
      let res = await this.api.addDictionary(form)
      if (res) {
        this.message.create('success', '成功!', { nzDuration: 3000 });
        this.modalCancel();
        // this.resetForm(e);
        this.search(1);
      }
    }
    if (this.modalStatus == 'edit') {
      let res = await this.api.editDictionary(form)
      if (res) {
        this.message.create('success', '成功!', { nzDuration: 3000 });
        this.modalCancel();
        // this.resetForm(e);
        this.search(1);
      }
    }
  }

  /** 开关按钮 */
  async switchange(row) {
    if (row.status == 0) {
      row.status = 1;
    } else if (row.status == 1) {
      row.status = 0;
    }
    let res = await this.api.changeDictionaryStatus(row)
    if (res) this.message.create('success', row.name + ' 状态修改成功!', { nzDuration: 3000 })
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
  ) { }
}