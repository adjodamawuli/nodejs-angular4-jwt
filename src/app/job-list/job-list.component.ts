import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import {JobService} from '../services/job.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'cc-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs=[];
  error='';
  constructor(private http:Http,private jobservice:JobService) { }
  

  ngOnInit() {
    this.jobservice.getJobs()
                   .subscribe(
                     data=>this.jobs=data,
                     error=>{
                       console.log(error);
                       this.error=error;
                     }
                   );
    this.jobservice.jobsSubject.subscribe(data=>{
      console.log(data);
      this.jobs=[data, ...this.jobs];
    })

  }

  /*ngOnInit() {
     this.http.get('data/jobs.json')
              .map(res=>{
                console.log(res.json());
                this.jobs=res.json();
              })
              .subscribe();
  }*/

}
