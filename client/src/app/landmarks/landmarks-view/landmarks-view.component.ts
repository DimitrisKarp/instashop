import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from 'src/app/image-modal/image-modal.component';
import { ApiService } from 'src/app/services/api.service';

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
    private modal: NgbModal
  ) {}

  async ngOnInit() {
    this.landmark = await this.apiService.getLandmark(
      this.route.snapshot.paramMap.get('id')
    );
    this.landmark = {
      id: this.landmark.id,
      photo: this.landmark.get('photo'),
      photo_thumb: this.landmark.get('photo_thumb'),
      title: this.landmark.get('title'),
      short_info: this.landmark.get('short_info'),
      url: this.landmark.get('url'),
      description: this.landmark.get('description'),
    };
  }

  openImageModal(url: string, title: string) {
    const modalRef = this.modal.open(ImageModalComponent, {
      modalDialogClass: 'image-modal',
    });
    modalRef.componentInstance.photoUrl = url;
    modalRef.componentInstance.photoTitle = title;
  }
}
