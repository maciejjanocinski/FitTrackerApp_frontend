import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  diaryData: any;

  constructor() { }

  ngOnInit(): void {
    this.getDiaryData();
  }

  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  getDiaryData() {
    axios.get<any>(backendBaseUrl + '/diary/', this.authHeader)
      .then(response => {
        console.log(response.data)
        this.diaryData = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
