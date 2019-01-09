import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../layout/service/http-serve.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-fielddata',
  templateUrl: './fielddata.component.html',
  styleUrls: ['./fielddata.component.css']
})
export class FielddataComponent implements OnInit {

  constructor(
    private http: HttpServe,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }
  findForm: FormGroup;//查询表单
  page = {
    pageNum: 1,//页码数
    pageSize: 10,//每页条数
    total: 500,
  }
  tableData = [//获取到的表格数据
    {
      id: '11',
      name: 'John Brown',
    },
    {
      id: '12',
      name: 'John Bjkjlkjlkjlkjlkjlkjlkjlkjlkjlhgjhhgfhgfhgfhrown',
    },
    {
      id: '13',
      name: 'John Brown',
    },
    {
      id: '14',
      name: 'John Brown',
    },
  ];

  getTable() {//获取表格数据
    let that = this;
    console.log(that.findForm.value)
    console.log(that.page)

    // that.message.create('success', `修改密码成功`, { nzDuration: 2000 });
    // that.message.create('error', `修改密码失败，${res.reason}`, {});

  }
  result(e) {//查询框数据重置
    e.preventDefault();//官网函数
    this.findForm.get('name').setValue('')
  }
  ngOnInit() {
    let that = this;
    that.findForm = this.fb.group({
      name: [''],
    });
  }

}
