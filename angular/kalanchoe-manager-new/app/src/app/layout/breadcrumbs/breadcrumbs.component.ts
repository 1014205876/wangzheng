import { Component, OnInit, Input } from '@angular/core';

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
    }

}
