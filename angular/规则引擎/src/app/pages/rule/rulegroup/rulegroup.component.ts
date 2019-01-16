import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../layout/service/http-serve.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { NzMessageService, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-rulegroup',
  templateUrl: './rulegroup.component.html',
  styleUrls: ['./rulegroup.component.less',],
})
export class RulegroupComponent implements OnInit {
  constructor(
    private http: HttpServe,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
  }
  // 声明变量
  loading = false;//控制下拉表格的loading
  data = [//后台获取到的原始对象
    // {
    //   "id": "1",
    //   "key": "1",
    //   "title": "分组1",
    //   "parentId": null,
    //   "name": "分组1",
    //   "status": 1,
    //   "createTime": "2018-08-01 15:02:19",
    //   "updateTime": "2018-08-01 15:02:19",
    //   "remark": "分组一",
    //   "children": [
    //     {
    //       "id": "11",
    //       "key": "11",
    //       "title": "分组1-分组1",
    //       "parentId": "1",
    //       "name": "分组1-分组1",
    //       "status": 1,
    //       "createTime": "2018-08-01 15:02:19",
    //       "updateTime": "2018-08-01 15:02:19",
    //       "remark": "分组1-分组1",
    //       "children": [{
    //         "id": "111",
    //         "key": "111",
    //         "title": "111",
    //         "parentId": "11",
    //         "name": "分组1-分组1-分组1",
    //         "status": 1,
    //         "createTime": "2018-08-01 15:02:19",
    //         "updateTime": "2018-08-01 15:02:19",
    //         "remark": "分组1-分组1",
    //         "children": null,
    //       }]
    //     },
    //     {
    //       "id": "12",
    //       "key": "12",
    //       "title": "12",
    //       "parentId": "1",
    //       "name": "分组1-分组2",
    //       "status": 1,
    //       "createTime": "2018-08-01 15:02:19",
    //       "updateTime": "2018-08-01 15:02:19",
    //       "remark": "分组1-分组1",
    //       "children": null,
    //     }
    //   ]
    // },
    // {
    //   "id": "2",
    //   "key": "2",
    //   "title": "2",
    //   "parentId": null,
    //   "name": "分组2",
    //   "status": 1,
    //   "createTime": "2018-08-01 15:02:19",
    //   "updateTime": "2018-08-01 15:02:19",
    //   "remark": "分组一",
    //   "children": [{
    //     "id": "21",
    //     "key": "2",
    //     "title": "2",
    //     "parentId": "2",
    //     "name": "分组2-分组1",
    //     "status": 1,
    //     "createTime": "2018-08-01 15:02:19",
    //     "updateTime": "2018-08-01 15:02:19",
    //     "remark": "分组1-分组1",
    //     "children": null,
    //   },]
    // }
  ];
  expandDataCache = {};//前端根据data生成的用于树形表格的对象
  nodes = [//前端根据data生成的用于树形下拉展示的对象
    new NzTreeNode({
      title: '',
      key: '',
    })
  ];
  public group: any = {//创建分组弹窗
    modalShow: false,//控制弹窗的显示隐藏
    title: '创建分组',//控制弹窗标题
    fatherGroup: true,//控制上级分组input按钮的启用禁用
    selectTreeShow: false,//控制弹窗树形下拉的显示隐藏
    submitDisable: false,//控制弹窗提交按钮的禁用
    modalLoading: false,//控制弹窗提交按钮的loading
  };
  public remove: any = {//删除分组弹窗
    id: '',
    modalShow: false,//控制弹窗的显示隐藏
    modalLoading: false,//控制弹窗提交按钮的loading
    title: '系统提示',//控制弹窗标题
  };
  groupForm: FormGroup;//创建分组表单

  //函数调用
  consol(arr) {//打印函数
    arr.forEach(item => {
      console.log(item)
    })
  }
  getTable() {//获取树形表格函数
    let that = this;
    that.loading = true
    this.http.getCustomHeaders("peak-decision/v1/decision/groupsTree").subscribe(res => {
      console.log(res);
      that.data = res.result
      that.loading = false
      that.getnodes(that, that.data)//在data中添加2个对象用于生成树形下拉
      that.nodes = [//前端根据data生成的用于树形下拉展示的对象
        new NzTreeNode({
          title: '',
          key: '',
        })
      ];
      that.data.forEach((item) => {//根据data生成的用于树形下拉展示的对象nodes
        that.nodes.push(
          new NzTreeNode({
            ...item
          })
        )
      })
      that.forNodes(that, that.nodes)//在生成的nodes中添加isLeaf对象控制能否展开
      that.getexpand(that, that.data, that.expandDataCache)//生成树形表格
    })
  }
  openall() {//展开全部树形表格
    let that = this;
    that.fordata(that, that.data, true)
    that.forexpand(that, true)
  }
  closeall() {//收起全部树形表格
    let that = this;
    that.fordata(that, that.data, false)
    that.forexpand(that, false)
  }
  fordata(that, list, status) {//修改data里所有的展开收起状态
    for (let i = 0; i < list.length; i++) {
      list[i].expand = status
      if (!!list[i].children) {
        that.fordata(that, list[i].children, status)
      }
    }
  }
  forexpand(that, status) {//修改expand里所有的展开收起状态
    that.data.forEach(item => {
      for (let i = 0; i < that.expandDataCache[item.id].length; i++) {
        that.expandDataCache[item.id][i].expand = status
      }
    })
  }
  getexpand(that, data, expandDataCache) {//修改了data里面的数据时需重新生成一个expandData用于渲染页面
    data.forEach(item => {
      expandDataCache[item.id] = that.convertTreeToList(item);
    });
  }
  collapse(array, data, $event: boolean) {//树形表格展开收起切换时触发
    if ($event === false) {
      if (data.item.children) {
        data.item.children.forEach(d => {
          const target = array.find(a => a.item.id === d.id);
          target.expand = false;
          target.loading = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  convertTreeToList(root: object) {//生成expandDataCache用于渲染树形表格
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push(
      {
        item: root,
        level: 1,
        expand: false,
        loading: false,
      }
    );

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.item.children) {
        for (let i = node.item.children.length - 1; i >= 0; i--) {
          stack.push(
            {
              item: node.item.children[i],
              level: node.level + 1,
              expand: false,
              loading: false,
              parent: node
            }
          );
        }
      }
    }
    return array;
  }
  visitNode(node, hashMap: object, array): void {//去除重复的对象
    if (!hashMap[node.item.id]) {
      hashMap[node.item.id] = true;
      array.push(node);
    }
  }
  groupModalShow(id, title, list, type) {//点击弹出创建分组弹窗
    let that = this;
    that.group.modalShow = true;
    that.group.modalShow = true;
    if (!title) {
      title = '---'
    }
    that.groupForm.get('id').setValue(list.id)
    that.groupForm.get('fatherGroup').setValue(title)
    that.groupForm.get('parentId').setValue(id)
    if (list) {
      that.group.title = '修改'
      that.groupForm.get('name').setValue(list.name)
      that.groupForm.get('remark').setValue(list.remark)
    } else {
      that.group.title = '创建'
    }
    if (type == 'add') {//添加下级
      that.group.fatherGroup = false;//下拉框禁用
    } else {//非添加下级
      that.group.fatherGroup = true;//下拉框启用
    }
    if (type == 'edit') {//编辑，树形表格部分禁用
      // 编辑时把父级id和本身id传入，父级id控制选中状态，自身id控制禁用状态
      that.resetNodes(that, that.nodes, list.id, id, true)
    } else {//非编辑，树形表格全部可用
      // 非编辑时控制选中状态
      that.resetNodes(that, that.nodes, id, id, true)
    }
  }
  choiceFatherGroup(type) {//点击上级分组input(模拟select)
    if (type) {
      this.group.selectTreeShow = !this.group.selectTreeShow
    }
  }
  groupModelCancel(): void {//点击创建分组取消按钮
    this.group.modalShow = false;
    this.group.selectTreeShow = false;
    this.groupForm = this.fb.group({//创建分组弹窗表单生成
      name: ['', [Validators.required]],
      id: [''],
      fatherGroup: [''],
      parentId: [''],
      remark: [''],
    });
  }
  groupModelOk(): void {//点击创建/修改分组确认按钮
    let that = this;
    that.group.modalLoading = true;
    let name = that.groupForm.value.name;
    let id = that.groupForm.value.id;
    let parentId = that.groupForm.value.parentId;
    let remark = that.groupForm.value.remark;
    if (that.group.title == '创建') {//创建分组
      this.http.postCustomHeaders(
        'peak-decision/v1/decision/group',
        {
          name: name,
          parentId: parentId,
          remark: remark
        }
      ).subscribe(res => {
        console.log(res);
        if (res.code == 200) {
          that.message.create('success', `创建分组成功`, { nzDuration: 2000 });
          that.group.modalShow = false;
          that.group.selectTreeShow = false;
          that.groupForm = that.fb.group({//创建分组弹窗表单生成
            name: ["", [Validators.required]],
            id: [''],
            fatherGroup: [""],
            parentId: [""],
            remark: [""],
          });
          that.getTable()
        } else {
          that.message.create('error', `创建分组失败，${res.reason}`, {});
        }
        that.group.modalLoading = false;
      })
    } else {//修改分组
      this.http.putCustomHeaders(
        `peak-decision/v1/decision/groups/${id}`,
        {
          name: name,
          parentId: parentId,
          remark: remark
        }
      ).subscribe(res => {
        console.log(res);
        if (res.code == 200) {
          that.message.create('success', `修改分组成功`, { nzDuration: 2000 });
          that.group.modalShow = false;
          that.group.selectTreeShow = false;
          that.groupForm = that.fb.group({//创建分组弹窗表单生成
            name: ["", [Validators.required]],
            id: [''],
            fatherGroup: [""],
            parentId: [""],
            remark: [""],
          });
          that.getTable()
        } else {
          that.message.create('error', `修改分组失败，${res.reason}`, {});
        }
        that.group.modalLoading = false;
      })
    }
  }
  removeModalShow(id) {//点击弹出删除分组弹窗
    this.remove.id = id;
    this.remove.modalShow = true;
  }
  removeModelCancel(): void {//点击删除分组取消按钮
    this.remove.modalShow = false;
  }
  removeModelOk(): void {//点击删除分组确认按钮
    let that = this;
    that.remove.modalLoading = true;
    let id = that.remove.id
    that.http.deleteCustomHeaders(
      `peak-decision/v1/decision/groups/${id}`
    ).subscribe(res => {
      console.log(res);
      if (res.code == 200) {
        that.message.create('success', `删除分组成功`, { nzDuration: 2000 });
        that.getTable()
      } else {
        that.message.create('error', `删除分组失败，${res.reason}`, {});
      }
      that.remove.modalShow = false;
      that.remove.modalLoading = false;
    })
  }
  getnodes(that, data) {//在data中添加2个对象用于树形下拉的展示
    data.forEach((item) => {
      if (!!item.children) {
        that.getnodes(that, item.children)
      }
    })
  }
  forNodes(that, list) {//对生成的nodes进行修改格式化
    list.forEach(item => {
      if (!!item.children && item.children.length > 0) {
        item.isLeaf = false;
        that.forNodes(that, item.children)
      } else {
        item.isLeaf = true;
      }
    });
  }
  mouseAction(e: any): void {//点击树形下拉节点进行的操作
    let that = this;
    if (e.node.isDisabled) {//如果该节点被禁用
    } else {//如果该节点没被禁用
      that.groupForm.get('fatherGroup').setValue(e.node.title)
      that.groupForm.get('parentId').setValue(e.node.origin.key)
      that.group.selectTreeShow = false
      e.node.isSelected = true
    }
  }
  resetNodes(that, data, key, id, status) {//将下拉表格状态重置（key为父级id或自身id，id为自身id）
    data.forEach(item => {
      item.isDisabled = !status//视觉禁用
      if (item.origin.key == id) {//父级或自身id判定选中状态
        item.isSelected = true;//选中
      } else {
        item.isSelected = false;//不选中
      }
      if (item.origin.key == key) {//自身id判定禁用状态
        let status = false;
        item.isDisabled = !status
        item.isExpanded = status//展开
        if (!!item.children && item.children.length > 0) {
          that.resetNodes(that, item.children, key, id, status)
        }
      } else {
        // item.isSelected = false;
        item.isExpanded = status//展开
        if (!!item.children && item.children.length > 0) {
          that.resetNodes(that, item.children, key, id, status)
        }
      }
    })
  }

  // 生命周期函数
  ngOnInit() {
    let that = this;
    that.getTable();//获取后台树形数组
    that.groupForm = that.fb.group({//创建分组弹窗表单生成
      name: ['', [Validators.required]],
      id: [''],
      fatherGroup: [''],
      parentId: [''],
      remark: [''],
    });
  }

}
