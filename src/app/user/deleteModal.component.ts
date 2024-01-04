import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Your account has been deleted.</h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="confirm()">Ok!</button>
    </div>
  `,
})
export class DeleteModalComponent {
  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.bsModalRef.hide();
  }
}
