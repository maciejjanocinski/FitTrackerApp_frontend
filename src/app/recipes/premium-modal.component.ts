// premium-modal.component.ts
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Brak dostępu</h4>
    </div>
    <div class="modal-body">
      <p>You don't have permission to access this section. To gain access, purchase a premium account.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="confirm()">I understand</button>
    </div>
  `,
})
export class PremiumModalComponent {
  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.bsModalRef.hide();
  }
}
