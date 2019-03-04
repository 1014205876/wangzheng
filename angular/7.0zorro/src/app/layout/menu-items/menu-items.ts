import { Injectable } from '@angular/core';
import resource from './resource';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state?: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  url?: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  main: MainMenuItems[];
}

export interface ResourceItems {
  name: string;
  state: string;
  type: string;
  link?: string;
  menuUrl?: string;
}

const MENUITEMS = [
  {
    main: [
      {
        state: 'application',
        short_label: 'N',
        name: '应用管理',
        type: 'link',
        icon: 'icon-application',
        url: '/application'
      },
      {
        state: 'organization',
        short_label: 'D',
        name: '组织架构',
        type: 'sub',
        icon: 'icon-organization',
        children: [
          {
            state: 'department',
            name: '部门管理',
            url: '/organization/department'
          },
          {
            state: 'employee',
            name: '员工管理',
            url: '/organization/employee'
          }
        ]
      },
      {
        state: 'role',
        short_label: 'W',
        name: '角色权限',
        type: 'sub',
        icon: 'icon-role',
        children: [
          {
            state: 'authority',
            name: '权限管理',
            url: '/role/authority'
          },
          {
            state: 'role-manage',
            name: '角色管理',
            url: '/role/role-manage'
          }
        ]
      },
      {
        state: 'baseResource',
        short_label: 'W',
        name: '基础资源管理',
        type: 'sub',
        icon: 'icon-baseResource',
        children: [
          {
            state: 'industry',
            name: '行业信息管理',
            url: '/baseResource/industry'
          },
          {
            state: 'area',
            name: '行政区划管理',
            url: '/baseResource/area'
          },
          {
            state: 'dictionary',
            name: '字典管理',
            url: '/baseResource/dictionary'
          }
        ]
      },
      {
        state: 'businessResource',
        short_label: 'W',
        name: '业务资源管理',
        type: 'sub',
        icon: 'icon-businessResource',
        children: [
          {
            state: 'product',
            name: '产品管理',
            url: '/businessResource/product'
          },
          {
            state: 'cooperation',
            name: '合作机构管理',
            url: '/businessResource/cooperation'
          },
          {
            state: 'staff',
            name: '机构人员管理',
            url: '/businessResource/staff'
          },
          // {
          //   state: 'bussinessArea',
          //   name: '业务区域管理'
          // }
        ]
      },
      {
        state: 'log',
        short_label: 'N',
        name: '日志',
        type: 'link',
        icon: 'icon-log',
        url: '/log'
      }
    ]
  }
];


@Injectable()
export class MenuItems {
  
  public menuLists: Menu[];
  constructor(){
    this.menuLists=[
      {
        main: []
      }
    ]
    this.menuLists[0].main = resource.menu;
  }
  getAll(): Menu[] {
    return this.menuLists;
    // return MENUITEMS;
  }
  
}
