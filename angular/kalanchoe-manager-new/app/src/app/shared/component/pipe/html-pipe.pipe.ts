import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'htmlPipe'
})
export class HtmlPipePipe implements PipeTransform {

  constructor (private sanitizer: DomSanitizer) {}

  transform(htmlStr) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlStr);
  }

}
