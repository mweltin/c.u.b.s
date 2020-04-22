import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less']
})
export class TeamComponent implements OnInit {

  teams: Team[];

  constructor(
  private teamSrv: TeamService,
  public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.teamSrv.getTeams().subscribe(
      (data) => { this.teams = data; }
    );
  }
}
