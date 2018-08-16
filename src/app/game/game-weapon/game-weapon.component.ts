import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../../services/apiService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'game-weapon',
  templateUrl: './game-weapon.component.html',
  styleUrls: ['./game-weapon.component.scss']
})
export class GameWeaponComponent implements OnInit {
  
  @Input('gameObject')
  Game:any;
  @Input('weapon')
  weapon:any;

  @Output('weaponSelected')
  weaponSelected = new EventEmitter();


  constructor(
    public service:ApiService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {}

  selectWeapon(elm) {
    this.weaponSelected.emit({name: elm.parentNode.id});
  }


}
