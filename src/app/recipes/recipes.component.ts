import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  searchRecipesForm: FormGroup = new FormGroup({});
  searchRecipesFormError: string = '';
  recipes: any = [];
  loading = false;
  constructor( private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchRecipesForm = this.formBuilder.group({
      name: ['chicken', Validators.required],
    });
  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  searchRecipes() {
    if (this.searchRecipesForm.invalid) {
      this.searchRecipesFormError = 'Please fill all fields';
      return;
    }

    this.loading = true;

    const formValues = this.searchRecipesForm.value;
    const query: any = formValues.name;

    axios
      .get<any>(`${backendBaseUrl}/recipes/search?recipe=${query}`, this.authHeader)
      .then((response) => {
        this.recipes = response.data;
        console.log(this.recipes);
        this.searchRecipesFormError = '';
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
