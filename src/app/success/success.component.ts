import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}


  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }


  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];
    console.log(sessionId)
       this.sendSessionIdToBackend(sessionId);
    });
  }

  private sendSessionIdToBackend(sessionId: string): void {


    axios
      .post<any>(backendBaseUrl + '/processSessionId', sessionId, this.authHeader)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

















