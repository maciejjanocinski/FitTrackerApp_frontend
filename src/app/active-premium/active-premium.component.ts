import { Component } from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-active-premium',
  templateUrl: './active-premium.component.html',
  styleUrls: ['./active-premium.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ActivePremiumComponent {

  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  goPortal() {
    axios
      .get<any>(backendBaseUrl + "/create-customer-portal-session", this.authHeader)
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

  }

}
