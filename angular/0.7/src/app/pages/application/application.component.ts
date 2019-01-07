import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup,  Validators} from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less']
})
export class ApplicationComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  findForm: FormGroup;
  tabs = [//选项卡
    {
      name: 'Tab 1',
      content: 'Content of Tab Pane 1'
    },
    {
      name: 'Tab 2',
      content: 'Content of Tab Pane 2'
    },
    {
      name: 'Tab 3',
      content: 'Content of Tab Pane 3'
    }
  ];
  loading = false;//树形表格遮罩层
  data = [//树形表格获取数据
    {
      key: 1,
      status: 1,
      name: 'John Brown sr.',
      age: 60,
      value: 456,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 5,
          status: 1,
          name: 'Jim Green sr.',
          age: 72,
          value: 456,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 6,
              status: 0,
              name: 'Jim Green',
              age: 42,
              value: 456,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 7,
                  status: 1,
                  name: 'Jim Green jr.',
                  age: 25,
                  value: 456,
                  address: 'London No. 3 Lake Park',
                  children: [
                    {
                      key: 8,
                      status: 1,
                      name: 'Jim Green jr.',
                      age: 25,
                      value: 456,
                      address: 'London No. 3 Lake Park',
                      children: [
                        {
                          key: 10,
                          status: 1,
                          name: 'Jim Green jr.',
                          age: 25,
                          value: 456,
                          address: 'London No. 3 Lake Park'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
  ];
  expandDataCache = {};//属性表格渲染数据
  consol(arr) {
    arr.forEach(list => {
      console.log(list)
    })
  }
  update() {
    this.data.forEach(item => {
      this.expandDataCache[item.key] = this.convertTreeToList(item);
    });
    this.openall();
  }

  pagechange(num) {
    console.log(num)
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key);
          target.expand = false;
          target.loading = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push(
      {
        ...root,
        level: 0,
        expand: false,
        loading: false,
      }
    );

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push(
            {
              ...node.children[i],
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

  visitNode(node: TreeNodeInterface, hashMap: object, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  openall() {
    let that = this;
    that.fordata(that, that.data, true)
    that.forexpand(that, true)
    // that.data.forEach(item => {
    //   that.expandDataCache[item.key] = that.convertTreeToList(item);
    // });
  }
  upall() {
    let that = this;
    that.fordata(that, that.data, false)
    that.forexpand(that, false)
  }
  statuschange1(list) {
    console.log(list)
    list.loading = true;
    if (list.status == 1) {
      setTimeout(() => {
        list.status = 0;
        list.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        list.status = 1;
        list.loading = false;
      }, 1000);
    }
  }
  statuschange2(list) {
    console.log(list)
    this.loading = true;
    if (list.status == 1) {
      setTimeout(() => {
        list.status = 0;
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        list.status = 1;
        this.loading = false;
      }, 1000);
    }
  }

  fordata(that, list, status) {
    for (let i = 0; i < list.length; i++) {
      list[i].expand = status
      if (!!list[i].children) {
        that.fordata(that, list[i].children, status)
      }
    }
  }

  forexpand(that, status) {
    that.data.forEach(item => {
      for (let i = 0; i < that.expandDataCache[item.key].length; i++) {
        that.expandDataCache[item.key][i].expand = status
      }
    })
  }
  allChecked = false;
  indeterminate = false;
  displayData = [];
  data1 = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      value: 1,
      checked: false,
      disabled: false
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      value: 1,
      checked: false,
      disabled: false
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      value: 1,
      checked: false,
      disabled: false
    },
    {
      name: 'Disabled User',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      value: 1,
      checked: false,
      disabled: true
    }
  ];

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

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  ngOnInit() {
    let that = this;
    this.data.forEach(item => {
      this.expandDataCache[item.key] = this.convertTreeToList(item);
    });
    
    that.findForm = this.fb.group({
      name: [ null, [ Validators.required ] ],
    });
  }

}
export interface TreeNodeInterface {
  key: number;
  name: string;
  age: number;
  level: number;
  expand: boolean;
  loading: boolean;
  address: string;
  children?: TreeNodeInterface[];
}