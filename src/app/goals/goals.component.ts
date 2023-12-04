import {Component, OnInit} from '@angular/core';
import axios from "axios";
import { backendBaseUrl} from "../../../apiUtils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  goalData: any;
  setGoalsForm: FormGroup = new FormGroup({});
  setGoalsFormError: string = '';
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
      .post<any>(backendBaseUrl + '/goal/', goalDto, this.authHeader)
      .then((response) => {
        this.goalData = response.data;
        this.setGoalsForm.reset();
        this.setGoalsFormError = '';
      })
      .catch((error) => {
        this.setGoalsFormError = error.response.data;
      });
  }
}
