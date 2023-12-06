import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {Router, UrlSerializer} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  searchProductsForm: FormGroup = new FormGroup({});
  searchProductsFormError: string = '';
  products: any = [];
  loading = false;
  constructor( private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchProductsForm = this.formBuilder.group({
      name: ['chicken', Validators.required],
    });
  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
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
