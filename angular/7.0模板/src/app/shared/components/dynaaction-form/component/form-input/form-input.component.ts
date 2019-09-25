import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.html',
    styleUrls: ['./form-input.component.less']
})
export class FormInputComponent implements OnInit {

    @Input() public form;//表单对象

    constructor() { }

    ngOnInit() {
    }

}
