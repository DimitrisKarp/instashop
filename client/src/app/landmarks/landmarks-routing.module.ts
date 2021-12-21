import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LandmarksEditComponent } from './landmarks-edit/landmarks-edit.component';
import { LandmarksListComponent } from './landmarks-list/landmarks-list.component';
import { LandmarksViewComponent } from './landmarks-view/landmarks-view.component';

const routes: Routes = [
  { path: '', component: LandmarksListComponent },
  { path: ':id', component: LandmarksViewComponent },
  {
    path: 'edit/:id',
    component: LandmarksEditComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandmarksRoutingModule {}
