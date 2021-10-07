import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm) {
    /* console.log(authForm.value.email, authForm.value.password); */

    // works turn back
    if (this.isLoginMode === true) {
      console.log('to do log in');
    } else {
      this.isLoading = true;
      this.authService
        .signUp(authForm.value.email, authForm.value.password)
        .subscribe(
          (resData) => {
            console.log(resData);
            this.isLoading = false;
          },
          (errorMessage) => {
            console.log(errorMessage);

            this.error = errorMessage;
            this.isLoading = false;
          }
        );
    }
    authForm.reset();
  }
}
