import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'app-form-select',
    templateUrl: './form-select.component.html',
    styleUrls: ['./form-select.component.less']
})
export class FormSelectComponent implements OnInit {

    @Input() public form;//表单对象
    option=[];

    constructor(
    ) { }

    ngOnInit() {
    }

}
