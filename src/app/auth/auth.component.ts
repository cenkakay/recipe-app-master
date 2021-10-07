import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm) {
    /* console.log(authForm.value.email, authForm.value.password); */
    let authObs = new Observable<AuthResponseData>();

    // works turn back
    if (this.isLoginMode === true) {
      this.isLoading = true;
      authObs = this.authService.logIn(
        authForm.value.email,
        authForm.value.password
      );
    } else {
      this.isLoading = true;
      authObs = this.authService.signUp(
        authForm.value.email,
        authForm.value.password
      );
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);

        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }
}
