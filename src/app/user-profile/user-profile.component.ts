import { Component, OnInit } from '@angular/core';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'cc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  decodeToken=null;
  isAdmin=false;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    if(this.authService.userIsLoggedIn()){
      const jjbtToken=JSON.parse(localStorage.getItem('jbb-data'))
      this.decodeToken=this.authService.decodeToken(jjbtToken.token);
      console.log(this.decodeToken);

      if(this.decodeToken && this.decodeToken.role ==='admin'){
        this.isAdmin = true;
      }
    }
  }

}
