import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container login">
      <form #form="ngForm" (ngSubmit)="accedi(form)" class="box">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            name="email"
            class="form-control"
            required
            ngModel
            id="email"
            type="email"
          />
        </div>
        <div class="form-group">
          <label for="pass">Password</label>
          <input
            name="password"
            required
            class="form-control"
            ngModel
            id="pass"
            type="password"
          />
        </div>
        <button type="submit" [disabled]="form.invalid" class="btn btn-danger mt-4">Accedi</button>
      </form>
    </div>
  `,
  styles: [],
})
export class LoginPage implements OnInit {
  isLoading = false;
  errorMessage =""

  constructor(private authSrv:AuthService, private router:Router) {}

  ngOnInit(): void {}

  async accedi(form: NgForm) {
    console.log("accedi")
    this.authSrv.logout();
    this.isLoading = true
    console.log(form.value);
    try {
      await this.authSrv.login(form.value).toPromise()
      this.isLoading = false
      this.router.navigate(['/movies'])
    } catch (error: any) {
      this.isLoading = false
      form.reset();
      console.log(error);
      this.errorMessage = error;
      alert(this.errorMessage);
    }
  }
}
