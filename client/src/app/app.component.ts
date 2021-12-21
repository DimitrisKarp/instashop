import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AuthService } from './services/auth.service';
import { DestroyService } from './services/destroy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser: any;

  constructor(
    private authService: AuthService,
    private modal: NgbModal,
    private destroy$: DestroyService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  openLoginModal() {
    this.modal
      .open(LoginModalComponent)
      .closed.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentUser = this.authService.currentUser;
      });
  }

  logout() {
    this.authService.logout().then(() => {
      this.currentUser = this.authService.currentUser;
    });
  }
}
