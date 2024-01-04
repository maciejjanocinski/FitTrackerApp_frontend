import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {PremiumModalComponent} from "../recipes/premium-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ProductsComponent implements OnInit {
  searchProductsForm: FormGroup = new FormGroup({});
  searchProductsFormError: string = '';
  products: any = [];
  loading = false;
  constructor( private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getLastlyAddedProducts();
    this.searchProductsForm = this.formBuilder.group({
      name: ['chicken', Validators.required],
    });
  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  getLastlyAddedProducts() {
    axios
      .get<any>(`${backendBaseUrl}/user/lastly-added-products`, this.authHeader)
      .then((response) => {
        console.log("LASTLY ADDED")
        console.log( response.data)
        this.products = response.data;
        this.searchProductsFormError = '';
      })
      .catch((error) => {
        console.log(error);
      })

  }


  searchProducts() {
    if (this.searchProductsForm.invalid) {
      this.searchProductsFormError = 'Please fill all fields';
      return;
    }

    this.loading = true;

    const formValues = this.searchProductsForm.value;
    const query: any = formValues.name;

    axios
        .get<any>(`${backendBaseUrl}/products/search?product=${query}`, this.authHeader)
        .then((response) => {
          this.products = response.data;
          console.log(this.products);
          this.searchProductsFormError = '';
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
  }
}
