import { Action } from '@ngrx/store';
import { AppUserData } from './userdata';
import { UserdataActions, UserdataActionTypes } from './userdata.actions';


export const userdataFeatureKey = 'usersState';

export interface State {

  userDB: AppUserData[],
  loggedInUser: Object,
  loggedInUserName: string,
  isUserLoggedIn: boolean,
  country: string[],
  category: string[],
  teamList: object[],
  error: string,
  newsData: any[]
}

export const initialState: State = {
  userDB: [
    { userid: 'abc@media.com', password: 'abc123', username: 'tom' },
    { userid: 'def@media.com', password: 'def123', username: 'dick' },
    { userid: 'jp@media.com', password: 'jp123', username: 'Jp' },
    { userid: 'jp2@media.com', password: 'jp123', username: 'Jp2' },
    { userid: 'harry@media.com', password: 'harry123', username: 'Harry' },
    { userid: 'fred@media.com', password: 'fred123', username: 'Fred' },
    { userid: 'billy@media.com', password: 'billy123', username: 'Billy' }
  ],
  loggedInUser: {},
  loggedInUserName: null,
  isUserLoggedIn: false,
  country: ['us', 'ae', 'ar', 'br', 'ca', 'cu', 'cz', 'fr', 'gb', 'hk', 'in', 'jp', 'kr', 'mx', 'ng', 'nl', 'ph', 'rs', 'ru', 'za'],
  category: ['breaking-news', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'],
  teamList: [
    {
      name: "Lily Aldrin",
      profile: "Co-Founder & CEO",
      pic: './assets/img/user1.svg'
    },
    {
      name: "Marshal Eriksen",
      profile: "Co-Founder & COO",
      pic: './assets/img/user2.svg'
    },
    {
      name: "Barney Stinson",
      profile: "CFO",
      pic: './assets/img/user3.svg'
    },
    {
      name: "Robin Scherbatsky",
      profile: "Senior Director",
      pic: './assets/img/user4.svg'
    },
    {
      name: "Jyoti Prakash",
      profile: "CTO",
      pic: './assets/img/user5.svg'
    },
    {
      name: "You",
      profile: "Wanna join us?",
      pic: './assets/img/dummy.svg'
    }
  ],
  error: "",
  newsData: []
};

export function reducer(state = initialState, action: UserdataActions): State {
  switch (action.type) {

    case UserdataActionTypes.XyzUserdatas:
      return { ...state }

    case UserdataActionTypes.XyzUserdatasSuccess:
      return {
        ...state,
        userDB: action.payload.data,

      }
    case UserdataActionTypes.XyzUserdatasFailure:
      return {
        ...state,
        userDB: [],
        error: action.payload.error
      }

    case UserdataActionTypes.newsData:
      return { ...state }

    case UserdataActionTypes.newsDataSuccess:
      return {
        ...state,
        newsData: action.payload.data,

      }
    case UserdataActionTypes.newsDataFailure:
      return {
        ...state,
        newsData: [],
        error: action.payload.error
      }

    default:
      return state;
  }
}
