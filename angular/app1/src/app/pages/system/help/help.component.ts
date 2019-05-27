import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TransformService } from './../../../shared/service/transform.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less']
})
export class HelpComponent implements OnInit {

  breadcrumbs = ['内容管理', '帮助管理'];

  searchItems = {
    title: ''
  };
  rows = [];
  loadingDelay = 1000;
  page = {
    "total": 1,         //总条数
    "totalPage": 1,     //总页数
    "pageNum": 1,        //当前页码
    "pageSize": 10      //每页展示多少条数据
  }

  show = false;
  loading = false;
  modalForm: FormGroup;
  modalTitle;
  modalStatus;
  id;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private http: HttpServe,
    private transform: TransformService
  ) {
    this.searchData(1);
  }

  ngOnInit() {
    this.modalForm = this.fb.group({
      title: [null, [Validators.required]],
      answer: [null, [Validators.required]]
    })
  }

  reset() {
    this.searchItems = {
      title: ''
    };
  }
  searchData(pageNum) {
    this.transform.urlTransform("guest-manage/v1/app/back/helpsDataGrid", this.searchItems, pageNum, 10).then(res => {
      this.rows = res.list;
      this.page.total = res.total;
      this.page.totalPage = res.pages;
      this.page.pageNum = res.pageNum;
    }, (error) => {
      this.message.create('error', error, { nzDuration: 3000 })
    })
  }
  changePage(pageNum) {
    this.searchData(pageNum);
  }

  // 弹窗显示
  modalShow(status, data) {
    this.modalForm.reset();
    this.show = true;
    this.modalStatus = status;
    if (status == 'add') { }
    else if (status == 'edit') {
      this.id = data.id;
      this.setFormValue(this.modalForm, ['title', 'answer'], data);
    }
  }
  /** 弹窗隐藏 */
  modalCancel() {
    this.show = false;
    this.loading = false;
    this.reset();
    this.modalForm.reset();
    this.searchData(1);
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.modalForm.reset();
    for (const key in this.modalForm.controls) {
      this.modalForm.controls[key].markAsPristine();
      this.modalForm.controls[key].updateValueAndValidity();
    }
  }
  // 表单元素赋值
  setFormValue(form, key: any[], value: any[]) {
    key.forEach(item => {
      if (value.hasOwnProperty(item)) {
        form.get(item).setValue(value[item]);
      }
    })
  }
  // 提交
  submitted(e) {
    if (this.modalStatus == 'add') {
      this.add(e);
    }
    else if (this.modalStatus == 'edit') {
      this.edit(e);
    }
  }

  cancel() { }

  delete(data) {
    this.http.delete("guest-manage/v1/app/back/helps/" + data.id).then(res => {
      this.message.create('success', '删除成功', { nzDuration: 3000 });
    }, (error) => {
      this.message.create('error', error, { nzDuration: 3000 });
    })
  }
  edit(e) {
    let data = {
      "id": this.id,
      "title": this.modalForm.value.title,
      "answer": this.modalForm.value.answer
    }
    this.http.put("guest-manage/v1/app/back/helps/" + this.id, data).then(res => {
      this.message.create('success', '修改成功', { nzDuration: 3000 });
      this.modalCancel();
      this.resetForm(e);
    }, (error) => {
      this.message.create('error', error, { nzDuration: 3000 });
      this.loading = false;
    })
  }
  add(e) {
    let data = {
      "title": this.modalForm.value.title,
      "answer": this.modalForm.value.answer
    }
    this.http.post("guest-manage/v1/app/back/help", data).then(res => {
      this.message.create('success', '增加成功', { nzDuration: 3000 });
      this.modalCancel();
      this.resetForm(e);
    }, (error) => {
      this.message.create('error', error, { nzDuration: 3000 });
      this.loading = false;
    })
  }

}
