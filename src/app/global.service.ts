import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  loggedInUser: Object = {};
  loggedInUserName: string = null;
  isUserLoggedIn: boolean = false;
  userDB: Object[];
  getImagesApi: string;
  randomImages: string;
  teamList: object[];
  sampleChartDataAPI: string;
  newsAPI: string;
  country: string[];
  category: string[];

  newsApiKey: any = "31e8d1fc02994c6491eccfe8423713e5";

  constructor() {
    this.loggedInUser = {};
    this.userDB = [];
    this.getImagesApi = 'https://picsum.photos/';
    this.randomImages = 'v2/list';
    this.sampleChartDataAPI = "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json";
    this.newsAPI = "https://newsapi.org/v2/top-headlines";
    this.country = ['us', 'ae', 'ar', 'br', 'ca', 'cu', 'cz', 'fr', 'gb', 'hk', 'in', 'jp', 'kr', 'mx', 'ng', 'nl', 'ph', 'rs', 'ru', 'za'];
    this.category = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    this.teamList = [
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
    ]
  }
}
