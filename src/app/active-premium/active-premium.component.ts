import { Component } from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";

@Component({
  selector: 'app-active-premium',
  templateUrl: './active-premium.component.html',
  styleUrls: ['./active-premium.component.scss']
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
