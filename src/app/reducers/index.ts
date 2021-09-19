import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUserData from '../userdata.reducer'

export interface State {
  [fromUserData.userdataFeatureKey]: fromUserData.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromUserData.userdataFeatureKey]: fromUserData.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
