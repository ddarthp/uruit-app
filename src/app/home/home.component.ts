import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/apiService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public service:ApiService,
    public route: Router
  ) { }
  ngOnInit() {
    
  }

  startGame(type:string){
 
    switch (type){
      case 'single':
        this.startSingle();
        break;
      case 'local':
        this.startLocal();
        break;
      case 'online': 
        this.startOnline();
        break;
    }
  }

  startSingle() {
    this.service.createGame('single', (response) => {
      console.log(response);
      this.route.navigate(['game', response._id])
    })
  } 
  startLocal() {
    this.service.createGame('local', (response) => {
      console.log(response);
      this.route.navigate(['game', response._id])
    })
  }
  startOnline() {
    this.service.createGame('online', (response) => {
      console.log(response);
      this.route.navigate(['game', response._id])
    })
  }

}
