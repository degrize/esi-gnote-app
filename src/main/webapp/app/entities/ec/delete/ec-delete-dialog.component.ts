import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEC } from '../ec.model';
import { ECService } from '../service/ec.service';

@Component({
  templateUrl: './ec-delete-dialog.component.html',
})
export class ECDeleteDialogComponent {
  eC?: IEC;

  constructor(protected eCService: ECService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eCService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
