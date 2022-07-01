import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ECComponent } from '../list/ec.component';
import { ECDetailComponent } from '../detail/ec-detail.component';
import { ECUpdateComponent } from '../update/ec-update.component';
import { ECRoutingResolveService } from './ec-routing-resolve.service';

const eCRoute: Routes = [
  {
    path: '',
    component: ECComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ECDetailComponent,
    resolve: {
      eC: ECRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ECUpdateComponent,
    resolve: {
      eC: ECRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ECUpdateComponent,
    resolve: {
      eC: ECRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(eCRoute)],
  exports: [RouterModule],
})
export class ECRoutingModule {}
