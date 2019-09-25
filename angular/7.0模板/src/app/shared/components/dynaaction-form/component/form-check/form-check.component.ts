import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from '../../../../service/http-serve/api.service';

@Component({
    selector: 'app-form-check',
    templateUrl: './form-check.component.html',
    styleUrls: ['./form-check.component.less']
})
export class FormCheckComponent implements OnInit {

    @Input() public form;//表单对象
    option = [];

    constructor(
        private api: ApiService
    ) { }

    ngOnInit() {
        this.getOption();
    }

    async getOption() {
        let res = await this.api.getDictionaryItemKey(this.form.dataSource);
        this.form.option=res
        this.option = res.map((item) => {
            return {
                label: item.name, value: item.name, checked: false
            }
        });
    }

    log() {
        let value = '';
        this.option.forEach((item) => {
            if (item.checked) {
                if (value) {
                    value += ',' + item.value
                } else {
                    value = item.value
                }
            }
        })
        this.form.value = value
    }
}
