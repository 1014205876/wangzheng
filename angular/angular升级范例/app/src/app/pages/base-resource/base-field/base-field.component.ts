import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FileUploader } from 'ng2-file-upload';
import { ApiService } from '../../../shared/service/http-serve/api.service';

@Component({
  selector: 'app-base-field',
  templateUrl: './base-field.component.html',
  styleUrls: ['./base-field.component.less']
})
export class BaseFieldComponent implements OnInit {

  /** 查询字段 */
  public searchItems;
  public dataType = [];/** 类型数组 */
  public dataSource = [];/** 数据源数组  */

  rows = [];
  page = {
    total: 1,
    totalPage: 1,
    pageNum: 1,
    pageSize: 10
  }
  loadingDelay = 500;

  /** 弹窗展示字段 */
  show = false;
  loading = false;
  modalStatus;
  modalTitle;

  /** 表单字段 */
  public modalItems;
  addForm: FormGroup;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    this.reset();
    this.search(this.page.pageNum);
  }

  ngOnInit() {
    this.getType();
    this.getDataSource();
    this.addForm = this.fb.group({
      group: [this.modalItems.group, [Validators.required]],
      groupKey: [this.modalItems.groupKey, [Validators.required]],
      fieldName: [this.modalItems.fieldName, [Validators.required]],
      fieldKey: [this.modalItems.fieldKey, [Validators.required]],
      fieldDef: [this.modalItems.fieldDef, [Validators.required]],
      type: [this.modalItems.type, [Validators.required]],
      dataSource: [this.modalItems.dataSource, [Validators.required]],
      introduction: [this.modalItems.introduction]
    });
  }

  dataSourceValid(value: string) {
    if (value == "select" || value == "multSelect") {
      this.addForm.get('dataSource').setValidators(Validators.required)
    } else {
      this.addForm.get('dataSource').clearValidators();
    }
  }

  /** 查询 */
  async search(e) {
    this.page.pageNum = e
    let params = {
      group: this.searchItems.group,
      groupKey: this.searchItems.groupKey,
      fieldName: this.searchItems.fieldName,
      fieldKey: this.searchItems.fieldKey,
      type: this.searchItems.type,
      dataSource: this.searchItems.dataSource,
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize,
    }
    let res = await this.api.getFieldList(params)
    if (res) {
      this.rows = []
      this.rows = res.list;
      this.page.total = res.total;
      this.page.totalPage = res.pages;
      this.page.pageNum = res.pageNum;
    }
  }
  /** 翻页 */
  changePage(e) {
    this.search(e);
  }
  /** 初始化查询和弹窗变量 */
  reset() {
    this.modalItems = new Items();
    this.modalItems.type = '';
    this.modalItems.dataSource = '';
    this.searchItems = new Items();
    this.searchItems.type = '';
    this.searchItems.dataSource = '';
  }
  /** 获取类型数组 */
  async getType() {
    let res = await this.api.getFieldType()
    this.dataType = res
  }
  /** 获取数据源数组 */
  async getDataSource() {
    let res = await this.api.getFielddictionaryList()
    this.dataSource = res
  }
  /** 弹窗展示 */
  modalShow(title, status, data) {
    this.reset();
    this.loading = false;
    this.show = true;
    this.modalTitle = title;
    this.modalStatus = status;
    if (status == 'edit') {
      this.modalItems.id = data.id
      for (let key in this.addForm.value) {
        this.addForm.get(key).setValue(data[key])
        // this.modalItems[key] = data[key] ? data[key] : '';
      }
    }
  }
  /** 弹窗隐藏 */
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
  /** 弹窗表单提交 */
  submited(e) {
    for (const key in this.addForm.controls) {
      this.addForm.controls[key].markAsDirty();
      this.addForm.controls[key].updateValueAndValidity();
    }
    if (this.addForm.valid) {
      if (this.modalStatus == 'add') {
        this.add(e);
      }
      if (this.modalStatus == 'edit') {
        this.edit(e);
      }
    }
    // this.modalCancel();
  }
  /** 新增 */
  async add(e) {
    let res = await this.api.addField(this.addForm.value)
    if (res) {
      this.message.create('success', "创建成功", { nzDuration: 3000 });
      this.modalCancel();
      this.resetForm(e);
      this.search(1);
    }
  }
  /** 编辑 */
  async edit(e) {
    let res = await this.api.editField(this.modalItems.id, this.addForm.value)
    if (res) {
      this.message.create('success', "编辑成功", { nzDuration: 3000 });
      this.modalCancel();
      this.resetForm(e);
      this.search(1);
    }
  }
  /** 删除 */
  async delete(data) {
    let res = await this.api.deleteField(data.id)
    if (res) {
      this.message.create('success', "删除成功", { nzDuration: 3000 });
      this.search(1);
    }
  }
  /** 删除确认提示框 */
  showDeleteConfirm(data): void {
    this.modalService.confirm({
      nzTitle: '删除提示',
      nzContent: '<b style="color: red;">确认删除 字段名称 为“' + data.fieldName + '”?</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(data),
      nzCancelText: '取消',
      nzOnCancel: () => { }
    });
  }
  /** 上传 */
  refresh = true;
  uploader: FileUploader = new FileUploader({
    url: "/api/peak-resource/v1/resource/fieldsImport",
    method: "post",
    itemAlias: "file",
    autoUpload: false
  });
  selectedFileOnChanged() {
    let that = this;
    that.refresh = false;
    that.uploader.queue[0].upload();//传送文件
    that.uploader.queue[0].onSuccess = (response, status, headers) => {
      that.uploader.clearQueue();//清除文件
      if (status == 200) {
        let res = JSON.parse(response)
        if (res.code == '200') {
          this.message.create('success', "导入成功", { nzDuration: 3000 });
        } else {
          this.message.create('error', res.reason, { nzDuration: 3000 });
        }
      } else {
        this.message.create('error', "导入失败", { nzDuration: 3000 });
      }
      this.reset();
      that.search(that.page.pageNum);
      that.refresh = true;
    }
  }

}
class Items {
  constructor(
    public id?: String,
    public group?: String,
    public groupKey?: String,
    public fieldName?: String,
    public fieldKey?: String,
    public fieldDef?: String,
    public type?: String,
    public dataSource?: String,
    public introduction?: String
  ) { }
}
