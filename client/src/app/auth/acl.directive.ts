import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DestroyService } from '../services/destroy.service';

@Directive({
  selector: '[appAcl]',
})
export class AclDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private destroy$: DestroyService
  ) {}

  ngOnInit() {
    this.authService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentUser) => {
        if (currentUser) {
          if (currentUser.authenticated()) {
            return this.viewContainer.createEmbeddedView(this.templateRef);
          }
        }
        return this.viewContainer.clear();
      });
  }
}
