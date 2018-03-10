import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import {JobService} from '../services/job.service';

@Component({
  selector: 'cc-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobDetails=null;
  erroMessge='';
  error=null;


  constructor(private jobService: JobService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    const id=this.activatedRoute.snapshot.params.id;
    this.jobService.getJob(id)
                   .subscribe(
                     data =>{
                       this.handleServiceResponse(data);
                     },
                     error =>{
                       this.handleError(error);
                     }
                   )
  }
  handleServiceResponse(response){
    if(response.success){
      this.jobDetails=response.job;
    }else{
      this.erroMessge=response.message;
    }
  }

  handleError(error){
    console.log('handleError', error);
    this.error=error;
  }
}
