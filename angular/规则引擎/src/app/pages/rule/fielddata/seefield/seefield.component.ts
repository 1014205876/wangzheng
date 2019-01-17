import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../layout/service/http-serve.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzMessageService, NzFormatEmitEvent, NzTreeNode, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-seefield',
  templateUrl: './seefield.component.html',
  styleUrls: ['./seefield.component.less']
})
export class SeefieldComponent implements OnInit {

  constructor(
    private http: HttpServe,
    public route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.name = this.route.snapshot.queryParams["name"];
    let index = this.route.snapshot.queryParams["index"];
    if (index) {
      this.tabindex = index;
    } else {
      this.tabindex = 0;
    }
    this.getVersion();//防止请求时间过长报错把事件提前
  }

  name = ''//页面传过来的规则名称
  tabindex: number = 0;
  versions = [];//所有版本号选项卡
  loading = false;
  tableData = [//从后台获取到的原始数据
  ];
  expandDataCache = {};//前端根据data生成的用于树形表格的对象
  consol(arr) {//打印函数
    arr.forEach(item => {
      console.log(item)
    })
  }
  getVersion() {
    let that = this;
    that.http.getCustomHeaders(
      `peak-decision/v1/decision/versions/models/${that.name}`
    ).subscribe(res => {
      console.log(res);
      that.versions = res.result
      that.getTable()
    })
  }
  getTable() {
    let that = this;
    that.loading = true
    let name = that.name;
    let version = that.versions[that.tabindex];
    that.http.getCustomHeaders(
      `peak-decision/v1/decision/models/${name}?version=${version}`
    ).subscribe(res => {
      console.log(res);
      that.tableData = res.result;
      that.getexpand(that, that.tableData, that.expandDataCache)//生成树形表格
      that.loading = false
    })
  }
  openall() {//展开全部树形表格
    let that = this;
    that.fordata(that, that.tableData, true)
    that.forexpand(that, true)
  }
  closeall() {//收起全部树形表格
    let that = this;
    that.fordata(that, that.tableData, false)
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
    that.tableData.forEach(item => {
      for (let i = 0; i < that.expandDataCache[item.id].length; i++) {
        that.expandDataCache[item.id][i].expand = status
      }
    })
  }
  getexpand(that, data, expandDataCache) {//修改了data里面的数据时需重新生成一个expandData用于渲染页面
    data.forEach(item => {
      expandDataCache[item.id] = that.convertTreeToList(item);
    });
    console.log(expandDataCache)
  }
  tabsChange(e) {//选项卡切换触发
    this.tabindex = e.index
    this.getTable()
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
  ngOnInit(): void {
    let that = this;
  }
}
