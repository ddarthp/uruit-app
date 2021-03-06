import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { MatListModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
import { ApiService } from '../../services/apiService';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    ApiService
  ],
  declarations: [
    HomeComponent,
  ],
  entryComponents: [

  ]
})
export class HomeModule { }
