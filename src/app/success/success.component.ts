import { Component } from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  goPortal() {
    axios
      .post<any>(backendBaseUrl + "/create-customer-portal-session", this.authHeader)
      .then((response) => {

      })
      .catch((error) => {
        console.log(error);
      });

  }
}
