import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
      rel="stylesheet"
    />
    <style>
            .bgHome {
        z-index: -1;
        background: #0b0b0b;
        width: 100vw;
        height: 100vh;
        position: fixed;
      }
      </style>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  `,
  styles: [``],
})
export class AppComponent {
  constructor() {}
}
