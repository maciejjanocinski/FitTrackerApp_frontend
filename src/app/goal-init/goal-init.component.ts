import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {GoalInitModalComponent} from "./goalInit-modal.component";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-goal-init',
  templateUrl: './goal-init.component.html',
  styleUrls: ['./goal-init.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class GoalInitComponent implements OnInit {
  goalDataForm: FormGroup = new FormGroup({});
  goalDataError: string = '';
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.goalDataForm = this.formBuilder.group({
      goal: ['', Validators.required],
      activityLevel: ['', Validators.required],
      dietType: ['', Validators.required],
    });
  }


  redirect() {
    this.router.navigate(['/']);
  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  setGoal() {
    if (this.goalDataForm.invalid) {
      this.goalDataError = "Please fill all required fields";
      return;
    }
    this.loading = true;
    const formValues = this.goalDataForm.value;

    const addGoalDto: any = {
      activityLevel: formValues.activityLevel,
      goal: formValues.goal,
      dietType: formValues.dietType,
    };

    console.log(addGoalDto)

    axios
      .post(backendBaseUrl + '/goal/', addGoalDto, this.authHeader)
      .then(() => {
        this.redirect();
      })
      .catch((error) => {
        this.goalDataError = error.response.data;
      }).finally(() => {
      this.loading = false;
      const modalRef = this.modalService.show(GoalInitModalComponent);
    });
  }


}
