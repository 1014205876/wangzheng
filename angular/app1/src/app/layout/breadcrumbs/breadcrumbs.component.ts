import { Component, OnInit, Input } from '@angular/core';
import resource from "../menu-items/resource";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() breadcrumbs;
  icon = '-'
  menu;

  constructor() { }

  ngOnInit() {
    this.menu = resource.menu;
  }

}
