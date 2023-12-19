import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-workouts',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ActivitiesComponent implements OnInit {
  searchProductsForm: FormGroup = new FormGroup({});
  searchProductsFormError: string = '';
  activities: any = [];
  loading = false;
  constructor( private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchProductsForm = this.formBuilder.group({
      name: ['running', Validators.required],
    });
  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  searchProducts() {
    if (this.searchProductsForm.invalid) {
      this.searchProductsFormError = 'Please fill all fields';
      return;
    }

    this.loading = true;

    const formValues = this.searchProductsForm.value;
    const query: any = formValues.name;

    axios
      .get<any>(`${backendBaseUrl}/activities/search?activity=${query}`, this.authHeader)
      .then((response) => {
        this.activities = response.data;

        this.searchProductsFormError = '';
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
