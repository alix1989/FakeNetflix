import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export interface AuthData {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  url = 'http://localhost:4201';
  private authSubj = new BehaviorSubject<null | AuthData>(null);

  user$ = this.authSubj.asObservable();
  timeoutLogout: any;

  user: any = localStorage.getItem('user');
  userDati: AuthData = JSON.parse(this.user);

  constructor(private http: HttpClient, private router: Router) {
    this.restore();
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.url}/login`, data).pipe(
      catchError(this.trovaErr),
      tap((data) => {
        console.log(data);
        this.authSubj.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.autoLogout(data);
      })
    );
  }
  restore() {
    if (!this.user) {
      return;
    }
    const userdata: AuthData = JSON.parse(this.user);
    if (this.jwtHelper.isTokenExpired(userdata.accessToken)) {
      return;
    }
    this.authSubj.next(userdata);

    this.autoLogout(userdata);
  }

  registration(data: { name: string; email: string; password: string }) {
    return this.http
      .post(`${this.url}/register`, data)
      .pipe(catchError(this.trovaErr));
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    if (this.timeoutLogout) {
      clearTimeout(this.timeoutLogout);
    }
  }

  autoLogout(data: AuthData) {
    const exDate = this.jwtHelper.getTokenExpirationDate(
      data.accessToken
    ) as Date;
    const exMs = exDate.getTime() - new Date().getTime();
    this.timeoutLogout = setTimeout(() => {
      this.logout();
    }, exMs);
  }

  private trovaErr(err: any) {
    switch (err.error) {
      case 'Email and password are required':
        return throwError('Inserisci e-mail e password!');
        break;
      case 'Email already exists':
        return throwError('Utente gia registrato!');
        break;
      case 'Email format is invalid':
        return throwError('Formato e-mail non valido!');
        break;
      case 'Cannot find user':
        return throwError('L\'utente non esiste!');
        break;
      default:
        return throwError('Errore nella chiamata!');
        break;
    }
  }
}
