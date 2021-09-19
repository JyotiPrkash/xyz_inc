import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './userdata.reducer'

const getUserFeatureState = createFeatureSelector<State>('usersState');

export const getUserData = createSelector(
    getUserFeatureState, 
    state => state.userDB
)

export const getUserError = createSelector(
    getUserFeatureState, 
    state => state.error
)

export const getNewsData = createSelector(
    getUserFeatureState, 
    state => state.newsData
)

export const getNewsError = createSelector(
    getUserFeatureState, 
    state => state.error
)