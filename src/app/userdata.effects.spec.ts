import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserdataEffects } from './userdata.effects';

describe('UserdataEffects', () => {
  let actions$: Observable<any>;
  let effects: UserdataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserdataEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UserdataEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
