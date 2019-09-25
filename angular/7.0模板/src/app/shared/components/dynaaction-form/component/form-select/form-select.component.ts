import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from '../../../../service/http-serve/api.service';

@Component({
    selector: 'app-form-select',
    templateUrl: './form-select.component.html',
    styleUrls: ['./form-select.component.less']
})
export class FormSelectComponent implements OnInit {

    @Input() public form;//表单对象
    option=[];

    constructor(
        private api: ApiService
    ) { }

    ngOnInit() {
        this.getOption();
    }

    async getOption() {
        let res = await this.api.getDictionaryItemKey(this.form.dataSource);
        this.form.option=res
    }

}
