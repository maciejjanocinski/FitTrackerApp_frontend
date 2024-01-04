import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {backendBaseUrl} from "../../../apiUtils";
import axios from "axios";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-activity-element',
  templateUrl: './activity-element.component.html',
  styleUrls: ['./activity-element.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ActivityElementComponent {
  @Input() activity: any;
  selectedQuantity: any;
  addProductError: string = '';

  constructor(private router: Router) {
  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }



  onSaveChanges() {
    const apiEndpoint = `${backendBaseUrl}/workout/`;

    const productId = this.activity.id;

    const requestBody = {
      activityid: productId,
      activitymin: this.selectedQuantity
    };



    axios.post(apiEndpoint, requestBody, this.authHeader)
      .then(() => {
        this.router.navigate(['workouts']);
      })
      .catch(error => {
        console.error('Error making request', error);
      });
  }


}
