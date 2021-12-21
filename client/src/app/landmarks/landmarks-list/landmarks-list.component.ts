import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DestroyService } from 'src/app/services/destroy.service';

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
    this.landmarks = await this.apiService.getLandmarks();
    this.landmarks = this.landmarks.map((landmark: any) => ({
      id: landmark.id,
      photo_thumb: landmark.get('photo_thumb'),
      title: landmark.get('title'),
      short_info: landmark.get('short_info'),
    }));
  }
}
