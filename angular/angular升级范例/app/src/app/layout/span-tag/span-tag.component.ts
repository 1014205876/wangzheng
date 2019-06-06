import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'span-tag',
  templateUrl: './span-tag.component.html',
  styleUrls: ['./span-tag.component.less']
})

export class SpanTagComponent implements OnInit {
  @Input('width') width = 100
  @Input('list') list = []
  constructor() {
  }

  ngOnInit() {
    var style = document.createElement('style')
    style.innerHTML = `.span-tag:after{left:${this.width}px;}`
    document.head.appendChild(style)

  }

}
