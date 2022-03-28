import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { UsersService } from '../user.service';

@Component({
  template: `

    <div class="container pt-4">
      <div>
        <div class="card p-4 utente shadow" style="width: 25rem;">
          <div class="card-body">
            <p class="h6">nome utente:</p>
            <p class="card-title h1 text-danger">{{ nome }}</p>
            <p class="h6">indirizzo email:</p>
            <p class="h4 sotto">
              {{email}}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProfilePage implements OnInit {
  constructor(private router: ActivatedRoute, public userSrv: UsersService, public authSrv: AuthService) {}

  users!: User[];
  index!: User;
  nome!: string;
  email!: string;

  ngOnInit(): void {
  this.nome = this.authSrv.userDati.user.name;
  this.email = this.authSrv.userDati.user.email;
  }
}
