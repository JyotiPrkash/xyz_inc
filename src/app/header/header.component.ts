import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import { ServerService } from '../server.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import {Store, select } from '@ngrx/store';
import * as UserdataActions from '../userdata.actions';
import * as fromUserData from '../userdata.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userModel: any = {};
  @ViewChild('closeLoginModal') closeLoginModal: ElementRef;

  constructor(public global: GlobalService, private server: ServerService, private common: CommonService, private router: Router, private store:Store) {

  }

  ngOnInit(): void {

    this.store.dispatch(new UserdataActions.XyzUserdatas());

    this.store.pipe(select(fromUserData.getUserData)).subscribe(
      userDB => {
        this.global.userDB = userDB;
      }
    )

    localStorage.setItem('userDB', JSON.stringify(this.global.userDB));
 
    if (!this.global.loggedInUser.hasOwnProperty('username')) {
      let loggedUser = JSON.parse(localStorage.getItem('userDetails'));
      if (!loggedUser) {
        this.global.isUserLoggedIn = false;
      } else {
        this.global.isUserLoggedIn = true;
        this.global.loggedInUser = loggedUser;
        this.global.loggedInUserName = loggedUser.username;
      }
    }
  }

  onLogin = function () {
    
    let isLoginSuccessful = this.global.userDB.findIndex((user) => {
      if (user.userid == this.userModel.userid && user.password == this.userModel.password) {
        localStorage.setItem("userDetails", JSON.stringify(user));
        this.global.loggedInUser = user;
        this.global.loggedInUserName = user.username;
        this.global.isUserLoggedIn = true;
        return user;
      }
    })
    if (isLoginSuccessful != -1) {
      this.common.showSuccess("Login Successful", "Hey " + this.global.loggedInUser.username);
      this.closeLoginModal.nativeElement.click();
      return;
    } else {
      this.common.showError("Wrong Credentials", "User Not Found! Please check the credentials again.");
      this.closeLoginModal.nativeElement.click();
      return;
    }

  }

  logoutUser = function () {
    this.router.navigate(['../home']);
    localStorage.setItem("userDetails", null);
    this.global.loggedInUser = null;
    this.global.loggedInUserName = null;

  }

}
