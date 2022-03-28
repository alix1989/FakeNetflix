import { Component, OnInit } from '@angular/core';
import { AuthData, AuthService } from './auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <style>
      .barra {
        height: 100vh;
        color: darkred;
        font-family: 'Bebas Neue', cursive;
        position: fixed;
      }
      .titolo {
        color: darkred;
        font-size: 60px;
        text-shadow: 1px 1px 1px black;
      }

      .sottotitoli {
        color: darkred;
        font-size: 20px;
      }

      .sottotitoli:hover {
        text-shadow: 1px 1px 1px black;
      }

      .saluto {
        font-size: 40px;
        opacity: 0.8;
      }
      ul li > .active {
        color: black;
        background-color: #9e3c3c50;
      }

      ul li > .active:hover {
        text-shadow: 1px 1px 1px darkred;
      }
    </style>
    <nav>
      <div
        class="barra d-flex flex-column flex-shrink-0 p-3 bg-dark"
        style="width: 20%;"
      >
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
        >
          <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
          </svg>
          <span class="titolo">SbretFlix</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a
              class="nav-link active sottotitoli"
              aria-current="page"
              [routerLink]="['/']"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              >Home</a
            >
          </li>
          <li *ngIf="!user" class="nav-item">
            <a
              class="nav-link sottotitoli"
              [routerLink]="['/login']"
              routerLinkActive="active"
              >Login</a
            >
          </li>
          <li *ngIf="!user" class="nav-item">
            <a
              class="nav-link sottotitoli"
              [routerLink]="['/registration']"
              routerLinkActive="active"
              >Registrati</a
            >
          </li>
          <li *ngIf="user" class="nav-item">
            <a
              class="nav-link sottotitoli"
              [routerLink]="['/movies']"
              routerLinkActive="active"
            >
              Movies
            </a>
          </li>
          <li *ngIf="user" class="nav-item">
            <a
              class="nav-link sottotitoli"
              [routerLink]="['/profile']"
              routerLinkActive="active"
            >
              Profilo
            </a>
          </li>
          <hr />
          <h6 *ngIf="user" class="text-center saluto">
            Ciao, {{ user.user.name }}
          </h6>
          <button *ngIf="user" (click)="logout()" class="btn btn-danger">
            logout
          </button>
        </ul>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  user!: AuthData | null;
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
    });
  }
  logout() {
    this.authSrv.logout();
  }
}
