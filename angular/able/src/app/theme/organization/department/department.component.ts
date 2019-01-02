import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: [
    '../../../../assets/icon/menu/iconfont.css',
    '../../../../assets/icon/operate/iconfont.css',
    './department.component.scss'
  ]
})
export class DepartmentComponent implements OnInit {
  constructor(
    private http: HttpServe,
  ) {
  }
  rows = [];
  hiddenid = [];
  open(id) {
    this.hiddenid.push(id)
  }
  retract(id) {
    this.hiddenid.splice(this.hiddenid.indexOf(id), 1)
  }

  load() {
    this.http.getCustomHeaders('v1/resource/department')
      .subscribe(res => {
        console.log(res)
        this.rows = res.result;
      })
  }

  ngOnInit() {
    
    this.load()
  }

}