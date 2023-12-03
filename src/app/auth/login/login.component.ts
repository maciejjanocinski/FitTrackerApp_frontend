import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {LoginDto} from './loginDto';
import {backendBaseUrl} from '../../../../config';
import axios from 'axios';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  loginError: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  redirect() {
    this.router.navigate(['/']);
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginError = "Please fill all fields";
      return;
    }

    const formValues = this.loginForm.value;

    const loginDto: LoginDto = {
      username: formValues.username,
      password: formValues.password,
    };

    axios
      .post(backendBaseUrl + '/auth/login', loginDto)
      .then((response) => {
        localStorage.setItem('token', response.data);
        this.redirect();
      })
      .catch((error) => {
        this.loginError = error.response.data;
      });
  }


}
