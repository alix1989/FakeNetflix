import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Movie } from '../models/movies';
import { MovieService } from '../movie.service';

@Component({
  template: `
    <div class="container pt-4 row movie">
      <div *ngFor="let film of films; let i = index" class="col-md-4 mt-3">
        <div class="p-2 pb-4 shadow bg-dark carta">
          <img
            src="http://image.tmdb.org/t/p/w500{{ film.poster_path }}"
            class="locandina"
            (click)="test(film.title, film.overview, film.vote_average)"
          />
          <p class="text-center text-small text-grigio mt-1">
            fai click sulla locandina per conoscere la trama!
          </p>
          <button
            class="btn"
            *ngIf="film.like"
            (click)="removeFav(film)"
            style="color: red; font-size: 20px;"
          >
            ♥
          </button>
          <button
            class="btn"
            *ngIf="!film.like"
            (click)="addFav(film)"
            style="color: grey; font-size: 20px;"
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MoviesPage implements OnInit {
  constructor(public movieSrv: MovieService, public authSrv: AuthService) {}

  films!: Movie[];
  index!: Movie;
  idUtente!: string;
  liked: boolean = false;

  ngOnInit(): void {
    this.movieSrv.getMovies().subscribe((result) => {
      this.films = result;
      this.movieSrv.getFavourite().then((resultFav) => {
        if (resultFav !== undefined) {
          this.films.forEach((film) => {
            // Prendi il preferito, se c'è
            const favorite = resultFav.find((fav) => fav.movieId === film.id);
            film.like = favorite !== undefined;
            // Se il preferito esiste, associalo all'id del film
            if (favorite) {
              console.log(
                'Il film ' +
                  film.title +
                  " ha l'id " +
                  film.id +
                  ' è preferito: ' +
                  film.like +
                  " l'id del preferito è: " +
                  favorite.id
              );
              film.favId = favorite.id;
            }
          });
        }
      });
    });
  }

  test(title: string, trama: string, voto: number): void {
    alert(
      ' || ' +
        title +
        ' || ' +
        trama +
        ' || Votazione media degli utenti: ' +
        voto
    );
  }
  async addFav(film: Movie) {
    await (await this.movieSrv.addFavorite(film)).toPromise();
    film.like = true;
  }

  async removeFav(film: Movie) {
    await (await this.movieSrv.removeFavorite(film.favId)).toPromise();
    film.like = false;
  }
}
