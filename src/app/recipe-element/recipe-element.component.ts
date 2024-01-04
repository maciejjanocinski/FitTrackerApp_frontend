import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {backendBaseUrl} from "../../../apiUtils";
import axios from "axios";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-recipe-element',
  templateUrl: './recipe-element.component.html',
  styleUrls: ['./recipe-element.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.3s ease-in-out', style({ opacity: 1 })),
            ]),
        ]),
    ],
})
export class RecipeElementComponent {
  @Input() recipe: any;
  addProductError: string = '';

  constructor(private router: Router) {
  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }



  addRecipeToDiary() {
      const apiEndpoint = `${backendBaseUrl}/recipes/`;

      const productId = this.recipe.id;

      const requestBody = {
        id: productId,
        quantity: 1
      };


      console.log('Request body', requestBody)

      axios.post(apiEndpoint, requestBody, this.authHeader)
        .then(response => {
          this.router.navigate(['diary']);
        })
        .catch(error => {
          console.error('Error making request', error);
        });

  }

  search() {
    if (this.recipe.url) {
      window.open(this.recipe.url, '_blank');
    }
  }


}
