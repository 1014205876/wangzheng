import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../layout/service/http-serve.service';
import { NzMessageService, NzFormatEmitEvent, NzTreeNode, UploadFile } from 'ng-zorro-antd';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-addrule',
  templateUrl: './addrule.component.html',
  styleUrls: ['./addrule.component.less']
})
export class AddruleComponent implements OnInit {

  constructor(
    private http: HttpServe,
    private message: NzMessageService
  ) { }
  selectTreeShow = false;
  data = {//表单对象
    "name": "",
    "group": "",
    "groupId": "",
    "remark": "",//规则描述
    "rule": "",//规则文件代码
    canSubmit: false,
    loading: false,
    fileShow: true,
    url: '',
  }
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
    //       "children": [],
    //     }
    //   ]
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
    that.data.group = e.node.title
    that.data.groupId = e.node.origin.key
    that.selectTreeShow = false
  }

  uploader: FileUploader = new FileUploader({
    url: "/api/peak-decision/v1/decision/upload",
    method: "post",
    itemAlias: "file",
    autoUpload: false,
  });
  selectedFileOnChanged(e, data) {//file框点击文件上传触发
    data.fileShow = false;
    this.uploader.queue[0].upload();
    this.uploader.queue[0].onSuccess = (response, status, headers) => {
      this.uploader.clearQueue();//清除文件
      if (status == 200) {
        data.url = JSON.parse(response).location
        console.log(JSON.parse(response))
        data.rule = JSON.parse(response).result
      } else {
        console.log('上传失败')
      }
      data.fileShow = true;
    }
  };
  submit() {//点击保存规则
    let that = this;
    console.log(that.data)
    that.http.postCustomHeaders(
      'peak-decision/v1/decision/rule',
      {
        name: that.data.name,
        groupId: that.data.groupId,
        rule: that.data.rule,
        remark: that.data.remark,
      }
    ).subscribe(res => {
      console.log(res);
      if (res.code == '200') {
        that.message.create('success', `保存成功`, { nzDuration: 2000 });
        that.back()
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
  // 生命周期函数
  ngOnInit() {
    let that = this;
    that.getTable()
  }
  ngDoCheck() {//页面监听（鼠标移动，键盘输入，触发）
    if (this.data.name) {//如果规则名称已填写
      if (this.data.groupId) {//如果规则分组已选择
        if (this.data.rule) {//如果规则文件已上传
          this.data.canSubmit = true
        } else {
          this.data.canSubmit = false
        }
      } else {
        this.data.canSubmit = false
      }
    } else {
      this.data.canSubmit = false
    }
  }
}
