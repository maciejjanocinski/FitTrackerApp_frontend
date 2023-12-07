import { Component } from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.scss']
})
export class PremiumComponent {

  constructor(private router: Router) { }

  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  go() {
    axios
      .get<any>(backendBaseUrl + '/create-checkout-session', this.authHeader)
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

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
