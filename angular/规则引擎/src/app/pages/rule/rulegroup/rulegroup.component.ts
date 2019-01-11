import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../layout/service/http-serve.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { NzMessageService, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-rulegroup',
  templateUrl: './rulegroup.component.html',
  styleUrls: ['./rulegroup.component.css',],
})
export class RulegroupComponent implements OnInit {
  constructor(
    private http: HttpServe,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
  }

  loading = false;//控制下拉表格的loading
  data = [//后台获取到的原始对象
    {
      "id": "1",
      "key": "1",
      "title": "分组1",
      "parentId": null,
      "name": "分组1",
      "status": 1,
      "createTime": "2018-08-01 15:02:19",
      "updateTime": "2018-08-01 15:02:19",
      "remark": "分组一",
      "children": [
        {
          "id": "11",
          "key": "11",
          "title": "分组1-分组1",
          "parentId": "1",
          "name": "分组1-分组1",
          "status": 1,
          "createTime": "2018-08-01 15:02:19",
          "updateTime": "2018-08-01 15:02:19",
          "remark": "分组1-分组1",
          "children": [{
            "id": "111",
            "key": "111",
            "title": "111",
            "parentId": "11",
            "name": "分组1-分组1-分组1",
            "status": 1,
            "createTime": "2018-08-01 15:02:19",
            "updateTime": "2018-08-01 15:02:19",
            "remark": "分组1-分组1",
            "children": null,
          }]
        },
        {
          "id": "12",
          "key": "12",
          "title": "12",
          "parentId": "1",
          "name": "分组1-分组2",
          "status": 1,
          "createTime": "2018-08-01 15:02:19",
          "updateTime": "2018-08-01 15:02:19",
          "remark": "分组1-分组1",
          "children": null,
        }
      ]
    },
    {
      "id": "2",
      "key": "2",
      "title": "2",
      "parentId": null,
      "name": "分组2",
      "status": 1,
      "createTime": "2018-08-01 15:02:19",
      "updateTime": "2018-08-01 15:02:19",
      "remark": "分组一",
      "children": [{
        "id": "21",
        "key": "2",
        "title": "2",
        "parentId": "2",
        "name": "分组2-分组1",
        "status": 1,
        "createTime": "2018-08-01 15:02:19",
        "updateTime": "2018-08-01 15:02:19",
        "remark": "分组1-分组1",
        "children": null,
      },]
    },
    // {
    //   "id": "111111111111",
    //   "parentId": null,
    //   "name": "分组1",
    //   "status": 1,
    //   "createTime": "2018-08-01 15:02:19",
    //   "updateTime": "2018-08-01 15:02:19",
    //   "remark": "分组一",
    //   "children": [{
    //     "id": "2222222222",
    //     "parentId": "111111111111",
    //     "name": "分组1-分组1",
    //     "status": 1,
    //     "createTime": "2018-08-01 15:02:19",
    //     "updateTime": "2018-08-01 15:02:19",
    //     "remark": "分组1-分组1",
    //     "children": null,
    //   },
    //   {
    //     "id": "33333333",
    //     "parentId": "111111111111",
    //     "name": "分组1-分组2",
    //     "status": 1,
    //     "createTime": "2018-08-01 15:02:19",
    //     "updateTime": "2018-08-01 15:02:19",
    //     "remark": "分组1-分组2",
    //     "children": [{
    //       "id": "444444",
    //       "parentId": "33333333",
    //       "name": "分组1-分组2-分组1",
    //       "status": 1,
    //       "createTime": "2018-08-01 15:02:19",
    //       "updateTime": "2018-08-01 15:02:19",
    //       "remark": "分组1-分组2-分组1",
    //       "children": null,
    //     }]
    //   }
    //   ]
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
    selectTreeShow: false,//控制弹窗属性下拉的显示隐藏
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

  consol(arr) {//打印函数
    arr.forEach(item => {
      console.log(item)
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
    console.log(data)
    console.log(expandDataCache)
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
    that.groupForm.get('fatherGroup').setValue(title)
    that.groupForm.get('fatherGroupId').setValue(id)
    if (list) {
      that.group.title = '修改分组'
      that.groupForm.get('name').setValue(list.name)
      that.groupForm.get('remark').setValue(list.remark)
    } else {
      that.group.title = '创建分组'
    }
    if (type == 'add') {//添加下级
      that.group.fatherGroup = false;//下拉框禁用
    } else {//非添加下级
      that.group.fatherGroup = true;//下拉框启用
    }
    // that.resetNodes(that, that.nodes, id)//将下拉表格状态重置为需要的状态
    if (type == 'edit') {//编辑，树形表格部分禁用
      that.resetNodes(that, that.nodes, id, 'edit', true)
    } else {//非编辑，树形表格全部可用
      that.resetNodes(that, that.nodes, id, '', true)
    }
    console.log(that.nodes)
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
      name: [null, [Validators.required]],
      fatherGroup: [null],
      fatherGroupId: [null],
      remark: [null],
    });
  }
  groupModelOk(): void {//点击创建分组确认按钮
    let that = this;
    console.log(this.groupForm.value)
    that.group.modalLoading = true;
    setTimeout(() => {
      this.group.modalShow = false;
      that.group.modalLoading = false;
      this.group.selectTreeShow = false;
      this.groupForm = this.fb.group({//创建分组弹窗表单生成
        name: [null, [Validators.required]],
        fatherGroup: [null],
        fatherGroupId: [null],
        remark: [null],
      });
    }, 2000)
  }
  removeModalShow(id) {//点击弹出创建分组弹窗
    this.remove.id = id;
    this.remove.modalShow = true;
  }
  removeModelCancel(): void {//点击创建分组取消按钮
    this.remove.modalShow = false;
  }
  removeModelOk(): void {//点击创建分组确认按钮
    console.log(this.remove.id);
    this.remove.modalShow = false;
  }

  getnodes(that, data) {//在data中添加2个对象用于树形下拉的展示
    data.forEach((item) => {
      item.key = item.id;
      item.title = item.name;
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
    console.log(e, that.nodes);
    if (e.node.isDisabled) {//如果该节点被禁用

    } else {//如果该节点没被禁用
      that.groupForm.get('fatherGroup').setValue(e.node.title)
      that.groupForm.get('fatherGroupId').setValue(e.node.origin.key)
      that.group.selectTreeShow = false
      e.node.isSelected = true
    }
  }
  resetNodes(that, data, key, type, status) {//将下拉表格状态重置
    data.forEach(item => {
      console.log(item)
      item.isDisabled = !status//视觉禁用
      if (item.key == key) {
        item.isSelected = true;//选中
        let status = false;
        item.isExpanded = status//展开
        if (!!item.children && item.children.length > 0) {
          that.resetNodes(that, item.children, key, type, status)
        }
      } else {
        item.isSelected = false;
        item.isExpanded = status//展开
        if (!!item.children && item.children.length > 0) {
          that.resetNodes(that, item.children, key, type, status)
        }
      }
    })
  }


  // 生命周期函数
  ngOnInit() {
    let that = this;
    that.getnodes(that, this.data)//在data中添加2个对象用于生成树形下拉
    that.data.forEach((item) => {//根据data生成的用于树形下拉展示的对象nodes
      that.nodes.push(
        new NzTreeNode({
          ...item
        })
      )
    })
    that.forNodes(that, this.nodes)//在生成的nodes中添加isLeaf对象控制能否展开
    that.getexpand(that, this.data, that.expandDataCache)//生成树形表格
    this.groupForm = this.fb.group({//创建分组弹窗表单生成
      name: [null, [Validators.required]],
      fatherGroup: [null],
      fatherGroupId: [null],
      remark: [null],
    });
  }

}
