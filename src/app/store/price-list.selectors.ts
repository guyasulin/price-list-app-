import { createFeatureSelector, createSelector } from '@ngrx/store';
import  * as fromPricelistState  from './price-list.reducer';

export const selectPricelistState = createFeatureSelector<fromPricelistState.State>(
    fromPricelistState.priceListFeatureKey
)

export const getPricelist = createSelector(selectPricelistState, (state) => {
    console.log(state);
     state?.priceLists
})

