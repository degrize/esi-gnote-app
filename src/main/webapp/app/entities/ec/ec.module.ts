import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ECComponent } from './list/ec.component';
import { ECDetailComponent } from './detail/ec-detail.component';
import { ECUpdateComponent } from './update/ec-update.component';
import { ECDeleteDialogComponent } from './delete/ec-delete-dialog.component';
import { ECRoutingModule } from './route/ec-routing.module';

@NgModule({
  imports: [SharedModule, ECRoutingModule],
  declarations: [ECComponent, ECDetailComponent, ECUpdateComponent, ECDeleteDialogComponent],
  entryComponents: [ECDeleteDialogComponent],
})
export class ECModule {}
