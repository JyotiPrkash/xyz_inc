import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  userDB: object[];
  constructor(private http: HttpClient, private global:GlobalService) {
    this.userDB = [
      { userid: 'abc@media.com', password: 'abc123', username: 'tom' }, 
      { userid: 'def@media.com', password: 'def123', username: 'dick'},
      { userid: 'jp@media.com', password: 'jp123', username: 'Jp'}
    ]
  }

  setUsersInLocalStorage = function(){
    localStorage.setItem('userDB', JSON.stringify(this.userDB));
  }

  // getAllCities() {
  //   return this.http.get(this.global.getImagesApi + this.global.randomImages)
  //       .map((res: Response) => res.json());
  // }

  getRandomImages(query) {
    return this.http.get(this.global.getImagesApi + this.global.randomImages + query);
  }

}
