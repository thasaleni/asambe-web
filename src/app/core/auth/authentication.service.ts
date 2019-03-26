import { Injectable } from '@angular/core';
import { User } from '@app/store/user.model';
import { HttpService } from '../http/http-service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { OAuthUser } from '@app/store/oauth-user.model';
import { environment } from '@env/environment';
import { Trip, Car } from '@app/store/trip.model';
import { Route } from '@app/store/route.model.';
import { NotificationService } from '../notifications/notification.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authenticated = false;

  constructor(
    private readonly notificationService: NotificationService,
    private httpService: HttpService<User>,
    public afAuth: AngularFireAuth
  ) {}

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          this.saveUser(res);
          this._authenticated = true;
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          this.saveUser(res);
          this._authenticated = true;
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          this.saveUser(res);
          this._authenticated = true;
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            this._authenticated = true;
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            this._authenticated = true;
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut().then(
          () => {
            this.removeUser();
            this._authenticated = false;
            resolve();
          },
          () => reject()
        );
      } else {
        reject();
      }
    });
  }
  saveUser(res: any) {
    const user = User.fromOAuthResponse(res);
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.notificationService.success('Login successful.');
    } else {
      this.notificationService.error(
        'Uh, oh! There was an error with your login'
      );
    }
    const route = <Route>JSON.parse(sessionStorage.getItem('route'));
    const type = sessionStorage.getItem('type');
    user.route = route;
    this.httpService.post(environment.apiUrl + '/users/new', user).subscribe();
  }
  removeUser() {
    sessionStorage.removeItem('user');
  }
}
