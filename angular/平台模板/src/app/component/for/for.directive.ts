import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFor]'
})
export class ForDirective {

  @Input('appFor') get: number;
  constructor() {
    console.log(this.show)
    console.log(this)
  }

  ngOnInit() {
    this.show.num = this.get;
    console.log(this.show)
    console.log(this)
    // this.con()
  }

  @HostBinding('class.authShow') show: any={num:0};

  con(e) {
    // console.log(this.$scope)
    console.log(e)
    console.log(
      this.show
    )
  }
}
