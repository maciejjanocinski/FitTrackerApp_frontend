import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
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













