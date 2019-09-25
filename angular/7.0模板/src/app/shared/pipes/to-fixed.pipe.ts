
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: "toFixed"
})
export class ToFixedPipe implements PipeTransform {
    constructor() {
    }
    transform(value,multiply, num) {
        let number = parseFloat(value);
        if (number) {
            return (number*multiply).toFixed(num)
        } else {
            return value
        }

    }
}