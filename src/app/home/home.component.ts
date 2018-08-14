import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  constructor() { }

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
    console.log('Single')
  }
  startLocal() {
    console.log('Local')
  }
  startOnline() {
    console.log('Online')
  }

}
