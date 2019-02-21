import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() position;
  @Input() msg;
  @Input() option;

  constructor() { }

  ngOnInit() {
  }

}
