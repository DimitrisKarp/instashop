import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LandmarksListComponent } from './landmarks-list/landmarks-list.component';
import { LandmarksRoutingModule } from './landmarks-routing.module';
import { LandmarksViewComponent } from './landmarks-view/landmarks-view.component';

@NgModule({
  declarations: [LandmarksListComponent, LandmarksViewComponent],
  imports: [CommonModule, LandmarksRoutingModule],
})
export class LandmarksModule {}
