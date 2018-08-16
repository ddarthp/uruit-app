import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatButtonModule, MatIconModule, MatCardModule, MatInputModule } from '@angular/material';
import { ApiService } from '../../services/apiService';
import { GameWeaponComponent } from './game-weapon/game-weapon.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [
    ApiService
  ],
  declarations: [
    GameComponent,
    GameWeaponComponent
  ],
  entryComponents: [

  ]
})
export class GameModule { }
