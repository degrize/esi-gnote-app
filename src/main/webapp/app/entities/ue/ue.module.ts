import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UEComponent } from './list/ue.component';
import { UEDetailComponent } from './detail/ue-detail.component';
import { UEUpdateComponent } from './update/ue-update.component';
import { UEDeleteDialogComponent } from './delete/ue-delete-dialog.component';
import { UERoutingModule } from './route/ue-routing.module';

@NgModule({
  imports: [SharedModule, UERoutingModule],
  declarations: [UEComponent, UEDetailComponent, UEUpdateComponent, UEDeleteDialogComponent],
  entryComponents: [UEDeleteDialogComponent],
})
export class UEModule {}
