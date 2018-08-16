/**
 * Created by dpineda on 9/27/17.
 */
// Imports
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class ApiService {
  private  urlApi = 'http://localhost:3000/api';
  constructor(
    private http: Http
  ) { };
  

  createGame(typeGame, callback) {
    const endpoint =  `${this.urlApi}/game`;
    this.http.post(endpoint,{typeGame: typeGame}).subscribe(data => {
      callback(data.json());
    });
  };
  getGame(gameId, callback) {
    const endpoint =   `${this.urlApi}/game/${gameId}`;
    this.http.get(endpoint).subscribe(data => {
      callback(data.json());
    });
  }
  newPlayer(player, callback) {
    const endpoint =  `${this.urlApi}/player`;
    this.http.post(endpoint,player).subscribe(data => {
      callback(data.json());
    });
  };
  addGamePlayer(data, callback) {
    const endpoint =  `${this.urlApi}/game/${data.gameId}/player`;
    let body = { 'playerId': data.playerId }
    this.http.post(endpoint, body).subscribe(data => {
      callback(data.json());
    });
  }
  addGameMove(data, callback) {
    const endpoint =  `${this.urlApi}/game/${data.gameId}/move`;
    this.http.post(endpoint, data).subscribe(data => {
      callback(data.json());
    });
  }
  getPlayer(playerId, callback) {
    const endpoint =  `${this.urlApi}/player/${playerId}`;
    this.http.get(endpoint).subscribe(data => {
      callback(data.json());
    });
  }

  


}
