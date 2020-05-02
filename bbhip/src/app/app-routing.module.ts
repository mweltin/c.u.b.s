import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';
import { RosterComponent } from './roster/roster.component';
import { PitchOutcomeComponent } from './pitch-outcome/pitch-outcome.component';


const routes: Routes = [
  { path: 'teams', component: TeamComponent },
  { path: 'player/:player_id', component: PlayerComponent },
  { path: 'roster', component: RosterComponent },
  { path: 'arctest', component: PitchOutcomeComponent },
  { path: '', redirectTo: 'teams', pathMatch: 'full' }
];

@NgModule({
//  imports: [RouterModule.forRoot(routes, { enableTracing: true})],
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
