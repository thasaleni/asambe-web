import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../core.state';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const obsCanActivate = this.store.pipe(select(selectIsAuthenticated));
    sessionStorage.setItem('redirect', state.url);
    obsCanActivate.subscribe(res => {
      if (!res) {
        this.router.navigate(['register']);
        return false;
      }
    });
    return obsCanActivate;
  }
}
