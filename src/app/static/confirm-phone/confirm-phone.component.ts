import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '@app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { User } from '@app/store/user.model';
import { WindowService } from '@app/core/window/window.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '@env/environment';
@Component({
  selector: 'asmb-confirm-phone',
  templateUrl: './confirm-phone.component.html',
  styleUrls: ['./confirm-phone.component.scss']
})
export class ConfirmPhoneComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  valid = false;
  form: FormGroup;
  windowRef: any;
  phoneNumber: string;
  verificationCode: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private win: WindowService,
    public afAuth: AngularFireAuth,
    public notificationService: NotificationService
  ) {}

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    let num: string = this.form.get('phone').value;
    if (num) {
      if (num.startsWith('0')) {
        num = num.substr(1, num.length - 1);
      } else {
        this.notificationService.warn('number is invalid.');
        return false;
      }
    } else {
      this.notificationService.warn('number is invalid.');
      return false;
    }
    num = '+27' + num;
    this.phoneNumber = num;
    console.log('number: ' + JSON.stringify(num));
    console.log('appVer: ' + appVerifier);
    firebase
      .auth()
      .signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => {
        this.notificationService.error(JSON.stringify(error));
        console.log(error);
      });
    return false;
  }

  verifyLoginCode() {
    console.log('verification: ' + this.verificationCode);
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        console.log(JSON.stringify(result));
        if (result && result.user) {
          this.notificationService.success('Phone number verified succesfuly.');
          const user = <User>JSON.parse(sessionStorage.getItem('user'));
          user.cellphone = this.phoneNumber;
          sessionStorage.setItem('user', JSON.stringify(user));
        }
      })
      .catch(error => {
        this.notificationService.error(JSON.stringify(error));
        console.log(error, 'Incorrect code entered?');
      });
  }
  ngOnInit() {
    this.form = this.fb.group({
      autosave: false,
      phone: [
        this.phoneNumber,
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ]
    });
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );
    this.windowRef.recaptchaVerifier.render();
  }
}
