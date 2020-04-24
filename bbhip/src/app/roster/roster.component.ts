import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { TeamService } from '../team.service';
import { Roster } from '../roster';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.less']
})
export class RosterComponent implements OnInit {

  public roster: Roster; 
  
  constructor(
    private playerSrv: PlayerService,
    private teamSrv: TeamService
  ) { }

  ngOnInit(): void {
    this.roster.team = teamSrv.activeTeam;
  }

  getRoster( team: Team): void {
    this.roster.players = playerSrv.getPlayersByTeam(team);
  }

}
