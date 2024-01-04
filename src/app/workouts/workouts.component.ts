import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class WorkoutsComponent implements OnInit {
  workoutsData: any;
  selectedQuantity: any;
  editWorkoutError: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getDiaryData();
  }

  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  getDiaryData() {
    axios.get<any>(backendBaseUrl + '/workout/', this.authHeader)
      .then(response => {
        console.log(response.data);
        this.workoutsData = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  editWorkout(id: any) {
    const apiEndpoint = `${backendBaseUrl}/workout/`;


    const requestBody = {
      id: id,
      activitymin: this.selectedQuantity
    };

    console.log(requestBody)
    axios.patch(apiEndpoint, requestBody, this.authHeader)
      .then(response => {
        this.getDiaryData();
      })
      .catch(error => {
        console.error('Error making request', error);
      });

    console.log(id)
    console.log(this.selectedQuantity)

  }

  deleteProduct(id: any) {
    const apiEndpoint = `${backendBaseUrl}/workout/`;

    const requestBody = {
      id: id,
    };
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };


    axios.delete(apiEndpoint, {
      headers: headers,
      data: requestBody
    }).then(() => {
      this.getDiaryData();
    }).catch(error => {
      console.error('Error making request', error);
    });

  }

  goToProducts() {
    this.router.navigate(['/activities']);
  }


}
