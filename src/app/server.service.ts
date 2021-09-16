import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  userDB: object[];
  constructor(private http: HttpClient, private global: GlobalService) {
    this.userDB = [
      { userid: 'abc@media.com', password: 'abc123', username: 'tom' },
      { userid: 'def@media.com', password: 'def123', username: 'dick' },
      { userid: 'jp@media.com', password: 'jp123', username: 'Jp' },
      { userid: 'jp2@media.com', password: 'jp123', username: 'Jp2' },
      { userid: 'harry@media.com', password: 'harry123', username: 'Harry' }
    ]
  }

  setUsersInLocalStorage = function () {
    localStorage.setItem('userDB', JSON.stringify(this.userDB));
  }


  getRandomImages(query) {
    return this.http.get(this.global.getImagesApi + this.global.randomImages + query);
  }

  getChartData() {
    return this.http.get(this.global.sampleChartDataAPI);
  }

  getNewsData(query) {
    return this.http.get(this.global.newsAPI + query );
  }

}
