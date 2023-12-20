import {Component, OnInit} from '@angular/core';
import axios from "axios";
import { backendBaseUrl} from "../../../apiUtils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import {GoalInitModalComponent} from "../goal-init/goalInit-modal.component";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class GoalsComponent implements OnInit {
  goalData: any;
  setGoalsForm: FormGroup = new FormGroup({});
  setGoalsFormError: string = '';
  isUsernameFormEnabled1: boolean = false;


  goalDataForm: FormGroup = new FormGroup({});
  goalDataError: string = '';
  loading = false;
  isUsernameFormEnabled: boolean = false;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getGoalData();
    this.setGoalsForm = this.formBuilder.group({
      kcal: ['', Validators.required],
      proteinPercentage: ['', Validators.required],
      carbohydratesPercentage: ['', Validators.required],
      fatPercentage: ['', Validators.required]
    });
    this.goalDataForm = this.formBuilder.group({
      goal: ['', Validators.required],
      activityLevel: ['', Validators.required],
      dietType: ['', Validators.required],
    });

    this.goalDataForm.disable();
    this.setGoalsForm.disable();
  }

  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  getGoalData() {
    axios.get<any>(backendBaseUrl + '/goal/', this.authHeader)
      .then(response => {
        this.goalData = response.data;



      })
      .catch(error => {
        console.log(error);
      });




  }

  setGoal() {
    if (this.goalDataForm.invalid) {
      this.goalDataError = "Please fill all required fields";
      return;
    }
    const formValues = this.goalDataForm.value;

    const addGoalDto: any = {
      activityLevel: formValues.activityLevel,
      goal: formValues.goal,
      dietType: formValues.dietType,
    };

    console.log(addGoalDto)

    axios
      .post(backendBaseUrl + '/goal/', addGoalDto, this.authHeader)
      .then((response) => {
        this.goalData = response.data;
      })
      .catch((error) => {
        this.goalDataError = error.response.data;
      }).finally(() => {
      this.loading = false;
    });

    this.isUsernameFormEnabled = false;
    this.goalDataForm.disable();
  }

  setGoals() {
    if (this.setGoalsForm.invalid) {
      this.setGoalsFormError = "Please fill all fields";
      return;
    }

    const formValues = this.setGoalsForm.value;

    const goalDto: any = {
      kcal: formValues.kcal,
      proteinPercentage: formValues.proteinPercentage,
      carbohydratesPercentage: formValues.carbohydratesPercentage,
      fatPercentage: formValues.fatPercentage,
    };

    axios
      .post<any>(backendBaseUrl + '/goal/custom', goalDto, this.authHeader)
      .then((response) => {
        this.goalData = response.data;
        this.setGoalsForm.reset();
        this.setGoalsFormError = '';
      })
      .catch((error) => {
        this.setGoalsFormError = error.response.data;
      });
    this.isUsernameFormEnabled1 = false;
    this.setGoalsForm.disable();
  }


  isUsernameFormDisabled() {
    return !this.isUsernameFormEnabled;
  }
  toggleUsernameForm() {
    this.isUsernameFormEnabled = !this.isUsernameFormEnabled;

    if (this.isUsernameFormEnabled) {
      this.goalDataForm.enable();
    } else {
      this.goalDataForm.disable();
    }
  }

  isUsernameFormDisabled1() {
    return !this.isUsernameFormEnabled1;
  }
  toggleUsernameForm1() {
    this.isUsernameFormEnabled1 = !this.isUsernameFormEnabled1;

    if (this.isUsernameFormEnabled1) {
      this.setGoalsForm.enable();
    } else {
      this.setGoalsForm.disable();
    }
  }

}
