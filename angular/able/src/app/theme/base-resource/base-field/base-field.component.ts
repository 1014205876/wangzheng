import { Component, OnInit } from '@angular/core';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';

import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-base-field',
  templateUrl: './base-field.component.html',
  styleUrls: [
    './../../../../assets/icon/menu/iconfont.css',
    './../../../../assets/icon/operate/iconfont.css',
    './base-field.component.scss'
  ]
})
export class BaseFieldComponent implements OnInit {

  public items;
  rows = [];
  id = '';//对应产品的ID
  public total;
  public totalPage;
  public pageNum;

  type = [];//类型数组
  dataSource = [];//数据源数组

  addForm: FormGroup;
  modalItems;
  modalStatus;
  groupId;
  public modalTitle: String;
  refresh=true;//控制隐藏file框的重新载入
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
    private toastyService: ToastyService,
  ) {
    this.items = new Items();
    this.modalItems = new Items();
    this.addForm = new FormGroup({
      group: new FormControl(),
      groupKey: new FormControl(),
      fieldName: new FormControl(),
      fieldKey: new FormControl(),
      fieldDef: new FormControl(),
      type: new FormControl(),
      dataSource: new FormControl(),
      introduction: new FormControl()
    })
  }

  addPost() {//添加数据
    // console.log('添加数据')
    this.http.postCustomHeaders(
      "v1/resource/field",
      this.addForm.value
    ).subscribe(res => {
      console.log(res)
      if (res.code == '200') {
        this.toastServe('创建成功', 'success')
      } else {
        this.toastServe(res.reason, 'error')
      }
      this.search(1, 'search')
    })
  }

  removeshow(list) {//点击删除按钮，打开删除弹窗
    this.id = list.id
  }

  deleteItem() {//删除数据
    console.log('删除数据')
    this.http.deleteCustomHeaders(
      "v1/resource/fields/" + this.id
    ).subscribe(res => {
      if (res.code == '200') {
        this.toastServe('删除成功', 'success')
      } else {
        this.toastServe(res.reason, 'error')
      }
      this.search(1, 'search')
    })
  }

  editPost() {//修改数据
    // console.log('修改数据');
    this.http.putCustomHeaders(
      "v1/resource/fields/" + this.groupId,
      this.addForm.value
    ).subscribe(res => {
      if (res.code == '200') {
        this.toastServe('编辑成功', 'success')
      } else {
        this.toastServe(res.reason, 'error')
      }
      this.search(1, 'search')
    })
  }

  search(e, type) {//查询row数据
    if (!type) {
      this.items = new Items();
    }
    this.http.getCustomHeaders(
      "v1/resource/fieldsDataGrid?group=" + (this.items.group ? encodeURIComponent(this.items.group) : '')
      + "&groupKey=" + (this.items.groupKey ? encodeURIComponent(this.items.groupKey) : '')
      + "&fieldName=" + (this.items.fieldName ? encodeURIComponent(this.items.fieldName) : '')
      + "&fieldKey=" + (this.items.fieldKey ? encodeURIComponent(this.items.fieldKey) : '')
      + "&type=" + (this.items.type ? encodeURIComponent(this.items.type) : '')
      + "&dataSource=" + (this.items.dataSource ? encodeURIComponent(this.items.dataSource) : '')
      + "&pageNum=" + e + "&pageSize=" + 10
    ).subscribe(res => {
      console.log(res)
      this.rows = res.result.list;
      this.total = res.result.total;
      this.totalPage = res.result.pages;
      this.pageNum = res.result.pageNum;
    })
  }

  uploader: FileUploader = new FileUploader({
    url: "/api/peak-resource/v1/resource/fieldsImport",
    method: "post",
    itemAlias: "file",
    autoUpload: false
  });
  selectedFileOnChanged(e) {
    let that = this;
    that.refresh=false;
    that.uploader.queue[0].upload();//传送文件
    that.uploader.queue[0].onSuccess = (response, status, headers) => {
      console.log(response)
      console.log(status)
      console.log(headers)
      that.uploader.clearQueue();//清除文件
      if (status == 200) {
        let res = JSON.parse(response)
        if (res.code == '200') {
          that.toast.msg = "导入成功";
          that.toast.type = "success";
          that.addToast(that.toast);
        } else {
          that.toast.msg = res.reason;
          that.toast.type = "error";
          that.addToast(that.toast);
        }
      } else {
        console.log('导入失败')
      }
      that.search(that.pageNum, 'search');
      that.refresh=true;
    }
  }
  typechange() {//切换字典类型时把数据源清空
    this.modalItems.dataSource = '';
  }
  changeTitle(title, status) {
    this.modalTitle = title;
    this.modalStatus = status;
  }

  edit(row) {
    console.log(row)
    this.modalItems.group = row.group;
    this.modalItems.groupKey = row.groupKey;
    this.modalItems.fieldName = row.fieldName;
    this.modalItems.fieldKey = row.fieldKey;
    this.modalItems.fieldDef = row.fieldDef;
    this.modalItems.type = row.type;
    this.modalItems.dataSource = row.dataSource;
    this.modalItems.introduction = row.introduction;
    this.groupId = row.id;
  }

  onSubmit() {//点击提交
    if (this.modalStatus == 'add') {
      this.addPost()
    } else if (this.modalStatus == 'edit') {
      this.editPost()
    }
  }


  toastServe(reason, type) {
    this.toast.msg = reason;
    this.toast.type = type;
    this.addToast(this.toast);
  }

  changePage(e) {
    this.search(e, '');
  }

  reset() {
    this.items = new Items;
  }

  addToast(options) {
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

  ngOnInit() {
    this.search(1, '');
    this.http.getCustomHeaders(
      'v1/resource/dictionaryItem/fieldMangementType'
    ).subscribe(res => {
      this.type = res
    })
    this.http.getCustomHeaders(
      'v1/resource/dictionaries'
    ).subscribe(res => {
      this.dataSource = res
    })
  }
}
class Items {
  constructor(
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

