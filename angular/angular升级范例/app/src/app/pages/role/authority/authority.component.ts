import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../shared/service/http-serve/api.service'

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.less']
})
export class AuthorityComponent implements OnInit {

  appLists = [];
  appId;
  parentAuth;
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
  public modalItems = new Items();
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private api: ApiService
  ) {
    this.loading = true
    this.getApp();

  }

  ngOnInit() {
    this.addForm = this.fb.group({
      id: [],
      appId: [this.modalItems.appId, [Validators.required]],
      appName: [this.modalItems.appName],
      parentId: [this.modalItems.parentId],
      name: [this.modalItems.name, [Validators.required]],
      sort: [this.modalItems.sort, [Validators.required, this.numberValidator]],
      status: [this.modalItems.status, [Validators.required]],
      type: [this.modalItems.type, [Validators.required]],
      menuUrl: [this.modalItems.menuUrl],
      resourceName: [this.modalItems.resourceName, [Validators.required]],
      icon: [this.modalItems.icon],
      code: [this.modalItems.code]
    })
    this.reset();
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
  /**  */
  validChange(value, validValue, validKey) {
    if (value == validValue) {
      this.addForm.get(validKey).setValidators(Validators.required)
    } else {
      this.addForm.get(validKey).clearValidators();
    }
  }
  async getApp() {
    let res = await this.api.getApps()
    this.appLists = res;
    if (this.appLists && (this.appLists.length > 0) && (!this.appId)) {
      this.appId = this.appLists[0].appId;
    }
    if (this.appId) {
      this.search(this.appId);
    }
  }
  /** 查询 */
  async search(e) {
    
    let res = await this.api.getPermissionByAppId({ appId: e })
    this.rows = []
    this.rows = res
    this.parentAuth = this.rows
    this.dataCode();
  }
  /** 初始化查询和弹窗变量 */
  reset() {
    this.addForm.reset()
    this.addForm.get('type').setValue(1)
    this.addForm.get('status').setValue(1)
    this.addForm.get('appId').setValue(this.appId)
    this.addForm.get('parentId').setValue('')
  }
  /** 弹窗展示 */
  modalShow(title, status, data) {
    this.reset();

    this.show = true;
    this.modalTitle = title;
    this.modalStatus = status;
    if (status == 'addChild') {
      this.addForm.get('parentId').setValue(data.id)
      this.addForm.get('parentName').setValue(data.name)
    }
    if (status == 'edit') {
      for (let key in this.addForm.value) {
        if (data[key]) {
          this.addForm.get(key).setValue(data[key])
        }
      }
      this.addForm.get('authId').setValue(data.id)
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
  submited(e) {
    for (const key in this.addForm.controls) {
      this.addForm.controls[key].markAsDirty();
      this.addForm.controls[key].updateValueAndValidity();
    }
    for (var i = 0; i < this.appLists.length; i++) {
      if (this.addForm.value.appId == this.appLists[i].appId) {
        this.addForm.get('appName').setValue(this.appLists[i].appName)
      }
    }
    this.modalItems.code = '0' + (this.modalItems.code ? this.modalItems.code : '');
    this.addForm.get('code').setValue(this.modalItems.code)
    if (this.modalStatus == 'edit') {
      this.edit(e);
    } else {
      this.add(e);
    }
  }
  async add(e) {
    let res = await this.api.addPermission(this.addForm.value)
    if (res) {
      this.message.create("success", "成功!", { nzDuration: 3000 })
      this.resetForm(e);
      this.modalCancel();
      this.search(this.appId);
    } else {
    }
  }
  async edit(e) {
    let res = await this.api.editPermission(this.addForm.value)
    if (res) {
      this.message.create("success", "成功!", { nzDuration: 3000 })
      this.resetForm(e);
      this.modalCancel();
      this.search(this.appId);
    } else {
    }
  }
  /** 树形表格 */
  expandDataCache = {};
  dataRows = [];
  dataCode() {
    this.rows.forEach(item => {
      item.code = item.code.replace("0", "");
    })
    this.data2Tree(this.rows);
    this.dataInit();
    this.loading = false
  }
  /** 获取树形根节点 */
  data2Tree(datas: any[]) {
    var dataArray = [];
    datas.forEach((data, index) => {
      if (!data.parentId) {
        data.children = [];
        data.expand = true;
        dataArray.push(data);
      }
    });
    this.dataRows = this.data2TreeDG(dataArray, datas);
  }
  /** 递归 生成树形子节点表格 */
  data2TreeDG(dataArray, datas): any[] {
    dataArray.forEach(item => {
      var dataArrayIndex = item;
      var childrenArr = []
      datas.forEach(data => {
        data.expand = true;
        if (item.id == data.parentId) {
          childrenArr.push(data)
        }
      })
      dataArrayIndex.children = childrenArr;
      if (childrenArr.length > 0) {//有儿子节点则递归
        this.data2TreeDG(childrenArr, datas);
      }
    })
    return dataArray;
  }
  /** 展开收缩树形节点 */
  collapse(array: any[], data, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.code === d.code);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  convertTreeToList(root: object) {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: true });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: true, parent: node });
        }
      }
    }
    return array;
  }
  visitNode(node, hashMap: object, array): void {
    if (!hashMap[node.code]) {
      hashMap[node.code] = true;
      array.push(node);
    }
  }
  /** 树形表格 数据处理 */
  dataInit() {
    this.dataRows.forEach(item => {
      this.expandDataCache[item.code] = this.convertTreeToList(item);
    });
  }
  /** 开关按钮 */
  async switchange(row) {

    if (row.status == 0) {
      row.status = 1;
    } else if (row.status == 1) {
      row.status = 0;
    }
    let res = await this.api.changePermissionStatus(row)

    if (res) this.message.create('success', row.name + ' 状态修改成功!', { nzDuration: 3000 })
  }


}
class Items {
  constructor(
    public appId?: String,
    public appName?: String,
    public name?: String,
    public sort?: Number,
    public type?: Number,
    public menuUrl?: String,
    public resourceName?: String,
    public parentId?: String,
    public code?: String,
    public authId?: String,
    public status?: Number,
    public icon?: String
  ) { }
}