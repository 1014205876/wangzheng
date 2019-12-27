import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';


@Injectable()
export class CartChangeService {
    orderArr = [];
    _selectedPoint: Subject<any> = new Subject<any>();

    public constructor(

    ) {

    }

    public setSelectedPoint(): void {
        this._selectedPoint.next(this.getOrder());
    }

    public currentSelectedPoint(): Observable<any> {
        return this._selectedPoint.asObservable();
    }

    getOrder() {
        this.orderArr.length = 0;
        return res
    }
}