import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() { }
  //生命变量
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
  data1 = [
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
    }
  ];
  dataTable = [];
  // 触发函数
  consol(arr) {
    arr.forEach(item => {
      console.log(item)
    })
  }
  collapse(array, data, $event: boolean): void {//点击展开收起时执行
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.data.id === d.id);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  openall(dataTable) {
    dataTable.forEach(function (item) {
      item.expand = true;
    })
  }
  closeall(dataTable) {
    dataTable.forEach(function (item) {
      item.expand = false;
    })
  }
  update() {
    let that = this;
    this.data = this.data1;
    that.dataTable=that.getNewData(that, that.data)//将后台获取到的数据转换成前台展示的格式（添加部分属性控制树形表格的显示）
  }
  // 调用函数
  getNewData(that, data) {
    let dataTable = [];
    data.forEach(item => {
      let parent;//双向绑定，控制tr标签的显示隐藏(为dataTable中符合条件的数据)
      if (item.parentId) {
        if (dataTable.length) {
          for (let i = 0; i < dataTable.length; i++) {
            if (dataTable[i].data.id == item.parentId) {
              parent = dataTable[i]
            }
          }
        }
      } else {
        parent = {
          expand: true
        }
      }
      //用于控制树形表格的缩进
      let level;
      if (item.parentId) {
        level = parent.level + 1
      } else {
        level = 0
      }
      // 添加属性children(为原始数据中符合条件的数据)
      let children = [];
      for (let i = 0; i < data.length; i++) {
        if (item.id == data[i].parentId) {
          children.push(data[i])
        }
      }
      //将生成的数据赋值进dataTable
      let obj = Object.assign(//合并对象
        { data: item }, //原始data数据对象防止与后端重名
        {//前端添加的对象，用于树形表格的展示
          level: level,//控制树形表格缩进
          expand: false,//控制树形表格的展开收起
          loading: false,//控制树形表格switch的loading
          parent: parent,//树形表格的展开收起
          children: children,//控制树形表格的展开收起
        }
      )
      dataTable.push(obj)
    });
    return dataTable
  }

  // 生命周期
  ngOnInit(): void {
    let that = this;
    that.dataTable=that.getNewData(that, that.data)//将后台获取到的数据转换成前台展示的格式（添加部分属性控制树形表格的显示）
  }

}

