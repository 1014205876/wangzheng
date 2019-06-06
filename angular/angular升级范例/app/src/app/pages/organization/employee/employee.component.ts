import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  NzMessageService,
  NzModalRef,
  NzModalService,
  NzFormatEmitEvent,
  NzTreeNodeOptions
} from 'ng-zorro-antd';
import { ApiService } from '../../../shared/service/http-serve/api.service'
// declare var $: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {

  /** 查询字段 */
  public searchItems;
  public department = [];
  /** 用户的详细信息 */
  public userInfo

  /** 表格数据 */
  rows = [];
  page = {
    total: 1,         //总条数
    totalPage: 1,     //总页数
    pageNum: 1,        //当前页码
    pageSize: 10      //每页展示多少条数据
  }
  loadingDelay = 500;

  /** 弹窗展示字段 */
  show = false;
  loading = false;
  modalStatus;
  modalTitle;
  spinning = true

  /** 带多选框的弹窗 */
  checkboxModal: NzModalRef;
  checkboxData = [];
  /** 用户是否有权限 做 数据权限指派 */
  userStatus = false;
  /** 选中的所有数据列表 */
  selectList = [];
  /** 用户ID */
  userId;

  /** 带树形结构的弹出层 */
  treeModal: NzModalRef;
  treeObj = {}
  treeData = []
  treeChecked = []
  selectedCheckBox = []
  treeLoading = true
  treeParent = []
  /** 树形结构 */
  public treeSet = {
    "expandKeys": [],
    "checkedKeys": [],
    "selectedKeys": [],
    "expandDefault": false
  }

  nodes = [];
  areaTopId = '100000'
  selectedNodes;
  treeEvent: any

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private api: ApiService
  ) {
    this.userInfo = new Items();
  }
  ngOnInit() {
    this.spinning = true
    this.reset();
    this.search(1);
    this.getDepartment();
  }
  reset() {
    this.searchItems = new Items();
    this.searchItems.status = "";
    this.searchItems.departmentId = "";
  }
  /** 查询 */
  async search(e) {
    let params = {
      account: this.searchItems.account,
      name: this.searchItems.name,
      mobile: this.searchItems.mobile,
      status: this.searchItems.status,
      departmentId: this.searchItems.departmentId,
      pageNum: e,
      pageSize: this.page.pageSize
    }
    let res = await this.api.getEmployees(params)
    if (res) {
      this.rows = [];
      this.rows = res.list;
      this.page.total = res.total;
      this.page.totalPage = res.pages;
      this.page.pageNum = res.pageNum;
      this.spinning = false
    }

  }
  /** 获取允许使用的部门列表 */
  async getDepartment() {
    let res = await this.api.getDepartment()
    this.department = res
  }
  /** 带多选框的弹出层  */
  createCheckboxModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.checkboxModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter
    })
  }

  modalShow(status, title) {
    this.modalStatus = status;
    this.modalTitle = title;
  }
  /** 关闭弹窗 */
  modalCancel() {
    this.loading = false;
    this.checkboxModal.destroy();
    this.checkboxData = [];
    this.selectList = [];
    this.treeData = []
  }
  /** 确定 */
  modalSure() {
    this.loading = true;
    if (this.modalStatus == 'roleAuth') {
      this.postRoleAuth();
    }
    if (this.modalStatus == 'taskAuth') {
      this.postTask();
    }
    if (this.modalStatus == 'dataAuth') {
      this.selectTree();
    }
  }
  /** 重置密码 */
  async resetPass(data) {
    if (data.status == 0) {
      this.message.create('warning', "员工被禁用，不能执行该操作!", { nzDuration: 3000 });
    } else {
      let res = await this.api.resetUserPass(data.id)
      if (res) {
        this.message.create('success', "重置密码成功！", { nzDuration: 3000 });
        this.reset();
        // this.search(this.page.pageNum);
      }
    }
  }
  /** 角色指派 */
  role(value) {
    if (value.status == 0) {
      this.userStatus = false;
    } else {
      this.userStatus = true;
    }
    this.selectList = [];
    this.userId = value.id;
    this.getRoleAuth(this.userId);
  }
  /** 获取角色权限 */
  async getRoleAuth(id) {
    let res = await this.api.getRoleAuth(id)
    if (res) {
      this.checkboxData = [];
      this.selectList = [];
      this.checkboxData = res;
      for (let i in this.checkboxData) {
        if (this.checkboxData[i].disable == '0') {
          this.checkboxData[i].disable = false;
        }
        if (this.checkboxData[i].disable == '1') {
          this.checkboxData[i].disable = true;
          this.selectList.push(this.checkboxData[i].roleId);
        }
      }
    }
  }
  /** 提交角色权限修改 */
  async postRoleAuth() {
    if (this.selectList.length == 0) {
      this.loading = false;
      this.message.create('warning', "请选择角色", { nzDuration: 3000 });
    } else {
      let res = await this.api.editRoleAuth(this.userId, this.selectList)
      this.loading = false;
      if (res) {
        this.message.create('success', "成功", { nzDuration: 3000 });
        this.reset();
        this.search(1);
        this.checkboxModal.destroy();
        this.checkboxData = [];
        this.selectList = [];
      }
    }
  }
  /** 任务权限指派 */
  async getTask(data) {
    this.userId = data.id;
    let res = await this.api.getTask(this.userId)
    if (res) {
      this.checkboxData = [];
      this.selectList = [];
      this.checkboxData = res;
      this.checkboxData.forEach(value => {
        if (value.disable) {
          this.selectList.push({ "userId": this.userId, "processItemId": value.id })
        }
      })
    }
  }
  /** 提交任务权限指派 */
  async postTask() {


    let res = await this.api.editTask(this.userId, this.treeChecked)
    this.loading = false;
    if (res) {
      this.message.create('success', "任务权限指派成功", { nzDuration: 3000 });
      this.reset();
      this.search(1);
      this.checkboxModal.destroy();
      this.checkboxData = [];
      this.selectList = [];
    }
  }
  /** 改变checkbox的选择状态 */
  checkChange(item) {
    var value;
    if (this.modalStatus == 'roleAuth') {
      value = item.roleId;
    }
    if (this.modalStatus == 'taskAuth') {
      value = { "userId": this.userId, "processItemId": item.id };
    }
    if (!item.disable) {
      if (this.selectList.length > 0) {
        if (value.processItemId) {
          this.selectList = this.selectList.filter(e => e.processItemId != value.processItemId)
        } else {
          this.selectList = this.selectList.filter(e => e != value);
        }
      }
    }
    if (item.disable) {
      this.selectList.push(value);
    }
  }
  /** 带树形结构的弹出层 */
  /** 数据权限指派 */
  // 获取行政区域
  async getArea(value) {
    if (value.status == 0) {
      this.userStatus = false;
    } else {
      this.userStatus = true;
    }
    this.userId = value.id;
    this.treeLoading = true
    this.api.getUserRegionAuthTree(this.userId).then(res => {
      this.areaTopId = res[0].pId
      this.getTrees(res)
    })

  }
  getTrees(apps) {
    this.treeData = []
    this.treeObj = {}
    this.treeChecked = []

    for (let i in apps) {

      if (!this.treeObj[apps[i].pId]) this.treeObj[apps[i].pId] = []
      let obj = { title: apps[i].name, key: apps[i].id, pid: apps[i].pId, checked: apps[i].checked }
      if (apps[i].checked) {
        this.treeChecked.push(obj)
      }
      this.treeObj[apps[i].pId].push(obj)
    }    
    this.getSelectTree(this.treeChecked)
    this.treeData = this.treeObj[this.areaTopId] ? this.treeObj[this.areaTopId] : []
    this.treeLoading = false

  }
  judgeTreeLeaf(arr) {
    if (!this.treeObj[arr[0].key]) {
      arr.forEach(element => {
        element['isLeaf'] = true
      })
    }
    return arr
  }
  getSelectTree(treeChecked) {
    
    for (let i in treeChecked) {
      let arr = treeChecked[i].key.match(/\d{2}/gi);
      if (arr[2] !== '00') {
        this.appendChild(this.treeObj[arr[0] + '0000'], arr[0] + arr[1] + '00')
        this.appendChild(this.treeObj[this.areaTopId], arr[0] + '0000')
      } else if (arr[1] !== '00') {
        this.appendChild(this.treeObj[this.areaTopId], arr[0] + '0000')
      }
    }


  }
  appendChild(arr, value) {
    for (let i in arr) {
      if (arr[i].key === value) {
        this.judgeTreeLeaf(this.treeObj[value])
        arr[i]['children'] = this.treeObj[value]
      }
    }
  }
  asyncLoadingTree(event: Required<NzFormatEmitEvent>): void {
    if (event.eventName === 'expand') {
      const node = event.node
      if (node && node.getChildren().length === 0 && node.isExpanded) {
        let nodes = this.judgeTreeLeaf(this.treeObj[event.node.key])
        node.addChildren(nodes)
      }
    }
  }
  // 获取选中的行政区域
  async selectTree() {
    this.selectedCheckBox = []
    if (this.treeEvent) {
      let checkedKey = this.treeEvent.checkedKeys
      this.getSelectedKey(checkedKey)
    }
    let res = await this.api.editUserSelectArea(this.userId, { areaId: this.selectedCheckBox })
    this.loading = false
    if (res) {
      this.message.create('success', "成功", { nzDuration: 3000 });
      this.checkboxModal.destroy();
      this.reset();
      this.search(1);
    }
  }
  checkboxChange(event) {
    this.treeEvent = event

  }
  getSelectedKey(arr) {
    for (let i in arr) {
      this.selectedCheckBox.push(arr[i].key)
      if (this.treeObj[arr[i].key]) {
        this.getSelectedKey(this.treeObj[arr[i].key])
      }
    }
  }
  // 获取用户详细信息
  async getUserInfo(id) {
    let res = await this.api.getUserInfo(id)
    this.userInfo = res
  }
  // 开关按钮
  async switchange(row) {
    // this.loading = true;
    if (row.status == 0) {
      row.status = 1;
    } else if (row.status == 1) {
      row.status = 0;
    }
    let res = await this.api.changeUserStatus(row)
    if (res) {
      this.message.create('success', row.name + ' 状态修改成功!', { nzDuration: 3000 })
      this.reset();
      // this.search(1);
    }
  }
  /** 翻页 */
  changePage(e) {
    this.search(e);
  }

}

class Items {
  constructor(
    public account?: String,
    public name?: String,
    public mobile?: String,
    public status?: any,
    public departmentId?: String
  ) { }
}
