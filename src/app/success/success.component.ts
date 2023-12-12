import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  countdown: number = 5;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fetchPremiumToken();
    this.startCountdown();
  }
  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  redirectToHome() {
    this.router.navigate(['/premium/active']);
  }

  skipCountdown() {
    this.countdown = 0;
    this.redirectToHome();
  }

  startCountdown() {
    const countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(countdownInterval);
        this.redirectToHome();
      }
    }, 1000);
  }

  fetchPremiumToken(): void {
    axios.get(`${backendBaseUrl}/premium/`, this.authHeader)
      .then(response => {
        localStorage.setItem('token', response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania tokenu:', error);
      });
  }

}













