import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { TreeviewItem } from '../../../../../node_modules/ngx-treeview/src/treeview-item';
declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: [
    '../../../../assets/icon/menu/iconfont.css',
    '../../../../assets/icon/operate/iconfont.css',
    './employee.component.scss'
  ]
})
export class EmployeeComponent implements OnInit {

  public items;
  public nodes;
  public selectedNodes;
  public modalTitle: String;
  public modalStatus;
  public department;
  public userInfo;

  public total;
  public totalPage;
  public pageNum;

  rows = [];
  toast = {
    "position": 'center-center',
    "title": '提示',
    "msg": '',
    "showClose": true,
    "theme": 'material',
    "type": 'success',
    "closeOther": false
  };

  public selectData = [];
  public userId;
  public checkAuth: boolean;
  public roleAuthLists = [];
  public roleSelect = { "roleId": [] };

  public roleSelectCheck = [];

  public roleSelectList = [];

  public userStatus: boolean;

  public taskList = [];
  public taskSelectList=[];

  constructor(
    private http: HttpServe,
    private toastyService: ToastyService
  ) {
    this.userStatus = true;
    this.items = new Items();
    this.userInfo = new Items();
  }

  setting = {
    view: {
      showLine: false,
      showIcon: false,
      showTitle: false,
      fontCss: { color: "#333!important" },
      nameIsHTML: true,
      // dblClickExpand: false
    },
    check: {
      enable: true,
      chkboxType: { "Y": "ps", "N": "ps" }
    },
    data: {
      simpleData: {
        enable: true
      }
    }
  };
  zNodes = [];

  ngOnInit() {
    this.items.status = '';
    this.items.departmentId = '';
    this.getDepartment();
    this.search(1, '');
  }
  // 查询
  search(e, type) {
    if (!type) {
      this.items = new Items();
      this.items.status = '';
      this.items.departmentId = '';
    }
    if (this.items.account || this.items.name || this.items.mobile || this.items.departmentId) {
      this.items.account = this.items.account;
      this.items.name = this.items.name;
      this.items.mobile = this.items.mobile;
      this.items.departmentId = this.items.departmentId;
    }
    this.http.getCustomHeaders(
      "v1/resource/user?account="
      + (this.items.account ? encodeURIComponent(this.items.account) : '')
      + "&name=" + (this.items.name ? encodeURIComponent(this.items.name) : '')
      + "&mobile=" + (this.items.mobile ? encodeURIComponent(this.items.mobile) : '')
      + "&status=" + (this.items.status ? this.items.status : '')
      + "&departmentId=" + (this.items.departmentId ? this.items.departmentId : '')
      + "&pageNum=" + e
      + "&pageSize=" + 10
    ).subscribe(res => {
      this.rows = res.result.list;
      this.total = res.result.total;
      this.totalPage = res.result.pages;
      this.pageNum = res.result.pageNum;
    })
  }
  // 重置
  reset() {
    this.items = new Items();
    this.items.status = '';
    this.items.departmentId = '';
  }
  // 修改弹出层的标题
  changeTitle(title, status) {
    this.modalTitle = title;
    this.modalStatus = status;
  }
  // 获取允许使用的部门列表
  getDepartment() {
    this.http.getCustomHeaders('v1/resource/department')
      .subscribe(res => {
        this.department = res.result;
        // console.log(this.department)
      })
  }
  // 修改状态开关
  switchange(row) {
    var status = { "status": null };
    if (row.status == 0) {
      status.status = 1;
    } else if (row.status == 1) {
      status.status = 0;
    }
    this.http.patchCustomHeaders("/v1/resource/user/" + row.id, status)
      .subscribe(res => {
        // console.log(res)
        if (res.code == '200') {
          this.toast.msg = '状态修改成功';
          this.toast.type = 'success';
          this.addToast(this.toast);
        } else {
          this.toast.msg = res.reason;
          this.toast.type = 'error';
          this.addToast(this.toast);
        }
        this.rows = [];
        this.search(1, '');
      })
  }
  // 获取用户详细信息
  user(id) {
    this.http.getCustomHeaders("v1/resource/user/" + id)
      .subscribe(res => {
        console.log(res.result);
        this.userInfo = res.result;
      })
  }
  // 无操作弹出层 打开
  openMyModal(event, row) {
    document.querySelector('#' + event).classList.add('md-show');
    this.user(row.id);
  }
  // 无操作弹出层 关闭
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  // 重置密码
  resetPass(row) {
    if (row.status == 0) {
      this.toast.msg = "员工被禁用，不能执行该操作!";
      this.toast.type = "warning";
      this.addToast(this.toast);
    } else {
      this.http.patchCustomHeaders("v1/resource/user/resetpass/" + row.id, "")
        .subscribe(res => {
          let code = res.code;
          if (code == '200') {
            this.toast.msg = "重置密码成功！";
            this.toast.type = "success";
            this.addToast(this.toast);
            this.search(1, '');
          } else {
            this.toast.msg = res.reason;
            this.toast.type = "error";
            this.addToast(this.toast);
          }
        })
    }
  }
  // toast提示
  addToast(options) {
    console.log(options)
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

  // 获取行政区域
  getArea(value) {
    if (value.status == 0) {
      this.userStatus = false;
    } else {
      this.userStatus = true;
    }
    this.userId = value.id;
    $.fn.zTree.init($("#ztree"));
    this.http.getCustomHeaders("v1/resource/region/" + this.userId + "/tree")
      .subscribe(res => {
        this.zNodes = res.result;
        $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
      })
  }
  // 获取选中的行政区域
  selectTree() {
    let treeObj = $.fn.zTree.getZTreeObj("ztree");
    this.selectedNodes = treeObj.getNodesByParam("checked", true, null);
    var selectedNodesId = { "areaId": [] };
    var count = 0;
    for (var i = 0; i < this.selectedNodes.length; i++) {
      selectedNodesId.areaId[count] = this.selectedNodes[i].id;
      count++;
    }
    // console.log(selectedNodesId)
    // console.log(this.userId)
    this.http.postCustomHeaders("v1/resource/user/" + this.userId + "/area", selectedNodesId)
      .subscribe(res => {
        console.log(res)
        let code = res.code;
        if (code == '200') {
          this.toast.msg = "成功";
          this.toast.type = "success";
          this.addToast(this.toast);
        } else {
          this.toast.msg = res.reason;
          this.toast.type = "error";
          this.addToast(this.toast);
        }
        this.rows = []
        this.search(1, '');
      })
  }
  getRoleAuth(id) {
    this.http.getCustomHeaders("v1/resource/role/user/" + id)
      .subscribe(res => {
        this.roleAuthLists=[];
        setTimeout(() => {
          this.roleAuthLists = res.result;
          // console.log(this.roleAuthLists)
          for (var i = 0; i < this.roleAuthLists.length; i++) {
            if (this.roleAuthLists[i].disable == '1') {
              this.roleSelect.roleId.push(this.roleAuthLists[i].roleId)
            }
          }
          this.roleSelectList = this.roleSelect.roleId;
          // console.log(this.roleSelect.roleId)
          // console.log(this.roleSelectList)
        }, 10);
      })
  }
  // 角色指派
  role(value) {
    if (value.status == 0) {
      this.userStatus = false;
    } else {
      this.userStatus = true;
    }
    this.roleSelect.roleId = [];
    this.roleSelectList = [];
    this.userId = value.id;
    this.getRoleAuth(this.userId);
    
    
    // this.http.postCustomHeaders("v1/resource/user/"+this.userId+"/role",)
  }
  checkChange(item) {
    // console.log(this.roleSelect.roleId);
    // console.log(item);
    // console.log(item.disable)
    if (item.disable == '1') {
      item.disable = '0';
      if (this.roleSelect.roleId.length > 0) {
        this.roleSelect.roleId = this.roleSelect.roleId.filter(e => e != item.roleId);
      }
    } else if (item.disable == '0') {
      item.disable = '1';
      this.roleSelect.roleId.push(item.roleId);
    }
    // console.log(item.disable)
    // console.log(this.roleSelect);
  }
  roleAuthChecked() {
    if (this.roleSelectList.length === 0 && this.roleSelect.roleId.length === 0) {
      this.toast.msg = "请选择角色";
      this.toast.type = "warning";
      this.addToast(this.toast);
    } else {
      this.http.postCustomHeaders("v1/resource/user/" + this.userId + "/role", this.roleSelect.roleId)
        .subscribe(res => {
          let code = res.code;
          if (code == '200') {
            this.toast.msg = "成功";
            this.toast.type = "success";
            this.addToast(this.toast);
            this.rows = [];
            this.search(1, '');
          } else {
            this.toast.msg = res.result;
            this.toast.type = "error";
            this.addToast(this.toast);
          }
        });
    }
  }

  // 获取任务权限
  getTask(row){
    console.log(row)
    this.userId=row.id;
    this.http.getCustomHeaders("v1/resource/processData/"+this.userId+"?parentCode=processNode").subscribe(res => {
      this.taskList=res.result;
      this.taskList.forEach(value => {
        if(value.disable){
          this.taskSelectList.push({"userId":this.userId,"processItemId":value.id})
        }
      })
    })
  }
  // 任务权限指派
  taskSelect(item){
    if(!item.disable){
      let value={"userId":this.userId,"processItemId":item.id};
      this.taskSelectList.push(value);
    }else{
      if(this.taskSelectList.length>0){
        this.taskSelectList=this.taskSelectList.filter(e => e.processItemId != item.id)
      }
    }
    item.disable = !item.disable;
  }
  postTask(){
    this.http.postCustomHeaders("v1/resource/processData/"+this.userId,this.taskSelectList).subscribe(res => {
      console.log(res)
      if(res.code=='200'){
        this.toast.msg = "任务权限指派成功";
        this.toast.type = "success";
        this.addToast(this.toast);
      }else{
        this.toast.msg = res.reason;
        this.toast.type = "error";
        this.addToast(this.toast);
      }
      this.clearData();
    })
  }

  clearData(){
    this.taskList=[];
    this.taskSelectList=[];
  }

  changePage(e) {
    this.search(e, '');
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