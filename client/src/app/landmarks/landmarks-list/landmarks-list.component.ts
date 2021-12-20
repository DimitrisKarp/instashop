import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DestroyService } from 'src/app/services/destroy.service';
import * as Parse from 'parse';

@Component({
  selector: 'app-landmarks-list',
  templateUrl: './landmarks-list.component.html',
  styleUrls: ['./landmarks-list.component.scss'],
  providers: [DestroyService],
})
export class LandmarksListComponent implements OnInit {
  landmarks: any;

  constructor(
    private apiService: ApiService,
    private readonly destroy$: DestroyService
  ) {}

  async ngOnInit() {
    (await this.apiService.getLandmarks())
      .pipe(takeUntil(this.destroy$))
      .subscribe((landmarks) => {
        this.landmarks = landmarks.map((landmark) => ({
          id: landmark.id,
          photo_thumb: landmark.get('photo_thumb'),
          title: landmark.get('title'),
          short_info: landmark.get('short_info'),
        }));
      });
  }
}
