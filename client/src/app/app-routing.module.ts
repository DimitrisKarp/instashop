import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landmarks', pathMatch: 'full' },
  {
    path: 'landmarks',
    loadChildren: () =>
      import('./landmarks/landmarks.module').then((m) => m.LandmarksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
