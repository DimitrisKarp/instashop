import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from 'src/app/image-modal/image-modal.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-landmarks-edit',
  templateUrl: './landmarks-edit.component.html',
  styleUrls: ['./landmarks-edit.component.scss'],
})
export class LandmarksEditComponent implements OnInit {
  form: FormGroup;
  landmark: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modal: NgbModal
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      short_info: '',
      url: '',
      description: '',
    });
  }

  async ngOnInit() {
    await this.getLandmark();
  }

  async getLandmark() {
    await this.apiService
      .getLandmark(this.route.snapshot.paramMap.get('id'))
      .then((landmark: any) => {
        this.landmark = {
          id: landmark.id,
          photo: landmark.get('photo'),
          photo_thumb: landmark.get('photo_thumb'),
          title: landmark.get('title'),
          short_info: landmark.get('short_info'),
          url: landmark.get('url'),
          description: landmark.get('description'),
        };
        this.form.patchValue(this.landmark);
      });
  }

  async submit() {
    if (!this.form.valid) {
      return;
    }

    await this.apiService.updateLandmark(
      this.route.snapshot.paramMap.get('id'),
      this.form.value
    );
  }

  async processFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const name = event.target.files[0].name;
      await this.apiService
        .uploadImage(this.route.snapshot.paramMap.get('id'), name, file)
        .then(async () => {
          await this.getLandmark();
        });
    }
  }

  openImageModal(url: string, title: string) {
    const modalRef = this.modal.open(ImageModalComponent, {
      modalDialogClass: 'image-modal',
    });
    modalRef.componentInstance.photoUrl = url;
    modalRef.componentInstance.photoTitle = title;
  }
}
