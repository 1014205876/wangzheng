import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FileUploader } from 'ng2-file-upload';

import { ApiService } from '../../shared/service/http-serve/api.service'

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.less']
})
export class ConfigureComponent implements OnInit {

  public searchItems;

  rows = [];
  page = {
    total: 1,
    totalPage: 1,
    pageNum: 1,
    pageSize: 10
  }
  loadingDelay = 500;

  show = false;
  spinning = true
  modalStatus;
  modalTitle;
  rowId;

  addForm: FormGroup;

  uploader: FileUploader = new FileUploader({
    url: "/upload",
    method: "post",
    itemAlias: "file",
    autoUpload: false
  });

  tinyValue;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private api: ApiService
  ) {
    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      key: [null, [Validators.required]],
      type: ['text', [Validators.required]],
      value: [null, [Validators.required]]
    })
    this.reset();
    // this.search(1)
  }

  ngOnInit() {
    this.spinning = true
    this.search(1)

  }

  reset() {
    this.searchItems = new Items();
    this.addForm.reset()
    this.addForm.get('type').setValue('text');
  }
  async search(pageNum) {
    this.searchItems['pageNum'] = pageNum
    this.searchItems['pageSize'] = this.page.pageSize
    let res = await this.api.getSettings(this.searchItems)
    if (res) {
      this.rows = []
      this.rows = res.list;
      this.page.pageNum = res.pageNum;
      this.page.totalPage = res.pages;
      this.page.total = res.total;
    }
    this.spinning = false

  }

  modalShow(title, data) {
    this.show = true;
    this.modalStatus = title;
    if (!this.addForm.value.type) {
      this.addForm.get('type').setValue('text');
    }
    if (title == 'add') {
      this.modalTitle = '新增配置项';
    }
    if (title == 'edit') {
      this.modalTitle = "编辑配置项";
      this.setValue(data)
    }
  }
  setValue(data) {
    this.rowId = data.id;
    this.addForm.get('name').setValue(data.name ? data.name : '');
    this.addForm.get('key').setValue(data.key ? data.key : '');
    this.addForm.get('type').setValue(data.type ? data.type : '');
    this.addForm.get('value').setValue(data.value ? data.value : '');
  }

  modalCancel() {
    this.show = false;
    this.addForm.reset();
    this.reset();
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.addForm.reset();
    this.reset();
    for (const key in this.addForm.controls) {
      this.addForm.controls[key].markAsPristine();
      this.addForm.controls[key].updateValueAndValidity();
    }
  }
  submited(e) {
    let valid = this.addForm.valid;
    let value = this.addForm.value;
    let flag = true;
    let data = {
      "name": (value.name ? value.name : ''),
      "key": (value.key ? value.key : ''),
      "type": (value.type ? value.type : ''),
      "value": (value.value ? value.value : ''),
    };
    for (const key in this.addForm.controls) {
      if (!this.addForm.value[key]) {
        this.addForm.controls[key].markAsDirty();
        this.addForm.controls[key].updateValueAndValidity();
      }
    }
    if (valid) {
      if (this.modalStatus == 'add') {
        this.add(data, e);
      }
      if (this.modalStatus == 'edit') {
        this.edit(data, e);
      }
    }

  }
  //修改配置项
  async edit(data, e) {
    let res = await this.api.editSetting(this.rowId, data)
    if (res) {
      this.show = false;
      this.message.create("success", "修改成功", { nzDuration: 3000 })
      this.resetForm(e);
      this.reset();
      this.search(this.page.pageNum);//重新调取后台表格数据
    }
  }
  //添加配置项
  async add(data, e) {
    let res = await this.api.AddSetting(data)
    if (res) {
      this.show = false;
      this.message.create("success", "添加成功", { nzDuration: 3000 })
      this.reset();
      this.resetForm(e);
      this.search(1)
    }
  }
  //切换配置项类型时把配置项值清除
  typeChange() {
    this.addForm.get('value').setValue('');
  }
  //富文本输入内容导入
  keyupHandler(e) {
    this.addForm.get('value').setValue(e);
  }
  //删除配置项
  async delete(data) {
    let res = await this.api.deleteSetting(data.id)
    if (res) {
      this.message.create("success", "删除成功", { nzDuration: 3000 })
      this.reset()
      this.search(this.page.pageNum)
    }
  }
  /** 删除确认提示框 */
  showDeleteConfirm(data): void {
    this.modalService.confirm({
      nzTitle: '删除提示',
      nzContent: '<b style="color: red;">确认删除“' + data.name + '”?</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(data),
      nzCancelText: '取消',
      nzOnCancel: () => { }
    });
  }

  selectedFileOnChanged(e, list) {//file框选择文件时触发
    this.uploader.queue[0].upload();//传送文件
    this.uploader.queue[0].onSuccess = (response, status, headers) => {
      this.uploader.clearQueue();//清除文件
      if (status == 200) {
        list = JSON.parse(response).location;
        this.addForm.get('value').setValue(list);
      } else {
        console.log('上传失败')
      }
    }
  }
  // 翻页
  changePage(e) {
    this.search(e);
  }
}
class Items {
  constructor(
    public name?: String,
    public key?: String
  ) { }
}