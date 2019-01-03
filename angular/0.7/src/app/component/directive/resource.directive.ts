import { Directive, Input, OnInit, HostBinding } from '@angular/core';
import { ResourceItems } from '../../layout/menu-items/menu-items';
import resource from '../../layout/menu-items/resource';
@Directive({
  selector: '[appResource]'
})
export class ResourceDirective implements OnInit {

  @Input('appResource') config: any = {authName: ''};
  resource: ResourceItems[];
  constructor() {
    setTimeout(() => {
      this.resource = resource.ResourceItems;
      this.getAuth();
    }, 0);
  }
  ngOnInit(){}
  @HostBinding('class.authShow') isHovering: boolean;
  getAuth(): void {
    if(this.resource.length>0){
      for(var i =0; i<this.resource.length; i++){
        if( this.config.authName==this.resource[i].state ) { 
          this.isHovering = true;
        }
      }
    }
  }
}
