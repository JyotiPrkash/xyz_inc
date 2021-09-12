import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inputText:string;
  constructor(public global: GlobalService) { }

  ngOnInit(): void {
  }

  userTagging = function(event){
    console.log(event.keyCode)
    if(event.keyCode == 50){
      this.global.userDB;
      let indOfTag = this.inputText.indexOf('@');
      // this.inputText
    }
  }

}
