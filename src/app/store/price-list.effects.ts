import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PriceListService } from '../services/price-list.service';

import * as PricelisttActions from '../store/price-list.actions';
import { concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { PriceList } from '../models/price-list';

@Injectable()
export class PriceListEffects {
  
  ERPCompanyIds = this.pricelistService.getErps();

  constructor(private actions$: Actions,
    private pricelistService: PriceListService
  ) { console.log(this.ERPCompanyIds);}

  loadPricelist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PricelisttActions.loadPricelist),
      switchMap(() =>
        this.pricelistService.getPriceList(this.ERPCompanyIds, '').pipe(
          map((data) => {
            return PricelisttActions.loadPriceListsSuccess({data: data})
          })
        )
      )
    )
  )

  updatePricelist$ = createEffect(() => 
  this.actions$.pipe(
    ofType(PricelisttActions.updatePricelist),
    map((action) => {
      console.log(action.item);
      this.pricelistService.UpdatePriceList(
        action.item.priceListID,
        action.item,
        )
        return PricelisttActions.updatePricelistSuccess({item:action.item})
    }
    ),
  ),
{ dispatch: false }
);

}
