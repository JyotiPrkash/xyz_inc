import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  loggedInUser:Object = {};
  loggedInUserName:string = null;
  isUserLoggedIn:boolean = false;
  userDB:Object[];
  getImagesApi:string;
  randomImages:string;
  
  constructor() {
    this.loggedInUser = {};
    this.userDB = [];
    this.getImagesApi = 'https://picsum.photos/';
    this.randomImages = 'v2/list';
   }
}
