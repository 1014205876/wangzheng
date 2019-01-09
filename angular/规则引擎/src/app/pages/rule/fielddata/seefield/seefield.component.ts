import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-seefield',
  templateUrl: './seefield.component.html',
  styleUrls: ['./seefield.component.less']
})
export class SeefieldComponent implements OnInit {

  constructor() { }

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

  vchange(e) {
    console.log(e)
  } 
  expandKeys = [ '1001', '10001' ];
  nodes = [
    new NzTreeNode({
      title   : 'root1',
      key     : '1001',
      children: [
        {
          title   : 'child1',
          key     : '10001',
          children: [
            {
              title   : 'child1.1',
              key     : '100011',
              children: []
            },
            {
              title   : 'child1.2',
              key     : '100012',
              children: [
                {
                  title   : 'grandchild1.2.1',
                  key     : '1000121',
                  isLeaf  : true,
                  disabled: true
                },
                {
                  title : 'grandchild1.2.2',
                  key   : '1000122',
                  isLeaf: true
                }
              ]
            }
          ]
        },
        {
          title   : 'child2',
          key     : '10002',
          children: []
        }
      ]
    }),
    new NzTreeNode({
      title   : 'root2',
      key     : '1002',
      children: [
        {
          title          : 'child2.1',
          key            : '10021',
          children       : [],
          disableCheckbox: true
        },
        {
          title   : 'child2.2',
          key     : '10022',
          children: [
            {
              title : 'grandchild2.2.1',
              key   : '100221',
              isLeaf: true
            }
          ]
        }
      ]
    })
  ];

  mouseAction(name: string, e: any): void {
    console.log(name, e,e.node.title);
    // console.log()
  }

  ngOnInit(): void {
  }
}
