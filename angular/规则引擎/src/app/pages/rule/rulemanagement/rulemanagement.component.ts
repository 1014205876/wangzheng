import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../layout/service/http-serve.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { NzMessageService, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-rulemanagement',
  templateUrl: './rulemanagement.component.html',
  styleUrls: ['./rulemanagement.component.less']
})
export class RulemanagementComponent implements OnInit {
  constructor(
    private http: HttpServe,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
  }

  public find: any = {//用于find区域的数据
    name: '',
    id: '',
    selectTreeShow: false,//控制树形下拉的显示隐藏
    group: '',
    groupId: '',
    pageNum: 1,//页码数
    pageSize: 10,//每页条数
    total: 1,
  }

  treeData = [//后台获取到的树形表格对象
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
  nodesFind = [//前端根据data生成的用于find区域树形下拉展示的对象
    new NzTreeNode({
      title: '',
      key: '',
    })
  ];
  nodesTable = [//前端根据data生成的用于table区域树形下拉展示的对象
    // new NzTreeNode({
    //   title: '',
    //   key: '',
    // })
  ];
  tableSelectTreeShow = false;//table区域树形下拉的显示隐藏
  checkArr = [];//存放复选框选中的id
  allChecked = false;//控制全选复选框的选中状态
  indeterminate = false;//控制全选复选框的图标状态
  displayData = [];//当tableData改变时生成的tableData改变后的复制
  loading=false;//控制表格的loading状态
  tableData = [//用于table表格的数据展示
    // {
    //   "id": "1111111111",
    //   "name": "规则1",
    //   "version": "v1",
    //   "groupId": "1111",
    //   "groupName": "分组1",
    //   "rule": "",
    //   "createTime": "2018-08-06 18:36:39",
    //   "updateTime": "2018-08-06 18:36:39"
    // },
    // {
    //   "id": "2222222",
    //   "name": "规则2",
    //   "version": "v1",
    //   "groupId": "1111",
    //   "groupName": "分组1",
    //   "rule": "",
    //   "createTime": "2018-08-06 18:36:39",
    //   "updateTime": "2018-08-06 18:36:39"
    // },
    // {
    //   "id": "33333333",
    //   "name": "规则3",
    //   "version": "v1",
    //   "groupId": "1111",
    //   "groupName": "分组1",
    //   "rule": "",
    //   "createTime": "2018-08-06 18:36:39",
    //   "updateTime": "2018-08-06 18:36:39"
    // }
  ];

  consol(arr) {//打印函数
    arr.forEach(item => {
      console.log(item)
    })
  }
  choiceGroup(type) {//点击上级分组input(模拟select)
    if (type) {
      this.find.selectTreeShow = !this.find.selectTreeShow
    }
  }

  getTreeTable() {//获取树形表格并格式化数据
    let that = this;
    this.http.getCustomHeaders("peak-decision/v1/decision/groupsTree").subscribe(res => {
      console.log(res);
      that.treeData = res.result;
      that.getNodes(that, this.treeData)//在data中添加2个对象用于生成树形下拉
      that.treeData.forEach((item) => {//根据data生成的用于树形下拉展示的对象nodes
        that.nodesFind.push(
          new NzTreeNode({
            ...item
          })
        )
      })
      that.forNodes(that, this.nodesFind)//在生成的nodesFind中添加isLeaf对象控制能否展开
      that.treeData.forEach((item) => {//根据data生成的用于table区域树形下拉展示的对象nodes
        that.nodesTable.push(
          new NzTreeNode({
            ...item
          })
        )
      })
      that.forNodes(that, this.nodesTable)//在生成的nodesTable中添加isLeaf对象控制能否展开
    })
  }
  getTable() {//获取表格数据
    let that = this;
    that.loading = true
    let name = that.find.name;
    let id = that.find.id;
    let groupId = that.find.groupId;
    let pageNum = that.find.pageNum;
    let pageSize = that.find.pageSize;
    let total = that.find.total;
    this.http.getCustomHeaders(
      `peak-decision/v1/decision/rulesGrid?name=${name}&id=${id}&groupId=${groupId}&pageNum=${pageNum}&pageSize=${pageSize}`
    ).subscribe(res => {
      console.log(res);
      that.loading = false
      that.tableData = res.result.list;
      that.find.pageNum = res.result.pageNum
      that.find.pageNum = res.result.pageNum
      that.find.pageSize = res.result.pageSize
      that.find.total = res.result.total
    })
  }
  result() {//查询框数据重置
    this.find.name = '';
    this.find.id = '';
    this.find.group = '';
    this.find.groupId = '';
    this.resetNodes(this, this.nodesFind);
  }
  getNodes(that, data) {//在data中添加2个对象用于树形下拉的展示
    data.forEach((item) => {
      item.key = item.id;
      item.title = item.name;
      if (!!item.children) {
        that.getNodes(that, item.children)
      }
    })
  }
  forNodes(that, list) {//对生成的nodes进行修改格式化
    list.forEach(item => {
      item.isExpanded = true//展开
      if (!!item.children && item.children.length > 0) {
        item.isLeaf = false;
        that.forNodes(that, item.children)
      } else {
        item.isLeaf = true;
      }
    });
  }
  choiceFindGroup(e: any): void {//点击find区域树形下拉节点进行的操作
    let that = this;
    that.find.group = e.node.title
    that.find.groupId = e.node.origin.key
    that.find.selectTreeShow = false
  }
  choiceTableGroup(e: any): void {//点击Table区域树形下拉节点进行的操作
    let that = this;
    let checkArr = that.findChecked(that, that.displayData)
    that.tableSelectTreeShow = false
    that.resetNodes(that, that.nodesTable)
    if (!!checkArr && checkArr.length > 0) {
      that.http.patchCustomHeaders(
        `peak-decision/v1/decision/changeGroup`,
        {
          groupId: e.node.origin.key,
          ruleIds: checkArr
        }
      ).subscribe(res => {
        console.log(res);
        if (res.code == '200') {
          that.getTable();//获取规则列表
          that.message.create('success', `调整成功`, { nzDuration: 2000 });
        } else {
          that.message.create('error', `调整失败，${res.reason}`, {});
        }
      })
    }
  }
  findChecked(that, data) {//输出选中的规则id数组
    let checkArr = []
    data.forEach((item) => {
      if (item.checked) {
        checkArr.push(item.id)
      }
    })
    return checkArr
  }
  resetNodes(that, data) {//将下拉表格状态重置
    data.forEach(item => {
      item.isSelected = false;//选中
      item.isExpanded = true//展开
      if (!!item.children && item.children.length > 0) {
        that.resetNodes(that, item.children)
      }
    })
  }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }
  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {//表格全选框
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  // 生命周期函数
  ngOnInit() {
    let that = this;
    that.getTable();//获取规则列表
    that.getTreeTable();//获取到树形表格并生成格式化的数据
  }

}
