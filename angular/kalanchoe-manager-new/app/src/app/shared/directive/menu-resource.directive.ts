import { Directive, Input, HostBinding } from '@angular/core';
import resource from './../../layout/resource/resource';

@Directive({
    selector: '[appResource]'
})
export class MenuResourceDirective {

    @Input('appResource') config: any = { authName: '' };
    resource = [];
    constructor() { }

    getResource() {
        if (resource.over) {//防止权限接口返回过慢导致获取到的权限数组为空
            this.resource = resource.ResourceItems;
            this.getAuth();
        } else {
            setTimeout(() => {
                this.getResource()
            }, 100);
        }
    }

    ngOnInit() {
        this.getResource()
    }
    @HostBinding('hidden') isHovering: boolean;
    getAuth(): void {
        if (this.resource.length > 0) {
            let flag = false;
            for (var i = 0; i < this.resource.length; i++) {
                if (this.config.authName == this.resource[i].state) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                this.isHovering = false;
            } else {
                this.isHovering = true;
            }
        }
    }

}
