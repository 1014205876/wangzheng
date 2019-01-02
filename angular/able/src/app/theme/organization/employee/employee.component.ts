import { Component, OnInit, ViewChild, Input, AfterViewInit,ChangeDetectorRef  } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { TreeviewItem } from '../../../../../node_modules/ngx-treeview/src/treeview-item';
// import { TreeTableModule } from 'primeng/treetable';
// import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: [
    '../../../../assets/icon/menu/iconfont.css',
    '../../../../assets/icon/operate/iconfont.css',
    './employee.component.scss'
  ]
})
export class EmployeeComponent implements OnInit {
  files1 = [
    {
      "data": {
        "name": "Documents",
        "size": "75kb",
        "type": "Folder"
      },
      "children": [
        {
          "data": {
            "name": "Work",
            "size": "55kb",
            "type": "Folder"
          },
          "children": [
            {
              "data": {
                "name": "Work",
                "size": "55kb",
                "type": "Folder"
              }
            }
          ],
        },
        {
          "data": {
            "name": "Work",
            "size": "55kb",
            "type": "Folder"
          },
          "children": [
            {
              "data": {
                "name": "Work",
                "size": "55kb",
                "type": "Folder"
              },
              "children": [
                {
                  "data": {
                    "name": "Work",
                    "size": "55kb",
                    "type": "Folder"
                  }
                }
              ],
            }
          ],
        }
      ],
    }
  ]
  files2 = [
    {
      "data": {
        "name": "Documents",
        "size": "75kb",
        "type": "Folder"
      },
      "children": [
        {
          "data": {
            "name": "Work",
            "size": "55kb",
            "type": "Folder"
          },
          "children": [
            {
              "data": {
                "name": "Work",
                "size": "55kb",
                "type": "Folder"
              },
            }
          ],
        },
      ],
    },
  ]
  constructor(
    public changeDetectorRef:ChangeDetectorRef
  ) { }
  findfor(that, list, status) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].children && list[i].children.length > 0) {
        list[i].expanded = status
        that.findfor(that, list[i].children, status)
      }
    }
  }
  add(rowNode, rowData) {
    console.log(rowNode)
    console.log(rowData)
  }
  openall() {
    let that = this;
    that.findfor(that, that.files2, true)
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }
  retractall() {
    let that = this;
    that.findfor(that, that.files2, false)
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }
  result(e){
    console.log(e)
  }
  ngOnInit() {
    let that = this;
    that.findfor(that, that.files2, true)
  }

}
// export interface TreeNode {
//   data?: any;
//   children?: TreeNode[];
//   leaf?: boolean;
//   expanded?: boolean;
// }