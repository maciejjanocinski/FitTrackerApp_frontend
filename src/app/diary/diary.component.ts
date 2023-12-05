import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  diaryData: any;
  selectedMeasure: any;
  selectedQuantity: any;
  EditProductError: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getDiaryData();
  }

  authHeader  = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  getDiaryData() {
    axios.get<any>(backendBaseUrl + '/diary/', this.authHeader)
      .then(response => {
        this.diaryData = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  editProduct(id: any) {
    const apiEndpoint = `${backendBaseUrl}/diary/product`;


    const requestBody = {
      id: id,
      measureLabel: this.selectedMeasure,
      quantity: this.selectedQuantity
    };

    axios.patch(apiEndpoint, requestBody, this.authHeader)
        .then(response => {
          this.getDiaryData();
        })
        .catch(error => {
          console.error('Error making request', error);
        });

  }

  deleteProduct(id: any) {
    const apiEndpoint = `${backendBaseUrl}/diary/product`;

    const requestBody = {
      id: id,
    };
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };


    axios.delete(apiEndpoint, {
      headers: headers,
      data: requestBody
    }).then(response => {
      this.getDiaryData();
    }).catch(error => {
      console.error('Error making request', error);
    });

  }

  goToProducts() {
    this.router.navigate(['/products']);
  }


}
