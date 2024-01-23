import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {animate, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-body-metrics',
  templateUrl: './body-metrics.component.html',
  styleUrls: ['./body-metrics.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BodyMetricsComponent implements OnInit {
  bodyMetricsForm: FormGroup = new FormGroup({});
  bodyMetricsFormError: string = '';
  name: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getUser();
    this.bodyMetricsForm = this.formBuilder.group({
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      neck: ['', Validators.required],
      waist: ['', Validators.required],
      hip: ['', Validators.required]
    });
  }

  getUser() {
    axios
      .get<any>(backendBaseUrl + '/user/', this.authHeader)
      .then((response) => {
        this.name = response.data.name;
      })
      .catch((error) => {
        console.log(error);
      });
  }


  redirect() {
    this.router.navigate(['/goal-init']);
  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  register() {
    if (this.bodyMetricsForm.invalid) {
      this.bodyMetricsFormError = "Please fill all required fields";
      return;
    }

    const formValues = this.bodyMetricsForm.value;

    const addBodyMetricsDto: any = {
      gender: formValues.gender,
      birthDate: formValues.birthDate,
      height: formValues.height,
      weight: formValues.weight,
      neck: formValues.neck,
      waist: formValues.waist,
      hip: formValues.hip
    };

    axios
      .post(backendBaseUrl + '/body-metrics/', addBodyMetricsDto, this.authHeader)
      .then(() => {
        this.redirect();
      })
      .catch((error) => {
        this.bodyMetricsFormError = error.response.data;
      });

  }


}
