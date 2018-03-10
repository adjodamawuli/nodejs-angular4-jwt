import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {AuthService} from './auth.service';


@Injectable()
export class JobService {

  initialJobs=[];
  jobsSubject=new Subject();
  searchResultSubject=new Subject();
  jobs =[];

  BASE_URL= 'http://localhost:4201/';

  constructor(private http:Http,private authService:AuthService) { }

  getJobs(){

    return this.http.get(this.BASE_URL+'api/jobs')
    .map(res=>res.json());
    //.do(data=>this.initialJobs=data);
  }

  addJob(jobData,token){
    console.log('inside addjob');
    jobData.id=Date.now();
    //this.jobs=[jobData,...this.jobs];
    //return this.jobsSubject.next(jobData);
    const requestOptions =this.authService.addAuthorizationHeader(token);
    
    return this.http.post(this.BASE_URL+'api/jobs', jobData,requestOptions)
                        .map(res =>{
                          console.log(res);
                          this.jobsSubject.next(jobData);
                        });
  }
  getJob(id){
    return this.http.get(this.BASE_URL+ `api/jobs/${id}`)
                    .map(res=>res.json());
  }

  searchJob(criteria){
    console.log(criteria);
    return this.http.get(`${this.BASE_URL}api/search/${criteria.term}/${criteria.place}`)
                    .map(res => res.json())
                    .do(res => this.searchResultSubject.next(res));
  }
}
