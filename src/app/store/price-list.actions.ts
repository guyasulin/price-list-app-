import { createAction, props } from '@ngrx/store';
import { PriceList } from '../models/price-list';

export const loadPricelist = createAction(
  '[PriceList] load ERP Success',
);

export const loadPriceListsSuccess = createAction(
  '[PriceList] load PriceLists Success',
  props<{ data: PriceList[] }>()
);

export const loadPriceListsFailure = createAction(
  '[PriceList] load PriceLists Failure',
  props<{ error: any }>()
);

export const updatePricelist = createAction(
  '[EventDetails] Update Pricelist',
  props<{ id: PriceList, item:  PriceList }>()
);

export const updatePricelistSuccess = createAction(
  '[EventDetails] Update Pricelist Success',
  props<{ item: any }>()
);
