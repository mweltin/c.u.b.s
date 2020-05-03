import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TeamFilterInterface } from './team.pipe';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less']
})
export class TeamComponent implements OnInit {

  teams: Team[];
  filterBy: TeamFilterInterface;
  dropDownText: string;

  constructor(
    private teamSrv: TeamService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getTeams();
    this.filterBy = null;
    this.dropDownText = 'Filter Teams';
  }

  getTeams(): void {
    this.teamSrv.getTeams().subscribe(
      (data) => { this.teams = data; }
    );
  }

  setFilter( filter: TeamFilterInterface ): void {
    this.filterBy = filter;
    if ( !filter) {
      this.dropDownText = 'Filter Teams';
    } else {
      this.dropDownText = filter.league;
      this.dropDownText  = filter.division ? this.dropDownText + ' - ' + filter.division : this.dropDownText;
    }
  }

  setActiveTeam( team: Team){
    this.teamSrv.setActiveTeam(team);
  }
}
