import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../shared/service/http-serve/api.service';
import { RegularService } from '../../../shared/service/regular/regular.service';

@Component({
  selector: 'app-cooperation',
  templateUrl: './cooperation.component.html',
  styleUrls: ['./cooperation.component.less']
})
export class CooperationComponent implements OnInit {

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

  institutions = [
    { "typeValue": "SocialOrganization", "typeName": "社会组织" },
    { "typeValue": "StateAgency", "typeName": "国家机关" },
    { "typeValue": "BusinessEnterprise", "typeName": "工商企业" },
    { "typeValue": "PublicInstitution", "typeName": "事业单位" }
  ];

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private regular: RegularService,
    private message: NzMessageService
  ) {
    this.reset();
    this.search(this.page.pageNum);
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      id: [],
      name: [this.modalItems.name, [Validators.required]],
      shortName: [this.modalItems.shortName],
      code: [this.modalItems.code, [Validators.required]],
      principal: [this.modalItems.principal],
      mobile: [this.modalItems.mobile, [this.mobileValidator]],
      status: [this.modalItems.status, [Validators.required]],
      typeValue: [this.modalItems.typeValue],
      remark: [this.modalItems.remark]
    })
  }

  /** 手机号校验 */
  mobileValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value && (!this.regular.mobileRegular(control.value))) {
      return { confirm: true, error: true };
    }
  }
  /** 查询 */
  async search(e) {
    this.page.pageNum = e
    let params = {
      name: this.searchItems.name,
      code: this.searchItems.code,
      typeValue: this.searchItems.typeValue,
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize
    }
    let res = await this.api.getInstitutionList('dataGrid', params)
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
    this.searchItems.typeValue = '';
    this.modalItems = new Items();
    this.modalItems.typeValue = '';
    this.modalItems.status = '1';
  }
  /** 弹窗展示 */
  modalShow(title, status, data) {
    // this.reset();
    this.loading = false;
    this.show = true;
    this.modalTitle = title;
    this.modalStatus = status;
    if (status == 'edit') {
      for (let key in this.addForm.value) {
        if (data[key]) {
          this.addForm.get(key).setValue(data[key])
          // this.modalItems[key] = data[key];
          // this.modalItems.status = String(data.status);
        }
      }
    }
  }
  /** 弹窗隐藏 */
  modalCancel() {
    this.loading = false;
    this.show = false;
    this.reset();
    this.addForm.reset();
    this.addForm.get('status').setValue(1)
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
    // this.modalItems.status = parseInt(this.modalItems.status);
    let form
    for (var i = 0; i < this.institutions.length; i++) {
      if (this.addForm.value.typeValue == this.institutions[i].typeValue) {
        form = { ...this.addForm.value, typeName: this.institutions[i].typeName }
        // this.modalItems.typeName = this.institutions[i].typeName;
      }
    }
    if (this.modalStatus == 'add') {
      let res = await this.api.addInstitution(form)
      if (res) {
        this.message.create('success', '添加成功！', { nzDuration: 3000 })
        this.modalCancel();
        this.resetForm(e);
        this.search(1)
      }
    }
    if (this.modalStatus == 'edit') {
      let res = await this.api.editInstitution(form)
      if (res) {
        this.message.create('success', '修改成功！', { nzDuration: 3000 })
        this.modalCancel();
        this.resetForm(e);
        this.search(1)
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
    let res = await this.api.changeInstitution(row)
    if (res) this.message.create('success', row.name + ' 状态修改成功!', { nzDuration: 3000 })
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
    public status = 1,
    public id?: string
  ) { }
}