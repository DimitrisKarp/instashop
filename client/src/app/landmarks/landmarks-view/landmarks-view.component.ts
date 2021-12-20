import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DestroyService } from 'src/app/services/destroy.service';

@Component({
  selector: 'app-landmarks-view',
  templateUrl: './landmarks-view.component.html',
  styleUrls: ['./landmarks-view.component.scss'],
})
export class LandmarksViewComponent implements OnInit {
  landmark: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private readonly destroy$: DestroyService
  ) {}

  async ngOnInit() {
    (await this.apiService.getLandmark(this.route.snapshot.paramMap.get('id')))
      .pipe(takeUntil(this.destroy$))
      .subscribe((landmark) => {
        this.landmark = {
          id: landmark.id,
          photo_thumb: landmark.get('photo_thumb'),
          title: landmark.get('title'),
          short_info: landmark.get('short_info'),
          url: landmark.get('url'),
          description: landmark.get('description'),
        };
      });
  }
}
