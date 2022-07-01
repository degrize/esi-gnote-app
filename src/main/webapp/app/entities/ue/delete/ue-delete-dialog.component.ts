import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUE } from '../ue.model';
import { UEService } from '../service/ue.service';

@Component({
  templateUrl: './ue-delete-dialog.component.html',
})
export class UEDeleteDialogComponent {
  uE?: IUE;

  constructor(protected uEService: UEService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.uEService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
