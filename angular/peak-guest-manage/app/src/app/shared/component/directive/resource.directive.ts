import { Directive, Input, OnInit, HostBinding } from '@angular/core';
import resource from './../../app-load/resource';
@Directive({
  selector: '[appResource]'
})
export class ResourceDirective implements OnInit {

  @Input('appResource') config: any = { authName: '' };
  resource = [];
  constructor() {
    setTimeout(() => {
      this.resource = resource.ResourceItems;
      this.getAuth();
    }, 0);
  }
  ngOnInit() {
  }
  @HostBinding('hidden') isHovering: boolean;
  getAuth(): void {
    if (this.resource.length > 0) {
      let flag = false;
      for (var i = 0; i < this.resource.length; i++) {
        if (this.config.authName == this.resource[i].state) {
          flag = true;
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
