import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../layout/service/http-serve.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService, NzFormatEmitEvent, NzTreeNode, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-changerule',
  templateUrl: './changerule.component.html',
  styleUrls: ['./changerule.component.less']
})
export class ChangeruleComponent implements OnInit {

  constructor(
    private http: HttpServe,
    public route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.name = this.route.snapshot.queryParams["name"];
    this.getVersion();//防止请求时间过长报错把事件提前
  }

  name = '';//页面传入的name
  versions = [];//保存所有版本号
  selectTreeShow = false;//控制树形下拉的显示隐藏
  data = {//表单对象
    id: '',
    "name": "",
    "groupName": "",
    "groupId": "",
    "showVersion": '',//版本号
    "remark": "",//规则描述
    "rule": '',
    models: [{
      name: '',
    }]
  }
  canSubmit = false;
  loading = false;
  table = [//后台获取到的树形表格对象
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
  nodes = [];//前端根据data生成的用于树形下拉展示的对象

  consol(arr) {//打印函数
    arr.forEach(item => {
      console.log(item)
    })
  }
  back() {//返回上一页
    history.back();
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
  choiceGroup(e: any): void {//点击树形下拉节点进行的操作
    let that = this;
    that.data.groupName = e.node.title
    that.data.groupId = e.node.origin.key
    that.selectTreeShow = false
  }
  submit() {//点击保存规则
    let that = this;
    that.http.putCustomHeaders(
      `peak-decision/v1/decision/rules/${that.data.id}`,
      {
        name: that.data.name,
        groupId: that.data.groupId,
        remark: that.data.remark,
        rule: that.data.rule,
      }
    ).subscribe(res => {
      console.log(res);
      if (res.code == '200') {
        that.back();
        that.message.create('success', `保存成功`, { nzDuration: 2000 });
      } else {
        that.message.create('error', `保存失败，${res.reason}`, {});
      }
    })
  }
  getTable() {
    let that = this;
    this.http.getCustomHeaders("peak-decision/v1/decision/groupsTree").subscribe(res => {
      console.log(res);
      that.table = res.result;
      that.getNodes(that, that.table)//在table中添加2个对象用于生成树形下拉
      that.table.forEach((item) => {//根据table生成的用于树形下拉展示的对象nodes
        that.nodes.push(
          new NzTreeNode({
            ...item
          })
        )
      })
      that.forNodes(that, that.nodes)//在生成的nodes中添加isLeaf对象控制能否展开
    })
  }
  getVersion() {
    let that = this;
    that.http.getCustomHeaders(
      `peak-decision/v1/decision/versions/rules/${that.name}`
    ).subscribe(res => {
      console.log(res);
      that.versions = res.result
      that.getData()
    })
  }
  getData() {
    let that = this;
    let name = that.name;
    let version = that.versions[0];
    that.http.getCustomHeaders(
      `peak-decision/v1/decision/versionRule/${name}?version=${version}`
    ).subscribe(res => {
      console.log(res);
      that.data = res.result
    })
  }
  // 生命周期函数
  ngOnInit() {
    let that = this;
    that.getTable()
  }
  ngDoCheck() {//页面监听（鼠标移动，键盘输入，触发）
    if (this.data.name) {//如果规则名称已填写
      if (this.data.groupId) {//如果规则分组已选择
        this.canSubmit = true
      } else {
        this.canSubmit = false
      }
    } else {
      this.canSubmit = false
    }
  }
}
