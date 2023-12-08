import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.fetchPremiumToken();
  }
  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  fetchPremiumToken(): void {
    axios.get(`${backendBaseUrl}/premium/`, this.authHeader)
      .then(response => {
        localStorage.setItem('token', response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania tokenu:', error);
      });
  }

}













