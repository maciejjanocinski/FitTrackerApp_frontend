import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CancelComponent  implements OnInit {
  countdown: number = 5;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startCountdown();
  }
  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  redirectToHome() {
    this.router.navigate(['/premium']);
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

}
