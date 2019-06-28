import { Component, OnInit } from '@angular/core';
import { HttpServe } from 'src/app/shared/service/http-serve.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

  constructor(
    private http: HttpServe
  ) { }

  form = {
    name: '',
    id: '',
    status: 0,
    tel: '',
    value: ''
  }

  getTable() {
    this.http.get(
      'api/get', {}, true
    ).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  formSubmit() { // 获取左导航
    this.http.post('api/login', {
      name: this.form.name,
      id: this.form.id,
      status: this.form.status,
      tel: this.form.tel,
      value: this.form.value
    }, true).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  ngOnInit() {
    this.getTable();
  }

}
