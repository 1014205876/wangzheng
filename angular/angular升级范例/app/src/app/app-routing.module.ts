import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { PlatformSelectComponent } from './pages/platform-select/platform-select.component'
import { ErrorComponent } from './pages/error/error.component';


const routes: Routes = [
  {
    path: 'platform-select',
    component: PlatformSelectComponent
  },
  {
    path: '',
    component: AdminComponent,
    children: [

      {
        path: 'home',
        loadChildren: 'app/pages/home/home.module#HomeModule',
        data: {
          title: '工作台',
          status: true
        }
      },
      {
        path: 'application',
        loadChildren: 'app/pages/application/application.module#ApplicationModule',
        data: {
          title: '应用管理',
          status: true
        }
      },
      {
        path: 'configure',
        loadChildren: 'app/pages/configure/configure.module#ConfigureModule',
        data: {
          title: '系统设置',
          status: true
        }
      },
      {
        path: 'organization/department',
        loadChildren: 'app/pages/organization/department/department.module#DepartmentModule',
        data: {
          title: '部门管理',
          status: true
        }
      },
      {
        path: 'organization/employee',
        loadChildren: 'app/pages/organization/employee/employee.module#EmployeeModule',
        data: {
          title: '员工管理',
          status: true
        }
      },
      {
        path: 'organization/employee/employee-modify',
        loadChildren: 'app/pages/organization/employee/employee-modify/employee-modify.module#EmployeeModifyModule',
        data: {
          title: '员工管理-编辑',
          status: true
        }
      },
      {
        path: 'organization/employee/employee-add',
        loadChildren: 'app/pages/organization/employee/employee-add/employee-add.module#EmployeeAddModule',
        data: {
          title: '员工管理-添加',
          status: true
        }
      },
      {
        path: 'role/authority',
        loadChildren: 'app/pages/role/authority/authority.module#AuthorityModule',
        data: {
          title: '权限管理',
          status: true
        }
      },
      {
        path: 'role/role-manage',
        loadChildren: 'app/pages/role/role-manage/role-manage.module#RoleManageModule',
        data: {
          title: '角色管理',
          status: true
        }
      },
      {
        path: 'baseResource/area',
        loadChildren: 'app/pages/base-resource/area/area.module#AreaModule',
        data: {
          title: '行政区划管理',
          status: true
        }
      },
      {
        path: 'baseResource/baseField',
        loadChildren: 'app/pages/base-resource/base-field/base-field.module#BaseFieldModule',
        data: {
          title: '基础字段管理',
          status: true
        }
      },
      {
        path: 'baseResource/modeldata',
        loadChildren: 'app/pages/base-resource/modeldata/modeldata.module#ModeldataModule',
        data: {
          title: '模型管理',
          status: true
        }
      },
      {
        path: 'baseResource/modeldata/seefield',
        loadChildren: 'app/pages/base-resource/modeldata/seefield/seefield.module#SeefieldModule',
        data: {
          title: '查看详情',
          status: true
        }
      },
      {
        path: 'baseResource/dictionary',
        loadChildren: 'app/pages/base-resource/dictionary/dictionary.module#DictionaryModule',
        data: {
          title: '字典管理',
          status: true
        }
      },
      {
        path: 'baseResource/dictionary/dictionary-item',
        loadChildren: 'app/pages/base-resource/dictionary/dictionary-item/dictionary-item.module#DictionaryItemModule',
        data: {
          title: '字典项',
          status: true
        }
      },
      {
        path: 'baseResource/industry',
        loadChildren: 'app/pages/base-resource/industry/industry.module#IndustryModule',
        data: {
          title: '行业信息管理',
          status: true
        }
      },
      {
        path: 'businessResource/staff',
        loadChildren: 'app/pages/business-resourcee/staff/staff.module#StaffModule',
        data: {
          title: '机构人员管理',
          status: true
        }
      },
      {
        path: 'businessResource/cooperation',
        loadChildren: 'app/pages/business-resourcee/cooperation/cooperation.module#CooperationModule',
        data: {
          title: '合作机构',
          status: true
        }
      },
      {
        path: 'businessResource/product',
        loadChildren: 'app/pages/business-resourcee/product/product.module#ProductModule',
        data: {
          title: '产品管理',
          status: true
        }
      },
      {
        path: 'businessResource/product/product-modify',
        loadChildren: 'app/pages/business-resourcee/product/product-modify/product-modify.module#ProductModifyModule',
        data: {
          title: '产品管理-修改',
          status: true
        }
      },
      {
        path: 'businessResource/product/product-add',
        loadChildren: 'app/pages/business-resourcee/product/product-add/product-add.module#ProductAddModule',
        data: {
          title: '产品管理-添加',
          status: true
        }
      },
      {
        path: 'businessResource/product/product-material',
        loadChildren: 'app/pages/business-resourcee/product/product-material/product-material.module#ProductMaterialModule',
        data: {
          title: '产品管理-产品资料',
          status: true
        }
      },
      {
        path: 'businessResource/product/rate-disposed',
        loadChildren: 'app/pages/business-resourcee/product/rate-disposed/rate-disposed.module#RateDisposedModule',
        data: {
          title: '产品管理-费率配置',
          status: true
        }
      },
      {
        path: 'businessResource/product/rate-disposed/edit-rate-disposed',
        loadChildren: 'app/pages/business-resourcee/product/rate-disposed/edit-rate-disposed/edit-rate-disposed.module#EditRateDisposedModule',
        data: {
          title: '产品管理-修改费率配置',
          status: true
        }
      },
      {
        path: 'businessResource/product/extended-disposed',
        loadChildren: 'app/pages/business-resourcee/product/extended-disposed/extended-disposed.module#ExtendedDisposedModule',
        data: {
          title: '产品管理-扩展配置',
          status: true
        }
      },
      {
        path: 'log',
        loadChildren: 'app/pages/log/log.module#LogModule',
        data: {
          title: '日志管理',
          status: true
        }
      },
      {
        path: '**',
        component: ErrorComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }