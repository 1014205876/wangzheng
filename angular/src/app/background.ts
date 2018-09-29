import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[backc]',
})
export class Backc {
  constructor(el: ElementRef, render: Renderer) {
    render.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
  }
}
