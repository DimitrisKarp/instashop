import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      short_info: '',
      url: '',
      description: '',
    });
  }

  async ngOnInit() {
    this.apiService
      .getLandmark(this.route.snapshot.paramMap.get('id'))
      .then((landmark: any) => {
        this.landmark = {
          id: landmark.id,
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

    await this.apiService
      .updateLandmark(this.route.snapshot.paramMap.get('id'), this.form.value)
      .then(() => {
        this.toastService.show('Landmark updated successfully', {
          classname: 'bg-success text-light text-center',
          delay: 5000,
        });
      })
      .catch((error) => {
        this.toastService.show('Something went wrong', {
          classname: 'bg-danger text-light text-center',
          delay: 5000,
        });
      });
  }
}
