import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-form-component',
    templateUrl: './form-component.component.html',
    styleUrls: ['./form-component.component.less']
})
export class FormComponentComponent implements OnInit {

    @Input() private formData: any;

    constructor() { }

    ngOnInit() {
    }

}
