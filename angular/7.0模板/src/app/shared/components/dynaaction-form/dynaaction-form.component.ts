import { Component, OnInit,Input } from '@angular/core';

@Component({
    selector: 'app-dynaaction-form',
    templateUrl: './dynaaction-form.component.html',
    styleUrls: ['./dynaaction-form.component.less']
})
export class DynaactionFormComponent implements OnInit {

    @Input() public formArr = {
        sysProductApplyForms:[],
    };

    constructor() { }

    ngOnInit() {
    }

}
