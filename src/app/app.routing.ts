import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';


const appRoutes: Routes = [
	{
		path: '', pathMatch:'full', component: HomeComponent,
	},
	{
		path: 'game', pathMatch:'full', redirectTo: '',
	},
	{
		path: 'game/:id', component: GameComponent,
	}
];
export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
