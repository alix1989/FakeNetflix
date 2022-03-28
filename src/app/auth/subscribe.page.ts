import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: `
  <div class="bgHome">
    <div class="container subscribe" >
    <form #form="ngForm" (ngSubmit)="onsubmit(form)" class="box">
      <div class="form-group">
        <label for="name">Nome Completo</label>
        <input name="name" required ngModel class="form-control" id="name"  type="text">
      </div>
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
            class="form-control"
            required
            ngModel
            id="pass"
            type="password"
          />
        </div>
        <button type="submit" [disabled]="form.invalid" class="btn btn-danger mt-4">Registrati
          <span *ngIf="isLoading" class="spinner-border spinner-border-sm" role="status" ></span>
        </button>
    </form>
  </div>
  </div>
  `,
  styles: [
  ]
})
export class SubscribePage implements OnInit {
isLoading=false
  constructor(private authSrv:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  async onsubmit(form:NgForm){
    this.isLoading=true
    console.log(form.value)
    try {
      await this.authSrv.registration(form.value).toPromise()
      this.router.navigate(['/login'])
      this.isLoading=false
    } catch (error) {
      console.error(error);
      alert(error);
      form.reset();
      this.isLoading=false
    }
  }

}
