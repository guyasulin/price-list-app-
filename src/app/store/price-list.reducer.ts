import {  createReducer, on } from '@ngrx/store';
import { PriceList } from '../models/price-list';
import * as PricelisttActions from '../store/price-list.actions';


export const priceListFeatureKey = 'priceList';

export interface State {
  priceLists: PriceList[] | null;
  erps: []
}

export const initialState: State = {
  priceLists: null,
  erps: []
};

export const reducer = createReducer(
  initialState,
  on(PricelisttActions.loadPriceListsSuccess, (state, action) => {
    return {
      ...state,
      priceLists: action.data
    }
  }),
  on(PricelisttActions.updatePricelistSuccess, (state, action) => {
    const updateProduct = state.priceLists.map(item => action.item.priceListID === item.priceListID ? action.item : item)
    return {
      ...state,
      priceLists: updateProduct
    }
  }),
);
