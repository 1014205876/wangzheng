import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef, NzModalService, } from 'ng-zorro-antd';
import { ApiService } from '../../../shared/service/http-serve/api.service';
import { RegularService } from '../../../shared/service/regular/regular.service';
import { Observable, Observer } from 'rxjs'

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.less']
})
export class StaffComponent implements OnInit {

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
  rowId;

  /** 表单字段 */
  addForm: FormGroup;

  institutions = [];
  erwmItems;

  modalTpl: NzModalRef;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private regular: RegularService,
    private modalService: NzModalService
  ) {
    this.addForm = this.fb.group({
      number: [null],
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required], [this.mobileValidator]],
      institutionId: [null],
      status: [1, [Validators.required]]
    })
    this.reset();
    this.search(this.page.pageNum);
  }

  ngOnInit() {
  }
  /** 手机号校验 */
  mobileValidator = (control: FormControl) => new Observable((observer: Observer<any>) => {
    setTimeout(() => {
      if (control.value && !(this.regular.mobileRegular(control.value))) {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  })
  
  /** 查询 */
  async search(e) {
    this.page.pageNum = e
    let params = {
      name: '',
      mobile: '',
      status: '',
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize
    }
    let res = await this.api.getStaffs(params)
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
    // this.addForm.reset()
    // this.addForm.get('name').setValue('');
    // this.addForm.get('mobile').setValue('');
    // this.addForm.get('institutionId').setValue('');
   
  }
  /** 弹窗展示 */
  modalShow(title, status, data) {
    this.reset();
    this.loading = false;
    this.show = true;
    this.modalTitle = title;
    this.modalStatus = status;
    this.erwmItems = data;
    if (status == 'edit') {
      this.rowId = data.id;
      for (let key in this.addForm.value) {
        this.addForm.get(key).setValue(data[key] ? data[key] : '');
      }
      // this.addForm.get('status').setValue(String(data.status));
    }
  }
  /** 弹窗隐藏 */
  modalCancel() {
    this.loading = false
    this.show = false
    this.modalTpl.destroy()
    this.addForm.reset()
    this.addForm.get('status').setValue(1);
    // this.reset()
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addForm.reset();
    // this.reset();
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
    // let value = this.addForm.value;
    // value.status = parseInt(value.status);
    if (this.modalStatus == 'add') {
      let res = await this.api.addStaff(this.addForm.value)
      if (res) {
        this.message.create('success', '添加成功！', { nzDuration: 3000 })
        this.search(this.page.pageNum);
        this.modalCancel()
        // this.resetForm(e)
      }
    }
    if (this.modalStatus == 'edit') {
      let res = await this.api.editStaff(this.rowId, this.addForm.value)
      if (res) {
        this.message.create('success', '编辑成功！', { nzDuration: 3000 })
        this.search(this.page.pageNum);
        this.modalCancel();
        // this.resetForm(e);
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
    let res = await this.api.changeStaffStatus(row)
    if (res) this.message.create('success', row.name + ' 状态修改成功!', { nzDuration: 3000 })
  }

  /** 获取机构列表 */
  async getInstitutions(url) {
    let res = await this.api.getInstitutionList(url)
    this.institutions = res
  }

  createModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>) {
    this.modalTpl = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: null,
      nzOnCancel: () => { this.modalCancel() }
    })
  }
}
class Items {
  constructor(
    public name?: string,
    public mobile?: string,
    public status?: any
  ) { }
}