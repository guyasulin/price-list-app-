import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AppState } from '../index.reducer';
import { PriceListService } from '../services/price-list.service';
import  * as fromACtionPricelist  from '../store/price-list.actions';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {

  public searchTrem = new Subject<any>();
  public sub: Subscription;
  public errorMessage: string;
  public priceList$: Observable<any[]> ;
  public searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private store: Store<AppState>, 
    private priceListService: PriceListService) { }

  ngOnInit(): void {
    this.store.dispatch(fromACtionPricelist.loadPricelist());
    this.priceList$ =  this.store.select(store => store.pricelist.priceLists);

    this.sub = this.searchTrem.
      pipe(
        map((e: any) => {
          return  e.target.value;
        }),
        debounceTime(1000),
        distinctUntilChanged(),
        map((term:any) => {
           this.priceList$ = this.priceListService.getPriceList('', parseInt(term))
           return this.priceList$ 
        })
      )
      .subscribe((v) => v);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
