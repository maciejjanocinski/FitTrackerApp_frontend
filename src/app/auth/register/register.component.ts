import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterDto} from './registerDto';
import {backendBaseUrl} from '../../../../apiUtils';
import axios from 'axios';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  registrationError: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.registerForm = this.formBuilder.group({
      username: ['Maciej', Validators.required],
      password: ['Maciek123!', Validators.required],
      confirmPassword: ['Maciek123!', Validators.required],
      name: ['Maciek', Validators.required],
      surname: ['Janocinski', Validators.required],
      email: ['maciek@gmail.com', [Validators.required]],
      phone: ['123123123', Validators.required]
    });
  }

  redirect() {
    this.router.navigate(['body-metrics']);
  }



  register() {
    if (this.registerForm.invalid) {
      this.registrationError = "Please fill all fields";
      return;
    }

    const formValues = this.registerForm.value;

    const registerDto: RegisterDto = {
      username: formValues.username,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      name: formValues.name,
      surname: formValues.surname,
      email: formValues.email,
      phone: formValues.phone
    };

    axios
      .post(backendBaseUrl + '/auth/register', registerDto)
      .then((response) => {
        localStorage.setItem('token', response.data.jwt);
        this.redirect();
      })
      .catch((error) => {
        this.registrationError = error.response.data;
      });

  }


}
