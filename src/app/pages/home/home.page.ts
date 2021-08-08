import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideInAnimation } from 'src/app/animations/slide';
import { Application } from 'src/app/interfaces/application';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [slideInAnimation]
})
export class HomePage {
  applications: Application[] = [
    {
      name: 'tic-tac-toe',
      image: '../../../assets/img/tic-tac-toe-1777859_640.jpg',
      route: '/tic-tac-toe',
      docs: ''
    }
  ];

  constructor(private router: Router) { }

  downloadProject(name: string) {

  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  seeTheDocs(route: string) {
    // TODO: docs url here
  }
}
