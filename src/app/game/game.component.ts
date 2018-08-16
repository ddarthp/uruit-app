import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/apiService';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from '../../../node_modules/rxjs';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  interval:any;
  gameInit: boolean;
  gameTitle:string;
  gameCanvas: boolean = false;
  gameFinale: boolean = false;
  winnerName:string; 
  playerId: any;
  playerMoves = [];
  opponentMoves = [];
  Game:any;
  youAre: any;
  playerOne = {
    name: null,
    email: null
  }
  playerTwo = {
    name: null,
    email: null
  }
  playerTwoForm: boolean = false;
  weapons = [
    {
      name:'rock',
      img: '../../assets/images/rock.png',
      position:'deg0'
    },
    {
      name:'paper',
      img: '../../assets/images/paper.png',
      position:'deg120'
    },
    {
      name:'scissors',
      img: '../../assets/images/scissors.png',
      position:'deg240'
    }
  ];

  constructor(
    public service:ApiService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.service.getGame(params['id'], (result) =>{
        if (result)
          this.Game = result;
          if (this.Game.typeGame == 'online' && this.Game.playerOne) {
            this.playerOne = {
              name: this.Game.players.one.name,
              email: this.Game.players.one.email
            };
            this.playerTwoForm = true;
          }
            

          this.setTitle();
          if(this.Game.winnerGame) {
            this.gameFinale = true;
            this.gameCanvas = false;
            this.setWinner();
          }
      })
    })
    this.interval = setInterval( () => {
      this.pingGame();
      console.log(this.Game);
      console.log(this.youAre);
    }, 4000)
  }
 
  setTitle():void {
    switch (this.Game.typeGame) {
      case 'single': 
        this.gameTitle = 'Single player Game';
        break;
      case 'local': 
        this.gameTitle = 'Multiplayer Game';
        break;
      case 'online': 
        this.gameTitle = 'Online multiplayer Game';
        break;
    }
  }
  back() {
    this.router.navigate([''])
  }

  pingGame():void {
    this.activatedRoute.params.subscribe(params => {
      this.service.getGame(params['id'], (result) =>{
        if (result)
          this.Game = result;
          if (this.Game.typeGame == 'online' && this.Game.playerOne) {
            this.playerOne = {
              name: this.Game.players.one.name,
              email: this.Game.players.one.email
            };
            this.playerTwoForm = true;
          }
          this.setTitle();
          this.getPlayerMoves();
          if (this.playerMoves.length == 3) {
            this.getOpponentMoves();
          }
          if(this.Game.winnerGame) {
            this.gameFinale = true;
            this.gameCanvas = false;
            this.setWinner();
            clearInterval(this.interval);  
          }
      })
    })
  }
  setWinner() {
    let playerId = this.Game.winnerGame;
    if (playerId == '000000000000000000000000'){
      this.winnerName == 'No winner';
    } else {
      this.service.getPlayer(playerId, (player) => {
        this.winnerName = player.name;
      })
    }
  }
  begins() {
    if (this.Game.typeGame === 'single'  || this.Game.typeGame === 'online') {
      if (!this.Game.playerOne) {
        this.savePlayer(this.playerOne);
        this.youAre = this.playerOne;
      } else {
        this.savePlayer(this.playerTwo);
        this.youAre = this.playerTwo;
      }
      
      this.gameInit = true;
      this.gameCanvas = true;
     
    } else  {
      this.savePlayer(this.playerTwo);
      this.gameInit = true;
      this.gameCanvas = true;
      this.youAre = this.playerTwo;
    }
    
  }
  continue() {
    if(this.Game.players.one) {
      this.savePlayer(this.playerOne);
      this.youAre = this.playerOne;
    } else {
      this.savePlayer(this.playerTwo);
      this.youAre = this.playerTwo;
    }
      
    this.playerTwoForm = true;
  }

  getPlayer() {
    let players = this.Game.players;
    let actualPlayer:any;
    for (let i in players ) {
      if (players[i].name == this.youAre.name) {
        actualPlayer = players[i];
      }
    }
    return actualPlayer;
  }
  setMovement(weapon):void {
    let players = this.Game.players;
    let actualPlayer:any;
    for (let i in players ) {
      if (players[i].name == this.youAre.name) {
        actualPlayer = players[i];
      }
    }

    let movement = {
      weapon: weapon.name,
      playerId: actualPlayer._id,
      set: this.getSet(actualPlayer._id),
      gameId: this.Game._id
    }
    this.service.addGameMove(movement, (result) => {
      console.log(result);
    })
  }
  getPlayerMoves():void {
    let player = this.getPlayer();
    let moves = this.Game.moves;
    let playerMoves = []
    moves.forEach(m => {
      if(m.playerId == player._id){
        playerMoves.push(m);
      }
    });
    this.playerMoves = playerMoves;
  }
  getOpponentMoves():void {
    let player = this.getPlayer();
    let moves = this.Game.moves;
    let opponentMoves = []
    moves.forEach(m => {
      if(m.playerId != player._id){
        opponentMoves.push(m);
      }
    });
    this.opponentMoves = opponentMoves;
  }

  getSet(playerId) {
    let moves = this.Game.moves;
    let set = 1;
    moves.forEach(m => {
      if (m.playerId == playerId) {
        set = m.set + 1;
      }
    });
    return set;
  }

  savePlayer(player) {
    if( !player.name || !player.email )
      return alert('please insert your name and email');
    this.service.newPlayer(player, (result) => {
      this.service.addGamePlayer({
        playerId:result._id, 
        gameId:this.Game._id
      }, (result) => {
      })
      
    })
  }

}
