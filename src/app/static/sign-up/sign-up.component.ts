import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  ROUTE_ANIMATIONS_ELEMENTS,
  AppState,
  ActionAuthLogin
} from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core/auth/authentication.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'asmb-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  errorMessage = '';

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  tryFacebookLogin() {
    this.authService.doFacebookLogin().then(res => {
      this.router.navigate([sessionStorage.getItem('redirect')]);
      console.log(res);
      this.store.dispatch(new ActionAuthLogin());
    });
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin().then(res => {
      this.router.navigate([sessionStorage.getItem('redirect')]);
      console.log(res);
      this.store.dispatch(new ActionAuthLogin());
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(res => {
      this.router.navigate([sessionStorage.getItem('redirect')]);
      console.log(res);
      this.store.dispatch(new ActionAuthLogin());
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value).then(
      res => {
        this.store.dispatch(new ActionAuthLogin());
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }
}
