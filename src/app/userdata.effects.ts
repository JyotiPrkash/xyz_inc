import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as userdataAction from './userdata.actions';
import { ServerService } from './server.service';
import { map, catchError, mergeMap } from 'rxjs/operators';


@Injectable()
export class UserdataEffects {



  constructor(private actions$: Actions, private server:ServerService) {}

  @Effect()
  loadNews$ : Observable<Action> = this.actions$.pipe(
    ofType(userdataAction.UserdataActionTypes.newsData),
    mergeMap(
      (action) => this.server.getNewsData(action['payload']).pipe(
        map(news => (new userdataAction.newsDataSuccess({data:news}))),
        catchError(err => of(new userdataAction.newsDataFailure({error:err})))
      )
    )
  )
}
