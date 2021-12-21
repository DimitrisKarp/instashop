import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AuthService } from './services/auth.service';
import { DestroyService } from './services/destroy.service';
import { ToastService } from './services/toast.service';

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
    private destroy$: DestroyService,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
      });
  }

  openLoginModal() {
    this.modal.open(LoginModalComponent);
  }

  logout() {
    this.authService.logout();
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
