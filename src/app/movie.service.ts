import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './models/movies';

import { AuthData, AuthService } from './auth/auth.service';
import { take } from 'rxjs/operators';
import { Favoriti } from './models/favoriti';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieUrl = 'http://localhost:4200/api/movies-popular';
  favoriteUrl = 'http://localhost:4200/api/favorites';
  movies: Movie[] | undefined;
  preferiti: Movie[] = [];
  favoritesCounter = 0;

  constructor(private http: HttpClient, private authSrv: AuthService) {}
  getMovies() {
    return this.http.get<Movie[]>(this.movieUrl);
  }

  getMovie(id: number) {
    return this.http.get<Movie>(`${this.movieUrl}/${id}`);
  }

  async getFavourite() {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    const fav = await this.http
      .get<Favoriti[]>(
        `${this.favoriteUrl}?userId=${user.user.id}`
      )
      .toPromise();
    return fav;
  }

  async addFavorite(film: Movie) {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    this.preferiti.push(film);
    film.like = true;
    let count = 0;
    const data: Favoriti = {
      movieId: film.id,
      userId: user.user.id,
      id: count++
    };
    return this.http.post<Favoriti>(
      `${this.favoriteUrl}`,
      data
    );
  }

  async removeFavorite(favoriteId: number) {
      return this.http.delete(
        `${this.favoriteUrl}/${favoriteId}`,
      );
    }
}
