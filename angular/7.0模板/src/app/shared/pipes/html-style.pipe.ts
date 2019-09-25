
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
@Pipe({
    name: "htmlStyle"
})
export class HtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }
    transform(style) {
        return this.sanitizer.bypassSecurityTrustHtml(style);
    }
}