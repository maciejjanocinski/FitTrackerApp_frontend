import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Welcome to the FitTrackerApp!</h4>
    </div>
    <div class="modal-body">
      <p>Your metrics and goals have been successfully configured, and you are now ready to start using the application.
        Feel free to explore the features and make the most of the available functionalities. </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="confirm()">Ok!</button>
    </div>
  `,
})
export class GoalInitModalComponent {
  constructor(public bsModalRef: BsModalRef) {}

  confirm() {
    this.bsModalRef.hide();
  }
}
