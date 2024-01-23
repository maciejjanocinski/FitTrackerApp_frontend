import {Component, Input} from '@angular/core';
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.3s ease-in-out', style({ opacity: 1 })),
            ]),
        ]),
    ],
})
export class ProductComponent {
    @Input() thisProduct: any;
    selectedMeasure: any;
    selectedQuantity: any;
    addProductError: string = '';

    constructor(private router: Router) {
    }

    authHeader = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }



    onSaveChanges() {
        const apiEndpoint = `${backendBaseUrl}/diary/product`;

        const productId = this.thisProduct.id;

        const requestBody = {
            id: productId,
            measureLabel: this.selectedMeasure,
            quantity: this.selectedQuantity
        };

        axios.post(apiEndpoint, requestBody, this.authHeader)
            .then(response => {
                this.router.navigate(['diary']);
            })
            .catch(error => {
              this.addProductError = error.response.data
            });
    }


}
