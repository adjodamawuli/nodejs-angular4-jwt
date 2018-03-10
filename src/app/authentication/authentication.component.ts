import { Component, OnInit } from '@angular/core';

import {AuthService} from '../services/auth.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'cc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  jbbData=null;
  isAuthenticated=false;
  welcomeMessage='';

  constructor(private authService:AuthService) { }

  ngOnInit() {
    if(this.authService.userIsLoggedIn()){
      this.refresh();
    }
  }

  refresh() {
    this.isAuthenticated=true;
    this.welcomeMessage='Bienvenue';
  }
  login(formData) {
    console.log(formData);
    this.authService.login(formData)
                    .subscribe(
                      data => this.handleLoginSucces(data),
                      error => this.handleLoaginError(error)
                    )

  }
  handleLoginSucces(data){
    console.log('success',data);
    this.jbbData=data;
    this.refresh();
    localStorage.setItem('jbb-data',JSON.stringify(data));
  }
  handleLoaginError(error){
    console.error('Failure',error);
  }
}
