import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.confirmCredentials();
  }
  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  confirmCredentials(): void {
    axios.get(`${backendBaseUrl}/premium/confirm-credentials`, this.authHeader)
      .then(response => {
        localStorage.setItem('token', response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania tokenu:', error);
      });
  }

}
