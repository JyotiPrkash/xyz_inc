import { Action } from '@ngrx/store';
import { AppUserData } from './userdata';

export enum UserdataActionTypes {
  XyzUserdatas = '[Userdata] Xyz Userdatas',
  XyzUserdatasSuccess = '[Userdata] Xyz Userdatas Success',
  XyzUserdatasFailure = '[Userdata] Xyz Userdatas Failure',
  newsData = '[Userdata] Xyz newsData',
  newsDataSuccess = '[Userdata] Xyz newsData Success',
  newsDataFailure = '[Userdata] Xyz newsData Failure',
}

export class XyzUserdatas implements Action {
  readonly type = UserdataActionTypes.XyzUserdatas;
}

export class XyzUserdatasSuccess implements Action {
  readonly type = UserdataActionTypes.XyzUserdatasSuccess;
  constructor(public payload: { data: AppUserData[] }) { }
}

export class XyzUserdatasFailure implements Action {
  readonly type = UserdataActionTypes.XyzUserdatasFailure;
  constructor(public payload: { error: any }) { }
}

export class newsData implements Action {
  readonly type = UserdataActionTypes.newsData;
  constructor(public payload: any) {}
}

export class newsDataSuccess implements Action {
  readonly type = UserdataActionTypes.newsDataSuccess;
  constructor(public payload: { data: any }) { }
}

export class newsDataFailure implements Action {
  readonly type = UserdataActionTypes.newsDataFailure;
  constructor(public payload: { error: any }) { }
}



export type UserdataActions = XyzUserdatas | XyzUserdatasSuccess | XyzUserdatasFailure | newsData | newsDataSuccess | newsDataFailure;

