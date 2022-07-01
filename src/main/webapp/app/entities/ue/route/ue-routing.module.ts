import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UEComponent } from '../list/ue.component';
import { UEDetailComponent } from '../detail/ue-detail.component';
import { UEUpdateComponent } from '../update/ue-update.component';
import { UERoutingResolveService } from './ue-routing-resolve.service';

const uERoute: Routes = [
  {
    path: '',
    component: UEComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UEDetailComponent,
    resolve: {
      uE: UERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UEUpdateComponent,
    resolve: {
      uE: UERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UEUpdateComponent,
    resolve: {
      uE: UERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(uERoute)],
  exports: [RouterModule],
})
export class UERoutingModule {}
