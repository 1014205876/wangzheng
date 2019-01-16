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
  find = {
    pageNum: 1,//页码数
    pageSize: 10,//每页条数
    total: 10,
  }
  loading=false;
  tableData = [
  ];//获取到的表格数据

  getTable() {//获取表格数据
    let that=this;
    that.loading=true
    let pageNum=that.find.pageNum
    let pageSize=that.find.pageSize
    let name=that.findForm.value.name
    that.http.getCustomHeaders(
      `peak-decision/v1/decision/models?&name=${name}`
    ).subscribe(res => {
      console.log(res);
      that.tableData=res.result
      that.loading=false
    })
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
    that.getTable()
  }

}
