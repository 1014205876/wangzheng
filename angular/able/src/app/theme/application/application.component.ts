

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
// import resource from './../../shared/menu-items/resource';
import { HttpServe } from './../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: [
    './../../../assets/icon/menu/iconfont.css',
    './../../../assets/icon/operate/iconfont.css',
    './application.component.scss'
  ]
})
export class ApplicationComponent implements OnInit {


  constructor(
  ) {

  }

  ngOnInit() {
  }
}