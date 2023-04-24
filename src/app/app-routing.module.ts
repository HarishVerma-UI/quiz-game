import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartGameComponent } from './start-game/start-game.component';
import { HomeComponent } from './home/home.component';
import { ManagementComponentComponent } from './wheelGame/management-component/management-component.component';
import { GameComponentComponent } from './wheelGame/game-component/game-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'start', component: StartGameComponent },
  { path: 'wheelitemsmanagement', component: ManagementComponentComponent },
  { path:'wheelgame', component: GameComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
