import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ApiService } from '../../../shared/service/http-serve/api.service'
// import { HttpServe } from '../../../shared/service/http-serve/http-serve.service';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.less']
})
export class RoleManageComponent implements OnInit {

  /** 查询字段 */
  public searchItems = new Items();

  /** 表格数据 */
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
  treeLoading = true
  treeEvent: any

  /** 表单字段 */
  public modalItems = new Items();
  addForm: FormGroup;
  treeObj = {}
  treeData = []
  treeCheckedKeys = []
  selectedCheckBox = []

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    
    this.search(this.page.pageNum);
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      id: [],
      roleKey: [this.modalItems.roleKey, [Validators.required]],
      name: [this.modalItems.roleKey, [Validators.required]],
      remark: [this.modalItems.remark],
      status: [this.modalItems.status, [Validators.required]],
    })
    this.reset();
  }
  /** 查询 */
  async search(e) {
    this.page.pageNum = e
    let params = {
      name: this.searchItems.name,
      roleKey: this.searchItems.roleKey,
      status: this.searchItems.status,
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize
    }
    let res = await this.api.getRoleList(params)
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
    // this.searchItems = new Items();
    this.searchItems.status = '';
    this.addForm.reset()
    this.addForm.get('status').setValue(1)
  }
  /** 弹窗展示 */
  modalShow(title, status, data) {
    this.reset();
    this.modalTitle = title;
    this.modalStatus = status;
    if (status == 'edit') {
      for (let key in this.addForm.value) {
        this.addForm.get(key).setValue(data[key])
      }
    }
  }
  checkboxChange(event) {
    this.treeEvent = event

  }
  getSelectedKey(arr) {
    for (let i in arr) {
      this.selectedCheckBox.push(arr[i].key)
      if (arr[i].children) {
        this.getSelectedKey(arr[i].children)
      }
    }
  }
  /** 弹窗隐藏 */
  modalCancel() {
    if (this.modalStatus == 'auth') {
      this.tabsModal.destroy();
    } else {
      this.formModal.destroy();
    }
    this.reset();
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
    if (this.modalStatus == 'edit') {
      let res = await this.api.editRole(this.addForm.value)
      if (res) {
        this.message.create('success', '成功!', { nzDuration: 3000 });
        this.resetForm(e);
        this.modalCancel();
        this.search(1);
      }
    } else if (this.modalStatus == 'add') {
      let res = await this.api.addRole(this.addForm.value)
      if (res) {
        this.message.create('success', '成功!', { nzDuration: 3000 });
        this.modalCancel();
        this.search(1);
      }
    }
  }
  // 开关按钮
  async switchange(row) {
    if (row.status == 0) {
      row.status = 1;
    } else if (row.status == 1) {
      row.status = 0;
    }
    let res = await this.api.changeRoleStatus(row)
    this.loading = false;
    if (res) this.message.create('success', row.name + ' 状态修改成功!', { nzDuration: 3000 })
  }
  formModal: NzModalRef;
  tabsModal: NzModalRef;
  /** 带多选框的弹出层  */
  createFormModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.formModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: null
    })
  }
  /** 带多选框的弹出层  */
  createTabsModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tabsModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter
    })

  }
  // 树形
  // tabs
  tabs = [];
  selectedIndex = 0;
  appLists = [];

  authLists = [];
  roleStatus = false;
  roleId;
  appId;
  tabsSelectChange(tab) {
    this.appId = tab.appId;
    this.getAuth();
  }
  authSelectArr = [];
  async getApp(data) {
    this.selectedIndex = 0;
    this.authSelectArr = [];
    let apps = await this.api.getApps()
    if (apps) {
      this.appLists = [];
      this.appLists = apps;
      this.appId = this.appLists[0].appId;
      this.roleId = data.id;
      this.appLists.forEach(app => {
        this.authSelectArr[app.appId] = []
      })
      this.getAuth();

    }
  }
  getTrees(apps) {
    this.treeData = []
    this.treeObj = {}
    this.treeCheckedKeys = []

    for (let i in apps) {
      if (apps[i].checked) this.treeCheckedKeys.push(apps[i].id)
      if (!this.treeObj[apps[i].pId]) this.treeObj[apps[i].pId] = []
      let obj = { title: apps[i].name, key: apps[i].id, pid: apps[i].pId }
      this.treeObj[apps[i].pId].push(obj)
    }
    this.getTreesList(this.treeObj[this.appId])
    this.treeData = this.treeObj[this.appId] ? this.treeObj[this.appId] : []
    this.treeLoading = false
  }
  getTreesList(trees) {
    for (let i in trees) {
      if (this.treeObj[trees[i].key]) {
        trees[i]['children'] = this.treeObj[trees[i].key]
        this.getTreesList(this.treeObj[trees[i].key])
      } else {
        trees[i]['isLeaf'] = true
        if (parseInt(i) === (trees.length - 1)) return
      }
    }
  }

  async getAuth() {
    this.treeLoading = true
    let permissions = await this.api.getAppRoleAuth({ roleId: this.roleId, appId: this.appId })
    if (permissions) {
      this.getTrees(permissions)
    }

  }

  async postSelectAuth() {
    this.selectedCheckBox = []
    if (this.treeEvent) {
      let checkedKey = this.treeEvent.checkedKeys
      this.getSelectedKey(checkedKey)
    }
    this.treeCheckedKeys = this.selectedCheckBox
    let res = await this.api.editRoleAuthPermission({ roleId: this.roleId, appId: this.appId }, { permissionId: this.treeCheckedKeys })
    if (res) {
      this.message.create('success', '成功!', { nzDuration: 3000 });
      this.modalCancel();
      this.search(1);
    }
  }
}
class Items {
  constructor(
    public name?: String,
    public status?: any,
    public remark?: String,
    public roleKey?: String,
    public id?: String
  ) { }
}