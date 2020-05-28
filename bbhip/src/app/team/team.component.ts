import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TeamFilterInterface } from '../teamFilter';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less']
})
export class TeamComponent implements OnInit {

  teams: Team[];
  filterBy: TeamFilterInterface;


  constructor(
    private teamSrv: TeamService,
    public sanitizer: DomSanitizer,
    public navSrv: NavService
  ) {
    // listen for filter changes from nav service
      navSrv.filterChangeAccouncement.subscribe(
        filter => {
        this.filterBy = filter;
    });
  }

  ngOnInit(): void {
    this.getTeams();
    this.filterBy = this.navSrv.currentFilter;
  }

  getTeams(): void {
    this.teamSrv.getTeams().subscribe(
      (data) => { this.teams = data; }
    );
  }

  setActiveTeam( team: Team){
    this.teamSrv.setActiveTeam(team);
  }
}
