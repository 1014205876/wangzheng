import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../layout/service/http-serve.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { NzMessageService, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-rulegroup',
  templateUrl: './rulegroup.component.html',
  styleUrls: ['./rulegroup.component.css']
})
export class RulegroupComponent implements OnInit {
  constructor(
    private http: HttpServe,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
  }

  loading = false;
  data = [//后台获取到的原始对象
    {
      "id": "1",
      "parentId": null,
      "name": "分组1",
      "status": 1,
      "createTime": "2018-08-01 15:02:19",
      "updateTime": "2018-08-01 15:02:19",
      "remark": "分组一",
      "children": [{
        "id": "2",
        "parentId": "1",
        "name": "分组1-分组1",
        "status": 1,
        "createTime": "2018-08-01 15:02:19",
        "updateTime": "2018-08-01 15:02:19",
        "remark": "分组1-分组1",
        "children": null
      },
    },
    {
      "id": "111111111111",
      "parentId": null,
      "name": "分组1",
      "status": 1,
      "createTime": "2018-08-01 15:02:19",
      "updateTime": "2018-08-01 15:02:19",
      "remark": "分组一",
      "children": [{
        "id": "2222222222",
        "parentId": "111111111111",
        "name": "分组1-分组1",
        "status": 1,
        "createTime": "2018-08-01 15:02:19",
        "updateTime": "2018-08-01 15:02:19",
        "remark": "分组1-分组1",
        "children": null
      },
      {
        "id": "33333333",
        "parentId": "111111111111",
        "name": "分组1-分组2",
        "status": 1,
        "createTime": "2018-08-01 15:02:19",
        "updateTime": "2018-08-01 15:02:19",
        "remark": "分组1-分组2",
        "children": [{
          "id": "444444",
          "parentId": "33333333",
          "name": "分组1-分组2-分组1",
          "status": 1,
          "createTime": "2018-08-01 15:02:19",
          "updateTime": "2018-08-01 15:02:19",
          "remark": "分组1-分组2-分组1",
          "children": null
        }]
      }
      ]
    }

  ];
  expandDataCache = {};//前端根据data生成的用于树形表格的对象
  nodes = {
    father: [
      {
        expand: false,
        item: { id: "1", parentId: null, name: "---" },
        level: 1,
        loading: false,
      }
    ]
  };//前端根据data生成的用于分组选择器的对象
  public group: any = {//创建分组弹窗
    popoverShow: false,
    modalShow: false,
    modalLoading: false,
    submitDisable: false,
    selectTreeShow: false,
    title: '创建分组',
  };//修改密码弹窗

  groupForm: FormGroup;//修改密码表单

  consol(arr) {
    arr.forEach(item => {
      console.log(item)
    })
  }

  collapse(array, data, $event: boolean) {
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

  convertTreeToList(root: object) {
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

  visitNode(node, hashMap: object, array): void {
    if (!hashMap[node.item.id]) {
      hashMap[node.item.id] = true;
      array.push(node);
    }
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
  groupModalShow(id, list) {//点击弹出创建分组弹窗
    this.group.modalShow = true;
    if (list) {
      this.group.title = '修改分组'
    }
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

  choiceOk(): void {//点击创建分组确认按钮
    console.log(this.groupForm.value)
  }//点击创建分组确认按钮

  choiceCancel(): void {//点击创建分组取消
    let that = this;
    that.group.modalShow = false;
    that.group.selectTreeShow = false;
  }

  choiceFatherGroup() {
    this.group.selectTreeShow = !this.group.selectTreeShow
  }
  // nodes = [//用于树形表格展示的
  //   new NzTreeNode({
  //     title: '',
  //     key: '',
  //   }),
  //   new NzTreeNode({
  //     title: 'root2',
  //     key: '1002',
  //     children: [
  //       {
  //         title: 'child2.1',
  //         key: '10021',
  //         children: [],
  //       },
  //       {
  //         title: 'child2.2',
  //         key: '10022',
  //         children: [
  //           {
  //             title: 'grandchild2.2.1',
  //             key: '100221',
  //           }
  //         ]
  //       }
  //     ]
  //   })
  // ];

  mouseAction(e: any): void {
    console.log(e, e.node.title);
    this.groupForm.get('fatherGroup').setValue(e.node.title)
    this.groupForm.get('fatherGroupId').setValue(e.node.origin.key)
    this.group.selectTreeShow = false
  }



  forNodes(that, list) {
    list.forEach(item => {
      if (!!item.children) {
        item.isLeaf = false;
        that.forNodes(that, item.children)
      } else {
        item.isLeaf = true;
      }
    });
  }

  ngOnInit() {
    let that = this;
    that.getexpand(that, this.data, that.expandDataCache)
    that.getexpand(that, this.data, that.nodes)
    this.groupForm = this.fb.group({
      name: [null, [Validators.required]],
      fatherGroup: [null],
      fatherGroupId: [null],
      remark: [null],
    });
    // console.log(this.data)
    // that.forNodes(that, this.data)
    // console.log(this.data)
  }

}
