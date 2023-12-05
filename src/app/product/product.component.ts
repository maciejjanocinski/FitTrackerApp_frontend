import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: any;

  constructor(private dialog: MatDialog) {}

  openModal(): void {


    };



}
