import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
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
