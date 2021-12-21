import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  form: FormGroup;
  @ViewChild('loginForm', { static: true }) loginForm: ElementRef | undefined;
  showError: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    this.loginForm?.nativeElement.classList.add('was-validated');

    if (!this.form.valid) {
      return;
    }

    await this.authService
      .login(this.form.get('username')?.value, this.form.get('password')?.value)
      .then(() => {
        this.modal.close();
      })
      .catch(() => {
        this.showError = true;
      });
  }
}
