import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamComponent } from './team/team.component';
import { TeamFilter } from './team/team.pipe';
import { RosterComponent } from './roster/roster.component';
import { NavComponent } from './nav/nav.component';
import { PitchOutcomeComponent } from './pitch-outcome/pitch-outcome.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BattingAvergeComponent } from './batting-averge/batting-averge.component';
import { SluggingComponent } from './slugging/slugging.component';
import { OnBasePercentageComponent } from './on-base-percentage/on-base-percentage.component';
import { YearSliderComponent } from './year-slider/year-slider.component';
import { EraComponent } from './era/era.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    TeamComponent,
    TeamFilter,
    RosterComponent,
    NavComponent,
    PitchOutcomeComponent,
    PieChartComponent,
    BattingAvergeComponent,
    SluggingComponent,
    OnBasePercentageComponent,
    YearSliderComponent,
    EraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
