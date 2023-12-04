import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterDto} from './registerDto';
import {backendBaseUrl} from '../../../../apiUtils';
import axios from 'axios';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  registrationError: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required]],
      phone: ['', Validators.required]
    });
  }

  redirect() {
    this.router.navigate(['auth/login']);
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
      gender: formValues.gender,
      email: formValues.email,
      phone: formValues.phone
    };

    axios
      .post(backendBaseUrl + '/auth/register', registerDto)
      .then(() => {
        this.redirect();
      })
      .catch((error) => {
        this.registrationError = error.response.data;
      });

  }


}
