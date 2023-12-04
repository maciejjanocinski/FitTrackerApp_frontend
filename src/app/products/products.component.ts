import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsDto: any;
  searchProductsForm: FormGroup = new FormGroup({});
  searchProductsFormError: string = '';
  products: any = [];
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchProductsForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  getGoalData() {
    axios.get<any>(backendBaseUrl + '/goal/', this.authHeader)
      .then(response => {
        this.productsDto = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  searchProducts() {
    if (this.searchProductsForm.invalid) {
      this.searchProductsFormError = "Please fill all fields";
      return;
    }

    const formValues = this.searchProductsForm.value;

    const query: any = formValues.name;

    axios
      .get<any>(backendBaseUrl + '/products/search?product=' + query, this.authHeader)
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
