import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  data = [
    {
      parentId: '',
      id: 1,
      name: '一级1',
      age: 60,
      address: 'New York No. 1 Lake Park',
    },
    {
      parentId: 1,
      id: 11,
      name: '一级1-二级1',
      age: 42,
      address: 'New York No. 2 Lake Park'
    },
    {
      parentId: 11,
      id: 111,
      name: '一级1-二级1-三级1',
      age: 30,
      address: 'New York No. 3 Lake Park'
    },
    {
      parentId: 1,
      id: 12,
      name: '一级1二级2',
      age: 16,
      address: 'New York No. 3 Lake Park'
    },
    {
      parentId: '',
      id: 5,
      name: '一级2',
      age: 72,
      address: 'London No. 1 Lake Park',
    }
  ];
  dataTable = [];
  expandDataCache = {};

  collapse(array, data, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id);
          target.expand = false;
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
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node, hashMap: object, array): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }
  getchildren(that, data, id, children) {
    let num = 0;
    for (let i = 0; i < data.length; i++) {
      if (id == data[i].parentId) {
        console.log(data[i])
        children.push(data[i])
        // that.getchildren(that, data, data[i].id, children)
      }
    }
    if (num == 0) {
      children = null;
    }
  }
  getdata(that, data) {
    data.forEach(item => {
      let parent;
      if (item.parentId) {
        parent = data[data.indexOf(item.parentId)]
      } else {
        parent = null
      }
      let children=[];
      that.getchildren(that, data, item.id, children)
      that.dataTable.push(
        {
          item,
          expand: false,
          loading: false,
          parent: parent, children: children
        }
      )
    });
  }
consol(arr){
  arr.forEach(item=>{
    console.log(item)
  })
}
  ngOnInit(): void {
    let that = this;
    that.getdata(that, that.data)
    console.log(that.dataTable)
  }

}

