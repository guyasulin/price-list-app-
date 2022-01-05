import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromPricelist from './store/price-list.reducer'


export interface AppState {
    pricelist: fromPricelist.State;
}

export const AppReducer: ActionReducerMap<AppState> =  {
    pricelist: fromPricelist.reducer
}
