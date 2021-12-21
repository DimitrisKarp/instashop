import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent {
  @Input() photoUrl: string | undefined;
  @Input() photoTitle: string | undefined;

  constructor(public modal: NgbActiveModal) {}
}
