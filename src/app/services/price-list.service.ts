import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PriceList } from '../models/price-list';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  public _url: string = '../../assets/data/data.json';

  constructor(private http: HttpClient) { }

  getPriceList(ERPCompanyIds, SearchTerm: any): Observable<PriceList[]> {
    let ifSearchTerm:any = [];

    return this.http.get<PriceList[]>(this._url).pipe(
      map((res) => {
        if (SearchTerm) {
          res.map(priceId =>{
            if (priceId.extErpPriceListID === SearchTerm) {
               ifSearchTerm.push(priceId)
            } 
          })
          return ifSearchTerm
        }
        else {
          return res
        }
      }),
    )
  }

  getErps(): Observable<any> {
    return from([1,2,3,4,5,6])
  }


  UpdatePriceList(priceListID:number | string, change: PriceList) {
    const headers = new HttpHeaders({'Content-Type': 'application/json' });
    return this.http.put<PriceList>(this._url , change, {headers})
  }
}