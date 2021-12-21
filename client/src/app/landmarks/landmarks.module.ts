import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AclDirective } from '../auth/acl.directive';
import { LandmarksEditComponent } from './landmarks-edit/landmarks-edit.component';
import { LandmarksListComponent } from './landmarks-list/landmarks-list.component';
import { LandmarksRoutingModule } from './landmarks-routing.module';
import { LandmarksViewComponent } from './landmarks-view/landmarks-view.component';

@NgModule({
  declarations: [
    LandmarksListComponent,
    LandmarksViewComponent,
    LandmarksEditComponent,
    AclDirective,
  ],
  imports: [
    CommonModule,
    LandmarksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LandmarksModule {}
