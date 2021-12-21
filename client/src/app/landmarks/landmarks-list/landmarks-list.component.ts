import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from 'src/app/image-modal/image-modal.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-landmarks-list',
  templateUrl: './landmarks-list.component.html',
  styleUrls: ['./landmarks-list.component.scss'],
})
export class LandmarksListComponent implements OnInit {
  landmarks: any;

  constructor(private apiService: ApiService, private modal: NgbModal) {}

  async ngOnInit() {
    this.landmarks = await this.apiService.getLandmarks();
    this.landmarks = this.landmarks.map((landmark: any) => ({
      id: landmark.id,
      photo: landmark.get('photo'),
      photo_thumb: landmark.get('photo_thumb'),
      title: landmark.get('title'),
      short_info: landmark.get('short_info'),
    }));
  }

  openImageModal(url: string, title: string) {
    const modalRef = this.modal.open(ImageModalComponent, {
      modalDialogClass: 'image-modal',
    });
    modalRef.componentInstance.photoUrl = url;
    modalRef.componentInstance.photoTitle = title;
  }
}
