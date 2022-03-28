import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../models/movies';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <div class="intro">
        <div class="box">
        <p class="text-center titolo h1">Benvenuto su sbretflix</p>
        <div class="sotto"><p class="text-center h3">
          Il miglior servizio di streaming offerto da Epicode!
        </p>
      </div></div>
      </div>
    </div>
  `,
  styles: [],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private movieSrv: MovieService) {}

  movies!: Movie[];
  index!: Movie;

  ngOnInit(): void {
    this.movieSrv.getMovies().subscribe((result) => {
      this.movies = result;
    });
  }
}
