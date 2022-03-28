import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { AuthModule } from './auth/auth.module';
import { HomePage } from './pages/home.page';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MoviesPage } from './pages/movies.page';
import { AuthGuard } from './auth/auth.guard';
import { ProfilePage } from './pages/profile.page';

const routes: Route[] = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'movies',
    canActivate: [AuthGuard],
    component: MoviesPage,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfilePage
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  declarations: [AppComponent, NavbarComponent, HomePage, MoviesPage, ProfilePage],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
